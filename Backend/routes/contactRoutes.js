const express = require("express");
const {
  updateContact,
  getContact,
} = require("../controller/contactController");
const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");

const router = express.Router();

// Update contact info (POST)
router.post(
  "/contact",
  authMiddleware,
  [
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  updateContact
);

// Get contact info (GET)
router.get("/contact", authMiddleware, getContact);

module.exports = router;
