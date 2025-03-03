import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaUser,
  FaShoppingCart,
  FaNewspaper,
  FaEnvelope,
  FaCog,
  FaHome,
} from "react-icons/fa";
import { logout } from "../../redux/slices/userSlice";

const Sidebar = ({ setUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
    if (setUser) setUser(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      {!isSidebarOpen && (
        <button
          className="text-white bg-gray-800 p-3 fixed top-4 left-4 rounded-md z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <FaBars size={24} />
        </button>
      )}

      <div
        className={`fixed top-0 left-0 bg-gray-800 text-white w-64 h-full px-4 py-8 transition-transform transform z-50 ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-64 "
        } md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <button
          className="absolute top-4 right-4 text-white bg-gray-700 p-2 rounded-md md:hidden"
          onClick={closeSidebar}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 mt-4">Dashboard</h2>

        <div className="overflow-y-auto h-full">
          <ul className="space-y-4">
            {[
              {
                to: "/dashboard",
                icon: <FaTachometerAlt />,
                label: "Dashboard",
              },
              { to: "user-profile", icon: <FaUser />, label: "My Profile" },
              { to: "my-orders", icon: <FaShoppingCart />, label: "My Orders" },
              {
                to: "user-newsletter",
                icon: <FaNewspaper />,
                label: "Newsletters",
              },
              { to: "my-messages", icon: <FaEnvelope />, label: "Messages" },
              { to: "settings", icon: <FaCog />, label: "Settings" },
              { to: "/", icon: <FaHome />, label: "Home" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-all"
                  onClick={closeSidebar} // Close sidebar when link is clicked
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 hover:bg-red-600 p-3 rounded-lg w-full transition-all"
              >
                <FaSignOutAlt className="text-xl text-red-400" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
