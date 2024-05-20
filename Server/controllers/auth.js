import { db } from "../connect.js";
import bcrypt from "bcryptjs"; //thu vien de Hass password
import jwt from "jsonwebtoken";
import mailService from "../services/emailServies.js";

import crypto from "crypto";
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
      "INSERT INTO users (`username`,`email`,`password`,`name`, `gender`, `birthday`, `role`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
      req.body.gender,
      req.body.birthday,
      "user",
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
    const token = jwt.sign({ id: data[0].id, role: data[0].role }, "secretkey");

    const { password, ...others } = data[0]; // Loại bỏ mật khẩu từ dữ liệu người dùng

    // Điều hướng người dùng tùy thuộc vào vai trò của họ
    if (data[0].role === "user") {
      // Điều hướng người dùng đến trang dành cho người dùng
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json(others);
      // .redirect("/dashboard"); // Điều hướng đến trang dashboard của người dùng
    } else if (data[0].role === "admin") {
      // Điều hướng người dùng đến trang dành cho admin
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json(others)
        .redirect("/admindashboard"); // Điều hướng đến trang dashboard của admin
    } else {
      // Nếu không có vai trò nào khớp, trả về lỗi
      return res.status(403).json({ error: "Unauthorized role!" });
    }
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

  // User.findOne({ where: { email: req.body.email } })
  //   .then((user) => {
  //     if (!user) {
  //       return res.status(400).json();
  //     }
  //     console.log(user);
  //     crypto.randomBytes(32, (err, buf) => {
  //       if (err) {
  //         res.status(400).json();
  //       }
  //       const token = buf.toString("hex");
  //       user.resetToken = token;
  //       user.resetTokenExpiration = Date.now() + 3600000;
  //       user.save().then((result) => {
  //         mailService({
  //           from: '" Mạng xã hội  👻" <duongkhanhb1k39@gmail.com>', // sender address
  //           to: user.email,
  //           subject: "Đặt lại mật khẩu",
  //           text: "Hello world?",
  //           html: `<b>Vào <a href = "http://localhost:3000/reset/${token}"> link </a> sau để đặt lại mật khẩu?</b>`, // html body})
  //         }).then(() => {
  //           res.status(201).json();
  //         });
  //       });
  //     });
  //   })

  //   .catch((err) => {
  //     // console.log(err);
  //   });
};
