import express from "express";
import { changePassword, getUser , updateUser} from "../controllers/users.js";

const router = express.Router();

router.get("/find/:userID", getUser);
router.put("/update", updateUser);
router.put("/change-password", changePassword);

export default router;