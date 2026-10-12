import { Scale, PackageSearch, BadgeCheck } from "lucide-react";

const advantages = [
  {
    title: "DOSING",
    icon: Scale,
    description:
      "We formulate to the exact gram amount on the label - not the industry-common practice of dosing slightly under to protect margin.",
  },
  {
    title: "SOURCING",
    icon: PackageSearch,
    description:
      "Chelated mineral forms cost more than oxide forms. We use chelated because it's what actually absorbs - not what's cheapest to buy in bulk.",
  },
  {
    title: "CLAIMS",
    icon: BadgeCheck,
    description:
      "We've manufactured products for brands whose marketing outran what the formula could actually do. On our own label, we don't repeat that mistake.",
  },
];

export default function ManufacturingAdvantageSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        <div className="rounded-[32px] bg-[#17120D] border border-[#2E241B] overflow-hidden">
          <div className="px-6 md:px-10 lg:px-14 py-10 lg:py-14">
            {/* Heading */}

            <span className="uppercase tracking-[5px] text-[11px] font-semibold text-[#C97A2B]">
              What this manufacturing background actually changes
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl lg:text-5xl font-black leading-tight text-white max-w-4xl">
              We know exactly what a formula could get away with.
              <br className="hidden lg:block" />
              So we don't let ours.
            </h2>

            <p className="mt-8 max-w-4xl text-[16px] md:text-lg leading-8 text-[#D8D0C7]">
              Most supplement brands buy formulas from a manufacturer and market
              whatever the manufacturer hands back. We are the manufacturer -
              which means the corners other brands might not even know are being
              cut, we can't pretend not to see.
            </p>

            {/* Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
              {advantages.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-6
                      transition-all
                      duration-300
                      hover:border-[#C97A2B]/40
                      hover:bg-white/[0.05]
                      hover:-translate-y-1
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-[#2A2118] flex items-center justify-center">
                        <Icon size={20} className="text-[#C97A2B]" />
                      </div>

                      <span className="uppercase tracking-[3px] text-[11px] font-semibold text-[#C97A2B]">
                        {item.title}
                      </span>
                    </div>

                    <p className="mt-5 text-[15px] md:text-base leading-7 text-[#E7E1DA]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
