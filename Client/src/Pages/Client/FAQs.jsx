import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide pet training, grooming, veterinary care, boarding, and nutrition plans.",
  },
  {
    question: "Do you have certified trainers?",
    answer:
      "Yes, our trainers are certified professionals with years of experience.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment through our website or call our support team.",
  },
  {
    question: "Do you offer pet boarding services?",
    answer:
      "Yes, we have a comfortable pet boarding facility with 24/7 supervision.",
  },
  {
    question: "What types of pets do you train?",
    answer: "We specialize in training dogs and cats of all breeds and sizes.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-5 md:px-10 lg:px-[141px]">
      <h2 className="text-3xl font-bold text-black text-center lg:text-4xl xl:text-5xl mb-10">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-gray-600 text-center mb-10">
        Have questions? We have answers! Check out some of the most common
        questions we receive.
      </p>
      <div className="max-w-2xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-black">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <FaMinus className="text-[#E58608]" />
              ) : (
                <FaPlus className="text-[#E58608]" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
