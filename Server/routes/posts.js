import Express from "express";
import { getPosts, addPost, delPost } from "../controllers/posts.js";

const router = Express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", delPost);

export default router;