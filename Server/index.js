import Express from "express";
import { app, server } from "./socket/socket.js";

import protectRoute from "./middlewares/ProtectRoute.js";
import messageRoute from "./routes/Message.js";
import UsersRoutes from "./routes/users.js";
import AdminRoutes from "./routes/admin.js";
import PostsRoutes from "./routes/posts.js";
import CommentsRoutes from "./routes/comments.js";
import LikesRoutes from "./routes/likes.js";
import ReportsRoutes from "./routes/reports.js";
import AuthRoutes from "./routes/auth.js";
import RelationshipRoutes from "./routes/relationships.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./connect.js";
import multer from "multer";

//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
); //giao tiếp tài nguyên
app.use(cookieParser()); //đọc các cookie từ người dùng
//setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/server/upload", upload.single("file"), (req, res) => {
  res.status(200).json(req.file.filename);
});
app.use("/server/auth", AuthRoutes);
app.use(protectRoute);
app.use("/server/users", UsersRoutes);
app.use("/server/admin", AdminRoutes);
app.use("/server/posts", PostsRoutes);
app.use("/server/comments", CommentsRoutes);
app.use("/server/likes", LikesRoutes);
app.use("/server/relationships", RelationshipRoutes);
app.use("/server/reports", ReportsRoutes);
app.use("/message", messageRoute);
server.listen(8800, () => {
  console.log("Server is working!!!");
  db.connect(function (err) {
    if (err) console.log(err);
    else console.log("Database is ok!!!");
  });
});
