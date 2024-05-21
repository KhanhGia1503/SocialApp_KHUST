import React from "react";
import "./Leftbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from '@mui/icons-material/Message';
import { Icon } from "@mui/material";
import useSearchUser from "../../hooks/useSearchUser";

const Leftbar = () => {
  const [searchInputUser,setSearchInputUser] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  const {searchUser} = useSearchUser();
  const searchUserHandler = (e) => {
    e.preventDefault();
    if (searchInputUser.trim().length === 0) {
      return;
    }
    searchUser(searchInputUser);
  };

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

  const Message = async (event) => {
    try {
      // await axios.post(
      //   "http://localhost:8800/message",
      //   {},
      //   { withCredentials: true }
      // );

      window.location.href = "http://localhost:3000/inbox";
    } catch (error) {
      console.error("Error Messaging:", error);
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
      <div className="search pt-0">
        <div className={`searchBar p-2 d-flex`}>
          <img
            onClick={searchUserHandler}
            className={`search`}
            src="./img/search.png"
          ></img>
          <input
            type="text"
            placeholder="Search username"
            onChange={(event) => {
              setSearchInputUser(event.target.value);
            }}
            value={searchInputUser}
          ></input>
          
        </div>
      </div>
      <div className="lContainer" onClick={Message}>
        <MessageIcon style={{ fontSize: 30 }} className="lIcon" />
        <span className="lText">Message</span>
      </div>
      <div className="lContainer" onClick={LogOut}>
        <LogoutIcon style={{ fontSize: 30 }} className="lIcon" />
        <span className="lText">Log out</span>
      </div>
    </div>
  );
};

export default Leftbar;
