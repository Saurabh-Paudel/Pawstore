import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export default function AccessoriesSales() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusChanged, setStatusChanged] = useState({});
  const [search, setSearch] = useState(""); // Search input state
  const { token, role } = useSelector((state) => state.user);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      setError("Please log in to view purchase history.");
      setLoading(false);
      return;
    }

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/payments/accessory-purchase/all-purchases`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
        toast.error("Failed to load purchase history!"); // Show error toast
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
      toast.error("Unauthorized: Only admins can update status."); // Show unauthorized toast
      console.error("Unauthorized: Only admins can update status.");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/payments/accessory-purchase/accessory-purchases/${orderId}`,
        { deliveryStatus: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPurchases((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, ...response.data.order } : order
        )
      );
      setStatusChanged((prev) => ({ ...prev, [orderId]: false }));
      toast.success("Status updated successfully!"); // Show success toast
    } catch (error) {
      console.error(
        "❌ Status Update Failed:",
        error.response?.data || error.message
      );
      toast.error("Status update failed!"); // Show failure toast
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Accessory Purchase History</h2>

      {/* Search and Add New button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by User ID or Transaction ID..."
          className="mb-4 sm:mb-0 p-2 border rounded w-full sm:max-w-md"
        />
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Add New
        </button>
      </div>

      {/* Responsive Table for Large Screens, Cards for Small Screens */}
      <div className="bg-white shadow rounded-lg overflow-auto">
        <div className="hidden sm:block">
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
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
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

        {/* Card View for Small Screens */}
        <div className="sm:hidden">
          {filteredPurchases.length > 0 ? (
            filteredPurchases.map((purchase, index) => (
              <div
                key={purchase._id}
                className="bg-white shadow rounded-lg p-4 mb-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/3">
                    <img
                      src={purchase.image}
                      alt={purchase.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <h3 className="text-xl font-bold">{purchase.name}</h3>
                    <p>
                      <strong>Accessory ID:</strong> {purchase.accessoryId}
                    </p>
                    <p>
                      <strong>User ID:</strong> {purchase.userId}
                    </p>
                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {purchase.transactionUuid}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${purchase.amount}
                    </p>
                    <p>
                      <strong>Status:</strong> {purchase.paymentStatus}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {purchase.quantity}
                    </p>
                    <p>
                      <strong>Color:</strong> {purchase.color || "N/A"}
                    </p>
                    <p>
                      <strong>Size:</strong> {purchase.size || "N/A"}
                    </p>
                    <p>
                      <strong>Price:</strong> ${purchase.price}
                    </p>
                    <div>
                      <select
                        value={purchase.deliveryStatus}
                        onChange={(e) =>
                          handleStatusChange(purchase._id, e.target.value)
                        }
                        className="bg-gray-200 p-2 rounded-md mb-2"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No purchases found.</div>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
