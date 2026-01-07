import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../utils/api"; // use AuthAPI directly

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.register(username, password);
      alert("Signup successful! You can now log in.");
      navigate("/login"); // redirect smoothly to login page
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
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
      <button type="submit">Signup</button>
    </form>
  );
}
