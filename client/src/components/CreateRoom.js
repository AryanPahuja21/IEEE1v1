import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useAuth } from "./AuthContext"; // Import useAuth hook from AuthContext
import { useEffect } from "react";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  let { user } = useAuth();
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    setUserID(user.id);
    // Check if user data exists in context
    if (!user) {
      // If user data does not exist, redirect to login page
      navigate("/login");
    }
  }, [user, navigate]);

  const handleCreateRoom = () => {
    if (roomName == "") {
      alert("Room Name input can't be empty");
      return;
    }
    if (userName == "") {
      alert("Your Name input can't be empty");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/rooms/create`, {
        roomName,
        userName,
        userID,
      })
      .then((response) => {
        // Redirect to room page
        navigate(`/room/${response.data.roomId}`); // Use navigate function to redirect
      })
      .catch((error) => {
        console.error("Error creating room:", error);
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
        minHeight:
          "95.5vh" /* Changed height to minHeight for responsiveness */,
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #999999 100%, #FFFFFF 100%)",
        color: "#fff",
        // fontFamily: "'Roboto', sans-serif",
        paddingBottom: "2rem" /* Added padding bottom for spacing */,
      }}
    >
      <h1
        style={{
          fontSize: "52px ",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "5rem",
          // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
          color: "black",
          fontFamily: "'Lexend', system-ui",
        }}
      >
        Create Room
      </h1>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="roomName"
          style={{
            color: "black",
            fontSize: "1.25rem",
            marginLeft: "0.25rem",
            display: "block",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          Room Name
        </label>
        <input
          type="text"
          id="roomName"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "2px solid #969BA7" /* Added border */,
            marginBottom: "1rem",
            marginTop: "0.25rem",
            width: "600px" /* Adjust width as needed */,
            fontSize: "1.2rem",
            backgroundColor:
              "rgba(255, 255, 255, 0.1)" /* Added background color with transparency */,
            color: "#fff" /* Added text color */,
            outline: "none" /* Removed outline */,
            transition:
              "border-color 0.3s ease, background-color 0.3s ease" /* Added transition */,
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="userName"
          style={{
            color: "black",
            fontSize: "1.25rem",
            marginLeft: "0.25rem",
            display: "block",
          }}
        >
          Your Name
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "2px solid #969BA7" /* Added border */,
            marginBottom: "4rem",
            marginTop: "0.25rem",
            width: "600px" /* Adjust width as needed */,
            fontSize: "1.2rem",
            backgroundColor:
              "rgba(255, 255, 255, 0.1)" /* Added background color with transparency */,
            color: "#fff" /* Added text color */,
            outline: "none" /* Removed outline */,
            transition:
              "border-color 0.3s ease, background-color 0.3s ease" /* Added transition */,
          }}
        />
      </div>

      <button
        onClick={handleCreateRoom}
        style={{
          fontFamily: "'Manrope', sans-serif",
          textDecoration: "none",
          color: "#fff" /* Change text color to white */,
          fontSize: "18px",
          padding: "20px 45.5px 20px 45.5px",
          backgroundColor: "#6D31ED",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          display: "inline-block",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#6D31ED";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#6D31ED";
          e.target.style.transform = "scale(1)";
        }}
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
