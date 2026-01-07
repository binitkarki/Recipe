import axios from "axios";

// Use environment variable for API base URL
const API_URL = import.meta.env.VITE_API_URL; 
// e.g. https://recipe-kczx.onrender.com/api (set in .env and Vercel)

export async function signup(username, password) {
  // Adjust endpoint name if your backend uses /auth/register instead of /auth/signup
  return axios.post(`${API_URL}/auth/register/`, { username, password });
}

export async function login(username, password) {
  // If you’re using SimpleJWT, the endpoint is usually /token/ not /auth/login
  const res = await axios.post(`${API_URL}/token/`, { username, password });
  localStorage.setItem("accessToken", res.data.access);
  localStorage.setItem("refreshToken", res.data.refresh);
  return res.data;
}

export function getAuthHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
