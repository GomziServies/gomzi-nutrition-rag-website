import React from "react";
import SEO from "../component/SEO";
import HeroSectionWithIcons from "../component/ui/HeroSection";
import SeasonFavoritesSection from "../component/ui/SeasonFavoritesSection";
import TrendingDealsSection from "../component/ui/TrendingDealsSection";
import BestSellingSection from "../component/ui/BestSellingSection";
import PromoBannerSlider from "../component/ui/PromoBannerSlider";
import TopBrandsSection from "../component/ui/TopBrandsSection";
import PlantProteinSection from "../component/ui/PlantProteinSection";
import CreatineSection from "../component/ui/CreatineSection";
import NutritionPromoBannerSlider from "../component/ui/NutritionPromoBannerSlider";
import WellnessHealthSection from "../component/ui/WellnessHealthSection";
import BankOffersBannerSlider from "../component/ui/BankOffersBannerSlider";
import TransparencySection from "../component/ui/transparency";
import TrustAndGoalSection from "../component/ui/TrustAndGoalSection";
import CustomerReviewsHome from "../component/ui/CustomerReviewsHome";
import AthleteCircleSection from "../component/ui/AthleteCircleSection";
import TrustExpertsSection from "../component/ui/TrustExpertsSection";
import FAQSection from "../component/ui/FAQItem";

const Landing = () => {
  return (
    <>
      <SEO />
      <main className="w-full bg-[#faf8f6]">
        {/* 1. Hero Carousel + Feature Bar (Free Shipping, Lab Tested, FSSAI, Pan-India) */}
        <HeroSectionWithIcons />

        {/* 2. Welcome First Order Voucher (Unlock 10% Off) */}
        <AthleteCircleSection />

        {/* 3. Shop By Category (Visual category navigation cards) */}
        <SeasonFavoritesSection />

        {/* 4. Flash Sale & Trending Deals (High-converting promotional deals) */}
        <TrendingDealsSection />

        {/* 5. Best Sellers (Flagship product rail with live ratings & Add to Cart) */}
        <BestSellingSection />

        {/* 6. Mid-Page High-Impact Promotional Banner */}
        <PromoBannerSlider />

        {/* 7. Explore Full Catalog By Category Tabs (Whey, Mass Gainer, Pre Workout, BCAA, Creatine) */}
        <TopBrandsSection />

        {/* 8. Specialized Performance Rails */}
        <PlantProteinSection />
        <CreatineSection />

        {/* 9. Green Discount Strip Banner */}
        <NutritionPromoBannerSlider />

        {/* 10. Daily Health & Wellness Essentials */}
        <WellnessHealthSection />

        {/* 11. Bank & Payment Offers Carousel */}
        <BankOffersBannerSlider />

        {/* 12. 100% Label Transparency & Scoop Breakdown */}
        <TransparencySection />

        {/* 13. Batch Verification & Official NABL Lab Report */}
        <TrustAndGoalSection />

        {/* 14. Verified Customer Reviews & Testimonials */}
        <CustomerReviewsHome />

        {/* 15. B2B Wholesale & Gym Supply Partnerships */}
        <TrustExpertsSection />

        {/* 16. Frequently Asked Questions */}
        <FAQSection />
      </main>
    </>
  );
};

export default Landing;
