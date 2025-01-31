import React from "react";
import CorgiImage from "../../assets/corgi.png";
import RightPaw from "../../assets/RightPaw.png";
import LeftPaw from "../../assets/leftpaw.png";
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

const HomeBanner = () => {
  return (
    <section className="relative p-0 h-auto lg:h-[650px] bg-[#FDEDD4]">
      {/* Bottom Left Paw Icon */}
      <img
        src={LeftPaw}
        alt="Corgi paw print"
        className="absolute left-0 bottom-0 h-[300px] w-[226px] md:h-[250px] md:w-[200px]"
      />

      <div className="flex flex-col lg:flex-row lg:px-16 lg:py-0 py-6">
        {/* Left Side - Corgi Image */}
        <div className="md:items-center xl:pl-[90px] lg:max-w-[570px] lg:max-h-[580px] w-auto h-auto flex flex-col justify-center">
          <img
            src={CorgiImage}
            alt="Corgi"
            className="w-full max-w-[570px] h-auto drop-shadow-lg"
          />

          {/* Navigation Arrows and Text */}
          <div className="flex items-center justify-center gap-[10px] lg:w-full lg:mx-[100px] sm:w-[570px] mt-[47px] lg:mt-[74px]">
            <LiaLongArrowAltLeftSolid className="text-4xl" />
            <span className="text-2xl text-black font-poppins">
              Corgi (2 months)
            </span>
            <LiaLongArrowAltRightSolid className="text-4xl" />
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className=" md:text-center lg:text-start md:px-20 lg:w-[500px] lg:h-auto w-full lg:ml-[100px] lg:px-2 px-4 py-16 font-poppins flex flex-col justify-end">
          <h2 className="text-4xl font-bold text-black">
            Everybody Needs A Friend In Life.
          </h2>
          <p className="text-lg mt-4 leading-[35px] text-justify text-black">
            The Corgi is intelligent, quick and curious. It is a kind,
            adventurous breed which shows a large measure of independence.
            They are good with children and normally kind with strangers.
          </p>
          <div className="flex flex-col items-center lg:items-start mt-[24px] lg:mt-[8px]">
            <button className="mt-6 bg-[#E58608] h-12 w-[120px] text-white text-[18.66px] font-medium px-6 py-3 rounded-full hover:bg-[#e58680] transition duration-300">
              Buy Me
            </button>
          </div>
        </div>

        {/* Right Side - Paw Icon Aligned with Button */}
        <img
          src={RightPaw}
          alt="Paw print"
          className="absolute right-0 bottom-[20%] md:bottom-[25%] h-[225px] w-[208px] lg:h-[225px] lg:w-[208px]"
        />
      </div>

      {/* Social Media Links */}
      <div className="absolute lg:flex hidden right-10 lg:bottom-28 xl:bottom-16 mr-[141px] lg:mr-[90px]">
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

      {/* Scroll Down Icon */}
      <div className="absolute -bottom-[35px] w-full flex justify-center">
        <div className="text-4xl text-black bg-white rounded-full shadow-2xl h-20 w-20 flex items-center justify-center">
          <FaArrowDown />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
