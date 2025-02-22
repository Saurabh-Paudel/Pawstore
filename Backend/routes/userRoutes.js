const express = require("express");
const { signup, login } = require("../controller/userController");
const { body } = require("express-validator");

const router = express.Router();

// Signup route with validations
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  signup
);

// Login route
router.post("/login", login);


module.exports = router;
