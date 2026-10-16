import React from "react";
import {
  ShieldCheck,
  Award,
  FlaskConical,
  Headphones,
  Truck,
} from "lucide-react";

const features = [
  {
    id: "fssai",
    icon: ShieldCheck,
    title: "FSSAI Licensed",
    subtitle: "Govt. Food Safety Certified",
    ringColor: "border-amber-400/30 bg-amber-400/10 text-amber-300 group-hover:border-amber-400/60 group-hover:bg-amber-400/20",
    dot: null,
  },
  {
    id: "gmp",
    icon: Award,
    title: "GMP Certified",
    subtitle: "Pharma-Grade Facilities",
    ringColor: "border-amber-300/30 bg-amber-300/10 text-amber-200 group-hover:border-amber-300/60 group-hover:bg-amber-300/20",
    dot: null,
  },
  {
    id: "lab",
    icon: FlaskConical,
    title: "Lab Tested",
    subtitle: "100% NABL Verified Purity",
    ringColor: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 group-hover:border-emerald-400/60 group-hover:bg-emerald-400/20",
    dot: "bg-emerald-400",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Personalized Support",
    subtitle: "Free Dietitian Guidance",
    ringColor: "border-orange-400/30 bg-orange-400/10 text-orange-300 group-hover:border-orange-400/60 group-hover:bg-orange-400/20",
    dot: null,
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Pan India Delivery",
    subtitle: "Fast & Insured Express",
    ringColor: "border-amber-400/30 bg-amber-400/10 text-amber-300 group-hover:border-amber-400/60 group-hover:bg-amber-400/20",
    dot: null,
  },
];

const BlackFeatureBar = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#120a06] via-[#1f120c] to-[#120a06] border-t border-[#8B5A2B]/35 border-b border-black/40 shadow-inner">
      {/* Subtle radial ambient warmth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(92,49,36,0.18),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-width)] px-3 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        {/* ================= Desktop Layout (>= 1024px) ================= */}
        <div className="hidden lg:grid lg:grid-cols-5 divide-x divide-white/[0.08]">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group relative overflow-hidden flex items-center justify-center gap-3.5 px-3 xl:px-4 py-4 xl:py-5 min-h-[84px] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#5C3124]/35 hover:via-[#6d3a2b]/30 hover:to-[#48261c]/25 cursor-default"
              >
                {/* Jewel Icon Badge */}
                <div
                  className={`
                    relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center
                    rounded-xl border backdrop-blur-sm transition-all duration-300
                    shadow-sm group-hover:scale-105 ${item.ringColor}
                  `}
                >
                  <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {item.dot && (
                    <span
                      className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${item.dot} ring-2 ring-[#1f120c] animate-pulse`}
                      title="Active Verification"
                    />
                  )}
                </div>

                {/* 2-Tier Typography */}
                <div className="relative z-10 flex flex-col text-left">
                  <span className="font-bold text-[13.5px] xl:text-[14.5px] text-white tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </span>
                  <span className="font-medium text-[11px] xl:text-[11.5px] text-white/55 tracking-normal leading-tight mt-0.5 group-hover:text-white/80 transition-colors">
                    {item.subtitle}
                  </span>
                </div>

                {/* Sheen sweep highlight on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* ================= Mobile & Tablet Layout (< 1024px) ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:hidden gap-2 sm:gap-2.5 py-3 sm:py-3.5">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            const isLastOnMobile = idx === features.length - 1;
            return (
              <div
                key={item.id}
                className={`
                  group relative overflow-hidden flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl
                  bg-white/[0.03] border border-white/[0.06]
                  hover:bg-gradient-to-r hover:from-[#5C3124]/35 hover:via-[#6d3a2b]/30 hover:to-[#48261c]/25
                  hover:border-amber-400/35 hover:shadow-md hover:shadow-[#5C3124]/20
                  transition-all duration-300
                  ${isLastOnMobile ? "col-span-2 md:col-span-1 justify-center sm:justify-start" : ""}
                `}
              >
                {/* Icon Badge */}
                <div
                  className={`
                    relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center
                    rounded-lg sm:rounded-xl border backdrop-blur-sm
                    shadow-sm ${item.ringColor}
                  `}
                >
                  <IconComponent className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  {item.dot && (
                    <span
                      className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${item.dot} ring-2 ring-[#1f120c] animate-pulse`}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="relative z-10 flex flex-col min-w-0">
                  <span className="font-bold text-[12px] sm:text-[13px] text-white tracking-tight leading-tight truncate group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </span>
                  <span className="font-medium text-[10px] sm:text-[11px] text-white/50 tracking-normal leading-tight truncate mt-0.5">
                    {item.subtitle}
                  </span>
                </div>

                {/* Sheen sweep highlight on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlackFeatureBar;
