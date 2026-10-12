import React from "react";
import AnnouncementBanner from "../HOC/Header/AnnouncementBanner";
import Navbar from "../HOC/Header/Navbar";
import HeroSectionWithIcons from "../component/ui/HeroSection";
import NaraHealthSection from "../component/ui/NaraHealthSection";
import SeasonFavoritesSection from "../component/ui/SeasonFavoritesSection";
import ComparisonTable from "../component/ui/ComparisonTable";
import SocialProofSlider from "../component/ui/SocialProofSlider";
import TrustExpertsSection from "../component/ui/TrustExpertsSection";
import FuelingAthletesSection from "../component/ui/FuelingAthletesSection";
import StorySection from "../component/ui/StorySection";
import FAQSection from "../component/ui/FAQItem";
import Footer from "../HOC/Footer/Footer";
import TransparencySection from "../component/ui/transparency";
// import LatestBlogs from "../component/ui/LatestBlogs";
import CategorySection from "../component/CategorySection";
import IngredientsHealthBenefits from "../component/ui/Ingredients-Health-Benefits";
import EnsureQualitySection from "../component/ui/ensure-quality";
import SEO from "../component/SEO";
import BrandPromiseSection from "../component/ui/BrandPromiseSection";
import TrustAndGoalSection from "../component/ui/TrustAndGoalSection";
import CustomerReviewsHome from "../component/ui/CustomerReviewsHome";

const Landing = () => {
  const categories = [
    "Sports Nutrition",
    // "Peanut Butter",
    // "Daily Wellness",
    // "Weight Management",
    // "Immunity Support",
    // "Women's Health",
    // "Kids Nutrition",
    // "Bone & Joint Health",
  ];
  return (
    <>
      <SEO />
      <section>
        {/* <AnnouncementBanner/> */}
        {/* <Navbar/> */}
        <HeroSectionWithIcons />
        <NaraHealthSection />
        <SeasonFavoritesSection />
        <TrustExpertsSection />
        <section className="py-12 w-full overflow-hidden">
          <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
            {categories.map((category) => (
              <CategorySection key={category} category={category} />
            ))}
          </div>
        </section>
        <BrandPromiseSection />
        <TrustAndGoalSection />
        <CustomerReviewsHome />
        {/* <StorySection /> */}
        {/* <IngredientsHealthBenefits /> */}
        <TransparencySection />
        {/* <EnsureQualitySection /> */}
        {/* <LatestBlogs /> */}
        <FAQSection />
      </section>
    </>
  );
};

export default Landing;
