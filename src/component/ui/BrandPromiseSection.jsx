import React from "react";
import { Link } from "react-router-dom";
import {
  FiShield,
  FiCheckCircle,
  FiTarget,
  FiAward,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

const PROMISE_CARDS = [
  {
    icon: <FiTarget className="w-5 h-5 text-amber-400" />,
    tag: "ON OUR PROTEIN PAGES",
    title: "Honest Formulations",
    text: "We explain exactly when whey isolate beats concentrate and when concentrate is genuinely the better value for your fitness goals.",
  },
  {
    icon: <FiShield className="w-5 h-5 text-amber-400" />,
    tag: "ON OUR PRE-WORKOUT PAGES",
    title: "Unbiased Guidance",
    text: "We help you decide between stimulant and stimulant-free formulas instead of blindly pushing the highest caffeine dosage.",
  },
  {
    icon: <FiFileText className="w-5 h-5 text-amber-400" />,
    tag: "ON OUR LABEL",
    title: "100% Disclosed Ingredients",
    text: "Every single active ingredient is disclosed with transparent milligram dosages — zero hidden proprietary blends or fillers.",
  },
  {
    icon: <FiAward className="w-5 h-5 text-amber-400" />,
    tag: "ON EVERY SINGLE BATCH",
    title: "Strict Lab Verification",
    text: "Every batch is manufactured in certified facilities and rigorously tested for purity, protein content, and safety before dispatch.",
  },
];

export default function BrandPromiseSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-[#faf8f6] overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Main Card Container */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-[#5C3124]/20 bg-gradient-to-br from-[#1c120c] via-[#2a170f] to-[#120a06]">
          {/* Ambient Lighting Glows */}
          <div className="absolute -top-28 -left-28 w-96 h-96 bg-[#5C3124]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -right-28 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 sm:px-10 md:px-12 lg:px-16 py-10 sm:py-12 md:py-16">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                Our Whole Reason For Existing
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
              Most supplement labels oversell.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-amber-400 block mt-1">
                We'd rather undersell and over-deliver.
              </span>
            </h2>

            {/* Narrative Paragraphs */}
            <div className="mt-6 flex flex-col gap-3.5 max-w-3xl text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-normal">
              <p>
                India's supplement market has a trust problem. Hidden ingredient
                blends, exaggerated claims, and lab quality certificates that
                consumers never actually get to see.
              </p>
              <p>
                We built{" "}
                <span className="text-white font-bold">Gomzi Nutrition</span>{" "}
                around absolute transparency. Every formula is clearly
                explained, every active ingredient serves a verified purpose,
                and every product page empowers you to select what is genuinely
                right for your body — even if it's not our highest-priced item.
              </p>
            </div>

            {/* 4 Transparency Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-10">
              {PROMISE_CARDS.map((card, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-6 sm:p-7 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all duration-300 group shadow-lg"
                >
                  {/* Card Header with Icon & Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold tracking-wider text-amber-300 uppercase">
                      {card.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400/10 transition-all">
                      {card.icon}
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                    {card.title}
                  </h3>

                  {/* Card Text */}
                  <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Proof Strip & CTA */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  100% Label Accuracy
                </span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  Zero Proprietary Blends
                </span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                  FSSAI & GMP Certified
                </span>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#fdf6f4] text-gray-950 font-bold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <span>Read Our Quality Philosophy</span>
                <FiArrowRight className="w-4 h-4 text-[#5C3124] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
