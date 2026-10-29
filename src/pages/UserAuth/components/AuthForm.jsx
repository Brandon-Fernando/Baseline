// import { staggerChildren, staggerContainer } from "../../../animations/animations";
// import useAuthForm from "./useAuthForm";
// import { AnimatePresence, motion } from "framer-motion";
// import VerificationCode from "./VerifcationCode";
// import { useNavigate } from "react-router-dom";

// const AuthForm = ({ type }) => {
//   const {
//     values,
//     step,
//     code,
//     error,
//     loading,
//     fields,
//     handleChange,
//     handleSubmit,
//     handleExistingAccount,
//     handleExistingVerification,
//     handleCodeChange,
//     handleBack,
//     handleLogin,
//     handleGoogleLogin,
//   } = useAuthForm({type});
  
//   const navigate = useNavigate();

  

//   const renderField = ({ field, title, placeholder, icon }) => (
//     <motion.div variants={staggerChildren} className="input-field-wrapper" key={field}>
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
//     </motion.div>
//   );

//   const renderVerificationCode = () => (
//     <motion.div 
//       className="verification-wrapper"
//       variants={staggerContainer}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.span variants={staggerChildren} className="verify-title">
//         Enter your email verification code
//       </motion.span>

//       <motion.div variants={staggerChildren}>
//         <VerificationCode 
//         value={code}
//         onChange={handleCodeChange}
//         length={6}
//         disabled={loading}
//         />
//       </motion.div>

//       <motion.button
//         type="submit"
//         className="auth-button button light"
//         key={step}
//         disabled={loading}
//         variants={staggerChildren}
//         onClick={handleExistingVerification}
//       >
//         verify email
//       </motion.button>
     
//     </motion.div>
//   );

//   const renderExist = () => (
//     <motion.div 
//       className="existing-container"
//       variants={staggerContainer}
//     >
//       <motion.div variants={staggerChildren} className="existing-msg">
//         <div className="exclamation">
//           <i className="fa-solid fa-exclamation"/>
//         </div>

//         <span>Looks like you have an account already. </span>
//       </motion.div>

//       <motion.button 
//         variants={staggerChildren}
//         className="auth-form-button button light"
//         onClick={() => navigate("/signIn")}
//       >
//         Sign In
//       </motion.button>
//     </motion.div>
//   )

//   // return (
//   //   <AnimatePresence mode="wait">
//   //     <motion.div 
//   //       className="auth-form-container"
//   //       key={`${type}-${step}`}
//   //       variants={staggerContainer}
//   //       initial="hidden"
//   //       animate="visible"
//   //       exit="exit"
//   //     >
//   //       {type === "create" ? (
//   //         <>
//   //           {step === "existing" ? (
//   //             <>
//   //               {/* <button
//   //                 type="button"
//   //                 className="auth-button button light"
//   //                 disabled={loading}
//   //                 onClick={handleExistingAccount}
//   //               >
//   //                 {loading
//   //                   ? "Please wait..."
//   //                   : "Continue with existing account"}
//   //               </button> */}

//   //               <form onSubmit={handleExistingVerification}>
//   //                 {renderVerificationCode()}

//   //                 {/* <motion.button
//   //                   type="submit"
//   //                   className="auth-button button light"
//   //                   disabled={loading}
//   //                   key={step}
//   //                   variants={staggerChildren}

//   //                 >
//   //                   {loading ? "Please wait..." : "Verify email"}
//   //                 </motion.button> */}
//   //               </form>
//   //             </>
//   //           ) : (
//   //             <form onSubmit={handleSubmit}>
//   //               {step === "create" && (
//   //                 <div className="form-container">
//   //                   <div className="fl-name">
//   //                     {fields
//   //                       .filter(({ field }) =>
//   //                         ["firstName", "lastName"].includes(field)
//   //                       )
//   //                       .map(renderField)}
//   //                   </div>

//   //                   {fields
//   //                     .filter(
//   //                       ({ field }) =>
//   //                         !["firstName", "lastName"].includes(field)
//   //                     )
//   //                     .map(renderField)}
//   //                 </div>
//   //               )}

//   //               {step === "verify" && renderVerificationCode()}

//   //               {step === "continue" && (
//   //                 <p>
//   //                   Your email is verified. Continue to sign in and
//   //                   save your profile.
//   //                 </p>
//   //               )}

//   //               {(step !== "verify" && step !== "existing") && (
//   //                 <motion.button
//   //                   type="submit"
//   //                   className="auth-button button light"
//   //                   key={step}
//   //                   disabled={loading}
//   //                   variants={staggerChildren}
//   //                 >
//   //                   {loading
//   //                     ? "Please wait..."
//   //                     : step === "verify"
//   //                       ? "Verify email"
//   //                       : step === "continue"
//   //                         ? "Continue to home"
//   //                         : "Create account"}
//   //                 </motion.button>
//   //               )}
                
//   //             </form>
//   //           )}

//   //           {step !== "create" && (
//   //             <button
//   //               type="button"
//   //               className="redirect-link"
//   //               disabled={loading}
//   //               onClick={handleBack}
//   //             >
//   //               Back to account details
//   //             </button>
//   //           )}
//   //         </>
//   //       ) : (
//   //         <button
//   //           type="button"
//   //           className="auth-button button light"
//   //           disabled={loading}
//   //           onClick={handleLogin}
//   //         >
//   //           Sign in
//   //         </button>
//   //       )}

//   //       {error && <p role="alert">{error}</p>}
        
//   //       {step === "create" && (
//   //       <>
//   //         <motion.div variants={staggerChildren} className="divide-wrapper">
//   //           <hr className="line" />
//   //           <span>or</span>
//   //           <hr className="line" />
//   //         </motion.div>

//   //         <motion.button
//   //           type="button"
//   //           className="button dark"
//   //           disabled={loading}
//   //           onClick={handleGoogleLogin}
//   //           variants={staggerChildren}
//   //         >
//   //           Continue with Google
//   //         </motion.button>

//   //         {type === "create" && (
//   //           <motion.span variants={staggerChildren} className="redirect">
//   //             Already have an account?{" "}
//   //             <button
//   //               type="button"
//   //               className="redirect-link"
//   //               disabled={loading}
//   //               onClick={handleLogin}
//   //             >
//   //               Sign in
//   //             </button>
//   //           </motion.span>
//   //         )}
//   //       </>
//   //       )}
//   //     </motion.div>
//   //    </AnimatePresence>
//   // );

//   console.log(step)

//   return(
//     <AnimatePresence mode="wait">
//       <motion.div
//         className="auth-form-container"
//         key={`${type}-${step}`}
//         variants={staggerContainer}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//       >
//         {/* ===== CREATE ACCOUNT =====  */}
//         {type === "create" && (
//           <>
//             {/* FIRST STEP (CREATE)  */}
//             {step === "create" && (
//               <div className="form-container">
//                 <div className="fl-name">
//                   {fields
//                   .filter(({ field }) =>
//                   ["firstName", "lastName"].includes(field)
//                   ).map(renderField)}
//                 </div>

//                 {fields
//                   .filter(
//                   ({ field }) =>
//                   !["firstName", "lastName"].includes(field)
//                   ).map(renderField)}
//               </div>
//             )}

//             {/* VERIFY  */}
//             {step === "verify" && (
//               renderVerificationCode()
//             )}

//             {step === "existing" && (
//               renderExist()
//             )}
//           </>
//         )}

//         {type === "signIn" && (
//           <>
//             {/* FIRST STEP (SIGN IN ) */}
//             <div className="form-container">
//               {fields.map(renderField)}
//             </div>
//           </>
//         )}

//         {/* ===== SUBMIT / GOOGLE BUTTON =====  */}
//         {(step !== "existing" && step !== "verify" && step !== "continue") && (
//           <>
//             {/* SUBMIT BUTTON  */}
//             <motion.button
//               className="auth-button button light"
//               type="submit"
//               onClick={handleSubmit}
//               variants={staggerChildren}
//               whileTap={{ scale: 0.95 }}

//             >
//               {loading && <span className="button-spinner" aria-hidden="true" />}
//               {loading ? "" : "create account"}
//             </motion.button>

//             {/* DIVIDER  */}
//             <motion.div variants={staggerChildren} className="divide-wrapper">
//               <hr className="line" />
//               <span>or</span>
//               <hr className="line" />
//             </motion.div>

//             {/* SIGN IN WITH GOOGLE  */}
//             <motion.button
//               type="button"
//               className="button dark"
//               disabled={loading}
//               onClick={handleGoogleLogin}
//               variants={staggerChildren}
//             >
//               Continue with Google
//             </motion.button>

//             {/* REDIRECT  */}
//             <motion.span variants={staggerChildren} className="redirect">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 className="redirect-link"
//                 disabled={loading}
//                 onClick={handleLogin}
//               >
//                 Sign in
//               </button>
//             </motion.span>
//           </>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   )
// };

// export default AuthForm;

import { AnimatePresence, motion } from "framer-motion";
import {
  staggerChildren,
  staggerContainer,
} from "../../../animations/animations";
import useAuthForm from "./useAuthForm";
import { useNavigate } from "react-router-dom";

// Keeps the filename spelling from your original import.
import VerificationCode from "./VerifcationCode";

const AuthForm = ({ type }) => {
  const isCreate = type === "create";

  const {
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
  } = useAuthForm({ type });

  const navigate = useNavigate();

  // Renders one field from CREATE_FIELDS or SIGN_IN_FIELDS.
  const renderField = ({ field, title, placeholder, icon }) => (
    <motion.div
      variants={staggerChildren}
      className="input-field-wrapper"
      key={field}
    >
      <label className="field-title" htmlFor={field}>
        {title}
      </label>

      <div className="input-wrapper">
        {icon && <i className={icon} aria-hidden="true" />}

        <input
          id={field}
          name={field}
          type={
            field === "password"
              ? "password"
              : field === "email"
                ? "email"
                : field === "phoneNumber"
                  ? "tel"
                  : "text"
          }
          value={values[field] ?? ""}
          onChange={handleChange}
          className="input-text"
          placeholder={placeholder}
          autoComplete={
            field === "password"
              ? isCreate
                ? "new-password"
                : "current-password"
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
    </motion.div>
  );

  // Renders verification for both registration and sign-in.
  const renderVerificationCode = () => (
    <form onSubmit={handleVerification}>
      <motion.div
        className="verification-wrapper"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={staggerChildren}
          className="verify-title"
        >
          Enter your email verification code
        </motion.span>

        <motion.p variants={staggerChildren}>
          Check {values.email.trim()} for your code.
        </motion.p>

        <motion.div variants={staggerChildren}>
          <VerificationCode
            value={code}
            onChange={handleCodeChange}
            length={6}
            disabled={loading}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="auth-button button light"
          disabled={loading}
          variants={staggerChildren}
        >
          {loading ? "Please wait..." : "Verify email"}
        </motion.button>

        <motion.button
          type="button"
          className="redirect-link"
          disabled={loading}
          onClick={handleResendCode}
          variants={staggerChildren}
        >
          Resend code
        </motion.button>

        <motion.button
          type="button"
          className="redirect-link"
          disabled={loading}
          onClick={handleBack}
          variants={staggerChildren}
        >
          Back to account details
        </motion.button>
      </motion.div>
    </form>
  );

  // Shown when someone tries to register an existing account.
  const renderExistingAccount = () => (
    <motion.div
      className="existing-container"
      variants={staggerContainer}
    >
      <motion.div
        variants={staggerChildren}
        className="existing-msg"
      >
        <div className="exclamation">
          <i
            className="fa-solid fa-exclamation"
            aria-hidden="true"
          />
        </div>

        <span>Looks like you have an account already.</span>
      </motion.div>

      <motion.button
        type="button"
        variants={staggerChildren}
        className="auth-form-button button light"
        disabled={loading}
        onClick={() => navigate("/sign-in")}
      >
        Sign in
      </motion.button>

      <motion.button
        type="button"
        variants={staggerChildren}
        className="redirect-link"
        disabled={loading}
        onClick={handleBack}
      >
        Back to account details
      </motion.button>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="auth-form-container"
        key={`${type}-${step}`}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Shared verification screen for either form type. */}
        {step === "verify" && renderVerificationCode()}

        {/* Registration found an account with this email. */}
        {step === "existing" && renderExistingAccount()}

        {/* Main registration or sign-in form. */}
        {step === "details" && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                {isCreate ? (
                  <>
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
                  </>
                ) : (
                  fields.map(renderField)
                )}
              </div>

              {/* Form submission also works when pressing Enter. */}
              <motion.button
                className="auth-button button light"
                type="submit"
                disabled={loading}
                variants={staggerChildren}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>
                    <span
                      className="button-spinner"
                      aria-hidden="true"
                    />
                  </>
                ) : isCreate ? (
                  "Create account"
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>

            <motion.div
              variants={staggerChildren}
              className="divide-wrapper"
            >
              <hr className="line" />
              <span>or</span>
              <hr className="line" />
            </motion.div>

            <motion.button
              type="button"
              className="button dark"
              disabled={loading}
              onClick={handleGoogleLogin}
              variants={staggerChildren}
            >
              Continue with Google
            </motion.button>

            {/* Only registration needs a link to sign-in. */}
            {isCreate && (
              <motion.span
                variants={staggerChildren}
                className="redirect"
              >
                Already have an account?{" "}
                <button
                  type="button"
                  className="redirect-link"
                  disabled={loading}
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </motion.span>
            )}
          </>
        )}

        {/* Allows retrying if profile saving fails after verification. */}
        {step === "continue" && (
          <form onSubmit={handleSubmit}>
            <p>Your email is verified. Continue to your account.</p>

            <motion.button
              type="submit"
              className="auth-button button light"
              disabled={loading}
              variants={staggerChildren}
            >
              {loading ? "Please wait..." : "Continue"}
            </motion.button>
          </form>
        )}

        {/* Displays errors from authentication or profile saving. */}
        {error && <p role="alert">{error}</p>}
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthForm;