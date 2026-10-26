import { useState, useRef } from "react";

const benefits = [
  {
    id: 1,
    title: "Research-backed formulations",
    content: "Developed using science and real-world performance insights",
  },
  {
    id: 2,
    title: "Premium quality ingredients",
    content: "Sourced from trusted global suppliers for maximum purity.",
  },
  {
    id: 3,
    title: "Third-party tested",
    content: "Every batch is tested for purity, safety and performance.",
  },
  {
    id: 4,
    title: "No unnecessary fillers",
    content:
      "Clean, honest nutrition with no hidden blends or low-quality additives.",
  },
  {
    id: 5,
    title: "Manufactured in certified facilities",
    content:
      "Produced in GMP-certified facilities with the highest quality standards.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="border-b border-white/15">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 sm:py-3 text-left group cursor-pointer"
      >
        <span className="text-lg text-white font-medium leading-snug pr-4">
          {item.title}
        </span>
        {/* Chevron box */}
        <span
          className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{ background: isOpen ? "#ffffff22" : "#ffffff11" }}
        >
          <svg
            className="w-4 h-4 text-white transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* Smooth slide-down */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight ?? 500}px`
            : "0px",
          opacity: isOpen ? 1 : 0,
          transition:
            "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
        }}
      >
        <p className="text-white/70 text-sm sm:text-base leading-relaxed pb-5">
          {item.content}
        </p>
      </div>
    </div>
  );
}

export default function IngredientsHealthBenefits() {
  const [openId, setOpenId] = useState(1); // first one open by default

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="w-full bg-[var(--color-bg)] py-10">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Dark Card */}
        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{ background: "#0a0a0a" }}
        >
          {/* Background decorative */}
          <img
            src="/images/profilebackground.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none"
          />

          {/* Inner layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-start gap-10 md:gap-8 p-8 sm:p-10 md:p-12 lg:p-14">
            {/* ── LEFT: Accordion ── */}
            <div className="w-full md:w-[55%] flex flex-col order-1 md:order-none">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-black mb-6 lg:mb-8">
                Built for Performance. Backed by Science.
              </h2>

              <p className="text-white">
                Our supplements are formulated using scientifically researched
                ingredients designed to support strength, recovery, endurance,
                and daily wellness.
              </p>

              {/* Accordion items */}
              <div className="flex flex-col ">
                {benefits.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="/gomzi-supplement"
                className="text-center mt-6 w-full py-4 rounded-xl text-white font-bold text-[var(--color-text)] text-sm sm:text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#95442c" }}
              >
                Shop Longevity products
              </a>
            </div>

            {/* ── RIGHT: Shaker Bottle Image ── */}
            <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
              <img
                src="/images/Backed-by-Science.webp"
                alt="Gomzi Supplement by RAG shaker with ingredients"
                className="w-full h-full object-contain rounded-3xl"
                onError={(e) => {
                  // fallback placeholder if image not found
                  e.target.style.minHeight = "300px";
                  e.target.style.background = "#e0e0dd";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
