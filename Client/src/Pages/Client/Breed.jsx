import React from "react";

import GoldenRetriever from "../../assets/BreedImages/GoldenRetriver.png";
import Husky from "../../assets/BreedImages/Husky.png";
import Pitbull from "../../assets/BreedImages/Pitbull.png";
import GermanShepherd from "../../assets/BreedImages/GermanShepard.png";
import Pug from "../../assets/BreedImages/Pug.png";
import JapaneseSpitz from "../../assets/BreedImages/JapneseSpitz.png";
import Labrador from "../../assets/BreedImages/Labrador.png";

export default function Breed() {
  const breeds = [
    {
      id: 1,
      img: GoldenRetriever,
      name: "Golden Retriever",
      description:
        "Golden Retrievers are friendly, intelligent, and devoted dogs. They are popular family pets known for their gentle and loyal nature.",
    },
    {
      id: 2,
      img: Husky,
      name: "Siberian Husky",
      description:
        "Siberian Huskies are known for their striking appearance, endurance, and independent nature. They are energetic, friendly, and good with families.",
    },
    {
      id: 3,
      img: Pitbull,
      name: "Pitbull",
      description:
        "Pitbulls are strong, muscular dogs with a gentle and affectionate personality. They are loyal and protective, making them excellent family pets.",
    },
    {
      id: 4,
      img: GermanShepherd,
      name: "German Shepherd",
      description:
        "German Shepherds are intelligent, hardworking, and versatile. They are commonly used as working dogs and are known for their loyalty and protective nature.",
    },
    {
      id: 5,
      img: Pug,
      name: "Pug",
      description:
        "Pugs are charming, mischievous, and loving dogs. They are known for their wrinkled faces, curled tails, and affectionate nature.",
    },
    {
      id: 6,
      img: JapaneseSpitz,
      name: "Japanese Spitz",
      description:
        "The Japanese Spitz is a small, fluffy breed with a friendly and playful personality. They are known for their white coat and resemblance to the American Eskimo Dog.",
    },
    {
      id: 7,
      img: Labrador,
      name: "Labrador",
      description:
        "Labradors are outgoing, even-tempered, and friendly dogs. They are one of the most popular breeds due to their loyalty, intelligence, and great family companionship.",
    },
  ];

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Dog Breeds</h2>
        <p className="text-lg text-gray-600">
          Find yourself a perfect friend from a wide variety of choices.
        </p>
      </div>

      {/* Breed List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {breeds.map((breed) => (
          <div key={breed.id} className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-[137px] sm:h-[137px] rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={breed.img}
                alt={breed.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-semibold mt-3 text-gray-800 text-center">
              {breed.name}
            </p>
            <p className="text-sm text-gray-500 mt-2 text-center px-4">
              {breed.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
