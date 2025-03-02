const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
