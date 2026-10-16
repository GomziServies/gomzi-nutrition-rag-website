import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQSection = ({ faq = [] }) => {
  const [active, setActive] = useState(0);

  if (!faq.length) return null;

  return (
    <section className="mt-0 md:mt-24">
      <div className="max-w-5xl mx-5 md:mx-auto">
        <div className="text-center mb-14">
          <span className="uppercase tracking-[4px] text-xs font-semibold text-[#8B5E3C]">
            SUPPORT
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-black">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Everything you should know before choosing your supplement.
          </p>
        </div>

        <div className="space-y-5">
          {faq.map((item, index) => {
            const open = active === index;

            return (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E9DFD4] bg-white overflow-hidden transition"
              >
                <button
                  onClick={() => setActive(open ? -1 : index)}
                  className="w-full md:px-7 md:py-6 py-3 px-3 flex justify-between items-center text-left"
                >
                  <h3 className="font-semibold text-m md:text-lg pr-8">
                    {item.question}
                  </h3>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden ${
                      open
                        ? "bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white border border-amber-400/30 shadow-xs rotate-180"
                        : "bg-gray-100 text-gray-500 hover:bg-[#ebdcd7] hover:text-[#5C3124]"
                    }`}
                  >
                    {open ? (
                      <Minus className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 flex-shrink-0" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ${
                    open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-7 pb-7 text-gray-600 leading-8">
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
