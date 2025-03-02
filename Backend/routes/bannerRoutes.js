const express = require("express");
const {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanners,
} = require("../controller/bannerController");
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");

const router = express.Router();

// Create a new banner (POST)
router.post(
  "/banners",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    // Removed image validation since it's a file, not a body field
  ],
  createBanner
);

// Update a banner (PUT)
router.put(
  "/banners/:id",
  authMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    // Removed image validation
  ],
  updateBanner
);

// Delete a banner (DELETE)
router.delete("/banners/:id", authMiddleware, deleteBanner);

// Get all banners (GET)
router.get("/banners", authMiddleware, getAllBanners);

module.exports = router;
