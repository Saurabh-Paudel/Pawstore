import React, { useState, useEffect, useRef } from "react";
import Icon from "../../assets/icon.png";
import {
  BiSearch,
  BiMenu,
  BiX,
  BiUser,
  BiChevronDown,
  BiLogOut,
} from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Determine dashboard path based on user role
  const dashboardPath =
    user.token && user.role === "buyer"
      ? "/dashboard"
      : user.token && user.role === "admin"
      ? "/admin"
      : null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <nav className="bg-[#FDEDD4] py-3 px-6 md:px-10 xl:px-[141px] flex items-center justify-between relative">
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <div className="flex items-center gap-3">
          <img src={Icon} alt="Icon" className="h-10 w-10" />
          <p className="font-poppins font-bold text-lg">Pawstore</p>
        </div>
      </Link>

      <div className="hidden lg:flex items-center gap-x-6">
        <ul className="flex items-center gap-x-4 text-black">
          {[
            { name: "Home", path: "/" },
            { name: "Breeds", path: "/breeds" },
            { name: "Accessories", path: "/accessories" },
            { name: "Blogs", path: "/blogs" },
            { name: "Contact", path: "/contact" },
            { name: "Dogs-Sales", path: "/dog-sales" },
          ].map(({ name, path }) => (
            <li key={path} className="hover:font-medium">
              <Link to={path} onClick={closeMenu}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleSearch}
          className="relative hidden lg:flex items-center ml-4"
        >
          <input
            type="search"
            placeholder="Search for pets or products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-[250px] rounded-[20px] px-4 pr-10 bg-[#FFFDFA] border-none focus:outline-none focus:ring-2 focus:ring-[#FFD1A7] transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <BiSearch className="text-gray-500 h-6 w-6 hover:text-[#FF8C38] transition-colors duration-200" />
          </button>
        </form>

        {user.token ? (
          <div ref={dropdownRef} className="relative">
            <span
              className="text-black text-lg cursor-pointer flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user.username} <BiChevronDown className="ml-1 text-xl" />
            </span>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                {dashboardPath && (
                  <Link
                    to={dashboardPath} // Dynamic dashboard path
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <AiOutlineDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <BiLogOut className="h-5 w-5" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="ml-4">
            <div className="flex gap-2 text-gray-600 hover:text-black font-poppins">
              <BiUser className="h-6 w-6" />
              <span className="text-base">Login</span>
            </div>
          </Link>
        )}
      </div>

      <button
        className="md:flex lg:hidden z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <BiX className="h-8 w-8" />
        ) : (
          <BiMenu className="h-8 w-8" />
        )}
      </button>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[#FDEDD4] flex flex-col items-center pt-20 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:flex lg:hidden z-40`}
      >
        <ul className="space-y-6 text-center">
          {[
            { name: "Home", path: "/" },
            { name: "Breeds", path: "/breeds" },
            { name: "Accessories", path: "/accessories" },
            { name: "Blogs", path: "/blogs" },
            { name: "Contact", path: "/contact" },
            { name: "Dogs-Sales", path: "/dog-sales" },
          ].map(({ name, path }) => (
            <li key={path} className="hover:font-medium">
              <Link to={path} onClick={closeMenu}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSearch} className="relative w-3/4 mt-4">
          <input
            type="search"
            placeholder="Search for pets or products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-[20px] px-4 pr-12 bg-[#FFFDFA] border-none focus:outline-none focus:ring-2 focus:ring-[#FFD1A7]"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <BiSearch className="text-gray-500 h-6 w-6 hover:text-[#FF8C38]" />
          </button>
        </form>

        {user.token ? (
          <div className="mt-6 flex flex-col items-center gap-3">
            {dashboardPath && (
              <Link
                to={dashboardPath} // Dynamic dashboard path
                className="text-lg text-gray-700 hover:text-black flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <AiOutlineDashboard className="h-5 w-5" /> Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-lg text-gray-700 hover:text-black flex items-center gap-2"
            >
              <BiLogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="mt-6 text-lg text-gray-700 hover:text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
