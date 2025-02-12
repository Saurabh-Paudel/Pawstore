import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //logic to be added
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-[#F5F5F5] p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/60">
        <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-6">
          Welcome Back! 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-orange-500 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-orange-500 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-orange-600 transform hover:scale-105 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
