import React, { useState } from "react";
import Icon from "../../assets/icon.png";
import { BiSearch, BiMenu, BiX } from "react-icons/bi";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FDEDD4] py-3 px-6 md:px-10 xl:px-[141px]  flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Icon} alt="Icon" className="h-8 w-8" />
        <p className="font-poppins font-bold text-lg">Pawstore</p>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-10  text-black">
        <li className="hover:font-medium cursor-pointer">Home</li>
        <li className="hover:font-medium cursor-pointer">Breeds</li>
        <li className="hover:font-medium cursor-pointer">Accessories</li>
        <li className="hover:font-medium cursor-pointer">Blog</li>
        <li className="hover:font-medium cursor-pointer">Contact</li>
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <input
            type="search"
            placeholder="Search for pets..."
            className="h-10 w-[276px] rounded-[20px] px-4 pr-12 bg-[#FFFDFA] border-none"
          />
          <BiSearch className="absolute top-2 right-3 text-gray-500 h-6 w-6" />
        </div>
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <BiX className="h-8 w-8" />
        ) : (
          <BiMenu className="h-8 w-8" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#FDEDD4] p-6 flex flex-col items-center space-y-4 md:hidden z-10 list-none">
          <li className="hover:font-bold cursor-pointer">Home</li>
          <li className="hover:font-bold cursor-pointer">Breeds</li>
          <li className="hover:font-bold cursor-pointer">Accessories</li>
          <li className="hover:font-bold cursor-pointer">Blog</li>
          <li className="hover:font-bold cursor-pointer">Contact</li>
          {/* Search Bar in Mobile */}
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search for pets..."
              className="h-10 w-full rounded-[20px] px-4 pr-12 bg-[#FFFDFA] border-none"
            />
            <BiSearch className="absolute top-2 right-3 text-gray-500 h-6 w-6" />
          </div>
        </div>
      )}
    </nav>
  );
}
