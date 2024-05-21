import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import CreatePost from "../../components/createPost/CreatePost.jsx";
import Posts from "../../components/posts/Posts.jsx";

const Home = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("chat-user"));
    if (!currentUser) {
      navigate("/login"); // Redirect to login if no user is logged in
    } else {
      setCurrentUser(currentUser);
      const getUser = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8800/server/users/${currentUser.id}`,
            { withCredentials: true }
          );
          setUser(res.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      getUser();
    }
  }, [navigate]);

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
