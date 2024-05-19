import {db} from "../connect.js"
import jwt from "jsonwebtoken";

// Middleware để kiểm tra quyền admin
const isAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (userInfo.role !== "admin") return res.status(403).json("You are not authorized!");
    next();
  });
};

export const lockUser = (req, res) => {
    const userID = req.params.userID;
    const { lock } = req.body;  // lock = 1 để khóa, lock = 0 để mở khóa
    const q = "UPDATE users SET locked=? WHERE id=?";
  
    db.query(q, [lock, userID], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        const message = lock ? "User locked!" : "User unlocked!";
        return res.status(200).json(message);
      }
      return res.status(404).json("User not found!");
    });
  };
  
  export default { isAdmin, lockUser };
