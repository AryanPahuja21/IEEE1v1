import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import GoogleLogo from "./Google_Icons.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.SERVER_URL}/api/auth/login`,
        { email, password }
      );
      const userData = response.data;
      login(userData);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response.status === 401) {
        alert("Invalid email or password!");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #999999 100%, #FFFFFF 100%)",
        fontFamily: '"Poppins", sans-serif', // Elegant font similar to the one in the image
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: ".1rem",
          color: "black",
        }}
      >
        Welcome to Code 1v1 Tournament !
      </h1>
      <p
        style={{
          fontSize: "1rem",
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#555",
        }}
      >
        The faster you fill up, the faster you get a ticket
      </p>
      <div
        style={{
          width: "350px",
          borderRadius: "10px",
          padding: "40px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "#f8f8f8",
              color: "#333",
            }}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "#f8f8f8",
              color: "#333",
            }}
            required
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "1rem",
              fontSize: "0.9rem",
            }}
          >
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: "0.5rem" }} />
              Remember me
            </label>
            <a
              href="/forgot-password"
              style={{ color: "#333", textDecoration: "none" }}
            >
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            Sign In
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#555" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#000", textDecoration: "none" }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
