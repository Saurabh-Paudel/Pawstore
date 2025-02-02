import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#F6FAFF] w-full px-6 text-center md:px-10 lg:px-[141px] flex flex-col justify-between font-poppins">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-10 md:gap-24 py-10">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-[164px] text-center md:text-left">
          {/* Useful Links */}
          <div>
            <p className="font-semibold text-xl mb-4">Useful Links</p>
            <ul className="space-y-2 text-lg">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>Team</li>
              <li>FAQs</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <p className="font-semibold text-xl mb-4">Contact Us</p>
            <ul className="space-y-2 text-lg">
              <li>Mahendrapool</li>
              <li>Pokhara, Nepal</li>
              <li>+977-[0]61-328463</li>
            </ul>
          </div>
        </div>

        {/* Google Map */}
        <div className="lg:w-[600] lg:h-[270px] h-auto w-auto sm:border sm:rounded-[10px] ">
          <iframe
            title="Google Map"
            className="lg:w-[500px] xl:w-[600px] lg:h-[269px] h-auto w-auto border-0 rounded-[10px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.518541512195!2d85.31634337903637!3d27.70127176437807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19688077a1ff%3A0x3ea9b1c08b4234dc!2sMindrisers%20Institute%20of%20Technology!5e0!3m2!1sen!2snp!4v1738255426563!5m2!1sen!2snp"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full py-6 flex-col  md:flex-row flex items-center md:items-center md:gap-4  md:justify-between text-base text-[#050706]">
        <p className="mb-2 text-center">Copyright @ 2021 GrandmaBakery</p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mb-2">
          <FaFacebookF className="h-5 w-5 cursor-pointer text-[#4C7AEF]" />
          <FaYoutube className="h-5 w-5 cursor-pointer text-[#DF2424]" />
          <FaInstagram className="h-5 w-5 cursor-pointer text-[#A0007D]" />
        </div>

        <p className="text-center">Created by Brandbuilder</p>
      </div>
    </div>
  );
}
