import express from "express";
const router = express.Router();
import {
  sendMessage,
  getConversations,
  getMessages,
  findConversationByUserId,
} from "../controllers/Message.js";

router.post("/send/:userId", sendMessage);
router.get("/conversations", getConversations);

router.get("/:conversationId", getMessages);
// router.post("/get/:username", findConversationByUserName);
router.get("/get/:userId", findConversationByUserId);

export default router;
