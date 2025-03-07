import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const Newsletters = () => {
  const [subscribers, setSubscribers] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch subscribers from the API
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/newsletter/subscribers`
        );

        const data = response.data;
        const formattedData = data.map((subscriber) => {
          let formattedDate = "N/A"; // Default to 'N/A' if no valid date

          if (subscriber.date) {
            const date = new Date(subscriber.date);
            // Check if the date is valid
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split("T")[0]; // Format as yyyy-mm-dd
            }
          }

          return {
            ...subscriber,
            date: formattedDate,
          };
        });

        setSubscribers(formattedData);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (email) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the subscriber with email: ${email}?`
    );

    if (confirmDelete) {
      try {
        // Update the DELETE request to the correct API endpoint
        const response = await axios.delete(
          `${BACKEND_URL}/api/newsletter/subscribe/${email}`
        );

        if (response.status === 200) {
          // If successful, remove the subscriber from the list
          setSubscribers((prevSubscribers) =>
            prevSubscribers.filter((subscriber) => subscriber.email !== email)
          );
          alert("Subscriber deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting subscriber:", error);
        alert("Failed to delete subscriber");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">
            Subscribed Users
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Add New
            </button>
          </div>
        </div>

        {/* Table for larger screens */}
        <div className="hidden sm:block">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="border border-gray-300 p-3 text-left">S.No</th>
                <th className="border border-gray-300 p-3 text-left">Email</th>
                <th className="border border-gray-300 p-3 text-left">Date</th>
                <th className="border border-gray-300 p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr
                  key={subscriber._id}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3">
                    {subscriber.email}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {subscriber.date}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <button
                      onClick={() => handleDelete(subscriber.email)}
                      className="text-red-500 hover:text-red-700 flex items-center transition"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for smaller screens */}
        <div className="block sm:hidden">
          {subscribers.map((subscriber, index) => (
            <div
              key={subscriber._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between">
                <span className="font-semibold">S.No: {index + 1}</span>
                <button
                  onClick={() => handleDelete(subscriber.email)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
              <div className="mt-2">
                <span className="font-semibold">Email:</span> {subscriber.email}
              </div>
              <div className="mt-2">
                <span className="font-semibold">Date:</span> {subscriber.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsletters;
