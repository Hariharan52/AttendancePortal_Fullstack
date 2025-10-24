import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/login?email=${email}`);
      setUser(res.data); // Save user info (role)
      if (res.data.role === "ADMIN") {
        navigate("/add-employee");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
