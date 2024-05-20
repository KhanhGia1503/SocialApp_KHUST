import React from "react";
import "./Leftbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Icon } from "@mui/material";

const Leftbar = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  const LogOut = async (event) => {
    try {
      await axios.post(
        "http://localhost:8800/server/auth/logout",
        {},
        { withCredentials: true }
      );
      // Redirect to the login page or homepage after logging out
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="leftbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="khust">KHUST</div>
      </Link>
      <div className="luser">
        <img
          className="lprofilePic"
          src={`uploads/${currentUser.profilePic}`}
          alt="uploads/User.png"
        />
        <div className="lprofile">Profile</div>
      </div>
      <LogoutIcon
        style={{ fontSize: 45 }}
        className="logoutIcon"
        onClick={LogOut}
      />
    </div>
  );
};

export default Leftbar;
