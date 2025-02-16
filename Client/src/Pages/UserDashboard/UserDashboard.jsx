import React from "react";

export default function UserDashboard() {
  return (
    <div className="p-6 bg-gray-100 flex-1">
      <h2 className="text-2xl font-bold mb-6">Welcome to the Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Active Projects</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
    </div>
  );
}
