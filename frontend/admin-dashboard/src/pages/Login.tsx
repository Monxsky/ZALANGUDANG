import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login(username, password);
      localStorage.setItem("token", user.token); // simpan token mock
      navigate("/"); // redirect ke dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
