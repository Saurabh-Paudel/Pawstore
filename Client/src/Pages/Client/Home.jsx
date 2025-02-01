import React from "react";
import HomeBanner from "../../Components/HomepageComponent/HomeBanner";
import BreedSection from "../../Components/HomepageComponent/BreedSection";
import PetProducts from "../../Components/HomepageComponent/PetProducts";
import BlogSection from "../../Components/HomepageComponent/BlogSection";
function Home() {
  return (
    <>
      <HomeBanner />
      <BreedSection />
      <PetProducts />
      <BlogSection />
    </>
  );
}

export default Home;
