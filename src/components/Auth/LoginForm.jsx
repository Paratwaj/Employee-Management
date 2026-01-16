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
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h4 className="mb-3">Login</h4>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100">Login</button>
    </form>
  );
};

export default LoginForm;
