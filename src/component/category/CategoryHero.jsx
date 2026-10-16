import React from "react";
import { CheckCircle2, ShieldCheck, Sparkles, Award } from "lucide-react";

const CategoryHero = ({ pageData }) => {
  if (!pageData) return null;

  const badges = pageData.sections?.comparisonSection?.badges || [
    { value: "100%", label: "Lab Tested" },
    { value: "FSSAI", label: "Govt. Licensed" },
    { value: "0g", label: "Added Sugar" },
    { value: "Pure", label: "No Amino Spiking" },
  ];

  return (
    <div className="mb-8 lg:mb-10">
      {/* Editorial Overview Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#ebdcd7] p-5 sm:p-7 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[2px] text-[#5C3124] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#5C3124]" />
              <span>{pageData.tag || "Authentic Sports Nutrition"}</span>
            </div>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 font-medium">
              {pageData.description}
            </p>
          </div>

          {/* Luxury Trust Badges */}
          {badges && badges.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 flex-shrink-0">
              {badges.slice(0, 4).map((badge, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-xl bg-[#fdfaf8] border border-[#ebdcd7] flex items-center gap-2 shadow-2xs"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="font-bold text-xs text-gray-900 block leading-tight">
                      {badge.value}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-gray-500 tracking-wider block leading-tight">
                      {badge.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
