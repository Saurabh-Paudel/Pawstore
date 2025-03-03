import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FaTachometerAlt,
  FaBox,
  FaUserAlt,
  FaPaw,
  FaCogs,
  FaSignOutAlt,
  FaEnvelopeOpenText,
  FaBlogger,
  FaCartPlus,
  FaDog,
  FaTimes,
  FaBars,
  FaCommentAlt,
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { logout } from "../../redux/slices/userSlice";

const Sidebar = ({ setUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
    if (setUser) setUser(null); // Ensure user state is cleared
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSalesMenu = () => {
    setIsSalesOpen(!isSalesOpen);
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
        } md:translate-x-0 md:relative md:flex md:flex-col`} // Adjust for header or padding
      >
        <button
          className="absolute top-4 right-4 text-white bg-gray-700 p-2 rounded-md md:hidden"
          onClick={closeSidebar}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 mt-4">Dashboard</h2>

        <div className="overflow-y-auto h-full">
          {/* Scrollable container for the menu */}
          <ul className="space-y-4">
            {/* Dashboard Menu */}
            <li>
              <Link
                to="/admin"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaTachometerAlt className="text-xl" />
                <span>Dashboard</span>
              </Link>
            </li>
            {/* Dogs Menu */}
            <li>
              <Link
                to="/admin/dog"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaDog className="text-xl" />
                <span>Dog</span>
              </Link>
            </li>
            {/* Dog Breeds Menu */}
            <li>
              <Link
                to="/admin/dog-breeds"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaPaw className="text-xl" />
                <span>Dog Breeds</span>
              </Link>
            </li>
            {/* Products Menu */}
            <li>
              <Link
                to="/admin/pet-products"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaBox className="text-xl" />
                <span>Products</span>
              </Link>
            </li>
            {/* Blog Menu */}
            <li>
              <Link
                to="/admin/blogs"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaBlogger className="text-xl" />
                <span>Blogs</span>
              </Link>
            </li>
            {/* Newsletters Menu */}
            <li>
              <Link
                to="/admin/newsletters"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaEnvelopeOpenText className="text-xl" />
                <span>Newsletters</span>
              </Link>
            </li>
            {/* Messages Menu */}
            <li>
              <Link
                to="/admin/messages"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaCommentAlt className="text-xl" />
                <span>Messages</span>
              </Link>
            </li>
            {/* Sales (Collapsible Menu) */}
            <li
              onClick={toggleSalesMenu}
              className="flex items-center justify-between space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <FaCartPlus className="text-xl" />
                <span>Sales</span>
              </div>
              {isSalesOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </li>
            {/* Sales Submenu */}
            {isSalesOpen && (
              <ul className="ml-6 space-y-2">
                <li>
                  <Link
                    to="/admin/sales/dogs"
                    onClick={closeSidebar} // Close sidebar when link is clicked
                    className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
                  >
                    <FaPaw className="text-xl" />
                    <span>Dogs</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/sales/accessories"
                    onClick={closeSidebar} // Close sidebar when link is clicked
                    className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
                  >
                    <FaBox className="text-xl" />
                    <span>Dog Accessories</span>
                  </Link>
                </li>
              </ul>
            )}
            {/* Users Menu */}
            <li>
              <Link
                to="/admin/users"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaUserAlt className="text-xl" />
                <span>Users</span>
              </Link>
            </li>
            {/* Settings Menu */}
            <li>
              <Link
                to="/admin/genral-settings"
                onClick={closeSidebar} // Close sidebar when link is clicked
                className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
              >
                <FaCogs className="text-xl" />
                <span>Settings</span>
              </Link>
            </li>
            {/* Logout Menu */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 hover:bg-red-600 p-2 rounded w-full"
              >
                <FaSignOutAlt className="text-xl" />
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
