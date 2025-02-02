import React from "react";
import {
  FaPaw,
  FaBath,
  FaStethoscope,
  FaHome,
  FaUtensils,
} from "react-icons/fa";

const services = [
  {
    icon: <FaPaw className="text-[#E58608] text-4xl" />,
    title: "Pet Training",
    description:
      "Obedience training, behavioral correction, and puppy socialization programs.",
  },
  {
    icon: <FaBath className="text-[#E58608] text-4xl" />,
    title: "Grooming & Spa",
    description:
      "Bathing, fur styling, nail trimming, and skin care for your pets.",
  },
  {
    icon: <FaStethoscope className="text-[#E58608] text-4xl" />,
    title: "Veterinary Care",
    description: "Regular health checkups, vaccinations, and emergency care.",
  },
  {
    icon: <FaHome className="text-[#E58608] text-4xl" />,
    title: "Pet Boarding & Daycare",
    description:
      "Safe lodging, supervised playtime, and socialization for your pets.",
  },
  {
    icon: <FaUtensils className="text-[#E58608] text-4xl" />,
    title: "Nutrition & Diet Plans",
    description:
      "Personalized meal plans, weight management, and premium pet food.",
  },
];

export default function Services() {
  return (
    <div className="py-16 px-5 md:px-10 lg:px-[141px]">
      <h2 className="text-3xl font-bold text-black text-center lg:text-4xl xl:text-5xl mb-10">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
          >
            {service.icon}
            <h3 className="text-xl font-semibold text-black mt-4">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
