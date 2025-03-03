import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Messages = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [showReplyBox, setShowReplyBox] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/messages/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleSendReply = async (id, reply) => {
    if (reply && reply.trim()) {
      try {
        await axios.put(`http://localhost:8000/api/messages/${id}/reply`, {
          reply,
        });
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg._id === id ? { ...msg, reply } : msg))
        );
        setShowReplyBox((prev) => ({ ...prev, [id]: false }));
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };

  const handleToggleReplyBox = (id) => {
    setShowReplyBox((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-4xl font-semibold text-gray-800">
          Manage Messages
        </h2>
        <input
          type="search"
          placeholder="Search Messages"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-full md:w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608] shadow-sm"
        />
      </div>

      {/* Responsive Table / Card View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-xl overflow-x-auto">
        <table className="min-w-full table-auto text-center text-sm">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-6">S.No</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Message</th>
              <th className="py-3 px-6">Reply</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <tr key={msg._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{msg.name}</td>
                  <td className="py-4 px-6">{msg.email}</td>
                  <td className="py-4 px-6">{msg.message}</td>
                  <td className="py-4 px-6">
                    {msg.reply ? (
                      <span className="text-gray-600 italic">{msg.reply}</span>
                    ) : (
                      <button
                        onClick={() => handleToggleReplyBox(msg._id)}
                        className="py-2 px-4 bg-gray-700 text-white rounded-lg"
                      >
                        Reply
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-600 text-white p-2 rounded-full"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Medium and Smaller Screens */}
      <div className="lg:hidden space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => (
            <div key={msg._id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-800 font-semibold">
                {index + 1}. {msg.name}
              </p>
              <p className="text-gray-500 text-sm">{msg.email}</p>
              <p className="mt-2 text-gray-600">{msg.message}</p>
              {msg.reply ? (
                <p className="mt-2 text-gray-600 italic">Reply: {msg.reply}</p>
              ) : (
                <button
                  onClick={() => handleToggleReplyBox(msg._id)}
                  className="mt-2 py-2 px-4 bg-gray-700 text-white rounded-lg"
                >
                  Reply
                </button>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="bg-red-600 text-white p-2 rounded-full"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
