import React from "react";
import HomeBanner from "../../Components/HomepageComponent/HomeBanner";
import BreedSection from "../../Components/HomepageComponent/BreedSection";
import PetProducts from "../../Components/HomepageComponent/PetProducts";
import BlogSection from "../../Components/HomepageComponent/BlogSection";
import NewsletterSection from "../../Components/HomepageComponent/NewsletterSection";
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
