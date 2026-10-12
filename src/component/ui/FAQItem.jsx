import { useState } from "react";

const faqs = [
  {
    question: "Is your protein powder third-party tested?",
    answer:
      "Yes. Every batch undergoes quality testing to ensure safety and consistency.",
  },
  {
    question: "Is your whey protein suitable for beginners?",
    answer:
      "Yes. It is designed for both beginners and experienced fitness enthusiasts.",
  },
  {
    question: "What makes your protein different?",
    answer:
      "We focus on transparent labeling, premium ingredients, and science-backed formulations.",
  },
  {
    question: "Can I take protein every day?",
    answer:
      "Yes. Daily protein intake can support muscle recovery and overall nutrition goals.",
  },
  {
    question: "Is your plant protein vegan?",
    answer:
      "Yes. Our plant-based protein formulations are suitable for vegan lifestyles.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className="border-b border-border py-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-toma font-black text-text text-md sm:text-xl">
          {question}
        </h3>

        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "#111111" : "transparent",
            border: "1.5px solid #e5e7eb",
          }}
        >
          {isOpen ? (
            <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
              <path
                d="M1 1H11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1V11M1 6H11"
                stroke="#111111"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      </div>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="font-modelica text-gray-500 text-lg leading-relaxed mt-3 pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-bg py-10 md:py-16">
      {/* Properly centered container */}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* LEFT */}
          <div className="w-full">
            <h2
              className="font-toma font-black text-text text-3xl sm:text-4xl lg:text-4xl xl:text-5xl mb-5 leading-tight"
              style={{ letterSpacing: "0.3px" }}
            >
              Don't think twice, your
              <br />
              body will thank you
              <span className="italic font-bold" style={{ color: "#95442c" }}>
                !
              </span>
            </h2>

            <p className="font-modelica text-text-black text-sm sm:text-lg xl:text-xl leading-relaxed mb-6">
              Got questions? We've got answers! Discover everything you need to
              know About Us Health superfoods and how they can fuel your
              wellness journey.
            </p>

            <div>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onClick={() => toggle(i)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:sticky lg:top-10">
            <div className="w-full overflow-hidden rounded-[16px]">
              <img
                src="/images/about-us-photo.webp"
                alt="Gomzi Supplement by RAG products"
                className="block w-full h-auto object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
