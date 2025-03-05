import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Added for navigation

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs/get");

        if (Array.isArray(response.data)) {
          setBlogs(response.data.slice(0, 4));
        } else {
          setBlogs([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center my-20">Loading blogs...</div>;
  }

  if (blogs.length === 0) {
    return <div className="text-center my-20">No blogs available.</div>;
  }

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-10">
        <h2 className="text-4xl font-bold mb-4">Blog Section</h2>
        <p className="text-lg text-gray-700">
          Explore our latest dog care tips and stories.
        </p>
      </div>

      {/* Blog List */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col h-[376px] w-[251px] rounded-[20px] shadow-lg cursor-pointer"
            onClick={() => navigate(`/blog-details/${blog._id}`)} // Moved onClick here
          >
            <div className="w-[250px] h-[266px] rounded-[20px] overflow-hidden shadow-lg">
              <img
                src={`http://localhost:8000${blog.image}`}
                alt={blog.title || "Blog Image"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder-image.jpg")} // Fallback image
              />
            </div>
            <div className="p-4 flex items-center justify-center">
              <p className="text-base font-medium mt-2 text-center">
                {blog.description
                  ?.replace(/<[^>]+>/g, "") // Strip HTML tags
                  .substring(0, 50) + "..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
