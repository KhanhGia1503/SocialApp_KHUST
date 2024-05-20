import { useEffect, useState } from "react";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = ({ addNewPost, user }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-user"))
  );
  const handle = async (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      alert("Caption is required");
      return;
    }

    // const login = await axios.post("http://localhost:8800/server/auth/login", {
    //    "email": "emailgia@gmail.com",
    //    "password": "a12345"
    //  },{withCredentials: true,});
    let img_url = "";
    if (file) {
      const img_form = new FormData();
      img_form.append("file", file);
      const uploadImg = await axios.post(
        "http://localhost:8800/server/upload",
        img_form
      );
      img_url = uploadImg.data;
    }
    const postdata = { text: caption, img: img_url };
    const post = await axios.post(
      "http://localhost:8800/server/posts",
      postdata,
      { withCredentials: true }
    );
    const fullNewPost = {
      ...postdata,
      userID: currentUser.id,
      id: post.data,
      username: user.username,
      profilePic: user.profilePic,
    };
    console.log(fullNewPost);
    addNewPost(fullNewPost);
    setCaption("");
    setFile(null);
    img_url = "";
  };
  return (
    <div className="create">
      <form action="">
        <input
          type="text"
          placeholder="How are you feeling?"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        <div className="bot">
          <div className="file-upload">
          <input id="fileInput" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="fileInput" className="file-upload-label">
            Upload Image
          </label>
          </div>
          <button onClick={handle}>Post</button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
