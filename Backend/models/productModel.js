const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  colors: { type: [String], required: true }, 
  sizes: { type: [String], required: true },
  stockStatus: {
    type: String,
    required: true,
    enum: ["In Stock", "Out of Stock"],
  }, // Product stock status
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
