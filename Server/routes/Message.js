import express from "express";
const router = express.Router();
import {
  sendMessage,
  getConversations,
  getMessages,
  findConversationByUserName,
} from "../controllers/Message.js";

router.post("/send/:userId", sendMessage);
router.get("/conversations", getConversations);

router.get("/:conversationId", getMessages);
router.post("/get/:username", findConversationByUserName);
export default router;
