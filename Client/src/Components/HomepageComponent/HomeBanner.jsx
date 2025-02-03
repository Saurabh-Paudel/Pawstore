import React, { useState } from "react";
import DogBg from "../../assets/BannerImage/dogs-bg.png";
import CorgiImage from "../../assets/BannerImage/corgi.png";
import LabradorImage from "../../assets/BannerImage/labrador.png";
import BeagleImage from "../../assets/BannerImage/beagle.png";
import RightPaw from "../../assets/BannerImage/RightPaw.png";
import LeftPaw from "../../assets/BannerImage/leftpaw.png";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaArrowDown,
} from "react-icons/fa";

const dogs = [
  {
    id: 1,
    name: "Corgi (2 months)",
    image: CorgiImage,
    description:
      "The Corgi is intelligent, quick and curious. It is a kind, adventurous breed which shows a large measure of independence. They are good with children and normally kind with strangers.",
  },
  {
    id: 2,
    name: "Labrador (3 months)",
    image: LabradorImage,
    description:
      "The Labrador Retriever is friendly, outgoing, and energetic. They are highly trainable and love to please their owners. Great with families and highly social.",
  },
  {
    id: 3,
    name: "Beagle (4 months)",
    image: BeagleImage,
    description:
      "Beagles are intelligent and good-natured. They have a keen sense of smell and are often used as detection dogs. They make excellent family pets.",
  },
];

const HomeBanner = () => {
  const [currentDog, setCurrentDog] = useState(0);

  // Handle Navigation
  const handleNext = () => {
    setCurrentDog((prev) => (prev + 1) % dogs.length);
  };

  const handlePrev = () => {
    setCurrentDog((prev) => (prev - 1 + dogs.length) % dogs.length);
  };

  return (
    <section className="relative p-0 lg:pb-[100px] h-auto lg:h-auto bg-[#FDEDD4]">
      {/* Left Paw Icon */}
      <img
        src={LeftPaw}
        alt="Corgi paw print"
        className="absolute left-0 bottom-0 h-[250px] w-[200px] md:h-[220px] md:w-[180px]"
      />

      <div className="flex flex-col lg:flex-row lg:px-12 lg:py-0 py-6">
        {/* Left Side - Dog Image */}
        <div className="flex flex-col items-center justify-center w-full lg:w-[50%]">
          <div className="relative w-full max-w-[570px] mx-auto">
            <img src={DogBg} alt="Background" className="w-full" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <img
                src={dogs[currentDog].image}
                alt={dogs[currentDog].name}
                className="w-[70%] lg:w-[80%] mx-auto object-contain"
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <LiaLongArrowAltLeftSolid
              className="text-4xl cursor-pointer"
              onClick={handlePrev}
            />
            <span className="text-2xl text-black font-poppins">
              {dogs[currentDog].name}
            </span>
            <LiaLongArrowAltRightSolid
              className="text-4xl cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>

        {/* Right Side - Dog Description */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full lg:w-[50%] px-6 md:px-12 lg:px-0 my-8 lg:my-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Everybody Needs A Friend In Life.
          </h2>
          <p className="text-lg mt-4 leading-[30px] md:leading-[35px] text-black max-w-[500px]">
            {dogs[currentDog].description}
          </p>
          <button className="mt-6 bg-[#E58608] h-12 w-[120px] text-white text-[18px] font-medium rounded-full hover:bg-[#e58680] transition duration-300">
            Buy Me
          </button>
        </div>
      </div>

      {/* Right Paw Icon */}
      <img
        src={RightPaw}
        alt="Paw print"
        className="absolute right-4 bottom-[10%] md:bottom-[15%] h-[200px] w-[180px] lg:h-[225px] lg:w-[208px]"
      />

      {/* Social Media Links */}
      <div className="absolute hidden lg:flex right-10 bottom-20">
        <ul className="flex items-center gap-4">
          <li>
            <FaFacebookF className="h-5 w-5 cursor-pointer hover:text-[#4267B2]" />
          </li>
          <li>
            <FaYoutube className="h-5 w-5 cursor-pointer hover:text-[#CD201F]" />
          </li>
          <li>
            <FaInstagram className="h-5 w-5 cursor-pointer hover:text-purple-800" />
          </li>
        </ul>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute -bottom-[35px] w-full flex justify-center">
        <button
          onClick={() =>
            document
              .getElementById("breeds-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-4xl text-black bg-white rounded-full shadow-2xl h-20 w-20 flex items-center justify-center z-auto"
        >
          <FaArrowDown />
        </button>
      </div>
    </section>
  );
};

export default HomeBanner;
