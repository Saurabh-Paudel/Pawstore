import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaUserAlt,
  FaPaw,
  FaCogs,
  FaSignOutAlt,
  FaEnvelopeOpenText, // Newsletter Icon
  FaBlogger, // Blog Icon
  FaCartPlus,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice"; // Import logoutUser

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSalesOpen, setIsSalesOpen] = useState(false);

  // Toggle sales menu with persistent state
  const toggleSalesMenu = () => {
    const newSalesMenuState = !isSalesOpen;
    setIsSalesOpen(newSalesMenuState);
    localStorage.setItem("salesMenuOpen", JSON.stringify(newSalesMenuState)); // Persist in localStorage
  };

  // Load sales menu state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("salesMenuOpen");
    if (savedState !== null) {
      setIsSalesOpen(JSON.parse(savedState));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout()); // Use logoutUser instead of setUser
    navigate("/login");
  };

  return (
    <div className="w-64 max-h-full bg-gray-100 text-gray-800 p-5 shadow-md">
      <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          {/* Dashboard Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaTachometerAlt className="text-blue-600" />
            <Link to="/admin" className="flex-1 text-gray-800">
              Dashboard
            </Link>
          </li>

          {/* Dog Breeds Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaPaw className="text-blue-600" />
            <Link to="/admin/dog-breeds" className="flex-1 text-gray-800">
              Dog Breeds
            </Link>
          </li>

          {/* Products Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaBox className="text-blue-600" />
            <Link to="/admin/pet-products" className="flex-1 text-gray-800">
              Products
            </Link>
          </li>

          {/* Blog Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaBlogger className="text-blue-600" />
            <Link to="/admin/blog" className="flex-1 text-gray-800">
              Blog
            </Link>
          </li>

          {/* Newsletters Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaEnvelopeOpenText className="text-blue-600" />
            <Link to="/admin/newsletters" className="flex-1 text-gray-800">
              Newsletters
            </Link>
          </li>

          {/* Users Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaUserAlt className="text-blue-600" />
            <Link to="/admin/users" className="flex-1 text-gray-800">
              Users
            </Link>
          </li>

          {/* Settings Menu */}
          <li className="flex items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg transition-all">
            <FaCogs className="text-blue-600" />
            <Link to="/admin/settings" className="flex-1 text-gray-800">
              Settings
            </Link>
          </li>

          {/* Sales Menu (with submenus) */}
          <li
            onClick={toggleSalesMenu}
            className="flex items-center justify-between space-x-3 hover:bg-blue-200 p-2 rounded-lg cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2">
              <FaCartPlus className="text-blue-600" />
              <span className="flex-1 text-gray-800">Sales</span>
            </div>
            <div>
              <MdKeyboardArrowDown className="text-blue-600 text-xl" />
            </div>
          </li>
          {isSalesOpen && (
            <ul className="ml-6 space-y-2">
              {/* Dogs Submenu */}
              <li className="flex items-center space-x-3 hover:bg-blue-100 p-2 rounded-lg transition-all">
                <FaPaw className="text-blue-600" />
                <Link to="/admin/sales/dogs" className="text-gray-800">
                  Dogs
                </Link>
              </li>

              {/* Dog Accessories Submenu */}
              <li className="flex items-center space-x-3 hover:bg-blue-100 p-2 rounded-lg transition-all">
                <FaBox className="text-blue-600" />
                <Link
                  to="/admin/sales/dog-accessories"
                  className="text-gray-800"
                >
                  Dog Accessories
                </Link>
              </li>
            </ul>
          )}

          {/* Logout Menu */}
          <li
            onClick={handleLogout}
            className="flex items-center space-x-3 cursor-pointer hover:bg-red-200 p-2 rounded-lg transition-all"
          >
            <FaSignOutAlt className="text-red-600" />
            <span className="text-gray-800">Logout</span>
          </li>
        </ul>
      </nav>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
