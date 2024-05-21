import React from "react";
import "./Posts.css";
import Post from "../post/Post.jsx"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Posts = ({ posts, setPosts, home }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("chat-user"))
      );
    useEffect(()=>{
        const getdata = async ()=>{
            if(home===true){
                const res = await axios.get(`http://localhost:8800/server/posts?`,{withCredentials: true,});
                setPosts(res.data);
            }
            else {const res = await axios.get(`http://localhost:8800/server/posts?userID=${currentUser.id}`,{withCredentials: true,});
            setPosts(res.data);}
            
            
            
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

