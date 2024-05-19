import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment";
const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="user">
        <img className="profilePic" src={`uploads/${post.profilePic}`} />
        <div className="username">{post.username}</div>
        <span className="date">{moment(post.time).fromNow()}</span>
      </div>
      <div className="caption">{post.text}</div>
      <img className="image" src={`uploads/${post.img}` } alt=""/>
      <div className="interact">
        <div className="react">
          <FavoriteBorderIcon />
          Like
        </div>
        <div className="commenticon">
          <CommentIcon />
          Comment
        </div>
      </div>
      <div className="amount"> </div>
    </div>
  );
};

export default Post;
