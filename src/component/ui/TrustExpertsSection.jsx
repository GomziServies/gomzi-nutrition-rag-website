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
    icon: <FiPercent className="w-5 h-5 text-primary" />,
    title: "Direct Factory Margins",
    desc: "Maximized profit margins with zero intermediary markups or broker fees.",
  },
  {
    icon: <FiTruck className="w-5 h-5 text-primary" />,
    title: "Pan-India Bulk Logistics",
    desc: "Insured, temperature-stable priority freight dispatched within 24-48 hours.",
  },
  {
    icon: <FiShield className="w-5 h-5 text-primary" />,
    title: "100% Certified Stock",
    desc: "FSSAI & NABL lab-tested batches with anti-counterfeit QR codes on every tub.",
  },
  {
    icon: <FiPackage className="w-5 h-5 text-primary" />,
    title: "Flexible Low MOQs",
    desc: "Custom starter tiers tailored specifically for gyms, trainers, and retailers.",
  },
];

export default function TrustExpertsSection() {
  return (
    <section
      className="w-full py-12 sm:py-16 lg:py-20 bg-white border-t border-primary-border/60 overflow-hidden"
      aria-label="B2B Wholesale and Distribution Partnerships"
    >
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Enterprise Showcase Card */}
        <div className="group/section relative rounded-3xl bg-[#fdfbf9] border border-primary-border/90 p-6 sm:p-10 lg:p-14 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(92,49,36,0.09)] hover:border-amber-400/40 transition-all duration-500 overflow-hidden">
          {/* Subtle moving card sheen sweep on hover across main section background */}

          {/* Subtle Accent Glows */}

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── LEFT: Content & Advantage Grid (7 cols) ── */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary-border mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                  B2B Wholesale & Gym Supply
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight leading-tight">
                Equip Your Gym or Retail Store with{" "}
                <span className="text-primary">Certified Nutrition</span>
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
                    className="group relative p-4 sm:p-5 rounded-2xl bg-white border border-primary-border/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Subtle moving card sheen sweep on hover */}

                    {/* Decorative Background Watermark Icon */}
                    <div className="absolute top-2.5 right-3 text-primary/5 group-hover:text-primary/12 transition-colors select-none pointer-events-none">
                      {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                    </div>

                    <div className="relative z-10">
                      <div className="w-9 h-9 rounded-lg bg-primary-light border border-primary-border/60 group-hover:border-amber-400/40 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-all duration-300 shadow-2xs">
                        {item.icon}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/inquiry"
                  className="group relative overflow-hidden h-12 px-7 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer whitespace-nowrap"
                >
                  <span>Apply for Wholesale Account</span>
                  <FiArrowRight className="w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact-us"
                  className="h-12 px-6 rounded-xl border border-gray-300 hover:border-primary bg-white text-gray-800 hover:text-primary font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 text-center whitespace-nowrap"
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
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-primary-border/90 shadow-lg hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 group bg-white">
                <img
                  src="/images/product-export.webp"
                  alt="Gomzi Nutrition Wholesale Logistics & Pallet Orders"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/product-category/whey-protein.webp";
                  }}
                />

                {/* Subtle moving sheen sweep on hover */}

                {/* Ambient Image Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Partner Credibility Chip */}
                <div className="group/chip relative overflow-hidden absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-white/80 hover:border-amber-400/40 rounded-xl p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-between gap-3">
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="group/avatar relative overflow-hidden w-10 h-10 rounded-full btn-gradient border border-amber-400/30 text-white flex items-center justify-center font-black text-xs shadow-md shadow-primary/25 group-hover/chip:scale-105 group-hover/chip:border-amber-400/60 transition-all duration-300">
                      <span className="relative z-10 text-amber-100">500+</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-gray-900 leading-tight group-hover/chip:text-primary transition-colors">
                        Active B2B Partners
                      </span>
                      <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                        Gyms & Stores Pan-India
                      </span>
                    </div>
                  </div>

                  <span className="relative z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-extrabold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified
                  </span>
                  {/* Subtle sheen highlight across chip on hover */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}