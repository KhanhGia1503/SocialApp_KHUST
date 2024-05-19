import express from "express";
import { getReports, addReport, deleteReport } from "../controllers/reports.js";

const router = express.Router();

router.get("/", getReports);
router.post("/", addReport);
router.delete("/", deleteReport);

export default router;