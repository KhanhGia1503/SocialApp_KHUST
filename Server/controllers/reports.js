import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getReports = (req,res)=>{
    const q = "SELECT userID FROM reports WHERE postID = ?";

    db.query(q, [req.query.postID], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(report=>report.userID));
    });
}

export const addReport = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`userID`,`postID`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postID
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been reported.");
    });
  });
};

export const deleteReport = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `userID` = ? AND `postID` = ?";

    db.query(q, [userInfo.id, req.query.postID], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been unreported.");
    });
  });
};