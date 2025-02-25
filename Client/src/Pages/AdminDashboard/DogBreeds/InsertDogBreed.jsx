import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InsertDogBreed = () => {
  const [breedName, setBreedName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState("Available");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", breedName);
      formData.append("status", status);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        "http://localhost:8000/api/breeds",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("New Breed Added Successfully!");
      setTimeout(() => {
        navigate("/admin/dog-breeds");
      }, 1500);
    } catch (error) {
      console.error(
        "Error adding breed:",
        error.response?.data || error.message
      );
      toast.error("Error adding breed. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 relative">
      <div
        onClick={() => navigate("/admin/dog-breeds")}
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
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg shadow"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter breed description"
            required
          />
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
      <ToastContainer />
    </div>
  );
};

export default InsertDogBreed;
