const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Banner name is required"],
      trim: true,
    },
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
      type: String,
      required: [true, "Banner image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
