import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DogSales() {
  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      <div className="text-center font-poppins mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3 animate-fade-in">
          Dog Sales
        </h2>
        <p className="text-lg text-gray-600 animate-fade-in">
          Find your perfect companion from our collection of lovable dogs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dogs.map((dog) => (
          <div
            key={dog._id}
            className="group bg-white rounded-lg shadow-lg p-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={dog.image}
                alt={dog.name}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {dog.name}
              </h3>
              <p className="text-gray-600 mt-1">{dog.breed}</p>
              <span className="block mt-2 text-lg font-bold text-gray-900">
                ${dog.price}
              </span>
            </div>

            <button
              onClick={() => navigate(`/buy/${dog._id}`, { state: { dog } })}
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg transition-colors duration-300 hover:bg-gray-900"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
