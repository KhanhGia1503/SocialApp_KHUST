import React from "react";
import "./Comment.css"
import { useState,useEffect } from "react";
import moment from "moment";
import axios from "axios";

const Comment = ({postId})=>{
    const [comments, setComments] = useState([]);
    useEffect(()=>{
        const getcomments = async ()=>{
            const res = await axios.get(`http://localhost:8800/server/comments?postID=${postId}`,{withCredentials: true,});
            setComments(res.data);
        }
        getcomments();
    },[])

    return (
      <div>
        {comments.map((comment) => (
          <div className="comment">
            <img className="profile" src={"/uploads/" + comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.username}</span>
              <p>{comment.text}</p>
            </div>
            <span className="date">{moment(comment.time).fromNow()}</span>
          </div>
        ))}
      </div>
    );
};

export default Comment;