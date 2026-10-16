import React, { useState } from "react";
import { ChevronDown, Download } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Whey Protein Concentrate & Isolate",
    subtitle: "Builds & Repairs Lean Muscle",
    content:
      "Ultra-filtered whey protein delivering 24g of pure protein per scoop. Rapidly absorbed post-workout to stimulate muscle protein synthesis and accelerate lean muscle mass development with zero amino-spiking.",
    stat: "24g Protein",
  },
  {
    id: 2,
    title: "Digestive Enzymes Complex",
    subtitle: "Enhanced Bioavailability & Zero Bloat",
    content:
      "Formulated with clinically-backed DigeZyme® multi-enzyme complex including protease and lactase. Breaks down protein chains into readily absorbable peptides, preventing bloating or gastric discomfort.",
    stat: "DigeZyme®",
  },
  {
    id: 3,
    title: "Vitamins & Minerals Complex",
    subtitle: "Supports Daily Energy & Immunity",
    content:
      "A complete profile of daily vitamins (B-complex, C, D3) and essential minerals (Zinc, Magnesium) to optimize cellular energy production and strengthen immune resilience after training.",
    stat: "20+ Nutrients",
  },
  {
    id: 4,
    title: "Branched-Chain Amino Acids (BCAAs)",
    subtitle: "Faster Recovery & Muscle Protection",
    content:
      "5.5g of naturally occurring Leucine, Isoleucine, and Valine in the clinically proven 2:1:1 ratio. Prevents muscle tissue breakdown during intense workouts and shortens recovery time.",
    stat: "5.5g BCAAs",
  },
  {
    id: 5,
    title: "Natural Cocoa & Gourmet Flavoring",
    subtitle: "100% Pure Taste with Zero Sugar Added",
    content:
      "Rich Dutch-processed natural cocoa powder blended for smooth, clump-free mixability. Free from harsh chemical aftertaste, zero added sugars, and naturally delicious in water or milk.",
    stat: "Zero Sugar",
  },
];

export default function TransparencySection() {
  const [openId, setOpenId] = useState(1); // First item open by default

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="bg-[#faf8f6] py-12 sm:py-16 md:py-20 w-full overflow-hidden border-t border-[#ebdcd7]/60">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Main Card */}
        <div className="w-full rounded-3xl overflow-hidden bg-white p-6 sm:p-10 lg:p-12 border border-[#ebdcd7] shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* ── LEFT: Story & Streamlined Accordion ── */}
            <div className="w-full lg:w-[50%] flex flex-col">
              <span className="uppercase tracking-[3px] text-xs font-bold text-[#5C3124] block mb-2">
                100% LABEL TRANSPARENCY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight">
                What's Inside{" "}
                <span className="text-[#5C3124]">Every Scoop?</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mt-3 mb-6 font-normal">
                We believe supplement labels should be simple, transparent, and
                easy to understand. Zero proprietary blends, zero hidden
                fillers—just pure, lab-verified clinical dosages.
              </p>

              {/* Accordion Rows */}
              <div className="divide-y divide-[#ebdcd7]/80 border-y border-[#ebdcd7]/80">
                {benefits.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div key={item.id} className="py-3.5 transition-colors">
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-center justify-between gap-3 text-left group cursor-pointer bg-transparent border-none p-0"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 flex-shrink-0 relative overflow-hidden ${
                              isOpen
                                ? "bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white shadow-xs border border-amber-400/30"
                                : "bg-[#fdf6f4] text-[#5C3124] border border-[#ebdcd7] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:text-white group-hover:border-amber-400/30"
                            }`}
                          >
                            {item.id}
                          </span>

                          <span
                            className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                              isOpen
                                ? "text-[#5C3124]"
                                : "text-gray-900 group-hover:text-[#5C3124]"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="hidden sm:inline-flex text-[11px] font-bold text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {item.stat}
                          </span>

                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 relative overflow-hidden ${
                              isOpen
                                ? "bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white rotate-180 border border-amber-400/30 shadow-xs"
                                : "bg-[#fdf6f4] text-[#5C3124] border border-[#ebdcd7] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:text-white group-hover:border-amber-400/30"
                            }`}
                          >
                            <ChevronDown size={15} />
                          </span>
                        </div>
                      </button>

                      {/* Smooth expandable body */}
                      {isOpen && (
                        <div className="pt-2.5 pb-1 pl-10 pr-2">
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                            {item.content}
                          </p>
                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{item.subtitle}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT: Scoop Diagram Showcase ── */}
            <div className="w-full lg:w-[48%] flex-shrink-0 flex flex-col items-center justify-center">
              <div className="relative w-full flex items-center justify-center p-2 sm:p-4">
                {/* Ambient glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <img
                  src="/images/scoop.webp"
                  alt="What's Inside Every Scoop - Gomzi Nutrition Whey Protein, Digestive Enzymes, Vitamins, BCAAs, and Natural Cocoa"
                  className="w-full max-w-lg h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/product-placeholder.webp";
                  }}
                />
              </div>

              {/* Verification & Lab Certificate Pill */}
              <div className="mt-4 flex items-center justify-between w-full max-w-md bg-[#faf8f6] border border-[#ebdcd7] rounded-xl px-4 py-2.5 text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-gray-900">
                    Lab Tested Every Single Batch
                  </span>
                </div>
                <a
                  href="/pdf/product-report.pdf"
                  download="Batch_Report.pdf"
                  className="font-bold text-[#5C3124] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Certificate</span>
                  <Download size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
