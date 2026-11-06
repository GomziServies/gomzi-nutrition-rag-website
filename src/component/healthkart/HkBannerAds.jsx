// src/component/healthkart/HkBannerAds.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * Full-Width Promotional Banner Ad (HealthKart style)
 * Renders the full 100% original graphic banner without any cropping or text overlay.
 */
export function HkBannerAdWide({
  image = "/images/banners/banner-gains-season.png",
  ctaLink = "/gomzi-supplement/whey-protein",
  alt = "Gomzi Nutrition Promotional Banner",
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 my-5 sm:my-7 font-sans">
      <Link
        to={ctaLink}
        className="block group overflow-hidden rounded-2xl shadow-lg border border-[#ebdcd2]/30 bg-stone-950 transition-all duration-300 hover:shadow-2xl"
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-auto block object-contain transition-transform duration-300 group-hover:scale-[1.008]"
          loading="lazy"
        />
      </Link>
    </div>
  );
}

/**
 * 2-Column Split Promotional Banner Ads (HealthKart style)
 * Renders the two high-resolution graphic banners side by side with zero cropping.
 */
export function HkBannerAdSplit({
  ad1 = {
    image: "/images/banners/banner-pre-workout.png",
    link: "/gomzi-supplement/pre-workout",
    alt: "Explosive Ignition Pre-Workout Power",
  },
  ad2 = {
    image: "/images/banners/banner-mass-gainer.png",
    link: "/gomzi-supplement/mass-gainer",
    alt: "Anabolic Mass Gainer Chocolate Promo",
  },
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 my-5 sm:my-7 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Banner Left: Pre-Workout */}
        <Link
          to={ad1.link || "/gomzi-supplement/pre-workout"}
          className="block group overflow-hidden rounded-2xl shadow-md border border-[#ebdcd2]/30 bg-black/20 transition-all duration-300 hover:shadow-xl"
        >
          <img
            src={ad1.image || "/images/banners/banner-pre-workout.png"}
            alt={ad1.alt || "Pre-Workout Banner"}
            className="w-full h-auto block object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            loading="lazy"
          />
        </Link>

        {/* Banner Right: Mass Gainer */}
        <Link
          to={ad2.link || "/gomzi-supplement/mass-gainer"}
          className="block group overflow-hidden rounded-2xl shadow-md border border-[#ebdcd2]/30 bg-black/20 transition-all duration-300 hover:shadow-xl"
        >
          <img
            src={ad2.image || "/images/banners/banner-mass-gainer.png"}
            alt={ad2.alt || "Mass Gainer Banner"}
            className="w-full h-auto block object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            loading="lazy"
          />
        </Link>
      </div>
    </div>
  );
}

