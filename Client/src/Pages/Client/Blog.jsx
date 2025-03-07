import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch blogs from API on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/blogs/get`);
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="my-20 px-6 md:px-16 xl:px-[141px] text-center">
        <p className="text-lg text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-20 px-6 md:px-16 xl:px-[141px] text-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Dog Blog</h2>
        <p className="text-lg text-gray-600">
          Stay updated with our latest tips, trends, and advice for your furry
          friends.
        </p>
      </div>

      {/* Blog List */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col h-[376px] w-[251px] rounded-[20px] shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-105"
            onClick={() => navigate(`/blog-details/${blog._id}`)}
          >
            <div className="w-[250px] h-[266px] rounded-[20px] overflow-hidden shadow-lg">
              <img
                src={
                  blog.image.startsWith("http")
                    ? blog.image
                    : `${BACKEND_URL}${blog.image}`
                }
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/250x266")
                }
              />
            </div>
            <div className="p-4 flex items-center justify-center">
              <p className="text-base font-medium mt-2 text-center text-gray-700">
                {blog.description.replace(/<[^>]+>/g, "").substring(0, 50) +
                  "..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
