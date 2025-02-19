import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import dispatch if using Redux
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
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { logout } from "../../redux/slices/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSalesOpen, setIsSalesOpen] = useState(false);

  const handleLogout = () => {
    // Clear user session from local storage
    localStorage.removeItem("user");

    // Dispatch the logout action (assuming you have a logout action in your Redux store)
    dispatch(logout());

    // Redirect to the login page
    navigate("/login");
  };

  const toggleSalesMenu = () => {
    setIsSalesOpen(!isSalesOpen);
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-64">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          {/* Dashboard Menu */}
          <li>
            <Link
              to="/admin"
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaTachometerAlt className="text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Dogs sell */}
          <li>
            <Link
              to="/admin/dog"
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
              className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
            >
              <FaEnvelopeOpenText className="text-xl" />
              <span>Newsletters</span>
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
                  className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded"
                >
                  <FaPaw className="text-xl" />
                  <span>Dogs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/sales/accessories"
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
  );
};

export default Sidebar;
