import React from "react";
import "./Comment.css";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Comment = ({ post }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
      );
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getcomments = async () => {
      const res = await axios.get(
        `http://localhost:8800/server/comments?postID=${post.id}`,
        { withCredentials: true }
      );
      setComments(res.data);
    };
    getcomments();
  }, []);

  //create comment
  const [text, setText] = useState("");
  const handleClick = async(e) =>{
    e.preventDefault();
      const id = await axios.post(`http://localhost:8800/server/comments/`,{ text: text,postID: post.id},{withCredentials: true,});
      const newComment = { text: text,postID: post.id, profilePic: post.profilePic, userID:currentUser,
        username: post.username, id: id.data
       };
      setComments([newComment,...comments]);
  
  }
  //delete comment
  const [option, setOption] = useState(false);
  const handleDelete = async(e,id) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8800/server/comments/${id}`,{withCredentials: true,});
    setComments(comments.filter((comment) => comment.id !== id));

  }

  return (
    <div>
      <div className="write">
        <img src={"/uploads/" + post.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img
            className="profile"
            src={"/uploads/" + comment.profilePic}
            alt=""
          />
          <div className="info">
            <span>{comment.username}</span>
            <p>{comment.text}</p>
          </div>
          <MoreHorizIcon onClick={() => setOption(!option)} />
          {option && post.userID === currentUser && (
            <button onClick={(e) => handleDelete(e, comment.id)}>Delete</button>
          )}
          <span className="date">{moment(comment.time).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comment;
