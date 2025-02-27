const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");

// Insert a new product
exports.insertProduct = async (req, res) => {
  try {
    const { name, price, stockStatus, description, colors, sizes } = req.body; // Change "status" to "stockStatus" and "size" to "sizes"

    if (
      !name ||
      !price ||
      !stockStatus || // Change "status" to "stockStatus"
      !colors ||
      !sizes || // Change "size" to "sizes"
      !req.files ||
      !req.files.image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imagePath = "";

    // Handle image upload
    if (req.files.image) {
      let image = req.files.image;
      const uploadDir = path.join(
        __dirname,
        "../../client/public/ProductImages"
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}_${image.name}`;
      const fullPath = path.join(uploadDir, fileName);

      await image.mv(fullPath);

      imagePath = `/ProductImages/${fileName}`;
    }

    const newProduct = new Product({
      name,
      price,
      stockStatus, // Change "status" to "stockStatus"
      description,
      colors: Array.isArray(colors) ? colors : [colors],
      sizes: Array.isArray(sizes) ? sizes : [sizes], // Change "size" to "sizes"
      image: imagePath,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Detailed error:", error); // Add more detailed logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stockStatus, description, colors, sizes } = req.body;
    let imagePath = "";

    if (req.files && req.files.image) {
      const image = req.files.image;
      const uploadDir = path.join(
        __dirname,
        "../../client/public/ProductImages"
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const fileName = `${Date.now()}_${image.name}`;
      const fullPath = path.join(uploadDir, fileName);
      await image.mv(fullPath);
      imagePath = `/ProductImages/${fileName}`;
    }

    const updatedData = {
      name,
      price,
      stockStatus,
      description,
      colors: Array.isArray(colors) ? colors : [colors],
      sizes: Array.isArray(sizes) ? sizes : [sizes],
    };

    if (imagePath) {
      updatedData.image = imagePath; // Only update image if a new one is uploaded
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
