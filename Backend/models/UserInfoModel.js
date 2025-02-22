const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email:    { type: String, required: true },
    phone:    { type: String, required: true },
    address:  { type: String, required: true },
    gender:   { type: String, required: true },
    dob:      { type: Date,   required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("UserInfo", userSchema);

module.exports = User;
