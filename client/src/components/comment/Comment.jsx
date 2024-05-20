import React from "react";
import "./Comment.css";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Comment = ({ comment, post, handleDelete }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  const [option, setOption] = useState(false);
  return (
    <div className="comment">
      <img className="profile" src={"/uploads/" + comment.profilePic} alt="" />
      <div className="info">
        <span className="username">{comment.username}</span>
        <span className="date">{moment(comment.time).fromNow()}</span>
        <p>{comment.text}</p>
      </div>
      <MoreHorizIcon onClick={() => setOption(!option)} />
      {option && post.userID === currentUser.id && (
        <button onClick={(e) => handleDelete(e, comment.id)}>Delete</button>
      )}
    </div>
  );
};

export default Comment;
