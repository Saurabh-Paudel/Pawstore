import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogManagement = () => {
  const [search, setSearch] = useState("");
  const blogs = [
    {
      _id: 1,
      title: "Blog Title 1",
      description: "This is a description of Blog 1.",
      status: "Published",
      author: "Author 1",
      createdAt: "2025-01-01",
      updatedAt: "2025-01-02",
      publishedAt: "2025-01-03",
      readCount: 100,
    },
    {
      _id: 2,
      title: "Blog Title 2",
      description: "This is a description of Blog 2.",
      status: "Draft",
      author: "Author 2",
      createdAt: "2025-01-05",
      updatedAt: "2025-01-06",
      publishedAt: null,
      readCount: 150,
    },
  ];

  // Handle Search
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800">Manage Blogs</h2>

      {/* Actions */}
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

      {/* Blogs Table */}
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
                    {blog.description}
                  </td>
                  <td className="py-3 px-6 text-gray-500">{blog.status}</td>
                  <td className="py-3 px-6 text-gray-500">{blog.author}</td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(blog.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : "Not Published"}
                  </td>
                  <td className="py-3 px-6 text-gray-500">{blog.readCount}</td>
                  <td className="py-3 px-6 space-x-3">
                    <Link to="/admin/blogs/update">
                      <button className="text-yellow-500 hover:text-yellow-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        console.log(`Delete blog with ID: ${blog._id}`)
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
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

export default BlogManagement;
