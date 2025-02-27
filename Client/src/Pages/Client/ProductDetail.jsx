import React, { useState, useEffect } from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { HiArrowPath } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // State for fetched product
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState(null); // Default to null until fetched
  const [selectedSize, setSelectedSize] = useState(null); // Default to null until fetched
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/get/${id}`
        );
        const fetchedProduct = response.data;
        console.log("Fetched product:", fetchedProduct); // Debug log
        setProduct(fetchedProduct);
        // Set initial color and size from fetched data
        setSelectedColor(fetchedProduct.colors?.[0] || null);
        setSelectedSize(fetchedProduct.sizes?.[0] || null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading product details...</p>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600">{error || "Product not found."}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-6 bg-gray-100 lg:min-h-auto">
      {/* Product Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `http://localhost:8000${product.image}`
          }
          alt={product.name}
          className="w-full max-w-xs md:max-w-md rounded-lg"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300"; // Fallback image
          }}
        />
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 p-4 lg:p-6 font-poppins text-center lg:text-left">
        <h1 className="text-xl md:text-2xl font-bold">{product.name}</h1>

        <p className="text-lg md:text-2xl font-semibold">Rs.{product.price}</p>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {product.description}
        </p>

        {/* Color Selection */}
        <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4 border-t pt-4">
          <p className="font-medium">Colours:</p>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full border ${
                  selectedColor === color ? "ring-2 ring-black" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4">
          <p className="font-medium">Size:</p>
          <div className="flex space-x-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Buy Now */}
        <div className="mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-4">
          <div className="flex items-center border rounded overflow-hidden">
            <button
              className="p-2 bg-gray-200 text-xl"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <FiMinus />
            </button>
            <span className="px-4 w-12 flex items-center justify-center text-xl">
              {quantity}
            </span>
            <button
              className="p-2 bg-gray-200 text-xl"
              onClick={() => setQuantity(quantity + 1)}
            >
              <FiPlus />
            </button>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded w-full lg:w-[165px]">
            Buy Now
          </button>
          <button className="border p-2 rounded">
            <PiShoppingCartLight className="text-black font-bold text-2xl " />
          </button>
        </div>

        {/* Delivery Details */}
        <div className="border rounded-lg p-4 my-5 divide-y w-full lg:w-[400px]">
          <div className="flex items-center space-x-3 pb-4">
            <TbTruckDelivery className="text-2xl" />
            <div>
              <p className="font-semibold">Free Delivery</p>
              <a href="#" className="text-blue-500 underline text-sm">
                Enter your postal code for Delivery Availability
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <HiArrowPath className="text-2xl" />
            <div>
              <p className="font-semibold">Return Delivery</p>
              <p className="text-sm">
                Free 30 Days Delivery Returns.{" "}
                <a href="#" className="text-blue-500 underline">
                  Details
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
