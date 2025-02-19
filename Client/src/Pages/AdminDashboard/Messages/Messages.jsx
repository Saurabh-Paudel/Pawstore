import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Messages = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "Hello!" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Need help with my order." },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", message: "Great service!" },
  ]);

  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase()) ||
    msg.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800">Manage Messages</h2>

      <div className="flex justify-end">
        <input
          type="search"
          placeholder="Search Messages"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">Name</th>
              <th className="py-3 px-6 text-left text-gray-700">Email</th>
              <th className="py-3 px-6 text-left text-gray-700">Message</th>
              <th className="py-3 px-6 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg, index) => (
                <tr key={msg.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-6 text-gray-800">{msg.name}</td>
                  <td className="py-3 px-6 text-gray-500">{msg.email}</td>
                  <td className="py-3 px-6 text-gray-500">{msg.message}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
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
