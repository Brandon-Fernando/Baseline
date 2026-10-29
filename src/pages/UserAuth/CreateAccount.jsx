import AuthForm from "./components/AuthForm";
import "./UserAuth.css";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  return(
    <div className="user-auth-container">
      <div onClick={() => navigate("/")} className="user-back">
        <i className="fa-solid fa-angle-left"/>
      </div>

      <img src="/Logo/Logo.png" alt="Logo" className="secondary-logo"/>

      <div className="user-auth-content">
        <span className="user-auth-title">let's get started</span>

        {/* <AuthForm type={"create"}/> */}
        <AuthForm key="create" type="create" />
      </div>
    </div>
  )
}

export default CreateAccount;