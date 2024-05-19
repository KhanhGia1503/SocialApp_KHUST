import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUser = (req, res) => {
  const userID = req.params.userID;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `username`=?,`name`=?,`address`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";
    db.query(
      q,
      [
        req.body.username,
        req.body.name,
        req.body.address,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your profile!");
      }
    );
  });
};

export const changePassword = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { oldPassword, newPassword } = req.body;

    // Kiểm tra mật khẩu cũ có đúng không
    const q = "SELECT password FROM users WHERE id=?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      const isPasswordValid = bcrypt.compareSync(oldPassword, data[0].password);
      if (!isPasswordValid) return res.status(401).json("Invalid old password!");

      // Hash mật khẩu mới
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      // Cập nhật mật khẩu mới trong cơ sở dữ liệu
      const updateQuery = "UPDATE users SET password=? WHERE id=?";
      db.query(updateQuery, [hashedPassword, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Password has been changed successfully!");
      });
    });
  });
};
