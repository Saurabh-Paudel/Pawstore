import React from "react";
import {
  FaBriefcase,
  FaLaptopCode,
  FaDog,
  FaUserMd,
  FaStore,
} from "react-icons/fa";

const careers = [
  {
    icon: <FaBriefcase className="text-[#E58608] text-4xl" />,
    title: "Pet Trainer",
    description: "Join our team and help train pets with expert guidance.",
  },
  {
    icon: <FaLaptopCode className="text-[#E58608] text-4xl" />,
    title: "Marketing Specialist",
    description:
      "Help us reach more pet lovers through digital marketing strategies.",
  },
  {
    icon: <FaDog className="text-[#E58608] text-4xl" />,
    title: "Veterinary Assistant",
    description:
      "Assist our expert veterinarians in providing top care for pets.",
  },
  {
    icon: <FaUserMd className="text-[#E58608] text-4xl" />,
    title: "Veterinarian",
    description: "Provide medical care and treatment for pets of all kinds.",
  },
  {
    icon: <FaStore className="text-[#E58608] text-4xl" />,
    title: "Pet Store Manager",
    description:
      "Manage pet supplies and ensure high-quality service for customers.",
  },
];

export default function CareersSection() {
  return (
    <div className="py-16 px-5 md:px-10 lg:px-[141px] bg-white">
      <h2 className="text-3xl font-bold text-black text-center lg:text-4xl xl:text-5xl mb-10">
        Join Our Team
      </h2>
      <p className="text-lg text-gray-600 text-center mb-10">
        Looking for a career in pet care? We’re hiring talented individuals
        passionate about animals.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {careers.map((career, index) => (
          <div
            key={index}
            className="bg-[#FFF0D9] p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
          >
            {career.icon}
            <h3 className="text-xl font-semibold text-black mt-4">
              {career.title}
            </h3>
            <p className="text-gray-600 mt-2">{career.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
