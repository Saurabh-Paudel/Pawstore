import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const InsertDogBreed = () => {
  const [breedName, setBreedName] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("Available");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Breed Added:", { breedName, image, status });
    navigate("/admin/dog-breeds"); // Redirect after adding
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 relative">
      <div
        onClick={() => {
          navigate("/admin/dog-breeds");
        }}
        className="absolute top-3 right-3"
      >
        <FaTimes className="text-red-500 cursor-pointer text-xl" />
      </div>
      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Add a New Dog Breed
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Breed Name
          </label>
          <input
            type="text"
            value={breedName}
            onChange={(e) => setBreedName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter breed name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg shadow"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
          >
            Add Breed
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertDogBreed;
