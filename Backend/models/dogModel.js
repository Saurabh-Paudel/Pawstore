const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  price: { type: Number, required: true },
  age: { type: Number, required: true },
  vaccinated: { type: String, enum: ["Yes", "No"], required: true },
  description: { type: String, required: true },
  image: { type: String },
  status: { type: String, enum: ["Available", "Sold"], default: "Available" },
});

module.exports = mongoose.model("Dog", DogSchema);
