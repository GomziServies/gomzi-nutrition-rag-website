import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQSection = ({ faq = [] }) => {
  const [active, setActive] = useState(0);

  if (!faq.length) return null;

  return (
    <section className="mt-8 sm:mt-16 md:mt-24">
      <div className="max-w-5xl mx-4 sm:mx-6 md:mx-auto">
        <div className="text-center mb-6 sm:mb-14">
          <span className="uppercase tracking-[3px] sm:tracking-[4px] text-[10px] sm:text-xs font-semibold text-[#8B5E3C]">
            SUPPORT
          </span>

          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-black text-text">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 sm:mt-5 text-xs sm:text-base text-gray-600 max-w-2xl mx-auto">
            Everything you should know before choosing your supplement.
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-4">
          {faq.map((item, index) => {
            const open = active === index;

            return (
              <div
                key={item.question}
                className="rounded-xl sm:rounded-2xl border border-[#E9DFD4] bg-white overflow-hidden transition"
              >
                <button
                  onClick={() => setActive(open ? -1 : index)}
                  className="w-full px-4 py-3 sm:px-7 sm:py-5 flex justify-between items-center text-left cursor-pointer"
                >
                  <h3 className="font-bold text-xs sm:text-base md:text-lg pr-4 text-text">
                    {item.question}
                  </h3>

                  {open ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-stone-400" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ${
                    open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-4 pb-4 sm:px-7 sm:pb-6 text-xs sm:text-base text-gray-600 leading-relaxed sm:leading-8">
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
