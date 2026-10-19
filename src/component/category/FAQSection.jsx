import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQSection = ({ faq = [] }) => {
  const [active, setActive] = useState(0);

  if (!faq.length) return null;

  return (
    <section className="mt-14 md:mt-24 mb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fdf6f4] border border-[#ebdcd7] text-xs font-bold uppercase tracking-wider text-[#5C3124] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#5C3124]" />
            <span>Support & Guidance</span>
          </span>

          <h2 className="font-toma text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Everything you should know before choosing your supplement.
          </p>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {faq.map((item, index) => {
            const open = active === index;

            return (
              <div
                key={item.question || index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer border ${
                  open
                    ? "border-amber-400/50 bg-gradient-to-br from-[#fdfbf9] to-white shadow-[0_8px_24px_rgba(92,49,36,0.08)] ring-1 ring-amber-400/20"
                    : "border-[#ebdcd7] bg-white hover:border-amber-400/40 hover:bg-[#fdfbf9]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(92,49,36,0.08)] hover:-translate-y-0.5"
                }`}
              >
                {/* Subtle moving card sheen sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.035] to-transparent pointer-events-none z-20" />

                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  className="w-full px-5 py-4 sm:px-7 sm:py-5 flex justify-between items-center text-left cursor-pointer gap-4 relative z-10"
                >
                  <h3
                    className={`font-semibold text-base sm:text-lg pr-4 leading-snug transition-colors duration-200 ${
                      open
                        ? "text-[#5C3124]"
                        : "text-gray-900 group-hover:text-[#5C3124]"
                    }`}
                  >
                    {item.question}
                  </h3>

                  <div
                    className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden ${
                      open
                        ? "bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] text-white border border-amber-400/30 shadow-md shadow-[#5C3124]/25 rotate-180"
                        : "bg-[#fdf6f4] text-[#5C3124] border border-[#ebdcd7] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:via-[#6d3a2b] group-hover:to-[#48261c] group-hover:border-amber-400/30 group-hover:text-white group-hover:shadow-md group-hover:scale-105"
                    }`}
                  >
                    <span className="relative z-10">
                      {open ? (
                        <Minus className="w-4 h-4 text-amber-200" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                    {/* Inner sheen for toggle button */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden relative z-10`}
                >
                  <div className="px-5 sm:px-7 pb-5 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-[#ebdcd7]/60 font-normal">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
