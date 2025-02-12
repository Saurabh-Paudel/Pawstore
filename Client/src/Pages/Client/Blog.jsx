import React from "react";
import { useNavigate } from "react-router-dom";
import Blog1 from "../../assets/BlogImages/Blog1.png";
import Blog2 from "../../assets/BlogImages/Blog2.png";
import Blog3 from "../../assets/BlogImages/Blog3.png";
import Blog4 from "../../assets/BlogImages/Blog4.png";
import Blog5 from "../../assets/BlogImages/Blog5.png";
import Blog6 from "../../assets/BlogImages/Blog6.png";
import Blog7 from "../../assets/BlogImages/Blog7.png";
import Blog8 from "../../assets/BlogImages/Blog8.png";
import Blog9 from "../../assets/BlogImages/Blog9.png";
import Blog10 from "../../assets/BlogImages/Blog10.png";

const Blogs = [
  {
    id: 1,
    img: Blog1,
    description: "Are you having trouble finding the right dog?",
  },
  {
    id: 2,
    img: Blog2,
    description: "Is your dog aggressive towards your kids?",
  },
  {
    id: 3,
    img: Blog3,
    description: "Looking for someone to train your dog?",
  },
  {
    id: 4,
    img: Blog4,
    description: "Choose the most stylish and durable products for your dog.",
  },
  {
    id: 5,
    img: Blog5,
    description: "How to groom your dog at home: Tips and tricks.",
  },
  {
    id: 6,
    img: Blog6,
    description: "Top 5 dog breeds for families with young children.",
  },
  {
    id: 7,
    img: Blog7,
    description: "Is your dog stressed? Learn how to calm your pet.",
  },
  {
    id: 8,
    img: Blog8,
    description: "The benefits of adopting a rescue dog.",
  },
  {
    id: 9,
    img: Blog9,
    description:
      "Understanding dog behavior: What your dog is trying to tell you.",
  },
  {
    id: 10,
    img: Blog10,
    description: "Essential items for new dog owners: What you really need.",
  },
];

export default function BlogSection() {
  const navigate = useNavigate();
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
        {Blogs.map((Blog) => (
          <div
            key={Blog.id}
            className="flex flex-col h-[376px] w-[251px] rounded-[20px] shadow-lg"
          >
            <div className="w-[250px] h-[266px] rounded-[20px] overflow-hidden shadow-lg">
              <img
                src={Blog.img}
                alt={`Blog${Blog.id}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex items-center justify-center">
              <p className="text-base font-medium mt-2 text-center text-gray-700 cursor-pointer">
                {Blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
