// client/src/components/Dog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dogs = () => {
  const [search, setSearch] = useState("");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/dogs");
        setDogs(response.data);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    fetchDogs();
  }, []);

  const filteredDogs = dogs.filter(
    (dog) =>
      dog.name.toLowerCase().includes(search.toLowerCase()) ||
      dog.breed.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/dogs/${id}`);
      setDogs(dogs.filter((dog) => dog._id !== id));
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800">Manage Dog Sales</h2>
      <div className="flex justify-between items-center">
        <Link
          to="/admin/dog/insert"
          className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md"
        >
          <FaPlusCircle className="text-xl" />
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
              <th className="py-3 px-6 text-left">S.No</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Dog Name</th>
              <th className="py-3 px-6 text-left">Breed</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Vaccinated</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDogs.length > 0 ? (
              filteredDogs.map((dog, index) => (
                <tr key={dog._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className=" p-2">
                    <img
                      src={dog.image}
                      alt={dog.name}
                      className="w-20 h-20 rounded-lg shadow-md"
                    />
                  </td>
                  <td className="py-3 px-6">{dog.name}</td>
                  <td className="py-3 px-6">{dog.breed}</td>
                  <td className="py-3 px-6">{dog.price}</td>
                  <td className="py-3 px-6">{dog.age}</td>
                  <td className="py-3 px-6">{dog.vaccinated}</td>
                  <td className="py-3 px-6">{dog.description}</td>
                  <td className="py-3 px-6">{dog.status}</td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to={`/admin/dog/update/${dog._id}`}>
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(dog._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
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
