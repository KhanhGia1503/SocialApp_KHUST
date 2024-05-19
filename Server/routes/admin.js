import express from "express";
import admin from "../controllers/admin.js";

const router = express.Router();

router.put("/lock/:userID", admin.isAdmin, admin.lockUser);

export default router;