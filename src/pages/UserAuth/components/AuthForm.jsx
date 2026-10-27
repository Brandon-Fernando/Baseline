import { useState } from "react";
import { CREATE_FIELDS } from "./authFields";
import {
  login,
  loginWithGoogle,
  registerWithEmail,
  verifyEmail,
} from "../../../auth";

const AuthForm = ({ type }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState("create");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add a password field if CREATE_FIELDS doesn't already contain one.
  const fields = CREATE_FIELDS.some(({ field }) => field === "password")
    ? CREATE_FIELDS
    : [
        ...CREATE_FIELDS,
        {
          field: "password",
          title: "Password",
          placeholder: "Enter your password",
        },
      ];

  const handleChange = ({ target: { name, value } }) => {
    setValues((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const runAction = async (action) => {
    setError("");
    setLoading(true);

    try {
      await action();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    void runAction(async () => {
      const email = values.email.trim();

      const result =
        step === "verify"
          ? await verifyEmail(email, code.trim())
          : await registerWithEmail(email, values.password);

      if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setStep("verify");
      } else if (result.isSignUpComplete) {
        setStep("done");
      } else {
        setError(`Additional step required: ${result.nextStep.signUpStep}`);
      }
    });
  };

  const renderField = ({ field, title, placeholder, icon }) => (
    <div className="input-field-wrapper" key={field}>
      <label className="field-title" htmlFor={field}>
        {title}
      </label>

      <div className="input-wrapper">
        {icon && <i className={icon} aria-hidden="true" />}

        <input
          id={field}
          type={
            field === "password"
              ? "password"
              : field === "email"
                ? "email"
                : field === "phoneNumber"
                  ? "tel"
                  : "text"
          }
          name={field}
          value={values[field] ?? ""}
          onChange={handleChange}
          className="input-text"
          placeholder={placeholder}
          autoComplete={
            field === "password" ? "new-password" : undefined
          }
          required
          disabled={loading}
        />
      </div>
    </div>
  );

  return (
    <div className="auth-form-container">
      {type === "create" && step !== "done" ? (
        <form onSubmit={handleSubmit}>
          {step === "create" ? (
            <div className="form-container">
              <div className="fl-name">
                {fields
                  .filter(({ field }) =>
                    ["firstName", "lastName"].includes(field)
                  )
                  .map(renderField)}
              </div>

              {fields
                .filter(
                  ({ field }) =>
                    !["firstName", "lastName"].includes(field)
                )
                .map(renderField)}
            </div>
          ) : (
            <div className="input-field-wrapper">
              <label htmlFor="verification-code">
                Enter your email verification code
              </label>

              <input
                id="verification-code"
                className="input-text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                autoComplete="one-time-code"
                required
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            className="auth-button button light"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : step === "verify"
                ? "Verify email"
                : "Create account"}
          </button>
        </form>
      ) : (
        <>
          {step === "done" && (
            <p>Your account is ready. Sign in to continue.</p>
          )}

          <button
            type="button"
            className="auth-button button light"
            disabled={loading}
            onClick={() => void runAction(login)}
          >
            Sign in
          </button>
        </>
      )}

      {error && <p role="alert">{error}</p>}

      <div className="divide-wrapper">
        <hr className="line" />
        <span>or</span>
        <hr className="line" />
      </div>

      <button
        type="button"
        className="button dark"
        disabled={loading}
        onClick={() => void runAction(loginWithGoogle)}
      >
        Continue with Google
      </button>

      {type === "create" && step !== "done" && (
        <span className="redirect">
          Already have an account?{" "}
          <button
            type="button"
            className="redirect-link"
            disabled={loading}
            onClick={() => void runAction(login)}
          >
            Sign in
          </button>
        </span>
      )}
    </div>
  );
};

export default AuthForm;