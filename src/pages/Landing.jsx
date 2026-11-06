// src/pages/Landing.jsx
import React from "react";
import SEO from "../component/SEO";
import HkCategoryCircles from "../component/healthkart/HkCategoryCircles";
import HkStealDeals from "../component/healthkart/HkStealDeals";
import HkFlashDeals from "../component/healthkart/HkFlashDeals";
import { HkBannerAdWide, HkBannerAdSplit } from "../component/healthkart/HkBannerAds";
import HkBestSellersTabbed from "../component/healthkart/HkBestSellersTabbed";
import HkComboStackBuilder from "../component/healthkart/HkComboStackBuilder";
import HkCategoryShowcase from "../component/healthkart/HkCategoryShowcase";
import HkWhyGomzi from "../component/healthkart/HkWhyGomzi";
import HkCustomerReviews from "../component/healthkart/HkCustomerReviews";
import HkSeoAccordion from "../component/healthkart/HkSeoAccordion";

const Landing = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#f4f4f4] min-h-screen text-[#1c1917] selection:bg-[#95442c] selection:text-white">
      {/* ── SEO Meta ── */}
      <SEO
        title="Gomzi Nutrition - India's Authentic Sports Nutrition & Supplement Store"
        description="Shop 419+ authentic whey proteins, mass gainers, creatine, pre-workouts, and clean supplements direct from Gomzi Nutrition lab. 100% genuine with verifiable NABL batch reports."
      />

      {/* 1. Popular Categories / Shop by Goal Bubbles (.popularBrands style) */}
      <HkCategoryCircles />

      {/* 2. Deals You Cannot Miss / Steal Deals (Price Drop & Coupon Drops) */}
      <HkStealDeals />

      {/* 3. Flash Deals & Just Launched Carousel (Live products from DB) */}
      <HkFlashDeals />

      {/* 4. Banner Ad 1: Full-Width Widescreen Gains Season Promotional Ad */}
      <HkBannerAdWide
        image="/images/banners/banner-gains-season.png"
        ctaLink="/gomzi-supplement/whey-protein"
        alt="Gomzi Nutrition Massive Gains Season - Flat 25% Off"
      />

      {/* 5. Best Sellers & 419+ Products Tabbed Filter Showcase (.offers_offers_desktop__miLXA) */}
      <HkBestSellersTabbed />

      {/* 6. Frequently Bought Together: 2 + 1 Best Combos & Hourly Sales Velocity */}
      <HkComboStackBuilder />

      {/* 6. Banner Ad 2: 2-Column Split Promotional Ads (Pre-Workout & Mass Gainer) */}
      <HkBannerAdSplit
        ad1={{
          image: "/images/banners/banner-pre-workout.png",
          link: "/gomzi-supplement/pre-workout",
          alt: "Explosive Ignition Pre-Workout Power",
        }}
        ad2={{
          image: "/images/banners/banner-mass-gainer.png",
          link: "/gomzi-supplement/mass-gainer",
          alt: "Anabolic Mass Gainer Chocolate Promo",
        }}
      />

      {/* 7. Dedicated Category Showcase: Whey Protein & Isolates (86 Products in DB) */}
      <HkCategoryShowcase
        title="Whey Protein & Isolate Range"
        category="Whey Protein"
        categorySlug="whey-protein"
        productCount={86}
        subtitle="86 authentic whey proteins & isolates with NABL batch certification."
      />

      {/* 8. Dedicated Category Showcase: Combos & Value Stacks (96 Products in DB) */}
      <HkCategoryShowcase
        title="Combos & Value Stacks"
        category="Combos & Stacks"
        categorySlug="combos-stacks"
        productCount={96}
        subtitle="96 curated supplement bundles for maximum athletic progression & savings."
      />

      {/* 9. Banner Ad 3: Widescreen High-Protein Peanut Butter Ad */}
      <HkBannerAdWide
        image="/images/banners/banner-peanut-butter.png"
        ctaLink="/gomzi-supplement/protein-bars-snacks"
        alt="High Protein Peanut Butter Supplement"
      />

      {/* 10. Dedicated Category Showcase: Creatine & Pre-Workout (89 Products in DB) */}
      <HkCategoryShowcase
        title="Creatine & Pre-Workout Powerhouse"
        category="Creatine"
        categorySlug="creatine"
        productCount={53}
        subtitle="53 micronized creatine and high-stim pre-workout formulas for unmatched strength."
      />

      {/* 11. Why Gomzi Authenticity & Quality Pillars (.whyhk_why-hk__oTfsN) */}
      <HkWhyGomzi />

      {/* 12. Customer Reviews & Athlete Transformations */}
      <HkCustomerReviews />

      {/* 14. Final Full-Width Transparency Banner */}
      <HkBannerAdWide
        image="/images/banners/banner-transparency.png"
        ctaLink="/gomzi-supplement/whey-protein"
        alt="Gomzi Nutrition Premium Whey Protein Transparency & Lab Purity"
      />

      {/* 15. Expandable SEO Guide & Supplement Knowledge Accordion (.seoSection_mob-seo-sec__d2AIq) */}
      <HkSeoAccordion />
    </div>
  );
};

export default Landing;
