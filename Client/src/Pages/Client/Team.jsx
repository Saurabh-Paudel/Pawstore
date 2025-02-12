import React from "react";
import {
  FaUserTie,
  FaDog,
  FaHeartbeat,
  FaPaw,
  FaStethoscope,
} from "react-icons/fa";

const teamMembers = [
  {
    icon: <FaUserTie className="text-[#E58608] text-4xl" />,
    name: "John Doe",
    role: "Founder & CEO",
  },
  {
    icon: <FaDog className="text-[#E58608] text-4xl" />,
    name: "Jane Smith",
    role: "Senior Pet Trainer",
  },
  {
    icon: <FaHeartbeat className="text-[#E58608] text-4xl" />,
    name: "Dr. Emily Brown",
    role: "Veterinarian",
  },
  {
    icon: <FaPaw className="text-[#E58608] text-4xl" />,
    name: "Michael Carter",
    role: "Animal Behaviorist",
  },
  {
    icon: <FaStethoscope className="text-[#E58608] text-4xl" />,
    name: "Sarah Williams",
    role: "Veterinary Surgeon",
  },
];

export default function Team() {
  return (
    <div className="py-16 px-5 md:px-10 lg:px-[141px] bg-white">
      <h2 className="text-3xl font-bold text-black text-center lg:text-4xl xl:text-5xl mb-10">
        Meet Our Expert Team
      </h2>
      <p className="text-lg text-gray-600 text-center mb-10">
        Our experienced professionals are dedicated to providing the best care
        and training for your pets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#FFF0D9] p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
          >
            {member.icon}
            <h3 className="text-xl font-semibold text-black mt-4">
              {member.name}
            </h3>
            <p className="text-gray-600 mt-2">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
