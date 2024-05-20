import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user }) => {
  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "logout") {
      try {
        await axios.post("http://localhost:8800/server/auth/logout",{},{withCredentials: true,}); 
        // Redirect to the login page or homepage after logging out
        window.location.href = "http://localhost:3000/login"; 
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };
  return (
    <div className="Navbar">
      <div className="left">
        <Link to="/">Home</Link>
      </div>
      <div className="right">
        <select onChange={handleSelectChange}>
          <option value="someOption">{user.name}</option>
          <option value="profile">Profile</option>
          <option value="logout">Log out</option>
        </select>
      </div>
    </div>
  );
};
export default Navbar;
