import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dog from "../../assets/dog.png";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter an email!", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/newsletter/subscribe",
        { email }
      );

      if (response.status === 201) {
        toast.success("Subscribed successfully!", { position: "top-right" });
        setEmail(""); // Clear input field
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Subscription failed. Try again!",
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <div className="flex justify-center my-16 px-5 md:px-10 lg:px-16 xl:px-[141px]">
      <div className="h-auto w-full bg-[#FFF0D9] rounded-[50px] px-8 py-5 lg:px-24 lg:py-2 flex flex-col lg:flex-row items-center lg:items-start justify-between">
        {/* Image Section */}
        <div className="hidden lg:block">
          <img
            src={Dog}
            alt="Cute dog illustration"
            className="max-h-[380px] lg:max-h-[430px] w-full object-contain"
          />
        </div>

        {/* Text & Input Section */}
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start lg:my-auto gap-4 font-poppins">
          <p className="font-bold text-3xl text-black lg:text-4xl xl:text-5xl">
            Get Pawsome News!
          </p>
          <p className="text-lg text-black leading-[32px] lg:leading-[40px] xl:leading-[48px] lg:text-xl xl:text-2xl">
            Exclusive training tips, tricks, product deals, and more.
          </p>
          <div className="w-full flex flex-col items-center lg:items-start gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email..."
              className="w-full max-w-[400px] h-[50px] px-4 rounded-[20px] bg-white text-gray-600 shadow-md focus:outline-none lg:h-[60px] lg:text-lg"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#E58608] hover:bg-[#D87407] transition-all duration-300 rounded-full font-medium text-lg h-[48px] w-[160px] text-white shadow-md lg:w-[180px] lg:h-[55px] lg:text-xl"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
