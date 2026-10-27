
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   signIn,
//   signOut,
//   fetchUserAttributes,
// } from "aws-amplify/auth";

import InputFields from "./InputFields";

// import { CREATE_FIELDS } from "./authFields";
// import {
//   login,
//   loginWithGoogle,
//   registerWithEmail,
//   verifyEmail,
// } from "../../../auth";
// import { saveUserProfile } from "../../../profiles";

// const AuthForm = ({ type }) => {
//   const [values, setValues] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const [step, setStep] = useState("create");
//   const [code, setCode] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const fields = CREATE_FIELDS.some(({ field }) => field === "password")
//     ? CREATE_FIELDS
//     : [
//         ...CREATE_FIELDS,
//         {
//           field: "password",
//           title: "Password",
//           placeholder: "Enter your password",
//         },
//       ];

//   const handleChange = ({ target: { name, value } }) => {
//     setValues((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setError("");
//   };

//   const runAction = async (action) => {
//     setError("");
//     setLoading(true);

//     try {
//       await action();
//     } catch (err) {
//       console.error("Authentication or profile save failed:", err);

//       setError(
//         `${err.name || "Error"}: ${
//           err.message || "Something went wrong. Please try again."
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signInAndSaveProfile = async () => {
//     const email = values.email.trim();

//     // Clear any old session before signing in as this account.
//     await signOut();

//     const result = await signIn({
//       username: email,
//       password: values.password,
//     });

//     if (!result.isSignedIn) {
//       throw new Error(
//         `Another sign-in step is required: ${
//           result.nextStep.signInStep
//         }`
//       );
//     }

//     const attributes = await fetchUserAttributes();

//     if (attributes.email !== email) {
//       throw new Error(
//         "The signed-in account does not match the registration email."
//       );
//     }

//     await saveUserProfile({
//       firstName: values.firstName.trim(),
//       lastName: values.lastName.trim(),
//     });

//     navigate("/home", { replace: true });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (loading) return;

//     void runAction(async () => {
//       const email = values.email.trim();
//       const firstName = values.firstName.trim();
//       const lastName = values.lastName.trim();

//       if (!firstName || !lastName) {
//         throw new Error("First and last name are required.");
//       }

//       if (!email || !values.password) {
//         throw new Error("Email and password are required.");
//       }

//       // Confirmation already succeeded. Retry sign-in and saving.
//       if (step === "continue") {
//         await signInAndSaveProfile();
//         return;
//       }

//       let result;

//       if (step === "verify") {
//         result = await verifyEmail(email, code.trim());
//       } else {
//         try {
//           result = await registerWithEmail(
//             email,
//             values.password,
//             firstName,
//             lastName
//           );
//         } catch (err) {
//           if (err.name === "UsernameExistsException") {
//             setStep("existing");
//             setError(
//               "An account already exists. If you have verified its email, " +
//                 "click Continue with existing account. Otherwise, enter " +
//                 "your verification code below."
//             );
//             return;
//           }

//           throw err;
//         }
//       }

//       const signUpStep = result.nextStep.signUpStep;

//       switch (signUpStep) {
//         case "CONFIRM_SIGN_UP":
//           setStep("verify");
//           return;

//         case "COMPLETE_AUTO_SIGN_IN":
//         case "DONE":
//           // Use explicit password sign-in to establish a fresh session.
//           // If saving fails, the next attempt skips email confirmation.
//           setStep("continue");
//           await signInAndSaveProfile();
//           return;

//         default:
//           throw new Error(
//             `Additional signup step required: ${signUpStep}`
//           );
//       }
//     });
//   };

//   const handleExistingAccount = () => {
//     if (loading) return;

//     void runAction(async () => {
//       setStep("continue");
//       await signInAndSaveProfile();
//     });
//   };

//   const handleExistingVerification = (event) => {
//     event.preventDefault();

//     if (loading) return;

//     void runAction(async () => {
//       const result = await verifyEmail(
//         values.email.trim(),
//         code.trim()
//       );

//       const signUpStep = result.nextStep.signUpStep;

//       if (
//         signUpStep !== "DONE" &&
//         signUpStep !== "COMPLETE_AUTO_SIGN_IN"
//       ) {
//         throw new Error(
//           `Additional signup step required: ${signUpStep}`
//         );
//       }

//       setStep("continue");
//       await signInAndSaveProfile();
//     });
//   };

//   const renderField = ({ field, title, placeholder, icon }) => (
//     <div className="input-field-wrapper" key={field}>
//       <label className="field-title" htmlFor={field}>
//         {title}
//       </label>

//       <div className="input-wrapper">
//         {icon && <i className={icon} aria-hidden="true" />}

//         <input
//           id={field}
//           type={
//             field === "password"
//               ? "password"
//               : field === "email"
//                 ? "email"
//                 : field === "phoneNumber"
//                   ? "tel"
//                   : "text"
//           }
//           name={field}
//           value={values[field] ?? ""}
//           onChange={handleChange}
//           className="input-text"
//           placeholder={placeholder}
//           autoComplete={
//             field === "password"
//               ? "new-password"
//               : field === "email"
//                 ? "email"
//                 : field === "firstName"
//                   ? "given-name"
//                   : field === "lastName"
//                     ? "family-name"
//                     : undefined
//           }
//           required
//           disabled={loading}
//         />
//       </div>
//     </div>
//   );

//   const renderVerificationCode = () => (
//     <div className="input-field-wrapper">
//       <label htmlFor="verification-code">
//         Enter your email verification code
//       </label>

//       <input
//         id="verification-code"
//         className="input-text"
//         value={code}
//         onChange={(event) => {
//           setCode(event.target.value);
//           setError("");
//         }}
//         autoComplete="one-time-code"
//         required
//         disabled={loading}
//       />
//     </div>
//   );

//   return (
//     <div className="auth-form-container">
//       {type === "create" ? (
//         <>
//           {step === "existing" ? (
//             <>
//               <button
//                 type="button"
//                 className="auth-button button light"
//                 disabled={loading}
//                 onClick={handleExistingAccount}
//               >
//                 {loading
//                   ? "Please wait..."
//                   : "Continue with existing account"}
//               </button>

//               <form onSubmit={handleExistingVerification}>
//                 {renderVerificationCode()}

//                 <button
//                   type="submit"
//                   className="auth-button button light"
//                   disabled={loading}
//                 >
//                   {loading ? "Please wait..." : "Verify email"}
//                 </button>
//               </form>
//             </>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               {step === "create" && (
//                 <div className="form-container">
//                   <div className="fl-name">
//                     {fields
//                       .filter(({ field }) =>
//                         ["firstName", "lastName"].includes(field)
//                       )
//                       .map(renderField)}
//                   </div>

//                   {fields
//                     .filter(
//                       ({ field }) =>
//                         !["firstName", "lastName"].includes(field)
//                     )
//                     .map(renderField)}
//                 </div>
//               )}

//               {step === "verify" && renderVerificationCode()}

//               {step === "continue" && (
//                 <p>
//                   Your email is verified. Continue to sign in and
//                   save your profile.
//                 </p>
//               )}

//               <button
//                 type="submit"
//                 className="auth-button button light"
//                 disabled={loading}
//               >
//                 {loading
//                   ? "Please wait..."
//                   : step === "verify"
//                     ? "Verify email"
//                     : step === "continue"
//                       ? "Continue to home"
//                       : "Create account"}
//               </button>
//             </form>
//           )}

//           {step !== "create" && (
//             <button
//               type="button"
//               className="redirect-link"
//               disabled={loading}
//               onClick={() => {
//                 setStep("create");
//                 setCode("");
//                 setError("");
//               }}
//             >
//               Back to account details
//             </button>
//           )}
//         </>
//       ) : (
//         <button
//           type="button"
//           className="auth-button button light"
//           disabled={loading}
//           onClick={() => void runAction(login)}
//         >
//           Sign in
//         </button>
//       )}

//       {error && <p role="alert">{error}</p>}

//       <div className="divide-wrapper">
//         <hr className="line" />
//         <span>or</span>
//         <hr className="line" />
//       </div>

//       <button
//         type="button"
//         className="button dark"
//         disabled={loading}
//         onClick={() => void runAction(loginWithGoogle)}
//       >
//         Continue with Google
//       </button>

//       {type === "create" && (
//         <span className="redirect">
//           Already have an account?{" "}
//           <button
//             type="button"
//             className="redirect-link"
//             disabled={loading}
//             onClick={() => void runAction(login)}
//           >
//             Sign in
//           </button>
//         </span>
//       )}
//     </div>
//   );
// };

// export default AuthForm;



import useAuthForm from "./useAuthForm";

const AuthForm = ({ type }) => {
  const {
    values,
    step,
    code,
    error,
    loading,
    fields,
    handleChange,
    handleSubmit,
    handleExistingAccount,
    handleExistingVerification,
    handleCodeChange,
    handleBack,
    handleLogin,
    handleGoogleLogin,
  } = useAuthForm();

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
            field === "password"
              ? "new-password"
              : field === "email"
                ? "email"
                : field === "firstName"
                  ? "given-name"
                  : field === "lastName"
                    ? "family-name"
                    : undefined
          }
          required
          disabled={loading}
        />
      </div>
    </div>
  );

  const renderVerificationCode = () => (
    <div className="input-field-wrapper">
      <label htmlFor="verification-code">
        Enter your email verification code
      </label>

      <input
        id="verification-code"
        className="input-text"
        value={code}
        onChange={handleCodeChange}
        autoComplete="one-time-code"
        required
        disabled={loading}
      />
    </div>
  );

  console.log(step)

  return (
    <div className="auth-form-container">
      {type === "create" ? (
        <>
          {step === "existing" ? (
            <>
              <button
                type="button"
                className="auth-button button light"
                disabled={loading}
                onClick={handleExistingAccount}
              >
                {loading
                  ? "Please wait..."
                  : "Continue with existing account"}
              </button>

              <form onSubmit={handleExistingVerification}>
                {renderVerificationCode()}

                <button
                  type="submit"
                  className="auth-button button light"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Verify email"}
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              {step === "create" && (
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
              )}

              {step === "verify" && renderVerificationCode()}

              {step === "continue" && (
                <p>
                  Your email is verified. Continue to sign in and
                  save your profile.
                </p>
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
                    : step === "continue"
                      ? "Continue to home"
                      : "Create account"}
              </button>
            </form>
          )}

          {step !== "create" && (
            <button
              type="button"
              className="redirect-link"
              disabled={loading}
              onClick={handleBack}
            >
              Back to account details
            </button>
          )}
        </>
      ) : (
        <button
          type="button"
          className="auth-button button light"
          disabled={loading}
          onClick={handleLogin}
        >
          Sign in
        </button>
      )}

      {error && <p role="alert">{error}</p>}
      
      {step === "create" && (
      <>
        <div className="divide-wrapper">
          <hr className="line" />
          <span>or</span>
          <hr className="line" />
        </div>

        <button
          type="button"
          className="button dark"
          disabled={loading}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>

        {type === "create" && (
          <span className="redirect">
            Already have an account?{" "}
            <button
              type="button"
              className="redirect-link"
              disabled={loading}
              onClick={handleLogin}
            >
              Sign in
            </button>
          </span>
        )}
      </>
      )}
    </div>
  );
};

export default AuthForm;
