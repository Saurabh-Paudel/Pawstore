const express = require("express");
const {
  changePassword,
  deleteAccount,
} = require("../controller/accountManagementController");
const { body } = require("express-validator");

const router = express.Router();

// Change Password Route
router.put(
  "/change-password",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required"),
  ],
  changePassword
);

// Delete Account Route
router.delete(
  "/delete-account",
  [body("userId").notEmpty().withMessage("User ID is required")],
  deleteAccount
);

module.exports = router;
