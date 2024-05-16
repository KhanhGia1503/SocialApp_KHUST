import React from "react";
import "./Posts.css";
import Post from "../post/Post.jsx"
import { Link } from "react-router-dom";

const Posts = () => {
    return (
        <>
        <div className="posts">Posts</div>
        <Post/>
        </>
    )
}

export default Posts;