import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice"; // Adjust the path as needed

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout()); // Dispatch logout action
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaUsers className="text-xl" />
              && <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaChartLine className="text-xl" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaCog className="text-xl" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded w-full transition-all"
            >
              <FaSignOutAlt className="text-xl text-red-400" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
