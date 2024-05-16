import React from "react";
import "./Posts.css";
import Post from "../post/Post.jsx"
import { Link } from "react-router-dom";

const Posts = () => {
    const posts=[
        {
            id: 1,
            name: "khoi",
            userID: 1,
            profilePic:"img/dog1.jpg",
            text: "akjnkjczx asjdkn",
            img: "img/dog2.jpg"
        },
        {
            id: 2,
            name: "khoi2",
            userID: 2,
            profilePic:"img/dog3.jpg",
            text: "akjnkjczx asjdkn",
            img: "img/dog4.jpeg"
        }
    ]
    return (
        <>
        <div className="posts">
            {posts.map(post=>(
                <Post post={post} key={post.id}/>
            ))}
        </div>
        </>
    )
}

export default Posts;