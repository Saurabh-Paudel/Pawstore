import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Breed() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/breeds");
        const availableBreeds = response.data.filter(
          (breed) => breed.status === "Available"
        );
        setBreeds(availableBreeds);
      } catch (error) {
        console.error(
          "Error fetching breeds:",
          error.response?.data || error.message
        );
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Dog Breeds</h2>
        <p className="text-lg text-gray-600">
          Find yourself a perfect friend from a wide variety of choices.
        </p>
      </div>

      {/* Breed List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {breeds.map((breed) => (
          <div key={breed._id} className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-[137px] sm:h-[137px] rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={breed.image}
                alt={breed.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-semibold mt-3 text-gray-800 text-center">
              {breed.name}
            </p>
            <p className="text-sm text-gray-500 mt-2 text-center px-4">
              {breed.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
