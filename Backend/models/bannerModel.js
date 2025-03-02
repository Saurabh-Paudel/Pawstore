const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Banner title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Banner description is required"],
      trim: true,
    },
    image: {
      type: String, // Store image URL or path
      required: [true, "Banner image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
