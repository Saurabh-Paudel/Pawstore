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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { token } = useSelector((state) => state.user);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId || "";

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
      setError(
        "Failed to load dog orders: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Sno</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Image</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Dog ID</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Name</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Breed</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Amount</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Transaction ID
              </th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Payment
              </th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Delivery
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 text-xs sm:text-sm">{index + 1}</td>
                  <td className="py-2 px-2">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    {order.dogId}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm font-medium">
                    {order.name}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    {order.breed}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    Rs. {order.amount}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm text-gray-600">
                    {order.transactionUuid}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.deliveryStatus === "delivered"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="py-4 px-2 text-center text-gray-500 text-xs sm:text-sm"
                >
                  No dog orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAccessoriesTable = (orders) => {
    const filteredOrders = orders.filter((order) =>
      order.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Sno</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Image</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Accessory ID
              </th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Name</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Qty</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Color</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Size</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">Amount</th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Transaction ID
              </th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Payment
              </th>
              <th className="py-2 px-2 text-left text-xs sm:text-sm">
                Delivery
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 text-xs sm:text-sm">{index + 1}</td>
                  <td className="py-2 px-2">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    {order.accessoryId}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm font-medium">
                    {order.name}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    {order.quantity}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    {order.color || "N/A"}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    {order.size || "N/A"}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    Rs. {order.amount}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm text-gray-600">
                    {order.transactionUuid}
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.paymentStatus === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.deliveryStatus === "delivered"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="py-4 px-2 text-center text-gray-500 text-xs sm:text-sm"
                >
                  No accessory orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDogCard = (order, index) => (
    <div
      key={order._id}
      className="bg-white p-4 rounded-lg shadow-md mb-4 border"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={order.image}
          alt={order.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-sm">{order.name}</h3>
          <p className="text-xs text-gray-600">Breed: {order.breed}</p>
          <p className="text-xs text-gray-600">Dog ID: {order.dogId}</p>
          <p className="text-xs">Amount: Rs. {order.amount}</p>
          <p className="text-xs text-gray-600 break-all">
            Transaction: {order.transactionUuid}
          </p>
          <div className="mt-2 flex gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                order.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {order.status}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                order.deliveryStatus === "delivered"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.deliveryStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessoryCard = (order, index) => (
    <div
      key={order._id}
      className="bg-white p-4 rounded-lg shadow-md mb-4 border"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={order.image}
          alt={order.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-sm">{order.name}</h3>
          <p className="text-xs text-gray-600">ID: {order.accessoryId}</p>
          <p className="text-xs text-gray-600">Qty: {order.quantity}</p>
          <p className="text-xs text-gray-600">Color: {order.color || "N/A"}</p>
          <p className="text-xs text-gray-600">Size: {order.size || "N/A"}</p>
          <p className="text-xs">Amount: Rs. {order.amount}</p>
          <p className="text-xs text-gray-600 break-all">
            Transaction: {order.transactionUuid}
          </p>
          <div className="mt-2 flex gap-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                order.paymentStatus === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {order.paymentStatus}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                order.deliveryStatus === "delivered"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.deliveryStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDogsContent = (orders) => {
    const filteredOrders = orders.filter((order) =>
      order.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        {/* Hidden on md and above */}
        <div className="md:hidden">
          {filteredOrders.length ? (
            filteredOrders.map((order, index) => renderDogCard(order, index))
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">
              No dog orders found.
            </p>
          )}
        </div>
        {/* Hidden below md */}
        <div className="hidden md:block">{renderDogsTable(orders)}</div>
      </>
    );
  };

  const renderAccessoriesContent = (orders) => {
    const filteredOrders = orders.filter((order) =>
      order.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        {/* Hidden on md and above */}
        <div className="md:hidden">
          {filteredOrders.length ? (
            filteredOrders.map((order, index) =>
              renderAccessoryCard(order, index)
            )
          ) : (
            <p className="text-center text-gray-500 text-sm py-4">
              No accessory orders found.
            </p>
          )}
        </div>
        {/* Hidden below md */}
        <div className="hidden md:block">{renderAccessoriesTable(orders)}</div>
      </>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          My Orders
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Transaction ID..."
              className="w-full sm:w-64 p-2 pl-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Add New Order
          </button>
        </div>

        <div className="flex space-x-2 sm:space-x-4 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("dogs")}
            className={`py-2 px-4 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === "dogs"
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Dogs
          </button>
          <button
            onClick={() => setActiveTab("accessories")}
            className={`py-2 px-4 font-medium text-sm rounded-t-lg transition-colors ${
              activeTab === "accessories"
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Accessories
          </button>
        </div>

        {loading ? (
          <div className="text-center py-6">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600 text-sm">Loading orders...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 py-6 text-sm">{error}</p>
        ) : activeTab === "dogs" ? (
          renderDogsContent(dogOrders)
        ) : (
          renderAccessoriesContent(accessoryOrders)
        )}
      </div>
    </div>
  );
}
