import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const PetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/get`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${BACKEND_URL}/api/products/delete/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert(
          "Failed to delete product: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-semibold text-gray-800">
        Manage Pet Products
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/admin/pet-products/insert">
          <button className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md">
            <FaEdit className="text-xl" />
            <span>Add New Product</span>
          </button>
        </Link>

        {/* Add search bar if needed */}
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Table Format for larger screens */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6 hidden sm:block">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-gray-700">Image</th>
              <th className="py-3 px-6 text-left text-gray-700">Colors</th>
              <th className="py-3 px-6 text-left text-gray-700">Sizes</th>
              <th className="py-3 px-6 text-left text-gray-700">
                Stock Status
              </th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-3 px-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-6 text-gray-800">{product.name}</td>
                  <td className="py-3 px-6 text-gray-500">
                    Rs.{product.price}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.description}
                  </td>
                  <td className="py-3 px-6">
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `${BACKEND_URL}${product.image}`
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150"; // Fallback image
                      }}
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.colors?.join(", ") || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.sizes?.join(", ") || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.stockStatus}
                  </td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to={`/admin/pet-products/update/${product._id}`}>
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card Format for smaller screens */}
      <div className="grid sm:hidden grid-cols-1 gap-6 mt-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `${BACKEND_URL}${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150"; // Fallback image
                  }}
                />
                {/* Stock Status Badge */}
                <span
                  className={`absolute top-2 right-2 px-3 py-1 text-sm font-medium rounded-full text-white ${
                    product.stockStatus === "In Stock"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {product.stockStatus}
                </span>
              </div>

              {/* Product Details */}
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-gray-700 font-medium">
                  Rs. {product.price.toLocaleString()}
                </p>

                {/* Colors */}
                <div>
                  <p className="text-gray-500 text-sm font-medium">Colors:</p>
                  <div className="flex gap-2 mt-1">
                    {product.colors?.map((color, index) => (
                      <span
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></span>
                    )) || <span className="text-gray-400">N/A</span>}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <p className="text-gray-500 text-sm font-medium">Sizes:</p>
                  <p className="text-gray-600 text-sm">
                    {product.sizes?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between items-center">
                <Link to={`/admin/pet-products/update/${product._id}`}>
                  <button className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 transition-colors">
                    <FaEdit className="text-lg" />
                    <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors"
                >
                  <FaTrashAlt className="text-lg" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetProducts;
