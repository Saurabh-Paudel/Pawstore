import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Messages = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [showReplyBox, setShowReplyBox] = useState({});

  useEffect(() => {
    // Fetch messages from the backend API
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
      setMessages(messages.filter((msg) => msg._id !== id)); // Remove the deleted message from state
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleSendReply = async (id, reply) => {
    if (reply && reply.trim()) {
      try {
        // Send the reply to the backend
        await axios.put(`http://localhost:8000/api/messages/${id}/reply`, {
          reply,
        });

        // Update the local messages state to reflect the reply
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-semibold text-gray-800">
          Manage Messages
        </h2>
        <div className="relative">
          <input
            type="search"
            placeholder="Search Messages"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-72 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608] shadow-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 right-3 text-gray-400"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zM20 20l-4-4"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl mt-6">
        <table className="min-w-full table-auto text-center text-sm">
          <thead className="bg-[#E58608] text-white">
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
                <tr
                  key={msg._id}
                  className="border-b hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="py-4 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-800">{msg.name}</td>
                  <td className="py-4 px-6 text-gray-500">{msg.email}</td>
                  <td className="py-4 px-6 text-gray-500">{msg.message}</td>

                  {/* Reply Section */}
                  <td className="py-4 px-6">
                    <div className="space-y-4">
                      {msg.reply ? (
                        <div className="text-sm text-gray-600 italic">
                          <strong>Replied:</strong> {msg.reply}
                        </div>
                      ) : showReplyBox[msg._id] ? (
                        <>
                          <textarea
                            rows="3"
                            placeholder="Write a reply..."
                            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E58608] transition-all duration-300"
                            id={`reply-${msg._id}`}
                          />
                          <button
                            onClick={() =>
                              handleSendReply(
                                msg._id,
                                document.getElementById(`reply-${msg._id}`)
                                  .value
                              )
                            }
                            className="py-2 px-6 bg-[#E58608] hover:bg-[#D87407] transition-all duration-300 text-white font-semibold rounded-lg shadow-md"
                          >
                            Send Reply
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleToggleReplyBox(msg._id)}
                          className="py-2 px-6 bg-[#E58608] hover:bg-[#D87407] transition-all duration-300 text-white font-semibold rounded-lg shadow-md"
                        >
                          Reply
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Actions - Delete button */}
                  <td className="py-4 px-6 flex justify-center">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition duration-200 transform hover:scale-105"
                    >
                      <FaTrashAlt className="text-lg" />
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
    </div>
  );
};

export default Messages;
