import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiPackage, FiTruck, FiShield, FiPercent } from "react-icons/fi";

const B2B_BENEFITS = [
  {
    icon: <FiPercent className="w-4 h-4 text-amber-400" />,
    text: "Direct Factory Wholesale Margins",
  },
  {
    icon: <FiTruck className="w-4 h-4 text-amber-400" />,
    text: "Priority Pan-India Logistics & Dispatch",
  },
  {
    icon: <FiShield className="w-4 h-4 text-amber-400" />,
    text: "100% FSSAI-Certified & Lab-Tested Stock",
  },
  {
    icon: <FiPackage className="w-4 h-4 text-amber-400" />,
    text: "Low MOQ for Gyms, Stores & Dealerships",
  },
];

export default function TrustExpertsSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-[#faf8f6] overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Card Container */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-[#5C3124]/20 bg-gradient-to-br from-[#1c120c] via-[#2a170f] to-[#120a06]">
          {/* Ambient Radial Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#5C3124]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
            {/* ── LEFT: Content Area ── */}
            <div className="flex-1 flex flex-col p-8 sm:p-10 md:p-12 lg:p-14 lg:border-r border-white/10">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 w-fit mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                  B2B & Distribution Partnership
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Looking for Bulk Orders or{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-amber-400">
                  Distribution Partnerships?
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
                Unlock exclusive wholesale pricing on certified premium sports nutrition for your business. Partner with Gomzi Nutrition for bulk supply, dealership rights, and dedicated tier-1 account management.
              </p>

              {/* Benefit Grid / Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                {B2B_BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 font-medium">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      {b.icon}
                    </div>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Area */}
              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
                <Link
                  to="/inquiry"
                  className="h-11 sm:h-12 px-6 rounded-xl bg-white hover:bg-[#fdf6f4] text-gray-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] group cursor-pointer whitespace-nowrap"
                >
                  <span>Apply for Bulk Inquiry</span>
                  <FiArrowRight className="w-4 h-4 text-[#5C3124] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact-us"
                  className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center justify-center transition-all duration-200 text-center whitespace-nowrap"
                >
                  Contact Sales Team
                </Link>
              </div>

              {/* Micro Subtext */}
              <p className="mt-3 text-[11px] text-gray-400 font-medium">
                ⚡ Dedicated wholesale coordinator assigned within 2 business hours.
              </p>
            </div>

            {/* ── RIGHT: Warehouse & Pallets Image ── */}
            <div className="w-full lg:w-[42%] flex-shrink-0 p-6 sm:p-10 md:p-12 flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="/images/product-export.webp"
                  alt="Gomzi Nutrition Wholesale Logistics & Pallet Orders"
                  className="w-full h-72 sm:h-80 md:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/product-placeholder.webp";
                  }}
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Stat Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl p-3 sm:py-3.5 sm:px-4 shadow-[0_12px_32px_rgba(0,0,0,0.22)] flex items-center justify-between gap-3.5 sm:gap-4 transition-transform duration-300 hover:scale-[1.02]">
                  {/* Left: Branded Stat Circle */}
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#5C3124] to-[#3a1d15] text-white flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-white">
                    <span className="text-xs sm:text-sm font-black tracking-tight text-amber-300">
                      500+
                    </span>
                  </div>

                  {/* Middle: Title & Subtitle */}
                  <div className="flex flex-col justify-center min-w-0 pr-1">
                    <span className="text-xs sm:text-sm font-black text-gray-950 tracking-tight leading-tight whitespace-nowrap">
                      Active B2B Partners
                    </span>
                    <span className="text-[11px] text-gray-500 font-semibold leading-tight mt-0.5 whitespace-nowrap">
                      Gyms & Retailers Pan-India
                    </span>
                  </div>

                  {/* Right: Verified Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold flex-shrink-0 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
