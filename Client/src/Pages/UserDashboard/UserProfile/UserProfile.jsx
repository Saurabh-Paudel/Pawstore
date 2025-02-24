import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const { email, username } = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    username: username || "",
    email: email || "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [insertMode, setInsertMode] = useState(true);

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  // Fetch user data
  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${email}`
        );
        if (response.data) {
          setUserData(response.data);
          setInsertMode(false); // User exists
          setFormData({ ...response.data, dob: formatDate(response.data.dob) });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Insert new user
  const handleInsert = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/insert`,
        formData
      );
      setUserData(response.data);
      setInsertMode(false);
      toast.success("User data inserted successfully!");
    } catch (error) {
      toast.error("Error inserting user data.");
      console.error("Insert error:", error);
    }
  };

  // Update existing user
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/user/update/${email}`,
        formData
      );
      setUserData(response.data);
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating user");
      console.error("Update error:", error);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
        Your Profile
      </h2>

      {insertMode ? (
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              readOnly
              className="w-full p-3 mt-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-3 mt-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleInsert}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Insert
            </button>
          </div>
        </div>
      ) : editMode ? (
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={userData.username}
              readOnly
              className="w-full p-3 mt-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              readOnly
              className="w-full p-3 mt-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p>
            <strong className="font-semibold text-gray-700">Username:</strong>{" "}
            {userData.username}
          </p>
          <p>
            <strong className="font-semibold text-gray-700">Email:</strong>{" "}
            {userData.email}
          </p>
          <p>
            <strong className="font-semibold text-gray-700">Phone:</strong>{" "}
            {userData.phone}
          </p>
          <p>
            <strong className="font-semibold text-gray-700">Address:</strong>{" "}
            {userData.address}
          </p>
          <p>
            <strong className="font-semibold text-gray-700">Gender:</strong>{" "}
            {userData.gender}
          </p>
          <p>
            <strong className="font-semibold text-gray-700">
              Date of Birth:
            </strong>{" "}
            {userData.dob}
          </p>

          <div className="mt-4">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
