const express = require("express");
const User = require("../models/userModel"); // Corrected import
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create and save a new user
    const newUser = await User.create({ name, email, password, role });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = router;
