// src/component/healthkart/HkStealDeals.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Flame, ArrowRight } from "lucide-react";

const STEAL_DEALS = [
  {
    id: "deal-collagen",
    title: "100g Skin Radiance Collagen Pack of 2",
    image: "/images/banners/offer-deal-collagen.png",
    link: "/gomzi-supplement/wellness-health",
  },
  {
    id: "deal-pumpd",
    title: "Pumpd Daily Performance Stack",
    image: "/images/banners/offer-deal-pumpd.png",
    link: "/gomzi-supplement/wellness-health",
  },
  {
    id: "deal-ronnie",
    title: "RC 0.66lb Creatine XS Unflavoured",
    image: "/images/banners/offer-deal-ronnie.png",
    link: "/gomzi-supplement/creatine",
  },
  {
    id: "deal-alienblood",
    title: "BlackBeast Creatine Alien Blood New Launch",
    image: "/images/banners/offer-deal-alienblood.png",
    link: "/gomzi-supplement/creatine",
  },
];

export default function HkStealDeals() {
  return (
    <section className="w-full bg-[#f4f4f4] py-4 sm:py-6 border-b border-[#ebdcd2]/40 font-sans">
      <div className="max-w-[1240px] mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
              <Flame size={18} className="fill-rose-500 text-rose-500" />
            </span>
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#1c1917] tracking-tight font-toma flex items-center gap-2">
                <span>Deals You Cannot Miss</span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Price Drops
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Limited-period brand discounts, coupon drops & trending combos
              </p>
            </div>
          </div>

          <Link
            to="/gomzi-supplement"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#95442c] hover:text-[#7a3522] transition-colors group flex-shrink-0"
          >
            <span>View All Deals</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 4 Cards Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4">
          {STEAL_DEALS.map((deal) => (
            <Link
              key={deal.id}
              to={deal.link}
              className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-200/80 bg-white"
            >
              <div className="w-full aspect-[222/310] overflow-hidden bg-stone-50 relative">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
