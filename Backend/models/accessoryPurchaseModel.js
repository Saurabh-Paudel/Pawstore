const mongoose = require("mongoose");

const accessoryPurchaseSchema = new mongoose.Schema(
  {
    accessoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accessory",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    transactionUuid: { type: String, required: true, unique: true },
    transactionCode: { type: String },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "COMPLETE", "FAILED"],
      default: "PENDING",
    },
    quantity: { type: Number, required: true },
    color: { type: String },
    size: { type: String },
    image: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Out for Delivery", "Delivered"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AccessoryPurchase", accessoryPurchaseSchema);
