import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InsertBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    tags: [],
    author: "",
    status: "Draft", // New field
  });
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (value) => {
    setBlog({ ...blog, description: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !blog.tags.includes(tagInput.trim())) {
      setBlog((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    blog.tags.forEach((tag) => formData.append("tags", tag));
    formData.append("author", blog.author);
    formData.append("status", blog.status);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${BACKEND_URL}/api/blogs/insert`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog created successfully!");
      setTimeout(() => navigate("/admin/blogs"), 2000);
    } catch (error) {
      console.error("Error submitting blog:", error.response?.data || error);
      toast.error(
        "Failed to create blog: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Add New Blog</h2>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="text-red-500 text-xl"
        >
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <ReactQuill
            value={blog.description}
            onChange={handleDescriptionChange}
            className="bg-white"
            theme="snow"
            placeholder="Write your blog content here..."
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">
            Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover mt-2 rounded shadow-md"
            />
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Tags</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag and press Add"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={blog.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
