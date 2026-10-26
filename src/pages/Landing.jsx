import React from "react";

import SEO from "../component/SEO";
import HeroSection from "../component/ui/HeroSection";
import SeasonFavoritesSection from "../component/ui/SeasonFavoritesSection";
import TopProductsSection from "../component/ui/TopProductsSection";
import NutritionPromoBannerSlider from "../component/ui/NutritionPromoBannerSlider";
import TopProteinPicksSection from "../component/ui/TopProteinPicksSection";
import PromoBannerCarousel from "../component/ui/PromoBannerCarousel";
import DailyWellnessSection from "../component/ui/DailyWellnessSection";
import AdsBannerSection from "../component/ui/AdsBannerSection";
import FitFoodRangeSection from "../component/ui/FitFoodRangeSection";
import PreIntraWorkoutSection from "../component/ui/PreIntraWorkoutSection";
import BrandRangeSection from "../component/ui/BrandRangeSection";
import BlackFeatureBar from "../component/common/Black-Feature-Bar";

/**
 * Home page — HealthKart layout order:
 *   hero -> category marquee -> offer banners -> top products
 *   -> flagship banner -> top protein picks -> daily wellness
 *   -> fit food range -> ads banner -> pre/intra workout -> brand range
 */
const Landing = () => {
  return (
    <>
      <SEO />
      <main className="w-full bg-white">
        <HeroSection />
        <SeasonFavoritesSection />
        <PromoBannerCarousel />
        <TopProductsSection />
        <NutritionPromoBannerSlider />
        <TopProteinPicksSection />
        <DailyWellnessSection />
        <FitFoodRangeSection />
        <AdsBannerSection />
        <PreIntraWorkoutSection />
        <BrandRangeSection />
      </main>
      <BlackFeatureBar />
    </>
  );
};

export default Landing;
