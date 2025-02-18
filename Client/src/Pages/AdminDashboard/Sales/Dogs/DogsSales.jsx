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

  const handleDelete = (id) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Manage Dogs</h2>

      <div className="flex justify-between items-center">
        <Link to="/admin/sales/dogs/insert">
          <button className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md">
            <FaEdit className="text-xl" />
            <span>Add New Dog</span>
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">Dog Name</th>
              <th className="py-3 px-6 text-left text-gray-700">Breed</th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Age</th>
              <th className="py-3 px-6 text-left text-gray-700">Vaccinated</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Image</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog, index) => (
              <tr key={dog.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                <td className="py-3 px-6 text-gray-800">{dog.name}</td>
                <td className="py-3 px-6 text-gray-500">{dog.breed}</td>
                <td className="py-3 px-6 text-gray-500">{dog.price}</td>
                <td className="py-3 px-6 text-gray-500">{dog.age}</td>
                <td className="py-3 px-6 text-gray-500">{dog.vaccinated}</td>
                <td className="py-3 px-6 text-gray-500">{dog.status}</td>
                <td className="py-3 px-6">
                  <img
                    src={dog.image}
                    alt={dog.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-6 space-x-3">
                  <Link to="/admin/sales/dogs/update">
                    <button className="text-yellow-500 hover:text-yellow-600">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(dog.id)}
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

export default DogsSales;
