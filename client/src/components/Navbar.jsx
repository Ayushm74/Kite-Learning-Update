import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 nav-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glass">
            <span className="text-xs font-bold tracking-wider">KITE</span>
          </div>
          <span className="font-semibold text-lg tracking-wide">
            FuturLearn
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `hover:text-secondary transition ${
                isActive ? "text-secondary" : "text-textSecondary"
              }`
            }
          >
            Courses
          </NavLink>
          {user && (
            <NavLink
              to="/my-courses"
              className={({ isActive }) =>
                `hover:text-secondary transition ${
                  isActive ? "text-secondary" : "text-textSecondary"
                }`
              }
            >
              My Learning
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `hover:text-secondary transition ${
                  isActive ? "text-secondary" : "text-textSecondary"
                }`
              }
            >
              Admin
            </NavLink>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-textSecondary hover:text-secondary text-sm"
              >
                Login
              </Link>
              <Link to="/register" className="primary-gradient-btn text-xs">
                Join Now
              </Link>
            </>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-textSecondary text-xs hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-textSecondary hover:text-secondary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

