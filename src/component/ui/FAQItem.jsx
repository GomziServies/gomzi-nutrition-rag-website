import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, CheckCircle2, ArrowRight } from "lucide-react";

const faqs = [
  {
    id: 1,
    tag: "100% Lab Tested",
    question: "Is your protein powder third-party tested?",
    answer:
      "Yes, absolutely. Every single batch undergoes stringent testing for purity, heavy metals, microbial safety, and protein content. We publish verified batch test reports transparently so you know exactly what is inside your tub.",
  },
  {
    id: 2,
    tag: "Zero Bloating",
    question: "Is your whey protein suitable for beginners?",
    answer:
      "100% yes. Our whey formulas are ultra-filtered and fortified with DigeZyme® multi-enzyme complex, making them exceptionally easy on sensitive stomachs with zero bloating or heaviness, even if you are brand new to fitness supplements.",
  },
  {
    id: 3,
    tag: "Full Transparency",
    question: "What makes Gomzi protein different from others?",
    answer:
      "We never use proprietary blends, amino-spiking, or artificial fillers. You get 100% label transparency, clinically backed raw ingredients, and full macro honesty manufactured in FSSAI-certified state-of-the-art facilities.",
  },
  {
    id: 4,
    tag: "Daily Vitality",
    question: "Can I take protein every day, including rest days?",
    answer:
      "Yes. Your muscles repair and rebuild during recovery, primarily on rest days. Consistent daily protein intake ensures your body maintains a positive nitrogen balance for continuous muscle recovery and daily metabolic wellness.",
  },
  {
    id: 5,
    tag: "Plant-Based & Vegan",
    question: "Is your plant protein 100% vegan and dairy-free?",
    answer:
      "Yes. Our plant protein is crafted from premium pea and brown rice isolates, providing a complete 9-essential-amino-acid profile that is 100% vegan, naturally dairy-free, hypoallergenic, and non-GMO with delicious natural flavoring.",
  },
];

function FAQItemCard({ faq, isOpen, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border ${
        isOpen
          ? "border-[#5C3124]/50 bg-gradient-to-br from-[#fdfbf9] to-white shadow-md p-4 sm:p-5"
          : "border-[#ebdcd7]/80 bg-white hover:border-[#5C3124]/40 hover:bg-[#fdf6f4]/40 p-4 sm:p-4.5 shadow-2xs"
      }`}
    >
      <div className="w-full flex items-center justify-between gap-4 text-left">
        <h3
          className={`text-base sm:text-lg font-bold leading-snug transition-colors pr-2 ${
            isOpen ? "text-[#5C3124]" : "text-gray-900 group-hover:text-[#5C3124]"
          }`}
        >
          {faq.question}
        </h3>

        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#5C3124] text-white rotate-180 shadow-xs"
              : "bg-[#fdf6f4] text-[#5C3124] border border-[#ebdcd7]"
          }`}
        >
          {isOpen ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </div>

      {isOpen && (
        <div className="pt-3.5 mt-3.5 border-t border-[#ebdcd7]/60">
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
            {faq.answer}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>{faq.tag}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-[#faf8f6] py-14 sm:py-20 lg:py-24 border-t border-[#ebdcd7]/60 overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* ── LEFT: FAQ Accordion ── */}
          <div className="w-full lg:col-span-7 flex flex-col">
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C3124]/10 border border-[#5C3124]/20 mb-3.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5C3124]">
                Frequently Asked Questions
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              Don't think twice, your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C3124] to-amber-700">
                body will thank you!
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-8">
              Got questions? We've got answers. Explore everything you need to
              know about Gomzi Nutrition, our certified purity standards, and
              how our science-backed formulas fuel your fitness journey.
            </p>

            {/* FAQ Cards */}
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <FAQItemCard
                  key={faq.id}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>

            {/* Micro Support CTA */}
            <div className="mt-6 pt-5 border-t border-[#ebdcd7]/60 flex items-center justify-between text-xs sm:text-sm text-gray-500 font-medium">
              <span>Still have doubts or need formula advice?</span>
              <Link
                to="/contact-us"
                className="text-[#5C3124] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ask Our Experts</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Athlete Showcase Frame ── */}
          <div className="w-full lg:col-span-5 lg:sticky lg:top-24 flex items-center justify-center">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-[#ebdcd7] group bg-gradient-to-b from-[#1c120c] to-[#120a06]">
              {/* Main Photo */}
              <img
                src="/images/about-us-photo.webp"
                alt="Gomzi Supplement Athlete Community"
                className="block w-full h-[420px] sm:h-[480px] lg:h-[540px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/product-placeholder.webp";
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15 pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/80 shadow-md text-xs font-black text-gray-950">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Certified Pure Nutrition</span>
              </div>

              {/* Bottom Social Proof Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-white/80 shadow-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C3124] to-[#3a1d15] text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-sm ring-2 ring-[#ebdcd7]">
                    ★
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-black text-gray-950 leading-tight truncate">
                      Real Athletes. Real Results.
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                      Trusted by 50,000+ fitness enthusiasts across India
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
