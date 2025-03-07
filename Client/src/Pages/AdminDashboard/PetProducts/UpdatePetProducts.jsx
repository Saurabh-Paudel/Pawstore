import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const UpdatePetProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stockStatus: "In Stock",
    description: "",
    colors: [],
    sizes: [],
    imageFile: null, // Only for new file upload
  });

  const [previewImage, setPreviewImage] = useState(null); // Separate state for image preview
  const [colorInput, setColorInput] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/products/get/${id}`
        );
        const fetchedProduct = response.data;
        setProduct({
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          stockStatus: fetchedProduct.stockStatus,
          description: fetchedProduct.description,
          colors: fetchedProduct.colors || [],
          sizes: fetchedProduct.sizes || [],
          imageFile: null,
        });
        if (response.data.image) {
          const imageUrl = `${BACKEND_URL}${response.data.image}`;
          setPreviewImage(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product data."); // Use toast for error
      }
    };

    fetchProduct();
  }, [id]);

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
        imageFile: file, // Store file for upload
      }));
      setPreviewImage(URL.createObjectURL(file)); // Update preview with new file
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

  // Toggle size
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
      formData.append("stockStatus", product.stockStatus);
      formData.append("description", product.description);
      product.colors.forEach((color) => formData.append("colors", color));
      product.sizes.forEach((size) => formData.append("sizes", size));
      if (product.imageFile) {
        formData.append("image", product.imageFile); // Only append if new file is selected
      }

      await axios.put(`${BACKEND_URL}/api/products/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product updated successfully!"); // Success toast
      setTimeout(() => navigate("/admin/pet-products"), 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        "Failed to update product: " +
          (error.response?.data?.message || error.message)
      ); // Error toast
    }
  };

  // Close form
  const handleClose = () => {
    navigate("/admin/pet-products");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-lg text-red-600 hover:text-red-900 focus:outline-none"
      >
        <FaTimes />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Update Pet Product
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
            name="stockStatus"
            value={product.stockStatus}
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
          {previewImage && (
            <img
              src={previewImage}
              alt="Product Preview"
              className="w-32 h-32 object-cover rounded-lg mt-2"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150"; // Fallback image
                console.error("Image failed to load:", previewImage);
              }}
            />
          )}
        </div>

        {/* Submit & Close Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Product
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

export default UpdatePetProduct;
