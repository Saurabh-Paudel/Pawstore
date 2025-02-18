import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dogs = () => {
  const [search, setSearch] = useState("");
  const [dogs, setDogs] = useState([
    {
      id: 1,
      name: "Golden Retriever",
      breed: "Golden Retriever",
      price: "$1200",
      age: "2 Years",
      vaccinated: "Yes",
      status: "Available",
      description: "Friendly and intelligent, great family pet.",
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
      description: "Stubborn, affectionate, and loyal companion.",
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
      description: "Curious, merry, and energetic small dog.",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setDogs(dogs.filter((dog) => dog.id !== id)); // Delete dog by id
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800">Manage Dog Sales</h2>

      <div className="flex justify-between items-center">
        <Link
          to="/admin/dog/insert"
          className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md"
        >
          <FaPlusCircle className="text-xl text-white" />
          <span>Add New Dog</span>
        </Link>
        <input
          type="search"
          placeholder="Search Dogs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

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
              <th className="py-3 px-6 text-left text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDogs.length > 0 ? (
              filteredDogs.map((dog, index) => (
                <tr key={dog.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-6">
                    <img
                      src={dog.image}
                      alt={dog.name}
                      className="w-16 h-16 rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-800">{dog.name}</td>
                  <td className="py-3 px-6 text-gray-500">{dog.breed}</td>
                  <td className="py-3 px-6 text-gray-500">{dog.price}</td>
                  <td className="py-3 px-6 text-gray-500">{dog.age}</td>
                  <td className="py-3 px-6 text-gray-500">{dog.vaccinated}</td>
                  <td className="py-3 px-6 text-gray-500">{dog.description}</td>
                  <td className="py-3 px-6 text-gray-500">{dog.status}</td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to="/admin/dog/update">
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
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No dogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dogs;
