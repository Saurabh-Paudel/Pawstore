import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AccessoriesSales() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]); // Filtered list for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusChanged, setStatusChanged] = useState({});
  const [search, setSearch] = useState(""); // Search input state
  const { token, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      setError("Please log in to view purchase history.");
      setLoading(false);
      return;
    }

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/payments/accessory-purchase/all-purchases",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("API Response:", response.data);
        const data = Array.isArray(response.data.purchases)
          ? response.data.purchases
          : [];
        setPurchases(data);
        setFilteredPurchases(data); // Initially show all purchases
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(
          "Failed to load purchase history: " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [token]);

  // Filter purchases based on search input
  useEffect(() => {
    const filtered = purchases.filter(
      (purchase) =>
        purchase.userId
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        purchase.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPurchases(filtered);
  }, [search, purchases]);

  const handleStatusChange = (orderId, newStatus) => {
    setPurchases((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, deliveryStatus: newStatus } : order
      )
    );
    setStatusChanged((prev) => ({ ...prev, [orderId]: true }));
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (role !== "admin") {
      console.error("Unauthorized: Only admins can update status.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/payments/accessory-purchase/accessory-purchases/${orderId}`,
        { deliveryStatus: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("✅ Status Updated:", response.data);
      setPurchases((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, ...response.data.order } : order
        )
      );
      setStatusChanged((prev) => ({ ...prev, [orderId]: false }));
    } catch (error) {
      console.error(
        "❌ Status Update Failed:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Accessory Purchase History</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by User ID or Transaction ID..."
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 py-3 px-4 text-left">
                S.No
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Accessory ID
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                User ID
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Transaction ID
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Amount
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Payment Status
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Image
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Product Name
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Quantity
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Color
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Size
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Price
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Delivery Status
              </th>
              <th className="border border-gray-300 py-3 px-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase, index) => (
                <tr key={purchase._id} className="border-b hover:bg-gray-50">
                  <td className="border border-gray-300 py-3 px-4">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.accessoryId.toString()}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.userId.toString()}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.transactionUuid}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    ${purchase.amount}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.paymentStatus}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    <img
                      src={purchase.image}
                      alt={purchase.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.name}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.quantity}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.color || "N/A"}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    {purchase.size || "N/A"}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    ${purchase.price}
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    <select
                      value={purchase.deliveryStatus}
                      onChange={(e) =>
                        handleStatusChange(purchase._id, e.target.value)
                      }
                      className="bg-gray-200 p-2 rounded-md"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 py-3 px-4">
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          purchase._id,
                          purchase.deliveryStatus
                        )
                      }
                      className={`text-white bg-yellow-500 py-2 px-4 rounded-md text-base ${
                        !statusChanged[purchase._id]
                          ? "cursor-not-allowed opacity-50"
                          : ""
                      }`}
                      disabled={!statusChanged[purchase._id]}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="text-center py-6 text-gray-600">
                  No purchases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
