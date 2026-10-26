export default function ScientificallyProvenproductdetail() {
  const bullets = [
    "Boost longevity",
    "Stimulates longevity gene SIRT1",
    "Healthy ageing",
  ];

  return (
    <section className="w-full bg-bg py-10 md:py-14 lg:py-20">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Card */}
        <div
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden"
          style={{ background: "#0a0a0a" }}
        >
          {/* Background decorative image */}
          <img
            src="/images/profilebackground.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none select-none"
          />

          {/*
            Layout logic:
            - Mobile  (<md): column - image on TOP, text below
            - Tablet  (md):  row - text left, image right (compact spacing)
            - Desktop (lg+): row - text left, image right (generous spacing)

            flex-col      → mobile: stacked
            md:flex-row   → tablet+: side by side
            Image is placed FIRST in DOM so on mobile it shows at top.
          */}
          {/*
            Layout:
            - Mobile + Tablet (<lg): column - image TOP, text BOTTOM
            - Desktop (lg+): row - text LEFT, image RIGHT
          */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-0">
            {/* ── Image (DOM first → always on top for mobile & tablet) ── */}
            <div
              className="
                w-full
                lg:order-2
                lg:w-[40%]
                flex-shrink-0
                px-8 pt-8 pb-0
                lg:px-0 lg:pt-0 lg:pb-0
                lg:self-stretch
              "
            >
              <div className="relative w-full h-full min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px]">
                <img
                  src="/images/ScientificallyProven.webp"
                  alt="Scientist in lab"
                  className="
                    w-full h-full
                    object-contain object-bottom
                    lg:object-cover lg:object-center
                    lg:absolute lg:inset-0
                  "
                  onError={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)";
                    e.target.src = "";
                  }}
                />
              </div>
            </div>

            {/* ── Text Content (DOM second → always below image on mobile & tablet) ── */}
            <div
              className="
                lg:order-1
                flex-1
                flex flex-col gap-4 lg:gap-5
                p-6 sm:p-8 md:p-10 lg:p-14
                lg:pr-10
              "
            >
              {/* Heading */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-black"
                style={{ lineHeight: "1.15", letterSpacing: "0.3px" }}
              >
                Scientifically proven Swiss made Resveratrol
              </h2>

              {/* Description */}
              <p
                className="text-white/80 text-sm sm:text-base md:text-base lg:text-base"
                style={{ lineHeight: "1.7" }}
              >
                Contains Veri-te™ 125 mg of trans resveratrol made in
                Switzerland, which is scientifically proven to be the most
                potent dietary activating longevity gene (SIRT1), that is
                responsible for protecting body against age-related diseases.
              </p>

              {/* Bullet points */}
              <ul className="flex flex-col mt-1">
                {bullets.map((point, index) => (
                  <li
                    key={point}
                    className={`flex items-center gap-3 py-3 ${
                      index !== bullets.length - 1
                        ? "border-b border-white/20"
                        : ""
                    }`}
                  >
                    <img
                      src="/images/Science-Molecule.png"
                      alt="molecule"
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 object-contain flex-shrink-0"
                    />
                    <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-2">
                <button
                  className="
                    w-full
                    px-10 py-4
                    rounded-xl
                    font-semibold
                    text-[#0a0a0a] text-sm sm:text-base
                    transition-all duration-200 hover:opacity-90
                  "
                  style={{ background: "#95442c" }}
                >
                  Try now
                </button>
              </div>

              {/* Sources link */}
              <a
                href="#"
                className="text-white text-xs underline underline-offset-2 hover:text-white/60 transition-colors w-fit"
              >
                Sources: scientific evidence
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
