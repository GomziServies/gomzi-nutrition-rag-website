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
  },
  {
    id: "gmp",
    icon: Award,
    title: "GMP Certified",
    subtitle: "Pharma-Grade Facilities",
  },
  {
    id: "lab",
    icon: FlaskConical,
    title: "Lab Tested",
    subtitle: "100% NABL Verified Purity",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Personalized Support",
    subtitle: "Free Dietitian Guidance",
  },
  {
    id: "delivery",
    icon: Truck,
    title: "Pan India Delivery",
    subtitle: "Fast & Insured Express",
  },
];

/** Uniform icon tile — one style for every item, no rainbow accents. */
const TILE =
  "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-bg-light text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary-light";

const BlackFeatureBar = () => {
  return (
    <section className="w-full border-y border-border bg-white">
      <div className="mx-auto w-full max-w-[var(--container-width)] px-3 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        {/* ================= Desktop Layout (>= 1024px) ================= */}
        <div className="hidden lg:grid lg:grid-cols-5 divide-x divide-border">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group flex items-center justify-center gap-3.5 px-3 py-4 transition-colors duration-300 hover:bg-bg-page xl:px-4 xl:py-5 min-h-[84px]"
              >
                <div className={TILE}>
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[13.5px] font-semibold leading-tight tracking-tight text-text xl:text-[14.5px]">
                    {item.title}
                  </span>
                  <span className="mt-0.5 text-[11px] font-normal leading-tight tracking-normal text-text-light xl:text-[11.5px]">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= Mobile & Tablet Layout (< 1024px) ================= */}
        <div className="grid grid-cols-2 gap-2 py-3 sm:gap-2.5 sm:py-3.5 md:grid-cols-3 lg:hidden">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            const isLastOnMobile = idx === features.length - 1;
            return (
              <div
                key={item.id}
                className={`group flex items-center gap-2.5 rounded-xl border border-border bg-white p-2.5 transition-colors duration-300 hover:bg-bg-page sm:gap-3 sm:p-3 ${
                  isLastOnMobile
                    ? "col-span-2 md:col-span-1 justify-center sm:justify-start"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-bg-light text-primary sm:h-10 sm:w-10">
                  <IconComponent className="h-4 w-4" />
                </div>

                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[12px] font-semibold leading-tight tracking-tight text-text sm:text-[13px]">
                    {item.title}
                  </span>
                  <span className="mt-0.5 truncate text-[10px] font-normal leading-tight tracking-normal text-text-light sm:text-[11px]">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlackFeatureBar;
