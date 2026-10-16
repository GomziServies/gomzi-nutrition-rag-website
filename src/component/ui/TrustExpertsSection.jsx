import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPercent,
  FiTruck,
  FiShield,
  FiPackage,
  FiCheckCircle,
  FiPhoneCall,
} from "react-icons/fi";

const B2B_BENEFITS = [
  {
    icon: <FiPercent className="w-5 h-5 text-[#5C3124]" />,
    title: "Direct Factory Margins",
    desc: "Maximized profit margins with zero intermediary markups or broker fees.",
  },
  {
    icon: <FiTruck className="w-5 h-5 text-[#5C3124]" />,
    title: "Pan-India Bulk Logistics",
    desc: "Insured, temperature-stable priority freight dispatched within 24-48 hours.",
  },
  {
    icon: <FiShield className="w-5 h-5 text-[#5C3124]" />,
    title: "100% Certified Stock",
    desc: "FSSAI & NABL lab-tested batches with anti-counterfeit QR codes on every tub.",
  },
  {
    icon: <FiPackage className="w-5 h-5 text-[#5C3124]" />,
    title: "Flexible Low MOQs",
    desc: "Custom starter tiers tailored specifically for gyms, trainers, and retailers.",
  },
];

export default function TrustExpertsSection() {
  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 bg-white border-t border-[#ebdcd7]/60 overflow-hidden"
      aria-label="B2B Wholesale and Distribution Partnerships"
    >
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Enterprise Showcase Card */}
        <div className="relative rounded-3xl bg-[#fdfbf9] border border-[#ebdcd7] p-6 sm:p-10 lg:p-14 shadow-sm overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#5C3124]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── LEFT: Content & Advantage Grid (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf6f4] border border-[#ebdcd7] mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#5C3124]">
                  B2B Wholesale & Gym Supply
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c28] tracking-tight leading-tight">
                Equip Your Gym or Retail Store with{" "}
                <span className="text-[#5C3124]">Certified Nutrition</span>
              </h2>

              {/* Subtitle */}
              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                Partner directly with Gomzi Nutrition for wholesale distribution, franchise supply, and bulk inventory. Get factory-direct pricing, guaranteed batch authenticity, and dedicated priority account management.
              </p>

              {/* 4 Benefits 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-xl">
                {B2B_BENEFITS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#ebdcd7]/80 shadow-2xs hover:border-[#5C3124]/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#fdf6f4] flex items-center justify-center mb-2.5">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/inquiry"
                  className="h-12 px-7 rounded-xl bg-[#5C3124] hover:bg-[#48261c] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-[#5C3124]/20 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <span>Apply for Wholesale Account</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact-us"
                  className="h-12 px-6 rounded-xl border border-gray-300 hover:border-[#5C3124] bg-white text-gray-800 hover:text-[#5C3124] font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 text-center whitespace-nowrap"
                >
                  <FiPhoneCall className="w-4 h-4 text-gray-500" />
                  <span>Contact Corporate Sales</span>
                </Link>
              </div>

              {/* Bottom Micro Trust Indicators */}
              <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dedicated wholesale representative assigned within 2 business hours.</span>
              </div>
            </div>

            {/* ── RIGHT: Professional Warehouse & Partner Graphic (5 cols) ── */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#ebdcd7] shadow-lg group bg-white">
                <img
                  src="/images/product-export.webp"
                  alt="Gomzi Nutrition Wholesale Logistics & Pallet Orders"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/product-category/whey-protein.webp";
                  }}
                />

                {/* Ambient Image Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Partner Credibility Chip */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-xl p-3.5 shadow-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5C3124] text-white flex items-center justify-center font-black text-xs shadow-xs">
                      500+
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-gray-900 leading-tight">
                        Active B2B Partners
                      </span>
                      <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                        Gyms & Stores Pan-India
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
