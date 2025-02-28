const mongoose = require("mongoose");

const dogPurchaseSchema = new mongoose.Schema({
  dogId: { type: mongoose.Schema.Types.ObjectId, ref: "Dog", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  transactionUuid: { type: String, required: true, unique: true },
  transactionCode: { type: String },
  status: { type: String, enum: ["PENDING", "COMPLETE", "FAILED"], default: "PENDING" },
  age: { type: String, required: true },
  vaccinated: { type: String, required: true },
  image: { type: String, required: true },
  breed: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("DogPurchase", dogPurchaseSchema);
