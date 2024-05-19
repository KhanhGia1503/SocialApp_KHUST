import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"
import Navbar from "../../components/navbar/navbar.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import CreatePost from "../../components/createPost/CreatePost.jsx";
import Posts from "../../components/posts/Posts.jsx";

const Home =() => {
    const [user,setUser] = useState('');
    const [posts,setPosts] = useState([]);
    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
      };
      const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
      );
      useEffect( () => {
        const getUser = async ()=>{
            const res = await axios.get(`http://localhost:8800/server/users/find/${currentUser}`,{withCredentials: true,});
            setUser(res.data);
        }
        getUser();
      },[]
    )
    return(
        <div className="home">
            <Navbar/>
            <div className="a">
                <Leftbar/>
                <div className="mid">
                    <CreatePost addNewPost={addNewPost} user={user} />
                    <Posts posts={posts} setPosts={setPosts}/>
                </div>
            </div>
            
            
        </div>

    )
};

export default Home;