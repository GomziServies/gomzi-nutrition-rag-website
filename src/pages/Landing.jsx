import React from "react";
import SEO from "../component/SEO";
import HeroSectionWithIcons from "../component/ui/HeroSection";
import PartnerMarqueeStrip from "../component/ui/PartnerMarqueeStrip";
import SeasonFavoritesSection from "../component/ui/SeasonFavoritesSection";
import TrendingDealsSection from "../component/ui/TrendingDealsSection";
import BestSellingSection from "../component/ui/BestSellingSection";
import PromoBannerSlider from "../component/ui/PromoBannerSlider";
import BrandCompanyShowcaseSection from "../component/ui/BrandCompanyShowcaseSection";
import NutritionPromoBannerSlider from "../component/ui/NutritionPromoBannerSlider";
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

        {/* 1.1 Official Brand Partners Infinite Running Marquee Strip */}
        <PartnerMarqueeStrip />

        {/* 2. Welcome First Order Voucher (Unlock 10% Off) */}
        <AthleteCircleSection />

        {/* 3. Shop By Category (Visual category navigation cards) */}
        <SeasonFavoritesSection />

        {/* 4. Promotional Banner Slider (Placed directly below Trending Deals of the Week) */}
        <PromoBannerSlider />

        {/* 5. Flash Sale & Trending Deals (Trending Deals of the Week) */}
        <TrendingDealsSection />

        {/* 6. Green Discount Strip Banner */}
        <NutritionPromoBannerSlider />


        {/* 7. Best Sellers (Flagship product rail with live ratings & Add to Cart) */}
        <BestSellingSection />

        {/* 8. Official Brand Partner Showcase (Company Advertisement Banner + Top 5 Products) */}
        <BrandCompanyShowcaseSection />


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
