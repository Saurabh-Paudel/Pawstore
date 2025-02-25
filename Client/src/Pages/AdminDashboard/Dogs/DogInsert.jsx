// client/src/components/DogInsert.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DogInsert = () => {
  const [dog, setDog] = useState({
    name: "",
    breed: "",
    price: "",
    age: "",
    vaccinated: "Yes",
    description: "",
    image: null,
    status: "Available",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDog((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDog((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(dog).forEach((key) => {
      formData.append(key, dog[key]);
    });
    try {
      const response = await fetch("http://localhost:8000/api/dogs", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      toast.success("Dog added successfully!");
      setTimeout(() => navigate("/admin/dog"), 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add dog. Check server logs.");
    }
  };

  const handleClose = () => navigate("/admin/dog");

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-lg text-red-600"
      >
        <FaTimes />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Dog</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Dog Name</label>
          <input
            type="text"
            name="name"
            value={dog.name}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg"
          />
        </div>
        {/* Breed */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Breed</label>
          <input
            type="text"
            name="breed"
            value={dog.breed}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg"
          />
        </div>
        {/* Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={dog.price}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg"
          />
        </div>
        {/* Age */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Age</label>
          <input
            type="text"
            name="age"
            value={dog.age}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg"
          />
        </div>
        {/* Vaccinated */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Vaccinated</label>
          <select
            name="vaccinated"
            value={dog.vaccinated}
            onChange={handleChange}
            className="p-4 border rounded-lg"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Description</label>
          <textarea
            name="description"
            value={dog.description}
            onChange={handleChange}
            required
            className="p-4 border rounded-lg"
          />
        </div>
        {/* Status */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Status</label>
          <select
            name="status"
            value={dog.status}
            onChange={handleChange}
            className="p-4 border rounded-lg"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        {/* Image */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Dog Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="p-4 border rounded-lg"
          />
          {previewImage && (
            <div className="mt-3">
              <img
                src={previewImage}
                alt="Dog Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        {/* Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            Add Dog
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-6 text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </form>
      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default DogInsert;
