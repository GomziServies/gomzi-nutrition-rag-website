import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Who owns Gomzi Supplement by RAG?",
    answer:
      "Gomzi Supplement by RAG is the direct-to-consumer supplement brand of Gomzi Lifesciences LLP, a nutraceutical and pharmaceutical contract manufacturer based in Surat, India, founded and led by Gautam Jani.",
  },
  {
    question:
      "Does Gomzi Supplement by RAG manufacture its own products, or outsource them?",
    answer:
      "Gomzi Supplement by RAG products are manufactured directly by Gomzi Lifesciences' own facility in Surat - the same facility that manufactures for other supplement brands as a third-party and private-label contract manufacturer. There's no outsourcing layer between the formula and the factory floor.",
  },
  {
    question: "Where can I see a lab report for a specific batch?",
    answer:
      "Every product carries a batch number printed on the label. You can look up that specific batch's third-party lab report on our Lab Reports page or by scanning the QR code on the packaging.",
  },
  {
    question: "Is Gomzi Supplement by RAG FSSAI certified?",
    answer:
      "Yes. Gomzi Supplement by RAG is manufactured in an FSSAI-licensed facility in India, and every product meets FSSAI's food safety and labeling requirements.",
  },
  {
    question:
      "Does Gomzi Lifesciences also manufacture for other supplement brands?",
    answer:
      "Yes. Gomzi Lifesciences operates as a nutraceutical contract manufacturer offering third-party and private-label manufacturing to other brands, alongside producing Gomzi Supplement by RAG's own product range.",
  },
];

export default function AboutFAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        {/* FAQ */}

        <div>
          <span className="uppercase tracking-[5px] text-xs font-semibold text-[#5C3124]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black">
            Quick answers
          </h2>

          <div className="mt-10 border-t border-[#dbdee9]">
            {faqs.map((item, index) => (
              <div key={item.question} className="border-b border-[#dbdee9]">
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  className="w-full flex justify-between items-center gap-5 py-6 text-left"
                >
                  <h3 className="font-semibold text-lg md:text-xl">
                    {item.question}
                  </h3>

                  {open === index ? <Minus size={20} /> : <Plus size={20} />}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === index ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-8 max-w-4xl">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Content */}

        <div className="mt-24 rounded-[30px] bg-[#F8F5F0] border border-[#dbdee9] p-8 md:p-10 lg:p-14">
          <span className="uppercase tracking-[5px] text-xs font-semibold text-[#5C3124]">
            About Gomzi Supplement
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-black leading-tight">
            About Gomzi Supplement by RAG - made in Surat, India
          </h2>

          <div className="mt-8 space-y-6 text-gray-700 leading-8 text-base md:text-lg">
            <p>
              Gomzi Supplement by RAG is the consumer supplement brand of{" "}
              <strong>Gomzi Lifesciences LLP</strong>, a nutraceutical and
              pharmaceutical contract manufacturer based in{" "}
              <strong>Surat, India</strong>, founded by{" "}
              <strong>Gautam Jani</strong>.
            </p>

            <p>
              Unlike brands that outsource production and market a formula they
              didn't build, Gomzi Supplement by RAG products are made directly
              on Gomzi's own manufacturing floor - the same facility that
              produces <strong>third-party</strong> and{" "}
              <strong>private-label whey protein</strong> for other supplement
              brands.
            </p>

            <p>
              Every Gomzi Supplement by RAG batch is{" "}
              <strong>FSSAI licensed</strong>, independently{" "}
              <strong>lab tested</strong>, and published with a batch-specific
              report you can check yourself.
            </p>

            <p>
              If you're researching who makes Gomzi Supplement by RAG, looking
              into Gomzi Lifesciences as a manufacturing partner, or simply want
              to know whether a supplement brand's claims hold up before you buy
              - this page, and our published batch reports, are the honest
              answer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
