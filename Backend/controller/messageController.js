const Message = require("../models/messageModel");

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a message by ID
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = new Message({
    name,
    email,
    message,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get messages by email
const getMessagesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const messages = await Message.find({ email });

    if (messages.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this email" });
    }

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reply to a message
const replyToMessage = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.reply = reply;
    await message.save();
    res.json({ message: "Reply added successfully", message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  getMessagesByEmail,
  replyToMessage,
  deleteMessage,
};
