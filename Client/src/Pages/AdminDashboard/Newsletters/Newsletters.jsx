import { FaTrash } from "react-icons/fa";

const SubscribersList = () => {
  // Dummy list of subscribed users
  const subscribers = [
    { email: "john@example.com" },
    { email: "jane@example.com" },
    { email: "alex@demo.com" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Subscribed Users
        </h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="border border-gray-300 p-3 text-left">S.No</th>
              <th className="border border-gray-300 p-3 text-left">Email</th>
              <th className="border border-gray-300 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="border border-gray-300 p-3">{index + 1}</td>
                <td className="border border-gray-300 p-3">
                  {subscriber.email}
                </td>
                <td className="border border-gray-300 p-3">
                  <button className="text-red-500 hover:text-red-700 flex items-center transition">
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersList;
