import "./Welcome.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const delayed = (action, delay = 180) => () => {
  setTimeout(action, delay);
};

const navigate = useNavigate();

  return(
    <div className="welcome-container">
      {/* LOGO  */}
      <div className="welcome-logo">
        <img src="/Logo/Logo.png" alt="Logo" className="logo"/>

        <span className="logo-text">baseline</span>
      </div>

      <div className="welcome-buttons">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={delayed(() => navigate("/dashboard"))}
          className="sign-in button light"
        >
          Sign in 
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={delayed(() => navigate("/create-account"))}
          className="create-account button dark"
        >
          create an account
        </motion.button>
      </div>
    </div>
  )
}

export default Welcome;