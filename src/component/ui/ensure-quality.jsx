import Wavyheading from "../common/Wavyheading";

// ─── Main Section ────────────────────────────────────────────────────────────
export default function EnsureQualitySection() {
  return (
    <section className="w-full bg-white py-8 md:py-8 lg:py-10 overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-18">
        <div className="text-center mb-3">
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#003971",
              marginBottom: "10px",
            }}
          >
            How Do We Ensure Quality?
          </span>
        </div>
        <Wavyheading text1="Quality Checked at " text2="Every Stage" />
        <p className="text-center text-[20px] text-gray-500 mb-4 max-w-5xl mx-auto leading-relaxed">
          Every batch goes through multiple quality checkpoints before reaching
          customers.
        </p>
        {/* Desktop Image */}
        <img
          src="/images/batch.webp"
          alt="Quality Check Process"
          className="hidden md:block w-full"
        />

        {/* Mobile Image */}
        <img
          src="/images/batch-mobile.webp"
          alt="Quality Check Process"
          className="block md:hidden w-full"
        />
      </div>
    </section>
  );
}
