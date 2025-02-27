const Blog = require("../models/blogModel");
const fs = require("fs");
const path = require("path");

// Insert a new blog
exports.insertBlog = async (req, res) => {
  try {
    const { title, description, tags, author, status } = req.body;

    if (!title || !description || !tags || !author) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    let imagePath = "";
    if (req.files && req.files.image) {
      const image = req.files.image;
      const uploadDir = path.join(__dirname, "../../client/public/BlogImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}_${image.name}`;
      const fullPath = path.join(uploadDir, fileName);

      await image.mv(fullPath);
      imagePath = `/BlogImages/${fileName}`;
    }

    const tagsArray = Array.isArray(tags)
      ? tags.map((tag) => tag.trim())
      : tags.split(",").map((tag) => tag.trim());

    const newBlog = new Blog({
      title,
      description,
      tags: tagsArray,
      author,
      status: status || "Draft",
      image: imagePath || null,
      publishedAt: status === "Published" ? Date.now() : null,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, tags, author, status } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let imagePath = blog.image;
    if (req.files && req.files.image) {
      const image = req.files.image;
      const uploadDir = path.join(__dirname, "../../client/public/BlogImages");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}_${image.name}`;
      const fullPath = path.join(uploadDir, fileName);

      await image.mv(fullPath);
      imagePath = `/BlogImages/${fileName}`;

      if (blog.image) {
        const oldImagePath = path.join(
          __dirname,
          "../../client/public",
          blog.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const tagsArray = tags
      ? Array.isArray(tags)
        ? tags.map((tag) => tag.trim())
        : tags.split(",").map((tag) => tag.trim())
      : blog.tags;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: title || blog.title,
        description: description || blog.description,
        tags: tagsArray,
        author: author || blog.author,
        status: status || blog.status,
        image: imagePath,
        updatedAt: Date.now(),
        publishedAt:
          status === "Published" && !blog.publishedAt
            ? Date.now()
            : blog.publishedAt,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.image) {
      const imagePath = path.join(__dirname, "../../client/public", blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
