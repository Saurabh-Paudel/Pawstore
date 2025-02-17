import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePetProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    status: "In Stock",
    description: "",
    color: "Red",
    size: "M",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setProduct({
      name: "Dog Leash",
      price: "$15",
      status: "In Stock",
      description: "Durable dog leash.",
      color: "Red",
      size: "M",
      image: "https://via.placeholder.com/150",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product:", product);
    navigate("/admin/pet-products");
  };

  const handleClose = () => {
    navigate("/admin/pet-products");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        &times;
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Update Pet Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Color</label>
          <select
            name="color"
            value={product.color}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          >
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Size</label>
          <select
            name="size"
            value={product.size}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          {product.image && (
            <div className="mt-3">
              <img
                src={product.image}
                alt="Product Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-6 text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePetProduct;
