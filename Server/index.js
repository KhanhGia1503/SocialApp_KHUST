import Express from "express";
const app = Express();

import UsersRoutes from "./routes/users.js"
import PostsRoutes from "./routes/posts.js"
import CommentsRoutes from "./routes/comments.js"
import LikesRoutes from "./routes/likes.js"
import AuthRoutes from "./routes/auth.js"
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import {db} from "./connect.js"

//middleware
app.use(Express.json());
app.use(cors());//giao tiếp tài nguyên
app.use(cookieParser());//đọc các cookie từ người dùng

app.use("/server/users", UsersRoutes);
app.use("/server/posts", PostsRoutes);
app.use("/server/comments", CommentsRoutes);
app.use("/server/likes", LikesRoutes);
app.use("/api/relationships", relationshipRoutes);

app.use("/server/auth", AuthRoutes);

app.listen(8800, ()=>{
    console.log("Server is working!!!");
    db.connect(function(err){
        if(err) console.log(err);
        else console.log("Database is ok!!!");
    })
});