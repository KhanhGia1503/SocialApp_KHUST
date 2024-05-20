import React, { useState, useEffect } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import Comments from "../comment/Comments.jsx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import axios from "axios";
import ConfirmModal from "./ConfirmModal.jsx";

const Post = ({ post, deletePost }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  //delete post
  const [option, setOption] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8800/server/posts/${post.id}`, {
      withCredentials: true,
    });
    deletePost(post.id);
    setShowModal(false);
  };

  //like
  const [amount, setAmount] = useState("");
  const [userLike, setUserLike] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get(
        `http://localhost:8800/server/likes/?postID=${post.id}`,
        { withCredentials: true }
      );
      setAmount(res.data.length);
      setUserLike(res.data);
    };
    getdata();
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();
    if (userLike.includes(currentUser.id)) {
      await axios.delete(
        `http://localhost:8800/server/likes?postID=${post.id}`,
        { withCredentials: true }
      );
      const newUserLike = userLike.filter((user) => user !== currentUser.id);
      setUserLike(newUserLike);
    } else {
      await axios.post(
        `http://localhost:8800/server/likes/`,
        { postID: post.id },
        { withCredentials: true }
      );
      const newUserLike = [...userLike, currentUser.id];
      setUserLike(newUserLike);
    }
  };

  //comment
  const [comment, setComment] = useState(false);

  return (
    <div className="post">
      <div className="user">
        <div className="left">
          <img
            className="profilePic"
            src={`uploads/${post.profilePic}`}
            alt="Profile"
          />
          <div className="name_date">
            <div className="username">{post.username}</div>
            <span className="date">{moment(post.time).fromNow()}</span>
          </div>
        </div>
        <div>
          <MoreHorizIcon onClick={() => setOption(!option)} />
          {option && post.userID === currentUser.id && (
            <button className="delete" onClick={() => setShowModal(true)}>
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="cap_img">
        <div className="caption">{post.text}</div>
        <img className="image" src={`uploads/${post.img}`} alt="" />
      </div>
      <div className="interact">
        <div className="react">
          {userLike.includes(currentUser.id) ? (
            <FavoriteIcon style={{ color: "red" }} onClick={handleLike} />
          ) : (
            <FavoriteBorderIcon onClick={handleLike} />
          )}
        </div>
        <div
          className="commenticon"
          onClick={() => {
            setComment(!comment);
          }}
        >
          <CommentIcon />
          Comment
        </div>
      </div>
      <div className="amount">{amount} Likes</div>
       {comment && <Comments post={post} />}
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Post;
