// src/component/healthkart/HkSeoAccordion.jsx
import React, { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { SEO_ACCORDION_ITEMS } from "../../data/homeProducts";

export default function HkSeoAccordion() {
  const [openIds, setOpenIds] = useState(["seo-1"]);

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full bg-light py-10 sm:py-14 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={20} className="text-primary" />
          <h2 className="text-xl sm:text-2xl font-black text-text tracking-tight font-toma">
            Supplement Knowledge & Buyer's Guide
          </h2>
        </div>

        {/* Accordions (HealthKart .seoSection_mob-seo-sec__d2AIq style) */}
        <div className="space-y-3">
          {SEO_ACCORDION_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-white overflow-hidden shadow-sm transition-colors"
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#faf6f2] transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-text pr-4">
                    {item.title}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#f5ede6] flex items-center justify-center text-primary flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-primary text-white" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed whitespace-pre-line bg-[#fdfcfb]">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
