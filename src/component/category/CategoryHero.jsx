// src/component/category/CategoryHero.jsx
import React from "react";
import { ShieldCheck, Award, Zap, Sparkles, CheckCircle2 } from "lucide-react";

const CategoryHero = ({ pageData }) => {
  if (!pageData) return null;

  const tag = pageData.tag || pageData.subHeading || "Official Store";
  const heading = pageData.heading || "SHOP GOMZI";
  const description =
    pageData.description ||
    "Lab-tested protein powders, creatine, pre-workouts, mass gainers, and athlete wellness supplements.";

  return (
    <div className="relative mb-4 sm:mb-8 min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#faf6f2] via-[#f7efe6] to-[#fdfbf9] border border-border p-3.5 sm:p-6 md:p-8 shadow-xs">
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-amber-500/5 blur-2xl" />

      {/* ── Live Authenticity / Trust Bar ── */}
      <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-full bg-white/90 border border-border text-[10px] sm:text-[11px] font-bold text-primary shadow-2xs mb-3 sm:mb-4">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <Sparkles size={12} className="text-primary shrink-0" />
        <span className="min-w-0 truncate sm:whitespace-normal leading-relaxed">NABL Lab Certified &bull; 100% Authentic Nutrition &bull; Direct from Lab</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
        {/* Left Column: Headings & Subtitle */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="w-2 sm:w-2.5 h-4 sm:h-6 shrink-0 bg-primary rounded-full inline-block" />
            <span className="min-w-0 break-words text-[10px] sm:text-xs font-black uppercase tracking-[1.5px] sm:tracking-[3px] text-primary">
              {tag}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-text tracking-tight font-toma leading-tight">
            {heading}
          </h1>

          <p className="mt-1.5 sm:mt-3 text-xs sm:text-base text-stone-600 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none">
            {description}
          </p>

          {/* Trust Value Prop Badges */}
          <div className="mt-3 sm:mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
            <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-border shadow-2xs text-[10px] sm:text-xs font-bold text-stone-700">
              <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
              <span>NABL Lab Tested</span>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-border shadow-2xs text-[10px] sm:text-xs font-bold text-stone-700">
              <Zap size={14} className="text-amber-600 shrink-0" />
              <span>Fast 24-48h Shipping</span>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-border shadow-2xs text-[10px] sm:text-xs font-bold text-stone-700">
              <Award size={14} className="text-primary shrink-0" />
              <span>Zero Spiked Nitrogen</span>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-border shadow-2xs text-[10px] sm:text-xs font-bold text-stone-700">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>FSSAI Certified</span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Athlete Stat Card */}
        <div className="lg:col-span-4 hidden lg:flex flex-col gap-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Community Trust
              </span>
              <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-2xl font-black text-text">45,000+</p>
                <p className="text-[11px] text-stone-500 font-medium">Athletes Fueled</p>
              </div>
              <div>
                <p className="text-2xl font-black text-amber-600">4.8 ★</p>
                <p className="text-[11px] text-stone-500 font-medium">Customer Rating</p>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-stone-500 pt-3 border-t border-stone-100">
              Scan on-pack QR code to view your batch's certified purity report before consuming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
