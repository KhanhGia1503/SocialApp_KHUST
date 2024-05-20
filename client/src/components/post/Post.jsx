import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment.jsx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from "@mui/icons-material/Comment";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
const Post = ({ post, deletePost }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  //delete post
  const [option, setOption] = useState(false);
  const handleDelete = async(e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8800/server/posts/${post.id}`,{withCredentials: true,});
    deletePost(post.id);
  }

  //like
  const [amount, setAmount] = useState("");
  const [userLike, setUserLike] = useState([]);
  useEffect(()=>{
    const getdata = async ()=>{
        const res = await axios.get(`http://localhost:8800/server/likes/?postID=${post.id}`,{withCredentials: true,});
        setAmount(res.data.length);
        setUserLike(res.data);
    }
    getdata();
},[])

const handleLike = async(e) =>{
  e.preventDefault();
  if(userLike.includes(currentUser)){
    await axios.delete(`http://localhost:8800/server/likes?postID=${post.id}`,{withCredentials: true,});
    const newUserLike = userLike.filter(user => user !== currentUser);
    setUserLike(newUserLike);
    
  }
  else {
    await axios.post(`http://localhost:8800/server/likes/`,{ postID: post.id},{withCredentials: true,});
    const newUserLike = [...userLike, currentUser];
    setUserLike(newUserLike);

  }
}
//comment
const [comment, setComment] = useState(false);

  return (
    <div className="post">
      <div className="user">
        <img className="profilePic" src={`uploads/${post.profilePic}`} />
        <div className="username">{post.username}</div>
        <span className="date">{moment(post.time).fromNow()}</span>
        <MoreHorizIcon onClick={() => setOption(!option)} />
          {option && post.userID === currentUser && (
            <button onClick={handleDelete}>Delete</button>
          )}
      </div>
      <div className="caption">{post.text}</div>
      <img className="image" src={`uploads/${post.img}`} alt="" />
      <div className="interact">
        <div className="react">
          {userLike.includes(currentUser)?
          (<FavoriteIcon style={{ color: "red" }} onClick={handleLike}/> )
          : (<FavoriteBorderIcon onClick={handleLike}/>) }
        </div>
        <div className="commenticon" onClick={()=>{setComment(!comment)}}>
          <CommentIcon />
          Comment
        </div>
      </div>
      <div className="amount">
        {amount}
        Likes
      </div>
      <div className="cmtComponent"> {comment && <Comment post={post} />}</div>
    </div>
  );
};

export default Post;
