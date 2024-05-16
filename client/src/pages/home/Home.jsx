import React from "react";
import "./Home.css"
import Navbar from "../../components/navbar/navbar.jsx";
import Leftbar from "../../components/leftbar/Leftbar.jsx";
import CreatePost from "../../components/createPost/CreatePost.jsx";
import Posts from "../../components/posts/Posts.jsx";

const Home =() => {
    return(
        <div className="home">
            <Navbar/>
            <div className="a">
                <Leftbar/>
                <div className="mid">
                    <CreatePost/>
                    <Posts/>
                </div>
            </div>
            
            
        </div>

    )
};

export default Home;