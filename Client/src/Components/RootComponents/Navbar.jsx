import React, { useState } from "react";
import Icon from "../../assets/icon.png";
import { BiSearch, BiMenu, BiX, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FDEDD4] py-3 px-6 md:px-10 xl:px-[141px] flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <div className="flex items-center gap-3">
          <img src={Icon} alt="Icon" className="h-10 w-10" />
          <p className="font-poppins font-bold text-lg">Pawstore</p>
        </div>
      </Link>

      {/* Desktop Navigation (Hidden on md, Visible on lg) */}
      <div className="hidden lg:flex items-center gap-x-6">
        <ul className="flex items-center gap-x-4 text-black">
          {[
            { name: "Home", path: "/" },
            { name: "Breeds", path: "/breeds" },
            { name: "Accessories", path: "/accessories" },
            { name: "Blogs", path: "/blogs" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.path} className="hover:font-medium">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="relative hidden lg:flex items-center ml-4">
          <input
            type="search"
            placeholder="Search for pets..."
            className="h-10 w-[180px] lg:w-[200px] rounded-[20px] px-4 pr-10 bg-[#FFFDFA] border-none"
          />
          <BiSearch className="absolute right-3 text-gray-500 h-6 w-6" />
        </div>
        {/* Login Icon */}
        <Link to="/login" className="ml-4">
          <BiUser className="text-gray-600 hover:text-black h-7 w-7" />
        </Link>
      </div>

      {/* Hamburger Menu Button (Now Visible on md) */}
      <button
        className="md:flex lg:hidden z-50"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
          document.body.style.overflow = isMenuOpen ? "auto" : "hidden"; // Prevent scrolling when menu is open
        }}
      >
        {isMenuOpen ? (
          <BiX className="h-8 w-8" />
        ) : (
          <BiMenu className="h-8 w-8" />
        )}
      </button>

      {/* Mobile Menu (Shows at md and below) */}
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
          ].map(({ name, path }) => (
            <li key={name} className="hover:font-medium">
              <Link
                to={path}
                onClick={() => {
                  setIsMenuOpen(false);
                  document.body.style.overflow = "auto";
                }}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search Bar in Mobile */}
        <div className="relative w-3/4 mt-4">
          <input
            type="search"
            placeholder="Search for pets..."
            className="h-10 w-full rounded-[20px] px-4 pr-12 bg-[#FFFDFA] border-none"
          />
          <BiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 h-6 w-6" />
        </div>

        {/* Login Icon with Text */}
        <Link
          to="/login"
          className="mt-6 flex items-center gap-x-2 text-gray-700 hover:text-black text-lg"
        >
          <BiUser className="h-6 w-6" />
          <span>Login</span>
        </Link>
      </div>
    </nav>
  );
}
