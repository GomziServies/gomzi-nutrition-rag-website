import React from "react";
import { useNavigate } from "react-router-dom";

const PICKS_DEALS = [
  {
    id: "nakpro-deal",
    title: "Nakpro Impact Whey & Whey Gold Protein Offer",
    brand: "NAKPRO",
    tagline: "Trusted by Athletes, Certified by Experts!",
    image: "/images/deals/picks/nakpro-deal.png",
    link: "/gomzi-supplement?search=nakpro",
  },
  {
    id: "one-science-deal",
    title: "One Science Whey Protein + Free Daily Multivitamin Worth ₹1,399",
    brand: "ONE SCIENCE",
    tagline: "Backed by Science, Trusted by Tiger",
    image: "/images/deals/picks/one-science-deal.png",
    link: "/gomzi-supplement?search=one-science",
  },
  {
    id: "muscletech-deal",
    title: "MuscleTech NitroTech Workout Range + Free Steel Shaker",
    brand: "MUSCLETECH",
    tagline: "Workout Range Best Offers",
    image: "/images/deals/picks/muscletech-deal.png",
    link: "/gomzi-supplement?search=muscletech",
  },
  {
    id: "labrada-deal",
    title: "Labrada Muscle Mass Gainer 5kg + Free Daily Vitamin Worth ₹1,199",
    brand: "LABRADA",
    tagline: "Muscle Mass Gainer Chocolate Offer",
    image: "/images/deals/picks/labrada-deal.png",
    link: "/gomzi-supplement?search=labrada",
  },
];

/**
 * HealthKart "Picks You Can't Miss" Showcase
 * 4 High-Converting Vertical Banner Deal Cards on Warm Gold Graphic Canvas
 */
export default function PicksYouCantMissSection() {
  const navigate = useNavigate();

  return (
    <section
      className="w-full py-6 sm:py-8 bg-[#faf8f6] font-modelica"
      aria-label="Picks You Can't Miss"
    >
      <div className="max-w-[1250px] mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#1c1c28] tracking-tight">
            Picks You Can't Miss
          </h2>
        </div>

        {/* 4 Cards Grid - 2 per row on mobile, 4 on desktop - scales & compresses smoothly */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {PICKS_DEALS.map((deal) => (
            <div
              key={deal.id}
              onClick={() => navigate(deal.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(deal.link);
                }
              }}
              className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-[#faeed8] border border-[#ecd9be]/60"
            >
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-auto object-contain block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />

              {/* Subtle Ambient Hover Glow */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
