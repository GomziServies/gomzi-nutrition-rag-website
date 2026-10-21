import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCopy, FiCheck, FiArrowRight } from "react-icons/fi";
import { ShieldCheck, Zap } from "lucide-react";
import { successToast } from "../../utils/toast";

/**
 * HealthKart-Identical 4-Card Promotional Deals & Offers Grid
 * Formatted as a 2x2 grid on mobile (2 cards per row) and 4 columns on desktop,
 * exactly matching the layout of "Picks You Can't Miss".
 */
export default function PromoBannerSlider() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    if (!code) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    successToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleCardClick = (path) => {
    navigate(path || "/gomzi-supplement");
  };

  return (
    <section
      className="w-full py-6 sm:py-8 md:py-10 bg-[#faf8f6] font-modelica overflow-hidden"
      aria-label="Promotional Deals & Offers"
    >
      <div className="max-w-[1250px] mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#1c1c28] tracking-tight">
              Featured Brand Deals
            </h2>
          </div>

          <button
            onClick={() => navigate("/gomzi-supplement?search=deal")}
            className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#5C3124] hover:text-[#3d1e15] transition-colors cursor-pointer bg-transparent border-none p-0 group"
          >
            <span>View All Brand Offers</span>
            <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Card Banner Grid: 2 per row on mobile, 4 on desktop - exactly matching Picks You Can't Miss */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 lg:gap-6">
          {/* ─────────────────────────────────────────────────────────────
              CARD 1: L-CARNITINE EFFERVESCENT RANGE (Starting @ ₹419)
              ───────────────────────────────────────────────────────────── */}
          <div
            onClick={() => handleCardClick("/gomzi-supplement?search=carnitine")}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#e5e7eb] bg-gradient-to-b from-[#fef8db] via-[#fbf3ce] to-[#f4ebbe] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Text Content */}
            <div className="p-2.5 sm:p-4 lg:p-5 pb-1 sm:pb-2 text-center flex flex-col items-center">
              <h3 className="text-sm xs:text-base sm:text-xl lg:text-2xl font-black text-[#1c1c28] tracking-tight uppercase">
                L-CARNITINE
              </h3>

              {/* Effervescent Badge */}
              <div className="mt-1 sm:mt-2 bg-[#42502b] text-white text-[8px] xs:text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full tracking-wide shadow-2xs whitespace-nowrap">
                3300mg & 2000mg Effervescent
              </div>

              {/* Sub-benefit */}
              <p className="text-[10px] sm:text-xs lg:text-[13px] font-extrabold text-[#2a2d34] mt-1 sm:mt-2 line-clamp-1">
                Converts Fat Into Energy
              </p>

              {/* Price Callout */}
              <div className="mt-1.5 sm:mt-3 flex items-baseline justify-center gap-1">
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-700">
                  Starting @
                </span>
                <span className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-black text-[#1c1c28]">
                  ₹419
                </span>
              </div>
            </div>

            {/* Bottom Product Photography */}
            <div className="relative w-full pt-1 sm:pt-2 overflow-hidden">
              <img
                src="/images/deals/carnitine-deal.jpg"
                alt="L-Carnitine Effervescent Tablets with Citrus Splash"
                className="w-full h-36 xs:h-44 sm:h-56 lg:h-64 object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-1.5 sm:bottom-2 left-0 right-0 text-center">
                <span className="inline-block bg-black/60 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Available in 10 & 20 Tabs
                </span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 2: OPTIMUM NUTRITION / GOMZI WHEY PROTEIN RANGE
              ───────────────────────────────────────────────────────────── */}
          <div
            onClick={() => handleCardClick("/gomzi-supplement?search=whey")}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#e5e7eb] bg-gradient-to-b from-[#f9f1df] via-[#faeed4] to-[#f4e4c3] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Text Content */}
            <div className="p-2.5 sm:p-4 lg:p-5 pb-1 sm:pb-2 text-center flex flex-col items-center">
              <span className="text-[9px] sm:text-xs font-black tracking-widest text-[#1c1c28] uppercase">
                OPTIMUM NUTRITION
              </span>

              <h3 className="text-xs xs:text-sm sm:text-base lg:text-lg font-black text-[#1c1c28] mt-0.5 sm:mt-1 tracking-tight">
                Whey Protein Range
              </h3>

              {/* Tier 1 Price & Coupon */}
              <div className="mt-1.5 sm:mt-3 w-full bg-white/70 backdrop-blur-xs rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-amber-200/50 flex items-center justify-between gap-1">
                <div className="text-left">
                  <span className="text-[8px] sm:text-[10px] text-gray-500 line-through block leading-none">
                    Was ₹4,629
                  </span>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-black text-[#1c1c28] leading-tight">
                    Now ₹4,329
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleCopyCode("OP300", e)}
                  className="bg-[#b42318] hover:bg-[#8e1b12] text-white text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs transition-colors flex items-center gap-0.5 sm:gap-1 cursor-pointer border-none flex-shrink-0"
                  title="Click to copy coupon"
                >
                  {copiedCode === "OP300" ? (
                    <>
                      <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      <span>CODE: OP300</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tier 2 Price & Coupon */}
              <div className="mt-1 sm:mt-2 w-full bg-white/70 backdrop-blur-xs rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-amber-200/50 flex items-center justify-between gap-1">
                <div className="text-left">
                  <span className="text-[8px] sm:text-[10px] text-gray-500 line-through block leading-none">
                    Was ₹7,999
                  </span>
                  <span className="text-[10px] xs:text-xs sm:text-sm font-black text-[#1c1c28] leading-tight">
                    Now ₹7,299
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleCopyCode("ONT500", e)}
                  className="bg-[#b42318] hover:bg-[#8e1b12] text-white text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs transition-colors flex items-center gap-0.5 sm:gap-1 cursor-pointer border-none flex-shrink-0"
                  title="Click to copy coupon"
                >
                  {copiedCode === "ONT500" ? (
                    <>
                      <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <FiCopy className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      <span>CODE: ONT500</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Product Photography */}
            <div className="relative w-full pt-1 overflow-hidden">
              <img
                src="/images/deals/whey-range-deal.jpg"
                alt="Whey Protein Range 907g and 1.7kg Tubs"
                className="w-full h-36 xs:h-44 sm:h-52 lg:h-56 object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 3: HK VITALS / GOMZI 100g SKIN RADIANCE COLLAGEN
              ───────────────────────────────────────────────────────────── */}
          <div
            onClick={() => handleCardClick("/gomzi-supplement?search=collagen")}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#e5e7eb] bg-gradient-to-b from-[#f7ecd6] via-[#f7ebd1] to-[#eeddc0] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Text Content */}
            <div className="p-2.5 sm:p-4 lg:p-5 pb-1 sm:pb-2 text-center flex flex-col items-center">
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-black tracking-wider text-[#1c1c28]">
                <span>hk vitals</span>
                <span className="text-amber-600 font-bold">™</span>
              </div>

              <h3 className="text-xs xs:text-sm sm:text-base lg:text-lg font-black text-[#1c1c28] mt-0.5 sm:mt-1 tracking-tight leading-tight">
                100g Skin Radiance Collagen
              </h3>

              {/* Variant Badge */}
              <div className="mt-1 sm:mt-2 bg-white/90 border border-gray-300 text-gray-800 text-[8px] xs:text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 rounded shadow-2xs">
                Pack Of 2 | Orange
              </div>

              {/* Offer Price Bracket Box */}
              <div className="mt-1.5 sm:mt-3 relative px-2.5 sm:px-4 py-1 sm:py-1.5 border border-red-500/50 rounded-lg bg-white/60 backdrop-blur-xs flex flex-col items-center w-full max-w-[140px] sm:max-w-none">
                <span className="text-[7px] xs:text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#b42318]">
                  — OFFER PRICE —
                </span>
                <span className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-black text-[#b42318] leading-tight">
                  ₹909
                </span>
              </div>
            </div>

            {/* Bottom Product Photography */}
            <div className="relative w-full pt-1 overflow-hidden">
              <img
                src="/images/deals/collagen-deal.jpg"
                alt="100g Skin Radiance Collagen Pack of 2"
                className="w-full h-36 xs:h-44 sm:h-56 lg:h-60 object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              CARD 4: WELLCORE / GOMZI MICRONISED CREATINE
              ───────────────────────────────────────────────────────────── */}
          <div
            onClick={() => handleCardClick("/gomzi-supplement?search=creatine")}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#a7f3d0] bg-gradient-to-b from-[#6ee7b7] via-[#a7f3d0] to-[#d1fae5] shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Text Content */}
            <div className="p-2.5 sm:p-4 lg:p-5 pb-1 sm:pb-2 text-center flex flex-col items-center">
              {/* Top Trust Badge */}
              <div className="w-full flex items-center justify-between mb-1">
                <div className="border border-black bg-white px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-black">
                  WELLCORE
                </div>
                <div className="bg-white border border-[#5C3124]/40 text-[#5C3124] text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#5C3124]" />
                  <span>Verified Pure</span>
                </div>
              </div>

              {/* Strip Banner */}
              <div className="mt-1 bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-[9px] sm:text-[11px] font-black px-2 sm:px-3 py-0.5 rounded shadow-2xs uppercase tracking-wide">
                Available In 5 Flavours
              </div>

              {/* Two Column Price Comparison */}
              <div className="mt-1.5 sm:mt-3 grid grid-cols-2 gap-1 sm:gap-2 w-full text-center">
                {/* 83 Servings */}
                <div className="bg-white/80 rounded-lg p-1 sm:p-1.5 border border-emerald-300 flex flex-col items-center">
                  <span className="text-[8px] sm:text-[9px] font-bold text-gray-700 leading-tight">
                    83 Servings
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500 line-through leading-none mt-0.5">
                    Was ₹1,250
                  </span>
                  <div className="mt-1 bg-[#881337] text-white text-[8px] sm:text-[10px] font-black px-1 sm:px-2 py-0.5 rounded w-full">
                    ₹1,049
                  </div>
                </div>

                {/* 33 Servings */}
                <div className="bg-white/80 rounded-lg p-1 sm:p-1.5 border border-emerald-300 flex flex-col items-center">
                  <span className="text-[8px] sm:text-[9px] font-bold text-gray-700 leading-tight">
                    33 Servings
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-gray-500 line-through leading-none mt-0.5">
                    Was ₹700
                  </span>
                  <div className="mt-1 bg-[#881337] text-white text-[8px] sm:text-[10px] font-black px-1 sm:px-2 py-0.5 rounded w-full">
                    ₹575
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Product Photography */}
            <div className="relative w-full pt-1 overflow-hidden">
              <img
                src="/images/deals/creatine-dual-deal.jpg"
                alt="Micronised Creatine Monohydrate Jars"
                className="w-full h-36 xs:h-44 sm:h-56 lg:h-60 object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
