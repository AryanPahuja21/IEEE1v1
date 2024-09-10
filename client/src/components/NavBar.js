// NavBar.js

import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import useAuth hook from AuthContext
import "../css/NavBar.css"; // Import CSS file for styling

const NavBar = () => {
  let { user, logout } = useAuth(); // Access user data and logout function from context
  const navigate = useNavigate(); // Get navigate function from react-router-dom
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    // Call logout function to clear user session data
    logout();
    // Redirect the user to the login page
    navigate("/login");
  };

  // Check if the current page is login or signup
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <div className="navbar">
      <div className="navbar-items">
        {/* Images */}
        <img
          src="/ieee-logo.jpg"
          alt="IEEE-MSIT"
          id="ieee-logo"
          className="navbar-image"
        />
        <img
          src="/ieee-msit.jpg"
          alt="Image 2"
          id="ieee-msit"
          className="navbar-image"
        />

        {/* Links */}
        <Link to="/rules" className="navbar-item">
          Know The Game
        </Link>
        <Link to="/contact" className="navbar-item">
          Contact Us
        </Link>
      </div>

      {/* Show the Logout button if user is logged in, but hide the login/signup buttons on the login/signup pages */}
      {user && !isLoginPage && !isSignupPage && (
        <button className="logout" onClick={handleLogout}>
          <a>Logout</a>
        </button>
      )}
    </div>
  );
};

export default NavBar;
