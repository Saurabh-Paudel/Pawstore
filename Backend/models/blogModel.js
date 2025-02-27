const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  publishedAt: {
    type: Date,
  },
  readCount: {
    type: Number,
    default: 0,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
