import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import { isAuthenticated } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/dashboard");
  }

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
