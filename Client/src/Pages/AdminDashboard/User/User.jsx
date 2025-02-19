import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token, role } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (!token) {
          setError("You need to login first");
          setLoading(false);
          return;
        }

        if (role !== "admin") {
          setError("You are not authorized to access this page");
          setLoading(false);
          return;
        }

        // Make sure the Authorization header is correctly formatted
        console.log("Sending Authorization Header:", `Bearer ${token}`);

        const response = await axios.get(
          "http://localhost:8000/api/auth/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching users:",
          err.response?.data || err.message
        );

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Error fetching users data");
        }

        setLoading(false);
      }
    };

    fetchUsersData();
  }, [token, role]); // Dependency array updated

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800">User Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700">S.No</th>
                <th className="py-3 px-6 text-left text-gray-700">Name</th>
                <th className="py-3 px-6 text-left text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                    <td className="py-3 px-6 text-gray-800">{user.name}</td>
                    <td className="py-3 px-6 text-gray-500">{user.email}</td>
                    <td className="py-3 px-6 text-gray-500">{user.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
