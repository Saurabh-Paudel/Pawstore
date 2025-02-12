import React from "react";
import Product1 from "../../assets/PetProducts/product1.png";
import Product2 from "../../assets/PetProducts/product2.png";
import Product3 from "../../assets/PetProducts/product3.png";
import Product4 from "../../assets/PetProducts/product4.png";
import Product5 from "../../assets/PetProducts/product5.png";
import Product6 from "../../assets/PetProducts/product6.png";

export default function PetProducts() {
  return (
    <div className="h-auto w-full px-6 md:px-10 lg:px-10 xl:px-[141px] flex justify-center items-center py-2">
      <div className="h-auto w-full flex flex-col lg:flex-row justify-between items-start font-poppins gap-8 lg:gap-16">
        {/* Left Text Section */}
        <div className="w-full lg:w-[40%] flex flex-col justify-start items-center lg:items-start gap-6">
          <p className="font-bold text-3xl md:text-4xl text-black">Pet Products</p>
          <p className="text-base md:text-lg text-gray-600">
            All products are designed for ease of use and durability, as well as
            looking good. You can choose your own colours to make your item
            unique.
          </p>
          <button className="bg-[#e58608] hover:bg-[#d87407] transition-all duration-300 rounded-full font-medium text-lg h-12 w-[138px] text-white shadow-lg">
            See more
          </button>
        </div>

        {/* Right Image Grid */}
        <div className="w-full hidden lg:w-[55%] lg:grid grid-cols-3 gap-4">
          {[Product1, Product2, Product3, Product4, Product5, Product6].map(
            (product, index) => (
              <div key={index} className="h-zuto w-auto flex justify-center items-center">
                <img src={product} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md" />
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
