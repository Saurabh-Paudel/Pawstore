import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../../redux/slices/userSlice"; // Import logout action

export default function UserSettings() {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Get token from Redux store
  const user = useSelector((state) => state.user);
  const token = user?.token;

  // Decode user ID from token
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // Handle Password Change
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/account/change-password`,
        { userId, currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (!confirmDelete) return;

    try {
      // First, delete from userModel (users collection)
      const response = await axios.delete(
        `${BACKEND_URL}/api/account/delete-account`,
        { data: { userId, email: user.email } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);

      // Optionally, you can handle the front-end logout and redirection after both deletions are confirmed
      dispatch(logout());
      localStorage.removeItem("user");
      window.location.replace("/"); // Redirect to home or login page after deletion
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(error.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        User Settings
      </h2>

      {/* Change Password Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Change Password
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-6">
        <h3 className="text-xl font-semibold mb-4 text-red-600">
          Delete Account
        </h3>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
