import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DogAccessories = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Dog Leash",
      price: "$20",
      status: "Available",
      description: "A strong and durable dog leash.",
      color: "Black",
      size: "Medium",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Dog Bed",
      price: "$50",
      status: "Sold",
      description: "Comfortable bed for your dog.",
      color: "Gray",
      size: "Large",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Dog Collar",
      price: "$15",
      status: "Available",
      description: "Stylish collar for dogs.",
      color: "Red",
      size: "Small",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [statusChanged, setStatusChanged] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = false; // Initially, status hasn't been changed for any product
      return acc;
    }, {})
  );

  const handleStatusChange = (id, newStatus) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: newStatus } : product
      )
    );
    setStatusChanged({
      ...statusChanged,
      [id]: newStatus !== products.find((product) => product.id === id).status, // Track if status has changed
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">
        Manage Dog Accessories
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">Image</th>
              <th className="py-3 px-6 text-left text-gray-700">
                Product Name
              </th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-gray-700">Color</th>
              <th className="py-3 px-6 text-left text-gray-700">Size</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                <td className="py-3 px-6 text-gray-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-6 text-gray-800">{product.name}</td>
                <td className="py-3 px-6 text-gray-500">{product.price}</td>
                <td className="py-3 px-6 text-gray-500">
                  <select
                    value={product.status}
                    onChange={(e) =>
                      handleStatusChange(product.id, e.target.value)
                    }
                    className="bg-gray-200 p-2 rounded-md"
                  >
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-3 px-6 text-gray-500">
                  {product.description}
                </td>
                <td className="py-3 px-6 text-gray-500">{product.color}</td>
                <td className="py-3 px-6 text-gray-500">{product.size}</td>
                <td className="py-3 px-6 space-x-3">
                  <Link to={`/admin/pet-products/update/${product.id}`}>
                    <button
                      className={`text-white bg-yellow-500 py-2 px-4 rounded-md text-base ${
                        !statusChanged[product.id]
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={!statusChanged[product.id]} // Disable the button if status is not changed
                    >
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DogAccessories;
