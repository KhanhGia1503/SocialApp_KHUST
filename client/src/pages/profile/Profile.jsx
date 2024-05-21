import React from "react";
import "./Profile.css";
import { useState } from "react";
import Posts from "../../components/posts/Posts.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
const Profile = () => {
  const [posts, setPosts] = useState([]);
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );

  return (
    <div className="a">
      <div className="left">
        <Leftbar />
      </div>
      <div className="right">
        <div className="puser">
          <img src={`uploads/${currentUser.profilePic}`} alt="" />
          <div className="puser_name">{currentUser.name}</div>
        </div>
        <div className="ppost">
          <Posts posts={posts} setPosts={setPosts} home={false} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
