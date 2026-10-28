import Wavyheading from "../common/Wavyheading";
import WavyImageUnderline from "../common/WavyImageUnderline";

// ─── Icons ──────────────────────────────────────
function CheckIcon() {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#111111]">
      <svg
        className="w-4 h-4 text-white fill-none stroke-white stroke-[2.5]"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function CrossIcon({ muted = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full ${
        muted ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke={muted ? "#93c5c5" : "#93c5c5"}
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

// ─── Cell ────────────────────────────────────────
function Cell({ value, isNara = false }) {
  return (
    <td
      className={`py-4 md:py-5 text-center align-middle ${
        isNara ? "bg-primary/30" : ""
      }`}
    >
      {value === true ? (
        <CheckIcon />
      ) : value === false ? (
        <CrossIcon muted={!isNara} />
      ) : (
        <span className="text-sm md:text-base font-modelica text-text-light">
          {value}
        </span>
      )}
    </td>
  );
}

// ─── Main Component ──────────────────────────────
export default function ComparisonTable() {
  return (
    <section className="w-full bg-bg py-12 md:py-16 lg:py-20">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        {/* <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-toma text-text font-black inline-block"
            style={{
              fontSize: "clamp(26px, 4vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "0.3px",
            }}
          >
            {" "}
            <WavyImageUnderline>  Smart nutrition: </WavyImageUnderline>
            great taste, healthy,
            <br />
            and affordable
          </h2>
        </div> */}
        <div className="w-[70%]  mx-auto">
          <Wavyheading
            text2="Smart nutrition:"
            text3="great taste, healthy, and affordable "
          />
        </div>

        {/* <Wavyheading text1={" "}/> */}

        {/* Table Wrapper - horizontal scroll on mobile */}
        <div className="w-full">
          {/* Mobile Image - sirf mobile pe dikhe */}
          <img
            src="/images/comparison-table-mobile.webp"
            alt="Comparison Table"
            className="block md:hidden w-full h-auto"
          />

          {/* Tablet & Desktop Image - sm thi upar dikhe */}
          <img
            src="/images/comparison-table.webp"
            alt="Comparison Table"
            className="hidden md:block w-full lg:w-2/3 xl:w-2/3 h-auto mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
