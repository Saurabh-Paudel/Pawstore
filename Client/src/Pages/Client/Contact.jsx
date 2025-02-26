import React, { useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/messages",
        formData
      );

      // Show success toast
      toast.success("Message sent successfully!", {
        autoClose: 1500, // Close after 1.5 seconds
        hideProgressBar: false, // Optional: Show progress bar for clarity
        closeOnClick: true, // Allow manual close
        pauseOnHover: true, // Pause timer on hover
      });

      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      // Show error toast
      toast.error("There was an error sending the message. Please try again.", {
        autoClose: 1500, // Close after 1.5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full h-[50px] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full h-[50px] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608]"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608]"
          ></textarea>
          <button className="bg-[#E58608] hover:bg-[#D87407] transition-all duration-300 rounded-full font-medium text-lg h-[50px] w-full text-white shadow-md">
            Send Message
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right" // Adjust position if needed
        autoClose={1500} // Default timeout for toasts (matches your setting)
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1} // Prevent stacking of multiple toasts
      />
    </div>
  );
}
