import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="py-16 px-5 md:px-10 lg:px-[141px]">
      <h2 className="text-3xl font-bold text-black text-center lg:text-4xl xl:text-5xl mb-10">
        Contact Us
      </h2>
      <p className="text-lg text-gray-600 text-center mb-10">
        Have questions or need assistance? Get in touch with us today!
      </p>

      {/* Contact Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
          <FaMapMarkerAlt className="text-[#E58608] text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-black">Address</h3>
          <p className="text-gray-600 mt-2">Mahendrapool, Pokhara, Nepal</p>
        </div>

        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
          <FaPhoneAlt className="text-[#E58608] text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-black">Phone</h3>
          <p className="text-gray-600 mt-2">+977-061-328463</p>
        </div>

        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
          <FaEnvelope className="text-[#E58608] text-4xl mb-3" />
          <h3 className="text-xl font-semibold text-black">Email</h3>
          <p className="text-gray-600 mt-2">info@pawsomecare.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-black mb-6 text-center">
          Send Us a Message
        </h3>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full h-[50px] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608]"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full h-[50px] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608]"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608]"
          ></textarea>
          <button className="bg-[#E58608] hover:bg-[#D87407] transition-all duration-300 rounded-full font-medium text-lg h-[50px] w-full text-white shadow-md">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
