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
import TopBrandsSection from "../component/ui/TopBrandsSection";
import TrendingDealsSection from "../component/ui/TrendingDealsSection";
import BestSellingSection from "../component/ui/BestSellingSection";
import PromoBannerSlider from "../component/ui/PromoBannerSlider";
import PlantProteinSection from "../component/ui/PlantProteinSection";
import BankOffersBannerSlider from "../component/ui/BankOffersBannerSlider";
import CreatineSection from "../component/ui/CreatineSection";
import NutritionPromoBannerSlider from "../component/ui/NutritionPromoBannerSlider";
import WellnessHealthSection from "../component/ui/WellnessHealthSection";
import AthleteCircleSection from "../component/ui/AthleteCircleSection";

const Landing = () => {
  const categories = [
    "Whey Protein",
  ];
  return (
    <>
      <SEO />
      <section>
        {/* <AnnouncementBanner/> */}
        {/* <Navbar/> */}
        <HeroSectionWithIcons />
        <AthleteCircleSection />
        <NaraHealthSection />
        <TopBrandsSection />
        <SeasonFavoritesSection />
        <TrendingDealsSection />
        <BestSellingSection />
        <PromoBannerSlider />
        <PlantProteinSection />
        <CreatineSection />
        <NutritionPromoBannerSlider />
        <WellnessHealthSection />
        <BankOffersBannerSlider />
        <section className="py-8 w-full overflow-hidden">
          <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
            {categories.map((category) => (
              <CategorySection key={category} category={category} title="Top Protein Picks" />
            ))}
          </div>
        </section>
        <TrustExpertsSection />
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
