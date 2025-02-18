import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dog, setDog] = useState({
    name: "",
    breed: "",
    price: "",
    age: "",
    vaccinated: "No",
    status: "Available",
    image: null,
  });

  useEffect(() => {
    // Static dog details based on ID
    const dogData = {
      1: {
        name: "Max",
        breed: "Labrador",
        price: "$500",
        age: "3",
        vaccinated: "Yes",
        status: "Available",
        image: "https://via.placeholder.com/150", // Static image URL for example
      },
      2: {
        name: "Bella",
        breed: "German Shepherd",
        price: "$700",
        age: "2",
        vaccinated: "No",
        status: "Sold",
        image: "https://via.placeholder.com/150", // Static image URL for example
      },
      // Add more static dog data if needed
    };

    // Set the dog details based on the provided id
    setDog(dogData[id] || dog);
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
    console.log("Updated Dog Details:", dog);
    navigate("/admin/dogs");
  };

  const handleClose = () => {
    navigate("/admin/dogs");
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-lg text-red-600 hover:text-red-900 focus:outline-none"
      >
        <FaTimes />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Edit Dog Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Dog Name</label>
          <input
            type="text"
            name="name"
            value={dog.name}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={dog.status}
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
          {dog.image && (
            <img
              src={dog.image}
              alt="Dog Preview"
              className="w-32 h-32 object-cover rounded-lg mt-3"
            />
          )}
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700"
          >
            Update Dog
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-6 text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDogForm;
