// Pages/Client/BuyNow.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dog } = location.state || {};
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  if (!dog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="text-2xl text-amber-800 font-semibold flex items-center space-x-2">
          <span>Oops! Dog not found</span>
          <span className="text-3xl">🐾</span>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    navigate("/dog-checkout", { state: { dog } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-12 px-6 flex items-center justify-center">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl border border-amber-100">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-amber-300 rounded-full opacity-20"></div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-amber-200 rounded-full opacity-30"></div>
        <div className="relative overflow-hidden rounded-2xl mb-6">
          <img
            src={
              dog.image?.startsWith("http")
                ? dog.image
                : `${BACKEND_URL}${dog.image || ""}`
            }
            alt={dog.name}
            className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=No+Image";
            }}
          />
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white font-semibold text-sm ${
              dog.status === "Available" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {dog.status || "Unknown"}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-4xl font-bold text-amber-800">{dog.name}</h2>
            <span className="text-2xl text-amber-500">🐶</span>
          </div>
          <p className="text-gray-500 italic text-lg">{dog.breed}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-amber-50 p-4 rounded-xl border border-amber-200">
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-amber-900">Age:</strong>{" "}
                {dog.age || "N/A"} years
              </p>
              <p className="text-gray-700">
                <strong className="text-amber-900">Vaccinated:</strong>{" "}
                <span
                  className={
                    dog.vaccinated === "Yes" ? "text-green-600" : "text-red-600"
                  }
                >
                  {dog.vaccinated === "Yes"
                    ? "Yes ✅"
                    : dog.vaccinated === "No"
                    ? "No ❌"
                    : "N/A"}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <p className="text-2xl font-bold text-amber-900">
                Rs. {dog.price}
              </p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {dog.description || "No description available"}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>Buy Now</span>
            <span className="text-xl">🛒</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span className="text-xl">←</span>
            <span>Back</span>
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Bring {dog.name} home today! 🐾
        </p>
      </div>
    </div>
  );
}
