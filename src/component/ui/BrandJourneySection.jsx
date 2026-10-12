import React from "react";

const timeline = [
  {
    tag: "Manufacturing first",
    title: "Gomzi Lifesciences begins contract manufacturing",
    description:
      "Our Surat facility starts producing whey protein and nutraceutical formulas for other supplement brands, building deep operational expertise in dosing accuracy, sourcing, and batch testing.",
  },
  {
    tag: "Turning point",
    title: "We saw the gap between what labels say and what's inside",
    description:
      "Years of manufacturing for other brands showed us exactly where corners get cut in this industry - and how rarely customers ever find out.",
  },
  {
    tag: "Gomzi Supplement by RAG launches",
    title: "We put our own name on the label",
    description:
      "Gomzi Supplement by RAG launches as Gomzi Lifesciences' direct-to-consumer brand - same facility, same manufacturing standards, but with full label transparency and public batch reports from day one.",
  },
  {
    tag: "Today",
    title: "Whey protein, BCAA, and Multivitamins - built the same way",
    description:
      "Every product we ship carries the manufacturing discipline of a facility that has spent years making supplements for brands that couldn't afford to get it wrong.",
  },
];

export default function BrandJourney() {
  return (
    <section className="md:py-16 w-full overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20">
          {/* LEFT */}

          <div>
            <span className="uppercase tracking-[5px] text-xs font-semibold text-[#B66B1E]">
              OUR JOURNEY
            </span>

            <h2 className="mt-3 text-5xl font-black">How we got here</h2>

            <p className="mt-4 text-lg text-gray-600">
              The short version of a longer story.
            </p>

            <div className="relative mt-5 md:mt-14">
              <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-[#E9D8C6]" />

              <div className="space-y-10">
                {timeline.map((item) => (
                  <div key={item.title} className="relative flex gap-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-7 h-7 rounded-full bg-[#B66B1E] border-[6px] border-white shadow-sm" />
                    </div>

                    <div className="pb-2">
                      <p className="uppercase tracking-[2px] text-xs font-semibold text-[#B66B1E]">
                        {item.tag}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>

                      <p className="mt-3 text-gray-600 leading-8">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="lg:sticky lg:top-28 self-start">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-full h-full rounded-[36px] border border-[#E9D8C6]" />

              <div className="relative overflow-hidden rounded-[32px] bg-[#F8F4EF]">
                <img
                  src="/images/about-manufacturing.jpg"
                  alt="Manufacturing Facility"
                  className="w-full h-[620px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
