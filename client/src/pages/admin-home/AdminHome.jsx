import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHome.css";
import Leftbar from "../../components/leftbar/Leftbar.jsx";

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/server/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="home">
      <div className="a">
        <div className="left">
          <Leftbar />
        </div>
        <div className="right">
          <h2>All Users had reported</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.email} - {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
