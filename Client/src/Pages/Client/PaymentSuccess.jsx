import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-green-50 flex items-center justify-center p-6">
      <div className="relative max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform hover:shadow-2xl transition-all duration-300 border border-green-100">
        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-300 rounded-full opacity-20"></div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>

        {/* Happy Dog Icon */}
        <div className="mb-6 relative">
          <span className="text-6xl animate-pulse">🎉🐶🎉</span>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-24 h-24 bg-amber-400 rounded-full opacity-10 animate-ping"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-lg">
          Woof! Thank you for your purchase. Your new furry friend is on the way
          to steal your heart!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300 inline-flex items-center space-x-2"
        >
          <span>Return to Home</span>
          <span>🏠</span>
        </button>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-6">
          Get ready for some tail-wagging fun! 🐾
        </p>
      </div>
    </div>
  );
}
