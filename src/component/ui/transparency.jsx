import React, { useRef, useState } from "react";
import Smallhookheading from "../common/Smallhookheading";

function AccordionItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="border-b" style={{ borderColor: "#909090" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 sm:py-3 text-left group cursor-pointer"
      >
        <span className="font-modelica text-lg font-bold leading-snug pr-4">
          {item.title}
        </span>
        {/* Chevron box */}
        <span
          className="flex-shrink-0 w-8 h-8 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{ background: isOpen ? "#ffffff22" : "#ffffff11" }}
        >
          <svg
            className="w-4 h-4  transition-transform duration-300"
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
        <p className="font-modelica /70 text-sm sm:text-base leading-relaxed pb-5">
          {item.content}
        </p>
      </div>
    </div>
  );
}

const benefits = [
  {
    id: 1,
    title: "Whey Protein",
    content:
      "High-quality protein source that supports muscle recovery and growth.",
  },
  {
    id: 2,
    title: "Digestive Enzymes",
    content: "Help improve protein digestion and absorption.",
  },
  {
    id: 3,
    title: "Vitamins & Minerals",
    content: "Support energy production and overall wellness.",
  },
  {
    id: 4,
    title: "BCAAs",
    content: "Support muscle recovery after training.",
  },
];

function CheckIcon() {
  return (
    <span className="flex-shrink-0 mt-1 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
      <svg
        viewBox="0 0 10 10"
        fill="none"
        stroke="#3B6D11"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[9px] h-[9px]"
      >
        <polyline points="1,5 4,8 9,2" />
      </svg>
    </span>
  );
}

function SectionRow({ item }) {
  return (
    <div
      className={`flex flex-col gap-6 md:gap-8 lg:gap-10 items-center
        ${item.imageLeft ? "md:flex-row-reverse" : "md:flex-row"}
      `}
    >
      {/* Image Block - 45% width */}
      <div className="w-full md:w-[45%] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] order-1 md:order-none">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="w-full h-auto object-cover"
          style={{ aspectRatio: "4/3" }}
        />
      </div>

      {/* Text Block - 55% width */}
      <div className="w-full md:w-[55%] flex flex-col justify-center gap-4 order-2 md:order-none">
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
      </div>
    </div>
  );
}

export default function TransparencySection() {
  const [openId, setOpenId] = useState(1); // first one open by default

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));
  return (
    <section className="bg-[var(--color-bg)] py-10">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Rows */}
        <div className="w-full rounded-3xl overflow-hidden bg-white">
          {/* Inner layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-start gap-10 md:gap-8">
            {/* ── LEFT: Accordion ── */}
            <div className="w-full md:w-[55%] flex flex-col order-1 md:order-none">
              <Smallhookheading text1={"What's Inside Every Scoop?"} />
              <p className="">
                We believe supplement labels should be simple, transparent, and
                easy to understand.
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
              {/* <a
                href="https://fggroup.in/fgiit/fitness-courses"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-modelica font-medium text-sm rounded hover:bg-gray-800 transition-colors duration-200 whitespace-nowrap"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Know more
              </a> */}
            </div>

            {/* ── RIGHT: Shaker Bottle Image ── */}
            <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
              <img
                src="/images/scoop.webp"
                alt="Gomzi Supplement by RAG shaker with ingredients"
                className="w-full h-full object-contain max-h-[500px]"
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
