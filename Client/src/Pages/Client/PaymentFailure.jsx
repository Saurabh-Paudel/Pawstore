// components/PaymentFailure.jsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          Payment Failed! 😔
        </h2>
        <p className="text-lg text-gray-700">
          Something went wrong with your transaction. Reason:{" "}
          <strong>{reason || "Unknown error"}</strong>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Please try again or contact support.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
