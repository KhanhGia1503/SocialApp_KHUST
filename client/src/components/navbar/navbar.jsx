import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar =() => {
    return (
        <div className="Navbar">
            <div className="left">
                <Link to="/">Home</Link>
            </div>
            <div className="right">
            <select>
                 <option value="someOption">User</option>
                 <option value="otherOption">Profile</option>
                 <option value="otherOption">Log out</option>
            </select>
            </div>
            
        </div>
    )
};
export default Navbar;