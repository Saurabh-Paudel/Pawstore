import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserMessages = () => {
  // Get user state from Redux
  const userState = useSelector((state) => state.user);
  const userEmail = userState?.email || "";

  console.log("Redux State:", userState); // Debugging Redux state
  console.log("Extracted Email:", userEmail); // Debugging extracted email

  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return; // Prevent API call if email is missing

    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/messages");

        // Filter messages based on logged-in user's email
        const userMessages = response.data.filter(
          (msg) => msg.email === userEmail
        );
        setMessages(userMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userEmail]);

  // Search filter logic
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-semibold text-gray-800">User Messages</h2>
        <div className="relative">
          <input
            type="search"
            placeholder="Search Messages"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608] shadow-sm"
          />
        </div>
      </div>

      {/* Show loading state */}
      {loading ? (
        <div className="text-center text-gray-600">Loading messages...</div>
      ) : filteredMessages.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl mt-6">
          <table className="min-w-full table-auto text-center text-sm">
            <thead className="bg-[#E58608] text-white">
              <tr>
                <th className="py-3 px-6">S.No</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Message</th>
                <th className="py-3 px-6">Reply</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((msg, index) => (
                <tr
                  key={msg._id}
                  className="border-b hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800">{msg.name}</td>
                  <td className="py-4 px-6 text-gray-500">{msg.email}</td>
                  <td className="py-4 px-6 text-gray-500">{msg.message}</td>
                  <td className="py-4 px-6 text-gray-600 italic">
                    {msg.reply ? msg.reply : "No reply yet"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600">No messages found.</div>
      )}
    </div>
  );
};

export default UserMessages;
