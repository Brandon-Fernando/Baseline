import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  signOut,
  fetchUserAttributes,
  resendSignUpCode,
  confirmSignUp,
  sendUserAttributeVerificationCode,
  confirmUserAttribute,
} from "aws-amplify/auth";

import { CREATE_FIELDS, SIGN_IN_FIELDS } from "./authFields";
import {
  loginWithGoogle,
  registerWithEmail,
} from "../../../auth";
import { saveUserProfile } from "../../../profiles";

const useAuthForm = ({ type }) => {
  const navigate = useNavigate();
  const isCreate = type === "create";

  // Values entered in the registration or sign-in form.
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // "details": show the form.
  // "verify": show the verification code input.
  // "existing": registration found an existing account.
  // "continue": verification succeeded, but completion may need retrying.
  const [step, setStep] = useState("details");

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cognito has two different verification operations:
  // "signup": confirm an account that has not completed signup.
  // "email": verify the email of an already authenticated account.
  const [verificationKind, setVerificationKind] = useState("signup");

  const fields = isCreate ? CREATE_FIELDS : SIGN_IN_FIELDS;

  // Updates the corresponding form field and clears old errors.
  const handleChange = ({ target: { name, value } }) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // Wraps asynchronous actions with loading and error handling.
  const runAction = async (action) => {
    setError("");
    setLoading(true);

    try {
      await action();
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Checks email verification after Cognito establishes a session.
  // Saves profile details only when completing registration.
  const finishAuthentication = async () => {
    const attributes = await fetchUserAttributes();

    if (attributes.email_verified !== "true") {
      setVerificationKind("email");
      setCode("");
      setStep("verify");

      // Keep the session: verifying an email attribute requires it.
      await sendUserAttributeVerificationCode({
        userAttributeKey: "email",
      });

      return;
    }

    // If profile saving fails, the UI offers a completion retry.
    setStep("continue");

    if (isCreate) {
      await saveUserProfile({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      });
    }

    // Change this route if returning users have a different destination.
    navigate("/favorite-team", { replace: true });
  };

  // Signs in with the supplied credentials.
  // Unconfirmed accounts are sent to the verification screen.
  const signInWithEmail = async () => {
    const username = values.email.trim();

    if (!username || !values.password) {
      throw new Error("Email and password are required.");
    }

    // Preserves your original behavior of starting a fresh session.
    await signOut();

    const result = await signIn({
      username,
      password: values.password,
    });

    if (result.nextStep.signInStep === "CONFIRM_SIGN_UP") {
      setVerificationKind("signup");
      setCode("");
      setStep("verify");

      await resendSignUpCode({ username });
      return;
    }

    if (!result.isSignedIn) {
      // MFA, password resets, and other challenges need separate UI.
      throw new Error(
        `Another sign-in step is required: ${
          result.nextStep.signInStep
        }`
      );
    }

    await finishAuthentication();
  };

  // Registers a new account and follows Cognito's next signup step.
  const createAccount = async () => {
    const email = values.email.trim();
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();

    if (!firstName || !lastName) {
      throw new Error("First and last name are required.");
    }

    if (!email || !values.password) {
      throw new Error("Email and password are required.");
    }

    let result;

    try {
      result = await registerWithEmail(
        email,
        values.password,
        firstName,
        lastName
      );
    } catch (err) {
      if (err.name === "UsernameExistsException") {
        setStep("existing");
        return;
      }

      throw err;
    }

    switch (result.nextStep.signUpStep) {
      case "CONFIRM_SIGN_UP":
        // Signup already sent a code, so no resend is needed here.
        setVerificationKind("signup");
        setCode("");
        setStep("verify");
        return;

      case "COMPLETE_AUTO_SIGN_IN":
      case "DONE":
        // Use explicit password sign-in, matching your original flow.
        setStep("continue");
        await signInWithEmail();
        return;

      default:
        throw new Error(
          `Additional signup step required: ${
            result.nextStep.signUpStep
          }`
        );
    }
  };

  // Routes form submission to registration, sign-in, or completion.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;

    void runAction(async () => {
      if (step === "continue") {
        // A session already exists if profile saving failed.
        await finishAuthentication();
        return;
      }

      if (isCreate) {
        await createAccount();
      } else {
        await signInWithEmail();
      }
    });
  };

  // Confirms the entered code using the appropriate Cognito API.
  const handleVerification = (event) => {
    event.preventDefault();
    if (loading) return;

    void runAction(async () => {
      const confirmationCode = code.trim();

      if (!/^\d{6}$/.test(confirmationCode)) {
        throw new Error("Enter the 6-digit verification code.");
      }

      if (verificationKind === "email") {
        await confirmUserAttribute({
          userAttributeKey: "email",
          confirmationCode,
        });

        await finishAuthentication();
        return;
      }

      const result = await confirmSignUp({
        username: values.email.trim(),
        confirmationCode,
      });

      if (!result.isSignUpComplete) {
        throw new Error(
          `Additional signup step required: ${
            result.nextStep.signUpStep
          }`
        );
      }

      // Signup is confirmed. Sign in with the retained credentials.
      // If this fails, return to details instead of reusing the code.
      setCode("");
      setStep("details");
      await signInWithEmail();
    });
  };

  // Sends a replacement code without restarting registration.
  const handleResendCode = () => {
    if (loading) return;

    void runAction(async () => {
      if (verificationKind === "email") {
        await sendUserAttributeVerificationCode({
          userAttributeKey: "email",
        });
      } else {
        await resendSignUpCode({
          username: values.email.trim(),
        });
      }
    });
  };

  // Updates the verification input.
  const handleCodeChange = (value) => {
    setCode(value);
    setError("");
  };

  // Returns to the form and clears verification state.
  // End a partial session before allowing different credentials.
  const handleBack = () => {
    if (loading) return;

    void runAction(async () => {
      await signOut();
      setCode("");
      setStep("details");
    });
  };

  // Opens your application's email/password sign-in page.
  const handleLogin = () => {
    navigate("/sign-in");
  };

  // Starts your existing Google authentication flow.
  const handleGoogleLogin = () => {
    if (loading) return;
    void runAction(loginWithGoogle);
  };

  return {
    values,
    step,
    code,
    error,
    loading,
    fields,
    handleChange,
    handleSubmit,
    handleVerification,
    handleResendCode,
    handleCodeChange,
    handleBack,
    handleLogin,
    handleGoogleLogin,
  };
};

export default useAuthForm;