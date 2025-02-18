import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const DogUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState({
    name: "",
    breed: "",
    price: "",
    age: "",
    vaccinated: "",
    description: "",
    image: null,
    status: "Available",
  });

  useEffect(() => {
    // Simulate fetching the dog data by ID
    // You can replace this with an API call to get the dog data from the server
    const fetchedDog = {
      id: 1,
      name: "Golden Retriever",
      breed: "Golden Retriever",
      price: "$1200",
      age: "2 Years",
      vaccinated: "Yes",
      description: "Friendly and intelligent, great family pet.",
      image: "https://via.placeholder.com/150",
      status: "Available",
    };

    setDog(fetchedDog);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDog((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDog((prevDog) => ({
        ...prevDog,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dog data updated:", dog);
    navigate("/admin/dog");
  };

  const handleClose = () => {
    navigate("/admin/dog");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-lg text-red-600 hover:text-red-900 focus:outline-none"
      >
        <FaTimes />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Dog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Dog Name</label>
          <input
            type="text"
            name="name"
            value={dog.name}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Breed</label>
          <input
            type="text"
            name="breed"
            value={dog.breed}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={dog.price}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Age</label>
          <input
            type="text"
            name="age"
            value={dog.age}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Vaccinated
          </label>
          <select
            name="vaccinated"
            value={dog.vaccinated}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={dog.description}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={dog.status}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          >
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Dog Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          {dog.image && (
            <div className="mt-3">
              <img
                src={dog.image}
                alt="Dog Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
          >
            Update Dog
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-6 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-all"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default DogUpdate;
