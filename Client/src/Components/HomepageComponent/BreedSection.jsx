import React from "react";

import GoldenRetriever from "../../assets/BreedImages/GoldenRetriver.png";
import Husky from "../../assets/BreedImages/Husky.png";
import Pitbull from "../../assets/BreedImages/Pitbull.png";
import GermanShepherd from "../../assets/BreedImages/GermanShepard.png";
import Pug from "../../assets/BreedImages/Pug.png";
import JapaneseSpitz from "../../assets/BreedImages/JapneseSpitz.png";
import Labrador from "../../assets/BreedImages/Labrador.png";

export default function BreedSection() {
  const breeds = [
    { id: 1, img: GoldenRetriever, name: "Golden Retriever" },
    { id: 2, img: Husky, name: "Siberian Husky" },
    { id: 3, img: Pitbull, name: "Pitbull" },
    { id: 4, img: GermanShepherd, name: "German Shepherd" },
    { id: 5, img: Pug, name: "Pug" },
    { id: 6, img: JapaneseSpitz, name: "Japanese Spitz" },
    { id: 7, img: Labrador, name: "Labrador" },
  ];

  return (
    <div className="my-20 px-6 md:px-16 xl:px-[141px]">
      {/* Section Title */}
      <div className="text-center font-poppins mb-10">
        <p className="text-4xl font-bold mb-4">Dog Breeds</p>
        <p className="text-lg text-gray-700">
          Find yourself a perfect friend from a wide variety of choices.
        </p>
      </div>

      {/* Breed List */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
        {breeds.map((breed) => (
          <div key={breed.id} className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-[137px] sm:h-[137px] rounded-full overflow-hidden shadow-lg">
              <img
                src={breed.img}
                alt={breed.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-medium mt-2 text-center">{breed.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
