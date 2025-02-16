import React from "react";

export default function UserDashboard() {
  return (
    <div className="p-6 bg-gray-100 flex-1">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to the Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$12,345</p>
        </div>

        {/* Active Projects */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">
            Active Projects
          </h3>
          <p className="text-3xl font-bold text-orange-600">15</p>
        </div>
      </div>
    </div>
  );
}
