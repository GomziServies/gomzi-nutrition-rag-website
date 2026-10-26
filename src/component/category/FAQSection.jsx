import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQSection = ({ faq = [] }) => {
  const [active, setActive] = useState(0);

  if (!faq.length) return null;

  return (
    <section className="mt-14 md:mt-24 mb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-light border border-primary-border text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            <span>Support & Guidance</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 tracking-tight">
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
                    : "border-primary-border bg-white hover:border-amber-400/40 hover:bg-[#fdfbf9]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(92,49,36,0.08)] hover:-translate-y-0.5"
                }`}
              >
                {/* Subtle moving card sheen sweep on hover */}

                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  className="w-full px-5 py-4 sm:px-7 sm:py-5 flex justify-between items-center text-left cursor-pointer gap-4 relative z-10"
                >
                  <h3
                    className={`font-semibold text-base sm:text-lg pr-4 leading-snug transition-colors duration-200 ${
                      open
                        ? "text-primary"
                        : "text-gray-900 group-hover:text-primary"
                    }`}
                  >
                    {item.question}
                  </h3>

                  <div
                    className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden ${
                      open
                        ? "btn-gradient text-white border border-amber-400/30 shadow-md shadow-primary/25 rotate-180"
                        : "bg-primary-light text-primary border border-primary-border group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-primary group-hover:to-primary-hover group-hover:border-amber-400/30 group-hover:text-white group-hover:shadow-md group-hover:scale-105"
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
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden relative z-10`}
                >
                  <div className="px-5 sm:px-7 pb-5 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-primary-border/60 font-normal">
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
