const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const UserInfo = require("../models/userInfoModel");

// Change Password
const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Account
const deleteAccount = async (req, res) => {
  const { userId, email } = req.body;

  try {
    // Delete user from userModel (users collection)
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Also delete the user from userInfoModel (userInfo collection) by email
    const userInfo = await UserInfo.findOneAndDelete({ email });
    if (!userInfo) {
      console.error("User information not found in userInfoModel");
    }

    res
      .status(200)
      .json({ message: "Account and associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { changePassword, deleteAccount };
