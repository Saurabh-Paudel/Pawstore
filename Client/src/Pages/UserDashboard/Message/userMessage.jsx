import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserMessages = () => {
  const userState = useSelector((state) => state.user);
  const userEmail = userState?.email || "";

  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/messages");
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

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-4xl font-semibold text-gray-800">User Messages</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="search"
            placeholder="Search Messages"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608] shadow-sm"
          />
          <button className="bg-[#E58608] text-white px-6 py-2 rounded-lg hover:bg-[#c97507] transition-colors">
            Add New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading messages...</div>
      ) : filteredMessages.length > 0 ? (
        <>
          {/* Card view for small screens (<768px) */}
          <div className="md:hidden space-y-4">
            {filteredMessages.map((msg, index) => (
              <div
                key={msg._id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">
                      #{index + 1}
                    </span>
                    <span className="text-gray-800">{msg.name}</span>
                  </div>
                  <div className="text-gray-500">{msg.email}</div>
                  <div className="text-gray-500">{msg.message}</div>
                  <div className="text-gray-600 italic">
                    {msg.reply ? msg.reply : "No reply yet"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table view for large screens (≥768px) */}
          <div className="hidden md:block overflow-x-auto bg-white shadow-xl">
            <table className="min-w-full table-auto text-center text-sm">
              <thead className="bg-gray-800 text-white">
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
        </>
      ) : (
        <div className="text-center text-gray-600">No messages found.</div>
      )}
    </div>
  );
};

export default UserMessages;
