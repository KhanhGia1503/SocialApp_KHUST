import React from "react";
import "./Profile.css";
import { useState } from "react";
const Profile = () => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("chat-user"))
      );
    return (
        <div>
            Profile
        </div>
    )
}

export default Profile;