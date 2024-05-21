import { db } from "../connect.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 

export const createAdmin = () => {
  const q = "SELECT * FROM users WHERE role = 'admin'";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error checking admin existence:", err);
      return;
    }
    if (data.length === 0) {
      // Chưa có người dùng admin, tạo một người dùng admin mới
      const hashedPassword = bcrypt.hashSync("admin123", 10); // Hash mật khẩu
      const adminValues = [
        "Admin",
        "admin@gmail.com",
        hashedPassword,
        "Admin",
        "gender",
        "2003-03-15",
        "admin",
        "/public-images/default-profile.jpg",
        "/public-images/default-cover.png"
      ];
      const insertAdminQuery =
        "INSERT INTO users (`username`,`email`,`password`,`name`, `gender`, `birthday`, `role`, `profilePic`, `coverPic`) VALUES (?)";
      db.query(insertAdminQuery, [adminValues], (err, result) => {
        if (err) {
          console.error("Error creating admin:", err);
          return;
        }
        console.log("Admin user created successfully.");
      });
    }
  });
};

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
  const lock = req.body.lock;
  const q = "UPDATE users SET locked=? WHERE id=?";

  db.query(q, [lock, userID], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) {
      const message = lock ? "User locked!" : "User unlocked!";

      // Đăng xuất người dùng nếu họ đang đăng nhập
      if (lock) {
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            return res.status(200).json(message);
          }
        });
      } else {
        return res.status(200).json(message);
      }
    }
    return res.status(404).json("User not found!");
  });
};

export default { isAdmin, lockUser };
