const mongoose = require("mongoose");

const DogPurchaseSchema = new mongoose.Schema(
  {
    dogId: { type: mongoose.Schema.Types.ObjectId, ref: "Dog", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    transactionUuid: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    vaccinated: { type: Boolean, required: true },
    image: { type: String, required: true },
    breed: { type: String, required: true },
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETE", "FAILED"],
      default: "PENDING",
    },
    deliveryStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Out for Delivery", "Delivered"],
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DogPurchase", DogPurchaseSchema);
