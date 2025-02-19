import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaEnvelope,
  FaNewspaper,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="user-profile"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaUser className="text-xl" />
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaShoppingCart className="text-xl" />
              <span>My Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaHeart className="text-xl" />
              <span>Favorites</span>
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaEnvelope className="text-xl" />
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link
              to="/newsletters"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaNewspaper className="text-xl" />
              <span>Newsletters</span>
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
            <Link
              to="/help"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaQuestionCircle className="text-xl" />
              <span>Help & Support</span>
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
