import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS

const GeneralSetting = () => {
  const { token } = useSelector((state) => state.user);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId || ""; // Get userId from token

  // State for different sections
  const [passwordData, setPasswordData] = useState({
    userId: userId, // Include userId from token
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [bannerContent, setBannerContent] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Update userId in passwordData when token changes
  useEffect(() => {
    setPasswordData((prev) => ({ ...prev, userId }));
  }, [userId]);

  // Handle Password Change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/api/account/change-password", // Correct endpoint
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message || "Password updated successfully!");
      setPasswordData({
        userId,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setMessage("");
      setError("");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Error updating password. Please try again."
      );
      setMessage("");
      setError("");
    }
  };

  // Handle Banner Content Update (unchanged)
  const handleBannerUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/settings/update-banner",
        bannerContent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message || "Banner updated successfully!");
      setMessage("");
      setError("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error updating banner content"
      );
      setMessage("");
      setError("");
    }
  };

  // Handle Contact Info Update (unchanged)
  const handleContactUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/settings/update-contact",
        contactInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(
        response.data.message || "Contact info updated successfully!"
      );
      setMessage("");
      setError("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error updating contact information"
      );
      setMessage("");
      setError("");
    }
  };

  // Handle Banner Image Change (unchanged)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerContent((prevContent) => ({
        ...prevContent,
        image: URL.createObjectURL(file),
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
      <ToastContainer />
    </div>
  );
};

export default GeneralSetting;
