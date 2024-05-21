import express from "express";
import admin, { createAdmin } from "../controllers/admin.js";

const router = express.Router();

createAdmin();
router.put("/lock/:userID", admin.isAdmin, admin.lockUser);

export default router;