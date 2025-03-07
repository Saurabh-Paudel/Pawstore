import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InsertPetProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    status: "In Stock",
    description: "",
    colors: [],
    sizes: [],
    image: null,
    imageFile: null, // Added to handle actual file
  });

  const [colorInput, setColorInput] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: URL.createObjectURL(file), // Preview
        imageFile: file, // Actual file to send
      }));
    }
  };

  // Add color
  const handleAddColor = () => {
    if (colorInput.trim() !== "" && !product.colors.includes(colorInput)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: [...prevProduct.colors, colorInput],
      }));
      setColorInput("");
    }
  };

  // Remove color
  const handleRemoveColor = (color) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.filter((c) => c !== color),
    }));
  };

  // Add or remove size
  const handleToggleSize = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.includes(size)
        ? prevProduct.sizes.filter((s) => s !== size)
        : [...prevProduct.sizes, size],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stockStatus", product.status);
      formData.append("description", product.description);
      product.colors.forEach((color) => formData.append("colors", color));
      product.sizes.forEach((size) => formData.append("sizes", size)); // Already correct
      formData.append("image", product.imageFile);

      await axios.post(`${BACKEND_URL}/api/products/insert`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      navigate("/admin/pet-products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  // Close modal
  const handleClose = () => {
    navigate("/admin/pet-products");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-lg text-red-600 hover:text-red-900 focus:outline-none"
      >
        <FaTimes />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Add New Pet Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Price (Rs.)
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Colors */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Colors</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              placeholder="Enter color"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full flex items-center"
              >
                {color}
                <button
                  type="button"
                  onClick={() => handleRemoveColor(color)}
                  className="ml-2 text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Available Sizes
          </label>
          <div className="flex flex-wrap gap-3">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={product.sizes.includes(size)}
                  onChange={() => handleToggleSize(size)}
                  className="h-5 w-5 text-blue-600"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Product Image */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="p-4 border border-gray-300 rounded-lg"
          />
          {product.imageFile && (
            <img
              src={URL.createObjectURL(product.imageFile)}
              alt="Product Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Submit & Close Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertPetProduct;
