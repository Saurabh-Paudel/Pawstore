// components/AccessoryCheckout.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

const secretKey = "8gBm/:&EnhH.1/q"; // Matches .env ESEWA_SECRET_KEY
const productCode = "EPAYTEST"; // Matches .env ESEWA_PRODUCT_CODE

const generateSignature = (totalAmount, transactionUuid) => {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
};

export default function AccessoryCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { accessory } = location.state || {};
  const [loading, setLoading] = useState(false);

  const userState = useSelector((state) => state.user);
  const token = userState.token;

  if (!accessory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="text-2xl text-amber-800 font-semibold">
          Oops! Accessory not found 🛍️
        </div>
      </div>
    );
  }

  const {
    _id: accessoryId,
    price,
    quantity,
    color,
    size,
    image,
    name,
    description,
  } = accessory;

  if (!accessoryId || !price || !quantity || !image || !name || !description) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="text-2xl text-amber-800 font-semibold">
          Oops! Incomplete accessory data 🛍️
        </div>
      </div>
    );
  }

  const transactionUuid = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(-9)}`;
  const totalAmount = (price * quantity).toString();

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("Please log in to complete the purchase");
      }

      const response = await fetch(
        "http://localhost:8000/api/payments/accessory-purchase/initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            accessoryId,
            amount: price * quantity,
            transactionUuid,
            quantity,
            color,
            size,
            image,
            name,
            description,
            price,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate transaction");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const fields = {
        amount: totalAmount,
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transactionUuid,
        product_code: productCode,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: "http://localhost:8000/api/payments/payment-success",
        failure_url: "http://localhost:8000/api/payments/payment-failure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: generateSignature(totalAmount, transactionUuid),
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation error:", error.message);
      setLoading(false);
      navigate("/payment-failure", { state: { error: error.message } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center p-6">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
          <span className="mr-2">🛍️</span> Purchase {name}!
        </h2>

        <div className="space-y-6">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{name}</p>
                <p className="text-amber-700">{description.slice(0, 30)}...</p>
                <p className="text-xl font-bold text-amber-900 mt-1">
                  Rs. {price} x {quantity} = Rs. {price * quantity}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-amber-900">
                Rs. {price * quantity}
              </span>
            </div>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Pay with eSewa</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Your accessory is just one click away! 🛍️
        </p>
      </div>
    </div>
  );
}
