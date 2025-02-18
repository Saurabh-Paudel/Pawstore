import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DogsSales = () => {
  const [dogs, setDogs] = useState([
    {
      id: 1,
      name: "Golden Retriever",
      breed: "Golden Retriever",
      price: "$1200",
      age: "2 Years",
      vaccinated: "Yes",
      status: "Available",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Bulldog",
      breed: "English Bulldog",
      price: "$1500",
      age: "1.5 Years",
      vaccinated: "Yes",
      status: "Sold",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Beagle",
      breed: "Beagle",
      price: "$800",
      age: "1 Year",
      vaccinated: "No",
      status: "Available",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [statusChanged, setStatusChanged] = useState(
    dogs.reduce((acc, dog) => {
      acc[dog.id] = false; // Initially, status hasn't been changed for any dog
      return acc;
    }, {})
  );

  const handleStatusChange = (id, newStatus) => {
    setDogs(
      dogs.map((dog) => (dog.id === id ? { ...dog, status: newStatus } : dog))
    );
    setStatusChanged({
      ...statusChanged,
      [id]: newStatus !== dogs.find((dog) => dog.id === id).status, // Track if status has changed
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">
        Manage Dogs Sales
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">Image</th>
              <th className="py-3 px-6 text-left text-gray-700">Dog Name</th>
              <th className="py-3 px-6 text-left text-gray-700">Breed</th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Age</th>
              <th className="py-3 px-6 text-left text-gray-700">Vaccinated</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog, index) => (
              <tr key={dog.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                <td className="py-3 px-6">
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-6 text-gray-800">{dog.name}</td>
                <td className="py-3 px-6 text-gray-500">{dog.breed}</td>
                <td className="py-3 px-6 text-gray-500">{dog.price}</td>
                <td className="py-3 px-6 text-gray-500">{dog.age}</td>
                <td className="py-3 px-6 text-gray-500">{dog.vaccinated}</td>
                <td className="py-3 px-6 text-gray-500">
                  <select
                    value={dog.status}
                    onChange={(e) => handleStatusChange(dog.id, e.target.value)}
                    className="bg-gray-200 p-2 rounded-md"
                  >
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-3 px-6 space-x-3">
                  <Link to={`/admin/sales/dogs/update/${dog.id}`}>
                    <button
                      className={`text-white bg-yellow-500 py-2 px-4 rounded-md text-base ${
                        !statusChanged[dog.id]
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={!statusChanged[dog.id]} // Disable the button if status is not changed
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

export default DogsSales;
