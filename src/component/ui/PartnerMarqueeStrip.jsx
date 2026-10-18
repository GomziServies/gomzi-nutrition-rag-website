import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiShield, FiExternalLink } from "react-icons/fi";
import { getCompaniesApi } from "../../api/company.api";

// Comprehensive fallback registry of all 18 verified brand partners
// Ensures zero-delay rendering, zero CLS (Cumulative Layout Shift), and 100% offline resilience
const VERIFIED_PARTNERS_PRESET = [
  {
    id: "gomzi-nutrition",
    name: "Gomzi Nutrition",
    monogram: "GN",
    tagline: "Pure Science • Clean Nutrition • Peak Performance",
    country: "India",
    flag: "🇮🇳",
    accent: "#5C3124",
    accentGlow: "rgba(92, 49, 36, 0.45)",
    badge: "Flagship Brand",
    isFeatured: true,
  },
  {
    id: "muscleblaze",
    name: "MuscleBlaze",
    monogram: "MB",
    tagline: "Fuel the Beast Inside You",
    country: "India",
    flag: "🇮🇳",
    accent: "#e11d48",
    accentGlow: "rgba(225, 29, 72, 0.35)",
    badge: "Authorized",
    isFeatured: true,
  },
  {
    id: "optimum-nutrition",
    name: "Optimum Nutrition (ON)",
    monogram: "ON",
    tagline: "World Standard in Quality Protein",
    country: "USA",
    flag: "🇺🇸",
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.35)",
    badge: "Gold Standard",
    isFeatured: true,
  },
  {
    id: "wellcore",
    name: "Wellcore",
    monogram: "WC",
    tagline: "Pure Micronised Performance Formulas",
    country: "India",
    flag: "🇮🇳",
    accent: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.35)",
    badge: "Authorized",
    isFeatured: true,
  },
  {
    id: "gnc",
    name: "GNC",
    monogram: "GNC",
    tagline: "Live Well, Perform Better",
    country: "USA",
    flag: "🇺🇸",
    accent: "#eab308",
    accentGlow: "rgba(234, 179, 8, 0.35)",
    badge: "Global Partner",
    isFeatured: true,
  },
  {
    id: "isopure",
    name: "Isopure",
    monogram: "ISO",
    tagline: "Zero Carb & Low Carb Pure Whey Isolate",
    country: "USA",
    flag: "🇺🇸",
    accent: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.35)",
    badge: "Pure Isolate",
    isFeatured: false,
  },
  {
    id: "dynamite",
    name: "Dynamite",
    monogram: "DYN",
    tagline: "High Explosive Pre-Workouts & Amino Energy",
    country: "India",
    flag: "🇮🇳",
    accent: "#f97316",
    accentGlow: "rgba(249, 115, 22, 0.35)",
    badge: "Energy Tech",
    isFeatured: false,
  },
  {
    id: "myprotein",
    name: "MyProtein",
    monogram: "MP",
    tagline: "Fuel Your Ambition",
    country: "UK",
    flag: "🇬🇧",
    accent: "#3b82f6",
    accentGlow: "rgba(59, 130, 246, 0.35)",
    badge: "UK #1 Brand",
    isFeatured: false,
  },
  {
    id: "dymatize",
    name: "Dymatize",
    monogram: "DYM",
    tagline: "Building Better Athletes",
    country: "USA",
    flag: "🇺🇸",
    accent: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.35)",
    badge: "Elite Athlete",
    isFeatured: false,
  },
  {
    id: "labrada",
    name: "Labrada",
    monogram: "LAB",
    tagline: "Lean Body Nutrition",
    country: "USA",
    flag: "🇺🇸",
    accent: "#ef4444",
    accentGlow: "rgba(239, 68, 68, 0.35)",
    badge: "Lean Body",
    isFeatured: false,
  },
  {
    id: "muscletech",
    name: "MuscleTech",
    monogram: "MT",
    tagline: "Research Driven Supplements",
    country: "USA",
    flag: "🇺🇸",
    accent: "#6366f1",
    accentGlow: "rgba(99, 102, 241, 0.35)",
    badge: "Clinical Tested",
    isFeatured: false,
  },
  {
    id: "fastup",
    name: "Fast&Up",
    monogram: "F&U",
    tagline: "Active Nutrition & Daily Hydration",
    country: "India",
    flag: "🇮🇳",
    accent: "#14b8a6",
    accentGlow: "rgba(20, 184, 166, 0.35)",
    badge: "Active Hydration",
    isFeatured: false,
  },
  {
    id: "avvatar",
    name: "Avvatar",
    monogram: "AVV",
    tagline: "100% Vegetarian Whey Protein from Fresh Milk",
    country: "India",
    flag: "🇮🇳",
    accent: "#84cc16",
    accentGlow: "rgba(132, 204, 22, 0.35)",
    badge: "Fresh Milk Whey",
    isFeatured: false,
  },
  {
    id: "ultimate-nutrition",
    name: "Ultimate Nutrition",
    monogram: "UN",
    tagline: "Hardcore Muscle Builders",
    country: "USA",
    flag: "🇺🇸",
    accent: "#d97706",
    accentGlow: "rgba(217, 119, 6, 0.35)",
    badge: "Hardcore Series",
    isFeatured: false,
  },
  {
    id: "pure-go",
    name: "Pure Go",
    monogram: "PGO",
    tagline: "Clean Nutrition & Essential Aminos",
    country: "India",
    flag: "🇮🇳",
    accent: "#0ea5e9",
    accentGlow: "rgba(14, 165, 233, 0.35)",
    badge: "Essential Aminos",
    isFeatured: false,
  },
  {
    id: "refuel-20",
    name: "Refuel 2.0",
    monogram: "RF2",
    tagline: "Rapid Muscle Recovery & Gain Formulas",
    country: "India",
    flag: "🇮🇳",
    accent: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.35)",
    badge: "Rapid Recovery",
    isFeatured: false,
  },
  {
    id: "the-whole-truth",
    name: "The Whole Truth",
    monogram: "TWT",
    tagline: "100% Clean Label Nutrition • Zero Fake Stuff",
    country: "India",
    flag: "🇮🇳",
    accent: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.35)",
    badge: "100% Clean Label",
    isFeatured: true,
  },
  {
    id: "naturaltein",
    name: "Naturaltein",
    monogram: "NAT",
    tagline: "German Formulated Natural Nutrition",
    country: "Germany",
    flag: "🇩🇪",
    accent: "#22c55e",
    accentGlow: "rgba(34, 197, 94, 0.35)",
    badge: "German Standard",
    isFeatured: false,
  },
];

// Helper to sanitize brand names for loose matching
const cleanStr = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function PartnerMarqueeStrip() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState(VERIFIED_PARTNERS_PRESET);

  useEffect(() => {
    let isMounted = true;

    const fetchPartners = async () => {
      try {
        const res = await getCompaniesApi();
        const apiCompanies = res?.data?.data?.companies;

        if (Array.isArray(apiCompanies) && apiCompanies.length > 0 && isMounted) {
          // Merge API companies with preset metadata (accent colors, flags, badges)
          const merged = apiCompanies.map((c, idx) => {
            const cleanName = cleanStr(c.name);
            const presetMatch = VERIFIED_PARTNERS_PRESET.find(
              (p) => cleanStr(p.name) === cleanName || cleanStr(p.id) === cleanName
            );

            if (presetMatch) {
              return {
                ...presetMatch,
                ...c,
                tagline: c.tagline || presetMatch.tagline,
                country: c.countryOfOrigin || presetMatch.country,
              };
            }

            // Fallback for any newly added brand in DB
            const monogram = (c.name || "BR")
              .replace(/\(.*?\)/g, "")
              .trim()
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)
              .toUpperCase();

            return {
              id: c._id || `partner-${idx}`,
              name: c.name,
              monogram: monogram || "FIT",
              tagline: c.tagline || "Verified Sports Nutrition Brand",
              country: c.countryOfOrigin || "Global",
              flag: c.countryOfOrigin?.toLowerCase() === "india" ? "🇮🇳" : "🌐",
              accent: "#5C3124",
              accentGlow: "rgba(92, 49, 36, 0.35)",
              badge: "Authorized Partner",
              isFeatured: Boolean(c.isFeatured),
            };
          });

          setPartners(merged);
        }
      } catch (err) {
        // Safe silent fallback: preset list covers all 18 partners
      }
    };

    fetchPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePartnerClick = (partnerName) => {
    navigate(`/gomzi-supplement?brand=${encodeURIComponent(partnerName)}`);
  };

  // Duplicate items twice in track to produce a mathematically seamless -50% infinite translation loop
  const marqueeItems = useMemo(() => {
    return [...partners, ...partners];
  }, [partners]);

  return (
    <section
      aria-label="Official Authorized Brand Partners Marquee"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#120905] via-[#1c0f08] to-[#120905] border-t border-[#8B5A2B]/40 border-b border-black/50 py-3 sm:py-4 shadow-[inset_0_2px_12px_rgba(0,0,0,0.45)] select-none"
    >
      {/* Subtle radial ambient warmth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,49,36,0.22),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-2 sm:gap-4">
        {/* Left Fixed Badge / Credibility Anchor */}
        <div className="shrink-0 flex items-center gap-2 px-4 sm:px-6 md:border-r md:border-white/10">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <FiShield className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-amber-200/90 whitespace-nowrap">
              Official Brand Partners
            </span>
            <span className="hidden xl:inline text-[10px] font-bold text-white/40 tracking-tight">
              ({partners.length} Verified)
            </span>
          </div>
        </div>

        {/* Marquee Scroller Viewport with Left and Right Fade Overlays */}
        <div className="relative w-full overflow-hidden marquee-container">
          {/* Left Gradient Edge Mask */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-20 bg-gradient-to-r from-[#140b07] via-[#140b07]/80 to-transparent"
            aria-hidden="true"
          />

          {/* Right Gradient Edge Mask */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-20 bg-gradient-to-l from-[#140b07] via-[#140b07]/80 to-transparent"
            aria-hidden="true"
          />

          {/* GPU-Accelerated Infinite Running Marquee Track */}
          <div
            className="animate-marquee-infinite flex items-center gap-3 sm:gap-4 py-1"
            title="Hover to pause • Click brand to browse catalog"
          >
            {marqueeItems.map((brand, idx) => {
              const uniqueKey = `${brand.id || brand.name}-${idx}`;
              return (
                <button
                  key={uniqueKey}
                  type="button"
                  onClick={() => handlePartnerClick(brand.name)}
                  className="group relative shrink-0 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.09] hover:border-amber-400/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-left shadow-sm hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = brand.accent || "#f59e0b";
                    e.currentTarget.style.boxShadow = `0 4px 18px ${brand.accentGlow || "rgba(245, 158, 11, 0.3)"}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Brand Monogram Avatar Badge */}
                  <span
                    className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-black text-white shadow-inner transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: brand.accent || "#5C3124",
                    }}
                  >
                    {brand.monogram}
                  </span>

                  {/* Partner Brand Name */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs sm:text-[13px] text-white tracking-tight leading-none group-hover:text-amber-200 transition-colors">
                        {brand.name}
                      </span>
                      <FiCheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    </div>

                    {/* Country Origin & Category Tagline */}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] text-white/50 font-medium leading-none flex items-center gap-1">
                        <span>{brand.flag}</span>
                        <span>{brand.country}</span>
                      </span>
                      <span className="text-[9px] text-amber-300/60 font-semibold leading-none">
                        • {brand.badge}
                      </span>
                    </div>
                  </div>

                  {/* Micro External Link Icon (reveals on hover) */}
                  <FiExternalLink className="w-3 h-3 text-white/30 group-hover:text-amber-300 transition-colors ml-1 shrink-0 opacity-0 group-hover:opacity-100" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
