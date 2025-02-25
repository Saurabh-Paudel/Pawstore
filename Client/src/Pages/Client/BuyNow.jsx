import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dog } = location.state || {};

  if (!dog) {
    return <div className="text-center mt-10 text-xl">Dog not found.</div>;
  }

  const handleBuyNow = () => {
    // Navigate to the checkout page or handle the purchase process here
    // For example:
    navigate("/checkout", { state: { dog } });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-100">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {/* Dog Image */}
        <img
          src={dog.image}
          alt={dog.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* Dog Details */}
        <h2 className="text-3xl font-bold text-gray-900 mt-4">{dog.name}</h2>
        <p className="text-gray-600 text-lg">{dog.breed}</p>

        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Age:</span> {dog.age} years
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Vaccinated:</span>{" "}
            {dog.vaccinated ? "Yes ✅" : "No ❌"}
          </p>
          <p className="text-gray-700 mt-2">{dog.description}</p>
        </div>

        <p className="text-xl font-bold text-gray-900 mt-4">Rs.{dog.price}</p>

        {/* Dog Availability Status */}
        <p
          className={`mt-2 text-lg font-semibold ${
            dog.status === "Available" ? "text-green-600" : "text-red-600"
          }`}
        >
          {dog.status}
        </p>

        <div className="flex  gap-5">
          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg transition-colors duration-300 hover:bg-blue-700"
          >
            Buy Now
          </button>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg transition-colors duration-300 hover:bg-gray-900"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
