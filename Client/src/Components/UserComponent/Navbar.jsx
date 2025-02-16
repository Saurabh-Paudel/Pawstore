import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">User Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
          <span>👤</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
