import React from "react";
import HomeBanner from "../../Components/HomepageComponent/HomeBanner";
import BreedSection from "../../Components/HomepageComponent/BreedSection";
import PetProducts from "../../Components/HomepageComponent/PetProducts";
function Home() {
  return (
    <>
      <HomeBanner />
      <BreedSection />
      <PetProducts />
    </>
  );
}

export default Home;
