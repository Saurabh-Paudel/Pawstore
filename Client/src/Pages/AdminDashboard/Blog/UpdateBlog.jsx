import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function UpdateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    tags: "",
    author: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Fetch existing blog data (static for now)
    const existingBlog = {
      title: "Sample Blog",
      description: "<p>This is an example blog description.</p>",
      image: "https://example.com/sample.jpg",
      tags: "React, JavaScript",
      author: "John Doe",
    };
    setBlog(existingBlog);
    setPreview(existingBlog.image);
  }, [id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData for API submission
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("tags", blog.tags);
    formData.append("author", blog.author);
    if (image) {
      formData.append("image", image);
    }

    console.log("Updated Blog Data:", formData);

    navigate("/admin/blogs");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Update Blog</h2>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="text-red-500 text-xl"
        >
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <ReactQuill
          value={blog.description}
          onChange={handleDescriptionChange}
          className="bg-white"
          theme="snow"
        />

        {/* Image Upload */}
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

        <input
          type="text"
          name="tags"
          value={blog.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="author"
          value={blog.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
