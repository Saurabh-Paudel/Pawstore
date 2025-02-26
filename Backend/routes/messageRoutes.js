const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  getMessageById,
  createMessage,
  getMessagesByEmail,
  replyToMessage,
} = require("../controller/messageController");

// Define Routes
router.get("/", getAllMessages); // Get all messages
router.get("/:id", getMessageById); // Get a message by ID
router.post("/", createMessage); // Create a new message
router.get("/email/:email", getMessagesByEmail); // Get messages by email
router.put("/:id/reply", replyToMessage); // Reply to a message

module.exports = router;
