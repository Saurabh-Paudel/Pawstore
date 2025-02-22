import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { email, username } = useSelector((state) => state.user); // Get username and email from Redux state

  // Initialize user state
  const [user, setUserState] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(true);

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toISOString().split("T")[0]; // Split to get YYYY-MM-DD
    return formattedDate;
  };

  useEffect(() => {
    if (!email) {
      toast.error("No email found in Redux state.");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${email}` // Fetch user by email from Redux state
        );
        const formattedUser = {
          ...response.data,
          dob: formatDate(response.data.dob), // Ensure dob is stored in YYYY-MM-DD format
        };
        setUserState(formattedUser);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching user data.");
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]); // Dependency on email from Redux state

  useEffect(() => {
    setFormData({ ...user }); // Sync form data with the user state
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/update/${email}`,
        {
          ...formData,
          dob: new Date(formData.dob).toISOString().split("T")[0], // Format the date before sending it
        }
      );
      const formattedUser = {
        ...response.data.user,
        dob: formatDate(response.data.user.dob), // Format date for display
      };
      setUserState(formattedUser);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating user");
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        User Profile
      </h2>
      <div className="space-y-4">
        {/* Username (read-only) */}
        <div>
          <label className="block text-gray-600 text-sm">Username</label>
          {editMode ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-700">{user.username}</p>
          )}
        </div>
        {/* Email (read-only in edit mode) */}
        <div>
          <label className="block text-gray-600 text-sm">Email</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          ) : (
            <p className="text-gray-700">{user.email}</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label className="block text-gray-600 text-sm">Phone</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-700">{user.phone}</p>
          )}
        </div>
        {/* Address */}
        <div>
          <label className="block text-gray-600 text-sm">Address</label>
          {editMode ? (
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-700">{user.address}</p>
          )}
        </div>
        {/* Gender */}
        <div>
          <label className="block text-gray-600 text-sm">Gender</label>
          {editMode ? (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-700">{user.gender}</p>
          )}
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block text-gray-600 text-sm">Date of Birth</label>
          {editMode ? (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="text-gray-700">{user.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Edit Profile
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
