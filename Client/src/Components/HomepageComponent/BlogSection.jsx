import React from "react";

import Blog1 from "../../assets/BlogImages/Blog1.png";
import Blog2 from "../../assets/BlogImages/Blog2.png";
import Blog3 from "../../assets/BlogImages/Blog3.png";
import Blog4 from "../../assets/BlogImages/Blog4.png";

export default function BlogSection() {
  const Blogs = [
    {
      id: 1,
      img: Blog1,
      description: "Are you having trouble finding the right dog?",
    },
    {
      id: 2,
      img: Blog2,
      description: "Is your dog aggresive towards your kids?",
    },
    {
      id: 3,
      img: Blog3,
      description: "Looking for someone to train your dog?",
    },
    {
      id: 4,
      img: Blog4,
      description: "Choose the most stylist and durable products for your dog.",
    },
  ];

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-10">
        <p className="text-4xl font-bold mb-4">Blog Section</p>
        <p className="text-lg text-gray-700">Desctiprion of blog.</p>
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
                alt="BlogImg.png"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex items-center justify-center">
              <p className="text-base font-medium mt-2 text-center ">
                {Blog.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
