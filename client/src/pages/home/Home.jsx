import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import CreatePost from "../../components/createPost/CreatePost.jsx";
import Posts from "../../components/posts/Posts.jsx";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const getUser = async () => {
        const res = await axios.get(
          `http://localhost:8800/server/users/${currentUser.id}`,
          { withCredentials: true }
        );
        setUser(res.data);
      };
      getUser();
    }
  }, []);
  return (
    <div className="home">
      {/* <Navbar user={user} /> */}
      <div className="a">
        <div className="left">
          <Leftbar />
        </div>
        <div className="right">
          <CreatePost addNewPost={addNewPost} user={user} />
          <Posts posts={posts} setPosts={setPosts} home={true} />
        </div>
      </div>
    </div>
  );
};

export default Home;
