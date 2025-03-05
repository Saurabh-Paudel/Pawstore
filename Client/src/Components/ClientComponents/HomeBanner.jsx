import React, { useState, useEffect } from "react";
import DogBg from "../../assets/BannerImage/dogs-bg.png";
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
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const { token } = useSelector((state) => state.user);

  // Fetch banners from the backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/banners/banners"
        );
        setBanners(response.data.banners);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Automatic slider effect
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return; // No need to slide if 1 or fewer banners or paused

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Slide every 5 seconds

    // Cleanup interval on unmount or when conditions change
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  // Handle Navigation with pause/resume
  const handleNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    setIsPaused(true); // Pause on manual interaction
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  const handlePrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    setIsPaused(true); // Pause on manual interaction
    setTimeout(() => setIsPaused(false), 10000); // Resume after 10 seconds
  };

  if (loading) {
    return <div>Loading banners...</div>;
  }

  if (banners.length === 0) {
    return <div>No banners available.</div>;
  }

  return (
    <section className="relative p-0 lg:pb-[100px] h-auto lg:h-auto bg-[#FDEDD4]">
      {/* Left Paw Icon */}
      <img
        src={LeftPaw}
        alt="Corgi paw print"
        className="absolute left-0 bottom-0 h-[250px] w-[200px] md:h-[220px] md:w-[180px]"
      />

      <div className="flex flex-col lg:flex-row lg:px-12 lg:py-0 py-6">
        {/* Left Side - Banner Image */}
        <div className="flex flex-col items-center justify-center w-full lg:w-[50%]">
          <div className="relative w-full max-w-[570px] mx-auto">
            <img src={DogBg} alt="Background" className="w-full" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <img
                src={`http://localhost:8000${banners[currentBanner].image}`}
                alt={banners[currentBanner].title}
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
              {banners[currentBanner].title}
            </span>
            <LiaLongArrowAltRightSolid
              className="text-4xl cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>

        {/* Right Side - Banner Description */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full lg:w-[50%] px-6 md:px-12 lg:px-0 my-8 lg:my-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {banners[currentBanner].title}
          </h2>
          <p className="text-lg mt-4 leading-[30px] md:leading-[35px] text-black max-w-[500px]">
            {banners[currentBanner].description}
          </p>
          <Link to="/dog-sales">
            <button className="mt-6 bg-[#E58608] h-12 w-[120px] text-white text-[18px] font-medium rounded-full hover:bg-[#e58680] transition duration-300">
              Buy Me
            </button>
          </Link>
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
