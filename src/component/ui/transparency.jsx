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
    <section className="bg-bg-cream py-12 sm:py-16 md:py-20 w-full overflow-hidden border-t border-primary-border/60">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Main Card */}
        <div className="group/transparency relative w-full rounded-3xl overflow-hidden bg-white p-6 sm:p-10 lg:p-12 border border-primary-border/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(92,49,36,0.08)] hover:border-amber-400/40 transition-all duration-500">
          {/* Subtle moving card sheen sweep on hover across whole transparency section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* ── LEFT: Story & Streamlined Accordion ── */}
            <div className="w-full lg:w-[50%] flex flex-col">
              <span className="uppercase tracking-[3px] text-xs font-bold text-primary block mb-2">
                100% LABEL TRANSPARENCY
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight">
                What's Inside{" "}
                <span className="text-primary">Every Scoop?</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl mt-3 mb-6 font-normal">
                We believe supplement labels should be simple, transparent, and
                easy to understand. Zero proprietary blends, zero hidden
                fillers—just pure, lab-verified clinical dosages.
              </p>

              {/* Accordion Rows */}
              <div className="divide-y divide-primary-border/80 border-y border-primary-border/80">
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
                                ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-xs border border-amber-400/30"
                                : "bg-primary-light text-primary border border-primary-border group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:text-white group-hover:border-amber-400/30"
                            }`}
                          >
                            {item.id}
                          </span>

                          <span
                            className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                              isOpen
                                ? "text-primary"
                                : "text-gray-900 group-hover:text-primary"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="hidden sm:inline-flex text-[11px] font-bold text-primary bg-primary-light border border-primary-border px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {item.stat}
                          </span>

                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 relative overflow-hidden ${
                              isOpen
                                ? "bg-gradient-to-r from-primary to-primary-hover text-white rotate-180 border border-amber-400/30 shadow-xs"
                                : "bg-primary-light text-primary border border-primary-border group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:text-white group-hover:border-amber-400/30"
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
              <div className="mt-4 flex items-center justify-between w-full max-w-md bg-bg-cream border border-primary-border rounded-xl px-4 py-2.5 text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-gray-900">
                    Lab Tested Every Single Batch
                  </span>
                </div>
                <a
                  href="/pdf/product-report.pdf"
                  download="Batch_Report.pdf"
                  className="font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
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