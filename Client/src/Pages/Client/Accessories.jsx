import React, { useState, useEffect } from "react";
import { FaRegHeart, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AccessoriesPage() {
  const [products, setProducts] = useState([]); // State for fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch products from the backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/get`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="my-20 px-6 md:px-16 xl:px-[141px] text-center">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="my-20 px-6 md:px-16 xl:px-[141px] text-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Dog Accessories
        </h2>
        <p className="text-lg text-gray-600">
          Browse through our collection of premium dog accessories to pamper
          your furry friend.
        </p>
      </div>

      {/* Accessories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          // Assuming ratings aren't in the backend yet, we'll mock it or adjust later
          // Default to 4 if no ratings
          return (
            <div
              key={product._id} // Use _id from MongoDB
              className="group h-[350px] w-[270px] border border-gray-300 shadow-md rounded-lg relative"
              onClick={() => {
                navigate(`/accessories-details/${product._id}`); // Dynamic navigation with product ID
              }}
            >
              {/* Image Section */}
              <div className="relative h-[250px] w-full border-b rounded-t-lg border-gray-300 bg-[#F5F5F5]">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `${BACKEND_URL}${product.image}`
                  }
                  alt={product.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150"; // Fallback image
                  }}
                />
                <div className="absolute bottom-0 bg-black text-white h-8 w-full group-hover:flex items-center justify-center hidden cursor-pointer">
                  Add to cart
                </div>
              </div>

              {/* Product Info Section */}
              <div className="font-poppins text-center p-1">
                {/* Product Name */}
                <p className="text-base font-semibold text-gray-800">
                  {product.name}
                </p>

                {/* Price Section */}
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-base font-medium text-[#db6400]">
                    Rs. {product.price}
                  </span>
                </div>
              </div>

              {/* Hoverable Icons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <div className="bg-white p-2 rounded-full flex items-center justify-center">
                  <FaRegHeart className="text-black cursor-pointer text-[20px]" />
                </div>
                <div className="bg-white p-2 rounded-full flex items-center justify-center">
                  <FaRegEye className="text-black cursor-pointer text-[20px]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
