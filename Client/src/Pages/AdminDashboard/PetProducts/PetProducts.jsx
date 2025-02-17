import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PetProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Dog Leash",
      price: "$15",
      status: "In Stock",
      description: "Durable dog leash.",
      color: "Red",
      size: "M",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Cat Toy",
      price: "$8",
      status: "Out of Stock",
      description: "Interactive cat toy.",
      color: "Blue",
      size: "S",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Pet Shampoo",
      price: "$10",
      status: "In Stock",
      description: "Gentle pet shampoo for all fur types.",
      color: "Red",
      size: "L",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="space-y-6">
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
              <th className="py-3 px-6 text-left text-gray-700">Color</th>
              <th className="py-3 px-6 text-left text-gray-700">Size</th>
              <th className="py-3 px-6 text-left text-gray-700">Image</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                <td className="py-3 px-6 text-gray-800">{product.name}</td>
                <td className="py-3 px-6 text-gray-500">{product.price}</td>
                <td className="py-3 px-6 text-gray-500">{product.status}</td>
                <td className="py-3 px-6 text-gray-500">
                  {product.description}
                </td>
                <td className="py-3 px-6 text-gray-500">{product.color}</td>
                <td className="py-3 px-6 text-gray-500">{product.size}</td>
                <td className="py-3 px-6 text-gray-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-6 space-x-3">
                  <Link to="/admin/pet-products/update">
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetProducts;
