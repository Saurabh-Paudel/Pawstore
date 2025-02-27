import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const PetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/get"
        );
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
        await axios.delete(`http://localhost:8000/api/products/delete/${id}`);
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

      <div className="flex justify-between items-center">
        <Link to="/admin/pet-products/insert">
          <button className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md">
            <FaEdit className="text-xl" />
            <span>Add New Product</span>
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-gray-700">Colors</th>
              <th className="py-3 px-6 text-left text-gray-700">Sizes</th>
              <th className="py-3 px-6 text-left text-gray-700">Image</th>
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
                    {product.stockStatus}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.description}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.colors.join(", ")}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {product.sizes.join(", ")}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `http://localhost:8000${product.image}`
                      }
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150"; // Fallback image
                      }}
                    />
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
    </div>
  );
};

export default PetProducts;
