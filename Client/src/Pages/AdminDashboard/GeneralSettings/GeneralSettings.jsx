import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const GeneralSetting = () => {
  const { token } = useSelector((state) => state.user);

  // State for different sections
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [bannerContent, setBannerContent] = useState({
    title: "",
    description: "",
    image: null, // Store image URL for preview
  });

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/settings/change-password",
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError("Error updating password");
    }
  };

  // Handle Banner Content Update
  const handleBannerUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/settings/update-banner",
        bannerContent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError("Error updating banner content");
    }
  };

  // Handle Contact Info Update
  const handleContactUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/settings/update-contact",
        contactInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError("Error updating contact information");
    }
  };

  // Handle Banner Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerContent((prevContent) => ({
        ...prevContent,
        image: URL.createObjectURL(file), // Show image preview
      }));
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        General Settings
      </h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Change Password Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-6">
          {/* Password Fields */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Banner Content Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Update Banner Content</h3>
        <form onSubmit={handleBannerUpdate} className="space-y-6">
          {/* Title and Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Banner Title
            </label>
            <input
              type="text"
              name="title"
              value={bannerContent.title}
              onChange={(e) =>
                setBannerContent({ ...bannerContent, title: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Banner Description
            </label>
            <textarea
              name="description"
              value={bannerContent.description}
              onChange={(e) =>
                setBannerContent({
                  ...bannerContent,
                  description: e.target.value,
                })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          {/* Banner Image Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Banner Image (Optional)
            </label>
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              onChange={handleImageChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            {bannerContent.image && (
              <div className="mt-3">
                <img
                  src={bannerContent.image}
                  alt="Banner Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition-all"
          >
            Update Banner
          </button>
        </form>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">
          Update Contact Information
        </h3>
        <form onSubmit={handleContactUpdate} className="space-y-6">
          {/* Contact Info Fields */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={contactInfo.address}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, address: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-all"
          >
            Update Contact Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralSetting;
