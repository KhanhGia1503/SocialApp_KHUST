import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="user">
        <img className="profilePic" src={post.profilePic} />
        <div className="username">{post.name}</div>
      </div>
      <div className="caption">{post.text}</div>
      <img className="image" src={post.img} />
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
    </div>
  );
};

export default Post;
