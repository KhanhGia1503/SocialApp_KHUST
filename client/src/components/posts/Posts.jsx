import React from "react";
import "./Posts.css";
import Post from "../post/Post.jsx"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Posts = ({ posts, setPosts }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
      );
    useEffect(()=>{
        const getdata = async ()=>{
            const res = await axios.get(`http://localhost:8800/server/posts?userID=${currentUser}`,{withCredentials: true,});
            setPosts(res.data);
            
        }
        getdata();
    },[])
    //update delete post
    const deletePost = (postId) =>{
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    }
    return (
        <>
        <div className="posts">
            {posts.map(post=>(
                <Post post={post} deletePost={deletePost} key={post.id} />
            ))}
        </div>
        </>
    )
}

export default Posts;

