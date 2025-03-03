const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  getMessageById,
  createMessage,
  getMessagesByEmail,
  replyToMessage,
  deleteMessage, // Ensure deleteMessage is imported
} = require("../controller/messageController");

// Define Routes
router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.post("/", createMessage);
router.get("/email/:email", getMessagesByEmail);
router.put("/:id/reply", replyToMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
