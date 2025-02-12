import React from "react";
import { FaRegHeart, FaRegEye } from "react-icons/fa";

import DogCollar from "../../assets/AccessoriesImages/collar.png";
import DogLeash from "../../assets/AccessoriesImages/leash.png";
import DogToy from "../../assets/AccessoriesImages/toy.png";
import DogBed from "../../assets/AccessoriesImages/bed.png";
import DogBowl from "../../assets/AccessoriesImages/bowl.png";
import DogBrush from "../../assets/AccessoriesImages/brush.png";
import DogHarness from "../../assets/AccessoriesImages/harness.png";
import DogMuzzle from "../../assets/AccessoriesImages/muzzle.png";
import DogBandana from "../../assets/AccessoriesImages/bandana.png";
import DogWaterBottle from "../../assets/AccessoriesImages/bottle.png";
import { useNavigate } from "react-router";

export default function AccessoriesPage() {
  const accessories = [
    {
      id: 1,
      name: "Dog Collar",
      description:
        "A comfortable and stylish collar for your dog, available in various sizes and colors.",
      img: DogCollar,
      price: 20,
      delPrice: 30,
      ratings: 120,
    },
    {
      id: 2,
      name: "Dog Leash",
      description:
        "A strong and durable leash to keep your dog safe during walks.",
      img: DogLeash,
      price: 15,
      delPrice: 25,
      ratings: 80,
    },
    {
      id: 3,
      name: "Dog Toy",
      description:
        "Fun and interactive toys to keep your dog entertained and mentally stimulated.",
      img: DogToy,
      price: 10,
      delPrice: 18,
      ratings: 200,
    },
    {
      id: 4,
      name: "Dog Bed",
      description:
        "A cozy and soft bed where your dog can rest and relax after a long day.",
      img: DogBed,
      price: 50,
      delPrice: 70,
      ratings: 150,
    },
    {
      id: 5,
      name: "Dog Bowl",
      description:
        "High-quality bowls for feeding your dog with ease, available in different materials.",
      img: DogBowl,
      price: 12,
      delPrice: 18,
      ratings: 75,
    },
    {
      id: 6,
      name: "Dog Brush",
      description:
        "A grooming brush to help maintain your dog's coat and keep it tangle-free.",
      img: DogBrush,
      price: 18,
      delPrice: 25,
      ratings: 50,
    },
    {
      id: 7,
      name: "Dog Harness",
      description:
        "A comfortable harness for your dog to ensure a secure fit and better control.",
      img: DogHarness,
      price: 25,
      delPrice: 40,
      ratings: 180,
    },
    {
      id: 8,
      name: "Dog Muzzle",
      description:
        "A safe and gentle muzzle to control your dog's behavior and prevent unwanted biting.",
      img: DogMuzzle,
      price: 15,
      delPrice: 22,
      ratings: 60,
    },
    {
      id: 9,
      name: "Dog Bandana",
      description:
        "A stylish and cute bandana to make your dog look even more adorable.",
      img: DogBandana,
      price: 8,
      delPrice: 12,
      ratings: 40,
    },
    {
      id: 10,
      name: "Dog Water Bottle",
      description:
        "A portable water bottle for keeping your dog hydrated during walks or trips.",
      img: DogWaterBottle,
      price: 20,
      delPrice: 30,
      ratings: 110,
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Dog Accessories
        </h2>
        <p className="text-lg text-gray-600">
          Browse through our collection of premium dog accessories to pamper
          your furry friend.
        </p>
      </div>

      {/* Accessories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accessories.map((accessory) => {
          const ratingOutOf5 = Math.floor(accessory.ratings / 40); // Converts the number of ratings to a rating out of 5
          return (
            <div
              key={accessory.id}
              className="group h-[350px] w-[270px] border border-gray-300 shadow-md rounded-lg relative"
              onClick={() => {
                navigate("/product-detail");
              }}
            >
              {/* Image Section */}
              <div className="relative h-[250px] w-full border-b rounded-t-lg border-gray-300 bg-[#F5F5F5]">
                <img
                  src={accessory.img}
                  alt={accessory.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 bg-black text-white h-8  w-full group-hover:flex items-center justify-center hidden cursor-pointer">
                  Add to cart
                </div>
              </div>

              {/* Product Info Section */}
              <div className="font-poppins text-center p-1">
                {/* Product Name */}
                <p className="text-base font-semibold text-gray-800">
                  {accessory.name}
                </p>

                {/* Price Section */}
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-base font-medium text-[#db6400]">
                    Rs. {accessory.price}
                  </span>
                  <span className="text-base text-gray-500 ml-2">
                    <del>Rs. {accessory.delPrice}</del>
                  </span>
                </div>

                {/* Rating Section */}
                <div className="mt-2 flex items-center justify-center">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 ${
                        index < ratingOutOf5 ? "fill" : "stroke"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-500 ml-2">
                    ({accessory.ratings})
                  </span>
                </div>
              </div>

              {/* Hoverable Icons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <div className="bg-white p-2 rounded-full flex items-center justify-center">
                  <FaRegHeart className="text-black cursor-pointer text-[20px]" />
                </div>
                <div className="bg-white p-2 rounded-full flex items-center justify-center">
                  <FaRegEye className="text-black cursor-pointer text-[20px]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
