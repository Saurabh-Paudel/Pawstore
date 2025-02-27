import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog details from API on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/blogs/get/${id}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog details.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="my-20 px-6 md:px-16 xl:px-[141px] text-center">
        <p className="text-lg text-gray-600">Loading blog details...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="my-20 px-6 md:px-16 xl:px-[141px] text-center">
        <p className="text-lg text-red-600">{error || "Blog not found."}</p>
      </div>
    );
  }

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Blog Header */}
      <div className="text-center font-poppins mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          {blog.title}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {blog.description.replace(/<[^>]+>/g, "").substring(0, 150) + "..."}
        </p>
      </div>

      {/* Blog Content */}
      <div className="flex flex-col items-center space-y-12">
        {/* Blog Image */}
        <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-xl">
          <img
            src={
              blog.image.startsWith("http")
                ? blog.image
                : `http://localhost:8000${blog.image}`
            }
            alt={blog.title}
            className="w-full h-[500px] object-cover rounded-xl shadow-md"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/500x500")
            } // Fallback image
          />
        </div>

        {/* Full Content */}
        <div
          className="text-lg text-gray-700 max-w-3xl mx-auto space-y-6"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Meta Info */}
        <div className="my-10 max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
          {/* Author & Read Count */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <p className="text-xl font-semibold text-gray-800">
                <strong>Author:</strong> {blog.author}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xl font-semibold text-gray-800">
                <strong>Read Count:</strong> {blog.readCount}
              </p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-lg text-gray-600">
                <strong>Created At:</strong>{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            {blog.updatedAt && (
              <div>
                <p className="text-lg text-gray-600">
                  <strong>Updated At:</strong>{" "}
                  {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            {blog.publishedAt && (
              <div>
                <p className="text-lg text-gray-600">
                  <strong>Published At:</strong>{" "}
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Status & Tags */}
          <div className="flex flex-wrap gap-10 mb-6">
            <div className="flex items-center space-x-4">
              <p className="text-lg font-medium text-gray-800">
                <strong>Status:</strong> {blog.status}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg font-medium text-gray-800">
                <strong>Tags:</strong>
                <span className="text-blue-600">{blog.tags.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
