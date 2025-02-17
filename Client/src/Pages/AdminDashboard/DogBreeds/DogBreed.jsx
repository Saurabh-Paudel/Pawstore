import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DogBreed = () => {
  const [search, setSearch] = useState("");
  const breeds = [
    {
      id: 1,
      name: "Labrador Retriever",
      image: "https://example.com/labrador.jpg",
      status: "Available",
    },
    {
      id: 2,
      name: "German Shepherd",
      image: "https://example.com/germanshepherd.jpg",
      status: "Available",
    },
  ];

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800">
        Manage Dog Breeds
      </h2>

      <div className="flex justify-between items-center">
        <Link to="/admin/dog-breeds/insert">
          <button className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md">
            <FaPlusCircle className="text-xl text-white" />
            <span>Add New Breed</span>
          </button>
        </Link>
        <input
          type="search"
          placeholder="Search Breeds"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">Breed Image</th>
              <th className="py-3 px-6 text-left text-gray-700">Breed Name</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBreeds.length > 0 ? (
              filteredBreeds.map((breed) => (
                <tr key={breed.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-16 h-16 rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-800">{breed.name}</td>
                  <td className="py-3 px-6 text-gray-500">{breed.status}</td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to="/admin/dog-breeds/update">
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        console.log(`Delete breed with ID: ${breed.id}`)
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No breeds found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DogBreed;
