import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = await registerUser(form);
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-card p-6">
        <h1 className="text-xl font-semibold mb-2">Create your account</h1>
        <p className="text-xs text-textSecondary mb-4">
          Join the futuristic classroom in seconds.
        </p>
        {error && (
          <p className="text-xs text-red-400 bg-red-900/30 px-3 py-2 rounded-lg mb-3">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="primary-gradient-btn w-full text-xs mt-2"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-[11px] text-textSecondary">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

