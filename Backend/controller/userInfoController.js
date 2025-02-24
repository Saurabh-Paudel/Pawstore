const User = require("../models/userInfoModel");

// Insert User
const insertUser = async (req, res) => {
  const { username, email, phone, address, gender, dob } = req.body;
  try {
    // Optionally check if a user already exists with this email:
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, email, phone, address, gender, dob });
    await newUser.save();
    console.log("Inserted user:", newUser);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { email } = req.params;
  const { username, phone, address, gender, dob } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { username, email, phone, address, gender, dob },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Get User by Email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Fetched user:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

module.exports = { insertUser, updateUser, getUserByEmail };
