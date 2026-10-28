import { useId, useState } from "react";

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
  const id = useId();
  return <div className="border-b border-border">
    <h3><button id={`${id}-question`} aria-expanded={isOpen} aria-controls={`${id}-answer`} onClick={onClick} className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm sm:text-base font-semibold">
      {question}<span aria-hidden="true" className="text-xl text-primary shrink-0">{isOpen ? "−" : "+"}</span>
    </button></h3>
    <div hidden={!isOpen} id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} className="pb-5 text-sm text-text-light leading-7">{answer}</div>
  </div>;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-light py-10 md:py-14">
      {/* Properly centered container */}
      <div className="mx-auto w-full max-w-[var(--container-width)] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* LEFT */}
          <div className="w-full">
            <h2
              className="font-toma font-black text-text text-3xl sm:text-4xl lg:text-4xl xl:text-4xl mb-5 leading-tight"
              style={{ letterSpacing: "0.3px" }}
            >
              Don't think twice, your
              <br />
              body will thank you
              <span className="italic font-bold" style={{ color: "var(--color-primary)" }}>
                !
              </span>
            </h2>

            <p className="font-modelica text-text-black text-sm sm:text-base leading-relaxed mb-6">
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
          <div className="w-full lg:sticky lg:top-48">
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
