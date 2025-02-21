import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { username, email } = useSelector((state) => state.user);

  // Initialize user state using username and email from Redux, along with other fields.
  const [user, setUserState] = useState({
    username, // represents both username and name
    email,
    phone: "123-456-7890",
    address: "123 Main Street, City, Country",
    gender: "Male",
    dob: "1990-01-01",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserState({ ...formData });
    // Dispatching with updated form data.
    dispatch(
      setUser({
        username: formData.username,
        email: formData.email,
        ...formData,
      })
    );
    setEditMode(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        User Profile
      </h2>
      <div className="space-y-4">
        {/* Username (read-only) */}
        <div>
          <label className="block text-gray-600 text-sm">Username</label>
          <p className="text-gray-700">{user.username}</p>
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
    </div>
  );
};

export default UserProfile;
