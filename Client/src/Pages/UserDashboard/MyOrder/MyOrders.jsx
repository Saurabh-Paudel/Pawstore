import React, { useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { HiArrowPath } from "react-icons/hi2";

// Sample data for Dogs orders
const dogOrders = [
  {
    id: "ORD1234",
    product: "Golden Retriever",
    date: "2024-02-15",
    price: "$1200",
    status: "Shipped",
  },
  {
    id: "ORD5678",
    product: "Bulldog",
    date: "2024-02-10",
    price: "$1500",
    status: "Processing",
  },
  {
    id: "ORD9101",
    product: "Beagle",
    date: "2024-02-05",
    price: "$800",
    status: "Delivered",
  },
];

// Sample data for Accessories Products
const products = [
  {
    id: "ORD5678",
    image: "../../assets/AccessoriesImages/collar.png",
    name: "Dog Collar",
    rating: 4,
    reviews: 150,
    price: "Rs.192.00",
    description:
      "A dog collar is a band worn around a dog's neck, used for identification, training, or leash attachment.",
    colours: ["blue", "red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    deliveryStatus: "Processing",
  },
  // Additional product objects can be added here.
];

export default function MyOrdersTabs() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dogs");

  // Filter function for dog orders
  const filteredDogs = dogOrders.filter(
    (order) =>
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  // Filter function for accessories products (searches both name and id)
  const filteredAccessories = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toLowerCase().toLowerCase().includes(search.toLowerCase())
  );

  // Render Dogs table
  const renderDogsTable = (data) => (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-gray-700">ID</th>
            <th className="py-3 px-6 text-left text-gray-700">Product</th>
            <th className="py-3 px-6 text-left text-gray-700">Date</th>
            <th className="py-3 px-6 text-left text-gray-700">Price</th>
            <th className="py-3 px-6 text-left text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-800">{item.id}</td>
                <td className="py-3 px-6 text-gray-800">{item.product}</td>
                <td className="py-3 px-6 text-gray-500">{item.date}</td>
                <td className="py-3 px-6 text-gray-500">{item.price}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Shipped"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // Render Accessories table
  const renderAccessoriesTable = (data) => (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700">S.No</th>
            <th className="py-3 px-4 text-left text-gray-700">Order Number</th>
            <th className="py-3 px-4 text-left text-gray-700">Image</th>
            <th className="py-3 px-4 text-left text-gray-700">Product</th>
            <th className="py-3 px-4 text-left text-gray-700">Price</th>
            <th className="py-3 px-4 text-left text-gray-700">Colours</th>
            <th className="py-3 px-4 text-left text-gray-700">Sizes</th>
            <th className="py-3 px-4 text-left text-gray-700">
              Delivery Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                {/* S.No */}
                <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                {/* Order Number */}
                <td className="py-3 px-4 text-gray-800">{product.id}</td>
                {/* Image */}
                <td className="py-3 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                {/* Product Name */}
                <td className="py-3 px-4 font-medium text-gray-800">
                  {product.name}
                </td>
                {/* Price */}
                <td className="py-3 px-4 text-gray-800">{product.price}</td>
                {/* Colours */}
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    {product.colours.map((color) => (
                      <span
                        key={color}
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                </td>
                {/* Sizes */}
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-2 py-1 border rounded text-xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </td>
                {/* Delivery Status */}
                <td className="py-3 px-4 text-gray-800">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      product.deliveryStatus === "Delivered"
                        ? "bg-green-500"
                        : product.deliveryStatus === "Shipped"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {product.deliveryStatus}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
          My Orders
        </h2>
        <input
          type="text"
          placeholder={`Search ${
            activeTab === "dogs" ? "Dogs" : "Accessories"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Tab Menu */}
      <div className="flex space-x-8 border-b border-gray-300">
        <span
          onClick={() => {
            setActiveTab("dogs");
            setSearch("");
          }}
          className={`py-2 cursor-pointer ${
            activeTab === "dogs"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          Dogs
        </span>
        <span
          onClick={() => {
            setActiveTab("accessories");
            setSearch("");
          }}
          className={`py-2 cursor-pointer ${
            activeTab === "accessories"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          Accessories
        </span>
      </div>

      {/* Render the table based on active tab */}
      {activeTab === "dogs"
        ? renderDogsTable(filteredDogs)
        : renderAccessoriesTable(filteredAccessories)}
    </div>
  );
}
