import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function UserDashboard() {
  const { token, email } = useSelector((state) => state.user);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId || "";

  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dogOrders, setDogOrders] = useState([]);
  const [accessoryOrders, setAccessoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch User Info
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/${email}`);
      setUserInfo(response.data);
    } catch (err) {
      setError("Failed to fetch user info: " + err.message);
    }
  };

  // Fetch Messages
  const fetchMessages = async () => {
    if (!email) return;
    try {
      const response = await axios.get(`${BACKEND_URL}/api/messages`);
      const userMessages = response.data.filter((msg) => msg.email === email);
      setMessages(userMessages);
    } catch (err) {
      setError("Failed to fetch messages: " + err.message);
    }
  };

  // Fetch Dog Purchases
  const fetchDogPurchases = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/payments/dog-purchase/my-dog-purchases`,
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );
      setDogOrders(response.data);
    } catch (err) {
      setError("Failed to fetch dog orders: " + err.message);
    }
  };

  // Fetch Accessory Purchases
  const fetchAccessoryPurchases = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/payments/accessory-purchase/my-purchases`,
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );
      setAccessoryOrders(response.data);
    } catch (err) {
      setError("Failed to fetch accessory orders: " + err.message);
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
        await Promise.all([
          fetchUserInfo(),
          fetchMessages(),
          fetchDogPurchases(),
          fetchAccessoryPurchases(),
        ]);
      } catch (err) {
        setError("Failed to load dashboard data: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token, email]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex-1 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 bg-white px-6 py-4 rounded-lg shadow-sm">
          Welcome, {userInfo?.name || "User"}!
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-700">Messages</h3>
            <p className="text-3xl font-bold text-blue-600">
              {messages.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700">Dog Orders</h3>
            <p className="text-3xl font-bold text-green-600">
              {dogOrders.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-gray-700">
              Accessory Orders
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {accessoryOrders.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-700">Total Spent</h3>
            <p className="text-3xl font-bold text-orange-600">
              Rs.{" "}
              {(
                dogOrders.reduce((sum, order) => sum + (order.amount || 0), 0) +
                accessoryOrders.reduce(
                  (sum, order) => sum + (order.amount || 0),
                  0
                )
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading your dashboard...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 text-center">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Messages */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Messages
              </h3>
              {messages.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.slice(0, 5).map((msg) => (
                    <div
                      key={msg._id}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-400 hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-gray-700">{msg.message}</p>
                      <p className="text-sm text-gray-500 mt-1 italic">
                        {msg.reply ? `Replied: ${msg.reply}` : "No reply yet"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No messages found.</p>
              )}
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {[...dogOrders, ...accessoryOrders]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5)
                  .map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-teal-400 hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-gray-700 font-medium">
                          {order.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Rs. {order.amount} •{" "}
                          <span
                            className={`${
                              order.deliveryStatus === "delivered"
                                ? "text-blue-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {order.deliveryStatus}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                {dogOrders.length === 0 && accessoryOrders.length === 0 && (
                  <p className="text-gray-500">No recent orders found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
