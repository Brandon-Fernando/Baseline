import { staggerChildren, staggerContainer } from "../../../animations/animations";
import useAuthForm from "./useAuthForm";
import { AnimatePresence, motion } from "framer-motion";
import VerificationCode from "./VerifcationCode";

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
    <motion.div variants={staggerChildren} className="input-field-wrapper" key={field}>
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
    </motion.div>
  );

  const renderVerificationCode = () => (
    <motion.div 
      className="input-field-wrapper"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.span variants={staggerChildren} className="verify-title">
        Enter your email verification code
      </motion.span>

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
        key={step}
        disabled={loading}
        variants={staggerChildren}
      >
        verify email
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

                  <motion.button
                    type="submit"
                    className="auth-button button light"
                    disabled={loading}
                    key={step}
                    variants={staggerChildren}

                  >
                    {loading ? "Please wait..." : "Verify email"}
                  </motion.button>
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

                {step !== "verify" && (
                  <motion.button
                    type="submit"
                    className="auth-button button light"
                    key={step}
                    disabled={loading}
                    variants={staggerChildren}
                  >
                    {loading
                      ? "Please wait..."
                      : step === "verify"
                        ? "Verify email"
                        : step === "continue"
                          ? "Continue to home"
                          : "Create account"}
                  </motion.button>
                )}
                
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
          <motion.div variants={staggerChildren} className="divide-wrapper">
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

          {type === "create" && (
            <motion.span variants={staggerChildren} className="redirect">
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
      </motion.div>
     </AnimatePresence>
  );
};

export default AuthForm;
