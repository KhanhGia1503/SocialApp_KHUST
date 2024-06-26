import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userID, username, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userID)
    WHERE c.postID = ? ORDER BY c.time DESC`;

  db.query(q, [req.query.postID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments(`text`, `time`, `userID`, `postID`) VALUES (?)";
    const values = [
      req.body.text,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postID
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.insertId);
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentID = req.params.id;
    const q = "DELETE FROM comments WHERE `id` = ? AND `userID` = ?";

    db.query(q, [commentID, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  });
};
