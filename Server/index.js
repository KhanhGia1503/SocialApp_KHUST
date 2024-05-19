import Express from "express";
const app = Express();

import UsersRoutes from "./routes/users.js"
import PostsRoutes from "./routes/posts.js"
import CommentsRoutes from "./routes/comments.js"
import LikesRoutes from "./routes/likes.js"
import ReportsRoutes from "./routes/reports.js"
import AuthRoutes from "./routes/auth.js"
import RelationshipRoutes from "./routes/relationships.js";

import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";
import { db } from "./connect.js"

//middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(Express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);//giao tiếp tài nguyên
app.use(cookieParser());//đọc các cookie từ người dùng

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../Client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/server/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});


app.use("/server/users", UsersRoutes);
app.use("/server/posts", PostsRoutes);
app.use("/server/comments", CommentsRoutes);
app.use("/server/likes", LikesRoutes);
app.use("/server/relationships", RelationshipRoutes);
app.use("/server/reports", ReportsRoutes);
app.use("/server/auth", AuthRoutes);

app.listen(8800, () => {
    console.log("Server is working!!!");
    db.connect(function (err) {
        if (err) console.log(err);
        else console.log("Database is ok!!!");
    })
});