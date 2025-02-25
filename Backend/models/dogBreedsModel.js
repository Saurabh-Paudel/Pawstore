const mongoose = require("mongoose");

const DogBreedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Available", "Unavailable"],
    default: "Available",
  },
});

const DogBreed = mongoose.model("DogBreed", DogBreedSchema);

module.exports = DogBreed;
