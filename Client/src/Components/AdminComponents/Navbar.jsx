import React from "react";

function Navbar() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Admin Panel</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
        />
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}

export default Navbar;
