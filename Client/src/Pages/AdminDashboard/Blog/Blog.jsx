import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs/get");
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:8000/api/blogs/delete/${id}`); // Fixed syntax
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("Blog deleted successfully!");
      } catch (err) {
        console.error("Error deleting blog:", err);
        toast.error(
          "Failed to delete blog: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-gray-100 min-h-screen text-center">
        <p className="text-lg text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6 bg-gray-100 min-h-screen text-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-3xl font-semibold text-gray-800">Manage Blogs</h2>

      <div className="flex justify-between items-center">
        <Link to="/admin/blogs/insert">
          <button className="flex items-center space-x-2 text-white bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded-lg shadow-md">
            <FaPlusCircle className="text-xl" />
            <span>Add New Blog</span>
          </button>
        </Link>
        <input
          type="search"
          placeholder="Search Blogs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-60 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-700">S.No</th>
              <th className="py-3 px-6 text-left text-gray-700">Title</th>
              <th className="py-3 px-6 text-left text-gray-700">Description</th>
              <th className="py-3 px-6 text-left text-gray-700">Status</th>
              <th className="py-3 px-6 text-left text-gray-700">Author</th>
              <th className="py-3 px-6 text-left text-gray-700">Created At</th>
              <th className="py-3 px-6 text-left text-gray-700">Updated At</th>
              <th className="py-3 px-6 text-left text-gray-700">
                Published At
              </th>
              <th className="py-3 px-6 text-left text-gray-700">Read Count</th>
              <th className="py-3 px-6 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-800">{index + 1}</td>
                  <td className="py-3 px-6 text-gray-800">{blog.title}</td>
                  <td className="py-3 px-6 text-gray-500">
                    {blog.description.replace(/<[^>]+>/g, "").substring(0, 50) +
                      "..."}
                  </td>
                  <td className="py-3 px-6 text-gray-500">{blog.status}</td>
                  <td className="py-3 px-6 text-gray-500">{blog.author}</td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {blog.updatedAt
                      ? new Date(blog.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : "Not Published"}
                  </td>
                  <td className="py-3 px-6 text-gray-500">{blog.readCount}</td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to={`/admin/blogs/update/${blog._id}`}>
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blog;
