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
    <section className="py-10 md:py-14">
      <div className="site-container">
        <div className="site-surface overflow-hidden">
          <div className="px-6 md:px-10 lg:px-14 py-10 lg:py-14">
            {/* Heading */}

            <span className="uppercase tracking-wider text-[11px] font-semibold text-primary">
              What this manufacturing background actually changes
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-4xl font-black leading-tight text-text max-w-4xl">
              We know exactly what a formula could get away with.
              <br className="hidden lg:block" />
              So we don't let ours.
            </h2>

            <p className="mt-8 max-w-4xl text-[16px] md:text-lg leading-8 text-text-light">
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
                      border-border
                      bg-bg-light
                      p-6
                      transition-all
                      duration-300
                      hover:border-primary/40
                      hover:bg-white
                      hover:-translate-y-1
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-white flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>

                      <span className="uppercase tracking-[3px] text-[11px] font-semibold text-primary">
                        {item.title}
                      </span>
                    </div>

                    <p className="mt-5 text-[15px] md:text-base leading-7 text-text-light">
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
