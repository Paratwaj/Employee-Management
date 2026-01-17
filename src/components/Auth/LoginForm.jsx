import { useState } from "react";
import { loginUser } from "../../utils/auth";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    loginUser();
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-lg rounded p-5" style={{ width: "100%", maxWidth: "400px" }}>
      <h4 className="text-center mb-4">Sign In</h4>

      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          className="form-control form-control-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control form-control-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 btn-lg">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
