import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function MyOrdersTabs() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dogs");
  const [dogOrders, setDogOrders] = useState([]);
  const [accessoryOrders, setAccessoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useSelector((state) => state.user);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId || "";

  const fetchDogPurchases = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/payments/dog-purchase/my-dog-purchases",
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );
      setDogOrders(response.data);
      if (!response.data || response.data.length === 0) {
        console.warn("No dog orders returned from the server.");
      }
    } catch (err) {
      console.error(
        "Error fetching dog purchases:",
        err.response?.data || err.message
      );
      setError(
        "Failed to load dog orders: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const fetchAccessoryPurchases = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/payments/accessory-purchase/my-purchases",
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );
      setAccessoryOrders(response.data);
      if (!response.data || response.data.length === 0) {
        console.warn("No accessory orders returned from the server.");
      }
    } catch (err) {
      console.error(
        "Error fetching accessory purchases:",
        err.response?.data || err.message
      );
      setError(
        "Failed to load accessory orders: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!token && !localStorage.getItem("token")) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await Promise.all([fetchDogPurchases(), fetchAccessoryPurchases()]);
      } catch (err) {
        setError("Failed to load orders: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  const renderDogsTable = (orders) => {
    const filteredOrders = orders.filter((order) =>
      order.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Sno</th>
            <th className="p-2">Image</th>
            <th className="p-2">Dog ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Breed</th>
            <th className="p-2">Amount (Rs.)</th>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Payment Status</th>
            <th className="p-2">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length ? (
            filteredOrders.map((order, index) => (
              <tr key={order._id.toString()} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2">{order.dogId.toString()}</td>
                <td className="p-2">{order.name}</td>
                <td className="p-2">{order.breed}</td>
                <td className="p-2">Rs. {order.amount}</td>
                <td className="p-2">{order.transactionUuid}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{order.deliveryStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="p-2 text-center">
                No dog orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const renderAccessoriesTable = (orders) => {
    const filteredOrders = orders.filter((order) =>
      order.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Sno</th>
            <th className="p-2">Image</th>
            <th className="p-2">Accessory ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Color</th>
            <th className="p-2">Size</th>
            <th className="p-2">Amount (Rs.)</th>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Payment Status</th>
            <th className="p-2">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length ? (
            filteredOrders.map((order, index) => (
              <tr key={order._id.toString()} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2">{order.accessoryId.toString()}</td>
                <td className="p-2">{order.name}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">{order.color || "N/A"}</td>
                <td className="p-2">{order.size || "N/A"}</td>
                <td className="p-2">Rs. {order.amount}</td>
                <td className="p-2">{order.transactionUuid}</td>
                <td className="p-2">{order.paymentStatus}</td>
                <td className="p-2">{order.deliveryStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="p-2 text-center">
                No accessory orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Orders</h2>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by Transaction ID..."
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      {/* Tab Menu */}
      <div className="flex space-x-8 border-b border-gray-300">
        <span
          onClick={() => setActiveTab("dogs")}
          className={`py-2 cursor-pointer ${
            activeTab === "dogs"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          Dogs
        </span>
        <span
          onClick={() => setActiveTab("accessories")}
          className={`py-2 cursor-pointer ${
            activeTab === "accessories"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-600"
          }`}
        >
          Accessories
        </span>
      </div>

      {/* Render Tables */}
      {loading ? (
        <p className="text-lg text-gray-600 text-center mt-4">
          Loading orders...
        </p>
      ) : error ? (
        <p className="text-lg text-red-600 text-center mt-4">{error}</p>
      ) : activeTab === "dogs" ? (
        renderDogsTable(dogOrders)
      ) : (
        renderAccessoriesTable(accessoryOrders)
      )}
    </div>
  );
}
