import Express from "express";
import { getUser, getTest } from "../controllers/users.js";

const router = Express.Router();

router.get("/test", getTest)
router.get("/find/:userID", getUser)

export default router;