// components/PaymentSuccess.jsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Payment Successful! 🎉
        </h2>
        <p className="text-lg text-gray-700">
          Your transaction (ID: <strong>{transactionId}</strong>) was completed
          successfully.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Thank you for your purchase!
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
