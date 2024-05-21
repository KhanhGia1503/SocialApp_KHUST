import React, { useState, useEffect } from "react";
import "./Profile.css"; // Import CSS cho trang hồ sơ người dùng
import { useNavigate } from "react-router-dom";
import useSendMessage from "../../hooks/useSendMessage";
import useSendMessageFromProfile from "../../hooks/useSendMessageFromProfile";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { message } = useSendMessageFromProfile();
  useEffect(() => {
    // Giả sử bạn có một API để lấy thông tin người dùng
    fetch(`http://localhost:8800/server/users/7`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => setError(err));
  }, []);
  console.log(user);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);
  return (
    <div className="user-profile">
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      {/* Thêm các thông tin khác của người dùng tại đây */}
      <button
        className="message-button"
        onClick={() => {
          message(user);
        }}
      >
        Nhắn tin
      </button>
    </div>
  );
};

export default Profile;
