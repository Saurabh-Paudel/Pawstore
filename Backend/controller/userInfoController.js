const User = require("../models/userInfoModel");

// Insert User
const insertUser = async (req, res) => {
  const { username, email, phone, address, gender, dob } = req.body;

  try {
    const newUser = new User({ username, email, phone, address, gender, dob });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Get User by email
const getUserByEmail = async (req, res) => {
  const { email } = req.params; // Get email from request params

  try {
    // Use the `findOne` method to search by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

module.exports = { insertUser, updateUser, getUserByEmail };
