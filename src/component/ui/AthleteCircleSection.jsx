import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiCopy, FiCheck, FiTag, FiArrowRight, FiPercent } from "react-icons/fi";
import { successToast } from "../../utils/toast";

export default function AthleteCircleSection() {
  const [isCopied, setIsCopied] = useState(false);
  const couponCode = "GOMZI10";

  const handleCopyCode = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(couponCode);
    }
    setIsCopied(true);
    successToast(`Coupon code ${couponCode} copied! Apply at checkout for 10% off.`);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section
      className="w-full bg-gradient-to-r from-[#1c100a] via-[#2c1810] to-[#1c100a] border-b border-[#5C3124]/40 select-none py-2.5 sm:py-3 relative z-10 shadow-xs"
      aria-label="First Order Promo Ticker"
    >
      <div className="max-w-[var(--container-width)] mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 text-center">
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
            <FiPercent className="w-3 h-3 text-amber-300" />
            <span>WELCOME OFFER</span>
          </div>

          {/* Main 1-Line Offer Statement */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white tracking-tight">
            <span>Get Flat</span>
            <span className="text-amber-300 font-extrabold underline decoration-amber-400/50 decoration-2 underline-offset-2">
              10% OFF
            </span>
            <span className="hidden sm:inline">Your First Order With Code</span>
            <span className="sm:hidden">With</span>
          </div>

          {/* Interactive 1-Click Copy Coupon Pill */}
          <button
            type="button"
            onClick={handleCopyCode}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-dashed transition-all duration-200 cursor-pointer shadow-2xs active:scale-95 ${
              isCopied
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                : "bg-white/10 hover:bg-white/15 border-amber-400/60 hover:border-amber-300 text-white"
            }`}
            title="Click to copy coupon code"
          >
            <FiTag className="w-3 h-3 text-amber-300" />
            <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-amber-200">
              {couponCode}
            </span>
            <span
              className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded transition-colors ${
                isCopied
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-400 text-gray-950 group-hover:bg-amber-300"
              }`}
            >
              {isCopied ? (
                <span className="inline-flex items-center gap-0.5">
                  <FiCheck className="w-2.5 h-2.5" /> COPIED!
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5">
                  <FiCopy className="w-2.5 h-2.5" /> COPY
                </span>
              )}
            </span>
          </button>

          {/* Secondary Perk (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-gray-300">
            <span className="text-white/30">•</span>
            <span>Free Shipping on Orders Above ₹999</span>
          </div>

          {/* Direct Shop Action */}
          <Link
            to="/gomzi-supplement"
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white transition-colors group ml-1"
          >
            <span>Shop Now</span>
            <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
