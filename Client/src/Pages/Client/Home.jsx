import React from "react";
import HomeBanner from "../../Components/ClientComponents/HomeBanner";
import BreedSection from "../../Components/ClientComponents/BreedSection";
import PetProducts from "../../Components/ClientComponents/PetProducts";
import BlogSection from "../../Components/ClientComponents/BlogSection";
import NewsletterSection from "../../Components/ClientComponents/NewsletterSection";
function Home() {
  return (
    <>
      <HomeBanner />
      <BreedSection />
      <PetProducts />
      <BlogSection />
      <NewsletterSection />
    </>
  );
}

export default Home;
