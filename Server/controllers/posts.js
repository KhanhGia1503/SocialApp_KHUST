import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userID = req.query.userID;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userID);

    const q =
      userID !== "undefined"
        ? `SELECT p.*, u.id AS userID, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userID) WHERE p.userID = ? ORDER BY p.time DESC`
        : `SELECT p.*, u.id AS userID, username, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userID)
    LEFT JOIN relationships AS r ON (p.userID = r.followedUserID) WHERE r.followerUserID= ? OR p.userID =?
    ORDER BY p.time DESC`;

    const values =
      userID !== "undefined" ? [userID] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`text`, `img`, `time`, `userID`) VALUES (?)";
    const values = [
      req.body.text,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.insertId);
    });
  });
};

export const delPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM posts WHERE `id`=? AND `userID` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post")
    });
  });
};