import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalDogs: 0,
    dogBreeds: 0,
    petProducts: 0,
    messages: 0,
    newsletterSubs: 0,
    productSales: 0,
    dogSales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No authentication token provided.");
        setLoading(false);
        return;
      }

      try {
        const [
          usersResponse,
          dogsResponse,
          breedsResponse,
          productsResponse,
          messagesResponse,
          newsletterResponse,
          productSalesResponse,
          dogSalesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:8000/api/user/users"),
          axios.get("http://localhost:8000/api/dogs"),
          axios.get("http://localhost:8000/api/breeds"),
          axios.get("http://localhost:8000/api/products/get"),
          axios.get("http://localhost:8000/api/messages"),
          axios.get("http://localhost:8000/api/newsletter/subscribers"),
          axios.get(
            "http://localhost:8000/api/payments/accessory-purchase/all-purchases",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "http://localhost:8000/api/payments/dog-purchase/dog-purchases", // Correct endpoint
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        console.log("Users:", usersResponse.data);
        console.log("Dogs:", dogsResponse.data);
        console.log("Breeds:", breedsResponse.data);
        console.log("Products:", productsResponse.data);
        console.log("Messages:", messagesResponse.data);
        console.log("Newsletter Subs:", newsletterResponse.data);
        console.log("Product Sales:", productSalesResponse.data);
        console.log(
          "Dog Sales (full response):",
          JSON.stringify(dogSalesResponse.data, null, 2)
        );

        setUsers(usersResponse.data);
        setCounts({
          totalUsers: usersResponse.data.length,
          totalDogs: dogsResponse.data.length,
          dogBreeds: breedsResponse.data.length,
          petProducts: productsResponse.data.length,
          messages: messagesResponse.data.length,
          newsletterSubs: newsletterResponse.data.length,
          productSales: productSalesResponse.data.purchases.length,
          dogSales: dogSalesResponse.data.length,
        });
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="relative border-l-4 border-blue-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">
            {counts.totalUsers}
          </p>
        </div>
        <div className="relative border-l-4 border-green-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Total Dogs</h3>
          <p className="text-2xl font-bold text-gray-800">{counts.totalDogs}</p>
        </div>
        <div className="relative border-l-4 border-yellow-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Dog Breeds</h3>
          <p className="text-2xl font-bold text-gray-800">{counts.dogBreeds}</p>
        </div>
        <div className="relative border-l-4 border-purple-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-purple-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Pet Products</h3>
          <p className="text-2xl font-bold text-gray-800">
            {counts.petProducts}
          </p>
        </div>
        <div className="relative border-l-4 border-red-5 00 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Messages</h3>
          <p className="text-2xl font-bold text-gray-800">{counts.messages}</p>
        </div>
        <div className="relative border-l-4 border-indigo-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-indigo-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Newsletter Subs</h3>
          <p className="text-2xl font-bold text-gray-800">
            {counts.newsletterSubs}
          </p>
        </div>
        <div className="relative border-l-4 border-orange-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-orange-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Product Sales</h3>
          <p className="text-2xl font-bold text-gray-800">
            {counts.productSales}
          </p>
        </div>
        <div className="relative border-l-4 border-teal-500 pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition">
          <span className="absolute -top-2 -left-2 w-4 h-4 bg-teal-500 rounded-full"></span>
          <h3 className="text-sm text-gray-600">Dog Sales</h3>
          <p className="text-2xl font-bold text-gray-800">{counts.dogSales}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-gray-700">#</th>
              <th className="border p-3 text-gray-700">Username</th>
              <th className="border p-3 text-gray-700">Email</th>
              <th className="border p-3 text-gray-700">Phone</th>
              <th className="border p-3 text-gray-700">Address</th>
              <th className="border p-3 text-gray-700">Gender</th>
              <th className="border p-3 text-gray-700">DOB</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="border p-3 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user.email} className="hover:bg-gray-50 transition">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{user.username}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.phone}</td>
                  <td className="border p-3">{user.address}</td>
                  <td className="border p-3">{user.gender}</td>
                  <td className="border p-3">
                    {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          filteredUsers.map((user, index) => (
            <div
              key={user.email}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">
                  #{index + 1}
                </span>
                <span className="text-sm text-gray-500">
                  {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="font-medium text-gray-600">Username:</span>{" "}
                  {user.username}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Address:</span>{" "}
                  {user.address}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Gender:</span>{" "}
                  {user.gender}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
