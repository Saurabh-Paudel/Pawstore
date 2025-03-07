import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneralSetting = () => {
  const { token } = useSelector((state) => state.user);
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.userId || "";

  const [passwordData, setPasswordData] = useState({
    userId,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [bannerContent, setBannerContent] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
  });

  const [banners, setBanners] = useState([]);

  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch banners
        const bannerResponse = await axios.get(
          `${BACKEND_URL}/api/banners/banners`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBanners(bannerResponse.data.banners);

        // Fetch contact info
        const contactResponse = await axios.get(
          `${BACKEND_URL}/api/contact/contact`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (contactResponse.data.contact) {
          setContactInfo(contactResponse.data.contact);
        }
      } catch (err) {
        toast.error(
          "Failed to load data: " + (err.response?.data?.message || err.message)
        );
      }
    };

    if (token) {
      fetchData();
      setPasswordData((prev) => ({ ...prev, userId }));
    }
  }, [token, userId]);

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
        `${BACKEND_URL}/api/account/change-password`,
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

  const handleBannerInsert = async (e) => {
    e.preventDefault();
    if (
      !bannerContent.name ||
      !bannerContent.title ||
      !bannerContent.description ||
      !bannerContent.image
    ) {
      toast.error(
        "Please fill in all fields (name, title, description, image)!"
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", bannerContent.name);
    formData.append("title", bannerContent.title);
    formData.append("description", bannerContent.description);
    formData.append("image", bannerContent.image);

    console.log("FormData contents:", Array.from(formData.entries()));

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/banners/banners`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBanners((prev) => [...prev, response.data.banner]);
      toast.success(response.data.message || "Banner added successfully!");
      setBannerContent({ name: "", title: "", description: "", image: null });
      setMessage("");
      setError("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding banner");
      console.error("Error details:", err.response?.data);
      setMessage("");
      setError("");
    }
  };

  const handleBannerDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/banners/banners/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBanners((prev) => prev.filter((banner) => banner._id !== id));
      toast.success(response.data.message || "Banner deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting banner");
    }
  };

  const handleContactUpdate = async (e) => {
    e.preventDefault();
    if (!contactInfo.address || !contactInfo.phone || !contactInfo.email) {
      toast.error("Please fill in all contact fields (address, phone, email)!");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/contact/contact`,
        contactInfo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContactInfo(response.data.contact);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerContent((prevContent) => ({
        ...prevContent,
        image: file,
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
        <h3 className="text-xl font-semibold mb-4">Manage Banner Content</h3>
        <form onSubmit={handleBannerInsert} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Banner Name
            </label>
            <input
              type="text"
              name="name"
              value={bannerContent.name}
              onChange={(e) =>
                setBannerContent({ ...bannerContent, name: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>
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
              Banner Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
            {bannerContent.image && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(bannerContent.image)}
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
            Add Banner
          </button>
        </form>

        {/* Current Banners List */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Current Banners</h4>
          {banners.length > 0 ? (
            <ul className="space-y-4">
              {banners.map((banner) => (
                <li
                  key={banner._id}
                  className="flex items-center space-x-4 border p-4 rounded-lg"
                >
                  <img
                    src={`${BACKEND_URL}${banner.image}`}
                    alt={banner.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Name: {banner.name}</p>
                    <p className="font-medium">Title: {banner.title}</p>
                    <p className="text-gray-600">
                      Description: {banner.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBannerDelete(banner._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No banners found.</p>
          )}
        </div>
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
