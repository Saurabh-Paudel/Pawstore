const express = require("express");
const router = express.Router();
const {
  insertBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

router.post("/insert", insertBlog);
router.get("/get", getAllBlogs);
router.get("/get/:id", getBlogById);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
