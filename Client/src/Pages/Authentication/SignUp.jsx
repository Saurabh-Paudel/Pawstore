import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [errors, setErrors] = useState([]); // To store validation errors
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BACKEND_URL}/api/auth/signup`, formData);

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors); // Store validation errors
        error.response.data.errors.forEach((err) =>
          toast.error(err.msg, { position: "top-right" })
        );
      } else {
        toast.error(error.response?.data?.message || "Signup failed", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account ✨
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
              placeholder="Enter your name"
            />
            {errors.some((error) => error.param === "name") && (
              <p className="text-red-500 text-sm mt-1">
                {errors.find((error) => error.param === "name").msg}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
              placeholder="Enter your email"
            />
            {errors.some((error) => error.param === "email") && (
              <p className="text-red-500 text-sm mt-1">
                {errors.find((error) => error.param === "email").msg}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
              placeholder="Enter your password"
            />
            {errors.some((error) => error.param === "password") && (
              <p className="text-red-500 text-sm mt-1">
                {errors.find((error) => error.param === "password").msg}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
            >
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
