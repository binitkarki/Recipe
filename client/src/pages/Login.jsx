import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../utils/api"; // use AuthAPI directly

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.login(username, password);
      alert("Login successful!");
      navigate("/recipes"); // smooth redirect with React Router
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
