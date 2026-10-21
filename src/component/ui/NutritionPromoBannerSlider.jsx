import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * HealthKart-Identical Flagship Landscape Promotional Banner
 * Renders the authentic MuscleBlaze Koshaveda Shilajit BUY 1 GET 1 FREE Banner:
 * - Left: Brand Monogram + "Koshaveda Shilajit" + Massive "BUY 1 GET 1 FREE"
 * - Center: Photorealistic Himalayan Shilajit Resin on Granite Mountain Rock
 * - Right: "Enhances Strength" & "Improves Stamina" Circular Badges
 * - Navigation: Directly routes to Shilajit search/category
 */
export default function NutritionPromoBannerSlider() {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/gomzi-supplement?search=shilajit");
  };

  return (
    <section
      className="w-full py-4 sm:py-6 md:py-8 bg-[#faf8f6] font-modelica overflow-hidden"
      aria-label="Flagship Promotional Banner"
    >
      <div className="max-w-[1250px] mx-auto px-3 sm:px-6">
        <div
          onClick={handleBannerClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBannerClick();
            }
          }}
          className="relative rounded-lg sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/10 cursor-pointer group bg-[#3a3532]"
        >
          {/* Authentic Koshaveda Shilajit BUY 1 GET 1 FREE Banner Graphic (Unified banner - compresses proportionately) */}
          <img
            src="/images/deals/koshaveda-shilajit-bogo-banner.jpg"
            alt="MuscleBlaze Koshaveda Shilajit - BUY 1 GET 1 FREE - Enhances Strength & Improves Stamina"
            className="w-full h-auto object-contain block transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            loading="lazy"
          />

          {/* Subtle Glow Overlay on Hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
