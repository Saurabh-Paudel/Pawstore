import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DogsSales = () => {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]); // Filtered list for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // Search input state
  const { token, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      setError("Please log in to view dog purchases.");
      setLoading(false);
      return;
    }

    const fetchDogPurchases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/payments/dog-purchase/dog-purchases",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDogs(response.data);
        setFilteredDogs(response.data); // Initially show all dogs
      } catch (err) {
        setError("Failed to load dog sales data: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchDogPurchases();
  }, [token]);

  // Filter dogs based on search input
  useEffect(() => {
    const filtered = dogs.filter(
      (dog) =>
        dog.userId.toString().toLowerCase().includes(search.toLowerCase()) ||
        dog.transactionUuid.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDogs(filtered);
  }, [search, dogs]);

  const updateShippingStatus = async (dogId, newStatus) => {
    if (role !== "admin") {
      toast.error("You are not authorized to update shipping status.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/payments/dog-purchase/dog-purchases/${dogId}`,
        { deliveryStatus: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDogs((prevDogs) =>
        prevDogs.map((dog) =>
          dog._id === dogId ? { ...dog, deliveryStatus: response.data.purchase.deliveryStatus } : dog
        )
      );
      toast.success("Shipping status updated successfully!");
    } catch (error) {
      toast.error("Failed to update shipping status: " + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Manage Dog Sales</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by User ID or Transaction ID..."
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Dog Name</th>
              <th className="p-3 border">Breed</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Vaccinated</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Transaction ID</th>
              <th className="p-3 border">Payment Status</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Dog ID</th>
              <th className="p-3 border">Shipping Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDogs.map((dog) => (
              <tr key={dog._id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  <img src={dog.image} alt={dog.name} className="w-16 h-16 rounded" />
                </td>
                <td className="p-3 border">{dog.name}</td>
                <td className="p-3 border">{dog.breed}</td>
                <td className="p-3 border">{dog.age} years</td>
                <td className="p-3 border">{dog.vaccinated ? "✅ Yes" : "❌ No"}</td>
                <td className="p-3 border text-green-600 font-bold">${dog.amount}</td>
                <td className="p-3 border">{dog.transactionUuid}</td>
                <td className={`p-3 border ${dog.status === "COMPLETE" ? "text-green-500" : "text-red-500"}`}>
                  {dog.status}
                </td>
                <td className="p-3 border">{dog.userId.toString()}</td>
                <td className="p-3 border">{dog.dogId.toString()}</td>
                <td className="p-3 border font-semibold">
                  <select
                    value={dog.deliveryStatus}
                    onChange={(e) =>
                      setDogs((prev) =>
                        prev.map((d) =>
                          d._id === dog._id ? { ...d, deliveryStatus: e.target.value } : d
                        )
                      )
                    }
                    className="p-2 border rounded-md"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => updateShippingStatus(dog._id, dog.deliveryStatus)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DogsSales;