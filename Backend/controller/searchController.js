// controller/searchController.js
const Dog = require("../models/dogModel");
const Product = require("../models/productModel");

exports.searchAll = async (req, res) => {
  try {
    const searchQuery = req.query.q || "";

    const dogsPromise = Dog.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { breed: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("name breed age price image"); // 'image' is included

    const productsPromise = Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("name price description image"); // 'image' is included

    const [dogs, products] = await Promise.all([dogsPromise, productsPromise]);

    res.status(200).json({
      success: true,
      data: {
        dogs: { count: dogs.length, results: dogs },
        products: { count: products.length, results: products },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error performing search",
      error: error.message,
    });
  }
};
