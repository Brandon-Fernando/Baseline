import AuthForm from "./components/AuthForm";
import "./UserAuth.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return(
    <div className="user-auth-container">
      <div onClick={() => navigate("/")} className="user-back">
        <i className="fa-solid fa-angle-left"/>
      </div>

      <img src="/Logo/Logo.png" alt="Logo" className="secondary-logo"/>

      <div className="user-auth-content">
        <span className="user-auth-title">welcome back</span>

        <AuthForm type={"signIn"}/>
      </div>
    </div>
  )
}

export default SignIn;