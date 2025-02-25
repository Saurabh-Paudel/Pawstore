import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DogBreed = () => {
  const [search, setSearch] = useState("");
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/breeds");
        setBreeds(response.data);
      } catch (error) {
        console.error(
          "Error fetching breeds:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch breeds.");
      }
    };

    fetchBreeds();
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this breed?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/breeds/${id}`);
      setBreeds((prevBreeds) => prevBreeds.filter((breed) => breed._id !== id));
      toast.success("Breed deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting breed:",
        error.response?.data || error.message
      );
      toast.error("Failed to delete breed. Please try again.");
    }
  };

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
              <th className="py-3 px-6 text-left text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBreeds.length > 0 ? (
              filteredBreeds.map((breed) => (
                <tr key={breed._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="w-16 h-16 rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-3 px-6 text-gray-800">{breed.name}</td>
                  <td className="py-3 px-6 text-gray-500">{breed.status}</td>
                  <td className="py-3 px-6 text-gray-500">
                    {breed.description}
                  </td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to={`/admin/dog-breeds/update/${breed._id}`}>
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(breed._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No breeds found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DogBreed;
