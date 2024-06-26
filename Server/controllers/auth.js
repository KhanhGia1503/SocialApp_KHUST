import express from 'express';
import { db } from "../connect.js";
import bcrypt from "bcryptjs"; //thu vien de Hass password
import jwt from "jsonwebtoken";
import mailService from "../services/emailServies.js";
import crypto from "crypto";

const app = express();

// Serve static files from the "public" directory
app.use('/public-images', express.static('public'));

export const register = (req, res) => {
  //Kiem tra email da duoc su dung hay chua
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res.status(409).json("Email has already been existed!");

    //Kiem tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    //Kiem tra mat khau
    if (req.body.password.length < 6 || !/[a-zA-Z]/.test(req.body.password)) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters long and contain at least one letter!",
      });
    }

    //Tao nguoi dung moi
    //Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`, `gender`, `birthday`, `role`, `profilePic`, `coverPic`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.gender,
      req.body.birthday,
      "user",
      "/public-images/default-profile.jpg",
      "/public-images/default-cover.png"
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ error: "Email not found!" });

    // Kiểm tra xem người dùng có bị khóa không
    if (data[0].locked)
      return res.status(403).json({ error: "User is locked!" });

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json({ error: "Wrong password or email!" });

    // Tạo token JWT với vai trò của người dùng
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0]; // Loại bỏ mật khẩu từ dữ liệu người dùng

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
export const postResetPassWord = (req, res, next) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Kiểm tra xem người dùng có bị khóa không
    if (data[0].locked) {
      return res.status(403).json({ error: "User is locked!" });
    }
    const user = data[0];
    console.log(user);
    crypto.randomBytes(32, (err, buf) => {
      if (err) {
        res.status(400).json();
      }
      const token = buf.toString("hex");
      user.resetToken = token;

      user.resetTokenExpiration = Date.now() + 3600000;
      console.log(user);
      const updateQuery =
        "UPDATE users SET resetToken = ?, resetTokenExpiration = ? WHERE email = ?";
      db.query(
        updateQuery,
        [user.resetToken, user.resetTokenExpiration, user.email],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          mailService({
            from: '" Mạng xã hội  👻" <duongkhanhb1k39@gmail.com>', // sender address
            to: user.email,
            subject: "Đặt lại mật khẩu",
            text: "Hello world?",
            html: `<b>Vào <a href = "http://localhost:3000/reset/${token}"> link </a> sau để đặt lại mật khẩu?</b>`, // html body})
          }).then(() => {
            res.status(201).json({
              message: "Reset token generated and saved!",
              resetToken: token,
            });
          });
        }
      );
    });
  });
};
export const postChangePassWord = (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(400).json({ error: "Reset token is not provided" });
  }
  const findUserQuery = "SELECT * FROM users WHERE resetToken = ?";
  db.query(findUserQuery, [token], (err, results) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    if (results.length === 0) {
      res.status(400).json({ error: "Reset token is invalid " });
      return;
    }

    const user = results[0];
    console.log(user);
    const userId = user.id;
    if (user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ erroe: "Token has expired" });
    }
    // Query to update the user's password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
    db.query(updatePasswordQuery, [hashedPassword, userId], (err, result) => {
      if (err) {
        res.status(400).json({ error: err });

        return;
      }
      return res.status(200).json("Success");
    });
  });
};
