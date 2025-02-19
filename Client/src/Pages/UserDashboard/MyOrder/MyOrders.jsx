import React, { useState } from "react";

const MyOrders = () => {
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "ORD1234",
      product: "Golden Retriever",
      date: "2024-02-15",
      price: "$1200",
      status: "Shipped",
    },
    {
      id: "ORD5678",
      product: "Bulldog",
      date: "2024-02-10",
      price: "$1500",
      status: "Processing",
    },
    {
      id: "ORD9101",
      product: "Beagle",
      date: "2024-02-05",
      price: "$800",
      status: "Delivered",
    },
  ];

  // Filter orders based on search input
  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">My Orders</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Orders"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">Order ID</th>
              <th className="py-3 px-6 text-left text-gray-700">Product</th>
              <th className="py-3 px-6 text-left text-gray-700">Date</th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-800">{order.id}</td>
                  <td className="py-3 px-6 text-gray-800">{order.product}</td>
                  <td className="py-3 px-6 text-gray-500">{order.date}</td>
                  <td className="py-3 px-6 text-gray-500">{order.price}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Shipped"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
