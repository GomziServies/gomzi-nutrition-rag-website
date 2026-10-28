import React from "react";

const cards = [
  {
    tag: "ON OUR PROTEIN PAGES",
    text: "We explain exactly when whey isolate beats concentrate and when concentrate is genuinely the better value.",
  },
  {
    tag: "ON OUR PRE-WORKOUT PAGES",
    text: "We help you decide between stimulant and stimulant-free formulas instead of pushing the strongest product.",
  },
  {
    tag: "ON OUR LABEL",
    text: "Every ingredient is fully disclosed with transparent dosages no hidden proprietary blends.",
  },
  {
    tag: "ON EVERY BATCH",
    text: "Every batch is manufactured in FSSAI-certified facilities and quality tested before reaching customers.",
  },
];

const BrandPromiseSection = () => {
  return (
    <section className="bg-section py-10 w-full overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        <div className="bg-[#17120D] rounded-[20px] overflow-hidden">
          <div className="px-5 md:px-10 lg:px-12 py-5 lg:py-12">
            <span className="uppercase tracking-[6px] text-[#C97A2B] text-xs font-semibold">
              OUR WHOLE REASON FOR EXISTING
            </span>

            <h2 className="mt-6 text-white font-black leading-[0.95] text-3xl md:text-4xl lg:text-5xl max-w-5xl">
              Most supplement labels oversell.
              <br />
              We'd rather undersell
              <br />
              and over-deliver.
            </h2>

            <p className="mt-10 text-lg leading-9 text-[#DDD5CC] max-w-4xl">
              India's supplement market has a trust problem. Hidden ingredient
              blends, exaggerated claims, and quality reports that consumers
              never actually get to see.
            </p>

            <p className="mt-4 text-lg leading-9 text-[#DDD5CC] max-w-4xl">
              We built Gomzi Supplement around transparency. Every formula is
              clearly explained, every ingredient has a purpose, and every
              product page helps you choose what's genuinely right for your goal
              even if that's not our most expensive product.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mt-10">
              {cards.map((card) => (
                <div
                  key={card.tag}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:bg-white/[0.05]"
                >
                  <p className="uppercase tracking-[3px] text-[#C97A2B] text-xs font-semibold">
                    {card.tag}
                  </p>

                  <p className="mt-4 text-white text-xl leading-9">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPromiseSection;
