import { useState } from "react";
import { api, setAuthToken } from "../services/api";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      setAuthToken(res.data.token);
      onSuccess();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-4 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className={`w-full py-2 rounded transition text-white ${
          !email || !password
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={!email || !password}
        onClick={handleLogin}>
        Login
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
}
