import React from "react";
import SEO from "../component/SEO";
import HeroSectionWithIcons from "../component/ui/HeroSection";
import SpotlightBrandsSection from "../component/ui/SpotlightBrandsSection";
import SeasonFavoritesSection from "../component/ui/SeasonFavoritesSection";
import PromoBannerSlider from "../component/ui/PromoBannerSlider";
import TrendingDealsSection from "../component/ui/TrendingDealsSection";
import NutritionPromoBannerSlider from "../component/ui/NutritionPromoBannerSlider";
import BestSellingSection from "../component/ui/BestSellingSection";
import PicksYouCantMissSection from "../component/ui/PicksYouCantMissSection";
import PreIntraWorkoutSection from "../component/ui/PreIntraWorkoutSection";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

/**
 * HealthKart-Identical Landing Page
 * Contains the EXACT sections and banner layout of HealthKart (Zero Extra Banners):
 *
 * 1. Master Hero Carousel (Flagship product & coupon banners)
 * 2. Spotlight Brands (Top brand partners circle rail)
 * 3. Shop By Category (Visual category navigation cards)
 * 4. 4-Card Promotional Deals & Offers Grid (Effervescent, Whey, Collagen, Creatine)
 * 5. Trending Deals of the Week (Limited time offers with live ratings & Add to Cart)
 * 6. Flagship Landscape Promotional Banner (Koshaveda Shilajit BUY 1 GET 1 FREE)
 * 7. Best Sellers (Top-rated customer favourites)
 * 8. Picks You Can't Miss (HealthKart 4-Card Promotional Grid)
 * 9. Best in Pre/Intra Workout (HealthKart Tabbed Supplement Rail)
 * 10. HealthKart 3-Pillar Authenticity & Trust Strip
 */
const Landing = () => {
  return (
    <>
      <SEO />
      <main className="w-full bg-[#faf8f6] font-modelica">
        {/* 1. Master Hero Carousel */}
        <HeroSectionWithIcons />

        {/* 2. Spotlight Brands Rail */}
        <SpotlightBrandsSection />

        {/* 3. Shop By Category */}
        <SeasonFavoritesSection />

        {/* 4. 4-Card Promotional Deals & Offers Banner Grid (HealthKart Reference Image 1) */}
        <PromoBannerSlider />

        {/* 5. Trending Deals of the Week */}
        <TrendingDealsSection />

        {/* 6. Flagship Landscape Promotional Banner (HealthKart Reference - Koshaveda Shilajit BOGO) */}
        <NutritionPromoBannerSlider />

        {/* 7. Best Sellers Carousel */}
        <BestSellingSection />

        {/* 8. Picks You Can't Miss (HealthKart 4-Card Deal Grid) */}
        <PicksYouCantMissSection />

        {/* 9. Best in Pre/Intra Workout (HealthKart Tabbed Supplement Rail) */}
        <PreIntraWorkoutSection />

        {/* 10. HealthKart Authentic Trust & Brand Assurance Pillars Strip */}
        <section
          className="w-full py-8 sm:py-10 bg-white border-t border-[#e5e7eb] font-modelica"
          aria-label="HealthKart Trust Pillars"
        >
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {/* Pillar 1: 100% Authentic */}
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4 first:pt-0 first:px-0">
                <div className="w-12 h-12 rounded-2xl bg-[#5C3124]/10 text-[#5C3124] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#1c1c28]">
                    100% Authentic Products
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Sourced directly from certified brand labs with tamper-proof security seals.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Free & Fast Shipping */}
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5C3124]/10 text-[#5C3124] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#1c1c28]">
                    Free Express Delivery
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Doorstep delivery across 19,000+ pin codes in India with real-time tracking.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Easy Returns */}
              <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-4">
                <div className="w-12 h-12 rounded-2xl bg-[#5C3124]/10 text-[#5C3124] flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#1c1c28]">
                    Easy 14-Day Returns
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Hassle-free replacement policy & dedicated certified nutritionist helpline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Landing;
