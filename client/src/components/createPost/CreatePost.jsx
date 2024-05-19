import { useState } from "react";
import { currentUser } from "../../auth/auth";
import axios from "axios";

const CreatePost = ({ addNewPost,user }) => {
   const [caption,setCaption] = useState("");
   const [file, setFile] = useState(null);
   const handle = async (e) => {

      e.preventDefault();
      
      // const login = await axios.post("http://localhost:8800/server/auth/login", {
      //    "email": "emailgia@gmail.com",
      //    "password": "a12345"
      //  },{withCredentials: true,});
      let img_url ="";
      if(file){
      const img_form = new FormData();
      img_form.append("file",file);
      const uploadImg = await axios.post("http://localhost:8800/server/upload", img_form);
      img_url = uploadImg.data;
      }
      const postdata = {text:caption,img:img_url};
      const post = await axios.post("http://localhost:8800/server/posts",postdata,{withCredentials: true,});
      const fullNewPost = {...postdata, username: user.username, profilePic:user.profilePic }
      addNewPost(fullNewPost);
   }
  return (
    <div className="createpost">
      <form action="">
      <input type="text" onChange={(e)=>{setCaption(e.target.value)}}/>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
      <button onClick={handle}>Post</button>
      </form>
    </div>
  );
};
export default CreatePost;
