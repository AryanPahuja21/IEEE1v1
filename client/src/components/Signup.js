import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../css/Login.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth(); // Access the user data from the AuthContext
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSignup = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/signup`, {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        // Redirect to login page upon successful signup
        navigate("/login"); // Use navigate function to redirect
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        // Handle error (e.g., display error message)
      });
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
          marginBottom: "-1.9rem",
          color: "black",
        }}
      >
        Code 1v1 Tournament Platform
      </h1>
      <p
        style={{
          fontSize: "1rem",
          textAlign: "center",
          marginTop: "2rem",
          color: "#555",
        }}
      >
        The faster you Sign up, the faster you get a ticket
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
          onSubmit={handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            placeholder="Password"
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
            // onMouseEnter={(e) => {
            //   e.target.style.backgroundColor = "#1abc9c";
            //   e.target.style.transform = "scale(1.05)";
            // }}
            // onMouseLeave={(e) => {
            //   e.target.style.backgroundColor = "#16a085";
            //   e.target.style.transform = "scale(1)";
            // }}
          >
            <span style={{ zIndex: 1 }}>Sign Up</span>
            <span
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                width: "50px",
                height: "50px",
                background: "#fff",
                borderRadius: "50%",
                animation: "ripple 1s ease infinite",
              }}
            />
          </button>
        </form>
        <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#555" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#000", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
