import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Factory,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Scale,
  PackageSearch,
  BadgeCheck,
  Users,
  MapPin,
} from "lucide-react";
import SEO from "../../component/SEO";

const stats = [
  { value: "15+", label: "Years Experience", sub: "Contract formulation mastery" },
  { value: "500k+", label: "Athletes Fueled", sub: "Across all Indian states" },
  { value: "100%", label: "Label Accuracy", sub: "Third-party NABL verified" },
  { value: "ISO 22000", label: "WHO-GMP Certified", sub: "Surat state-of-the-art facility" },
];

const founders = [
  {
    name: "Dt. Chirag Pandey",
    role: "Founder & Chief Nutrition Scientist",
    image: "/images/chirag-pandey.jpg",
    bio: "Clinical Dietitian and Sports Nutrition Specialist. Dt. Chirag Pandey co-founded Gomzi to eliminate proprietary blends and unbacked claims, ensuring every formula delivers verified biological value and zero gut distress.",
    tags: ["Clinical Dietetics", "Nutritional Science", "Formulation Research"],
    quote: "If an ingredient doesn't have randomized clinical trials supporting athletic efficacy, it has no place in our scoop.",
  },
  {
    name: "Chirag Chandlekar",
    role: "Co-Founder & Head of Manufacturing",
    image: "/images/chirag-chandlekar.jpg",
    bio: "Head of Operations at Gomzi Lifesciences. Chirag translates pharmaceutical manufacturing discipline into our direct-to-consumer product lines, enforcing strict batch consistency, micro-filtration, and zero amino-spiking.",
    tags: ["GMP Compliance", "Batch Chemistry", "Micro-Filtration"],
    quote: "We don't outsource to third-party blenders. We control every milligram that enters our pharmaceutical-grade mixers.",
  },
];

const timeline = [
  {
    year: "2012–2018",
    tag: "Contract Manufacturing Excellence",
    title: "Gomzi Lifesciences Begins Formulation",
    description:
      "Our Surat manufacturing plant commenced formulation and precision packaging for leading sports nutrition and pharmaceutical brands, mastering dosing accuracy, raw whey sourcing, and automated testing.",
  },
  {
    year: "2020",
    tag: "The Turning Point",
    title: "Exposing The Supplement Gap",
    description:
      "Years of manufacturing for other companies revealed the dark shortcuts rampant in the market: amino spiking, cheap oxide mineral substitutions, and inflated label claims. We resolved to pioneer an uncompromising brand.",
  },
  {
    year: "2024",
    tag: "Brand Launch",
    title: "Putting Our Own Name On The Label",
    description:
      "Gomzi Nutrition by RAG launched as a direct-to-athlete brand. Direct from our cGMP facility to your doorstep, backed by public third-party batch assays and zero middlemen markups.",
  },
  {
    year: "Today",
    tag: "National Scale",
    title: "Fueling 500,000+ Athletes Across India",
    description:
      "From national powerlifters to everyday fitness enthusiasts, our 100% Whey Isolate, Creatine, Mass Gainer, and Plant Protein deliver pharmaceutical purity with celebrated Indian flavors.",
  },
];

const pillars = [
  {
    title: "Dosing Accuracy",
    icon: Scale,
    tag: "100% True Dosage",
    description:
      "We dose to the exact gram on the label. While others under-dose by 5–10% to protect margins, we formulate to clinical efficacy standards.",
  },
  {
    title: "Bioavailable Sourcing",
    icon: PackageSearch,
    tag: "Chelated & Micronized",
    description:
      "Cheap oxide minerals pass unabsorbed through your digestive system. We invest in expensive chelated minerals and ultra-micronized creatine for peak cellular uptake.",
  },
  {
    title: "Zero Deceptive Claims",
    icon: BadgeCheck,
    tag: "Clean Label Certified",
    description:
      "No proprietary blend camouflage, no disguised maltodextrin spikes, and no false promises. Every ingredient is declared with exact gram amounts.",
  },
];

const certifications = [
  { title: "FSSAI Central License", sub: "Govt. of India Food Safety & Standards", icon: ShieldCheck },
  { title: "ISO 22000:2018", sub: "International Food Safety Management", icon: Award },
  { title: "WHO-GMP Certified", sub: "World Health Organization Manufacturing", icon: Factory },
  { title: "100% Dope-Free", sub: "WADA Compliant Screened Batches", icon: FlaskConical },
];

export default function AboutPage() {
  return (
    <div className="bg-bg-cream text-text">
      <SEO
        title="About Gomzi Nutrition by RAG - Certified Sports Nutrition & Manufacturing"
        description="Learn about Gomzi Nutrition: Founded by Dietitians & Manufacturing Experts in Surat. Certified FSSAI, ISO 22000 & WHO-GMP clean sports nutrition."
      />

      {/* ── 1. HERO BANNER ── */}
      <section className="w-full bg-white relative overflow-hidden">
        {/* subtle warm bottom gradient to ease into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#f5f6f8] pointer-events-none z-0" />
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-10 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <Sparkles size={12} className="text-primary" />
            <span>Purity • Science • Athletic Legacy</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-[40px] leading-tight">
            Born From Science. Made For Athletes.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-light">
            We didn't begin as marketers outsourcing formulas to anonymous factories. We started as the cGMP laboratory holding the highest standard. Here is why we put our name on the label.
          </p>

          {/* 4 Key Stat Metrics */}
          <div className="mx-auto mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-xl border border-border bg-white p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <span className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1 text-xs font-semibold text-text">
                  {s.label}
                </span>
                <span className="mt-0.5 hidden text-[10px] text-text-light sm:block">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. THE BRAND GENESIS & FACILITY SPLIT ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#f5f6f8]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Factory size={14} className="text-primary" />
                <span>Our Manufacturing Origin</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-text leading-[1.08] tracking-tight">
                We are the manufacturer.
                <br />
                <span className="text-primary">We don't cut corners.</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-gray-600 font-light">
                Most supplement brands buy off-the-shelf pre-mixes from contract blenders and market whatever gets handed back. At Gomzi Nutrition by RAG, our origins began inside the laboratory—managing dosing accuracy, micro-filtration, and HPLC batch testing for pharmaceutical clients.
              </p>

              <div className="flex flex-col gap-3.5 pt-2">
                {[
                  "100% in-house pharmaceutical-grade mixing & packaging in Surat, Gujarat.",
                  "Zero amino-spiking: Every gram of protein is biologically complete whey protein.",
                  "Transparent NABL third-party certificates of analysis publicly available for batches.",
                  "Formulated with digestive enzymes (Protease & Papain) for zero bloating and effortless mixing.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary-light border border-primary-border flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} className="text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/gomzi-supplement"
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer"
                >
                  <span className="relative z-10">Explore Certified Catalog</span>
                  <ArrowRight size={15} className="relative z-10 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <MapPin size={15} className="text-primary" />
                  <span>Facility: Surat, India</span>
                </div>
              </div>
            </div>

            {/* Right Facility Image & Glass Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-primary-border shadow-2xl bg-white group">
                <img
                  src="/images/about-manufacturing.jpg"
                  alt="Gomzi Nutrition Certified Facility in Surat"
                  className="w-full h-[450px] sm:h-[520px] object-cover object-top group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8914]">
                      Gomzi Lifesciences Facility
                    </span>
                    <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full">
                      Surat, Gujarat
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-light">
                    ISO 22000:2018 & WHO-GMP compliant manufacturing hub producing over 20,000+ units monthly for elite Indian athletes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. LEADERSHIP & FORMULATION EXPERTISE ── */}
      <section className="py-14 sm:py-20 bg-white border-y border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary-border mb-3">
              <Users size={13} className="text-primary" />
              <span>Leadership &amp; Vision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text leading-tight">
              Guided By Dietetics. Driven By Quality.
            </h2>
            <p className="text-xs sm:text-sm text-text-light mt-2.5 leading-relaxed font-normal">
              Every formula is spearheaded by practicing dietitians who understand physiological bio-availability and manufacturing executives who refuse to compromise batch standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group relative rounded-2xl bg-bg-light/60 border border-border p-6 sm:p-8 hover:bg-white hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 sm:gap-5 mb-5">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-primary-border group-hover:border-primary/50 shrink-0 bg-primary-light shadow-xs transition-colors">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-text tracking-tight group-hover:text-primary transition-colors">
                        {founder.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-sale font-semibold mt-0.5">
                        {founder.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal mb-4">
                    {founder.bio}
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-border italic text-xs text-text-body leading-relaxed mb-6 shadow-xs border-l-4 border-l-primary">
                    &ldquo;{founder.quote}&rdquo;
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {founder.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white text-text-secondary border border-border group-hover:border-primary-border group-hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CHRONOLOGY TIMELINE: HOW WE GOT HERE ── */}
      <section className="py-14 sm:py-20 bg-bg-cream">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Our Evolution
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-text mt-1 tracking-tight uppercase">
              How We Got Here
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2">
              From contract blending for third parties to building India's cleanest direct-to-consumer nutrition brand.
            </p>
          </div>

          <div className="relative">
            {/* Center Timeline Line — sits exactly in the middle column of the CSS grid */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-border via-primary/40 to-primary-border pointer-events-none" />

            <div className="flex flex-col gap-8 md:gap-10">
              {timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;

                const card = (
                  <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(27,54,93,0.12)] hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-primary">{item.year}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8914] bg-primary-light px-2.5 py-0.5 rounded-full border border-primary-border">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                );

                return (
                  <div key={item.year} className="relative">
                    {/* Mobile: full-width card with left accent line */}
                    <div className="md:hidden flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 text-[11px] font-bold border-2 border-white shadow">
                          {idx + 1}
                        </div>
                        {idx < timeline.length - 1 && (
                          <div className="flex-1 w-[2px] bg-primary-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">{card}</div>
                    </div>

                    {/* Desktop: strict 3-column grid — col 1 | center-node col | col 3 */}
                    <div className="hidden md:grid grid-cols-[1fr_3.5rem_1fr] items-center gap-0">
                      {/* Column 1 */}
                      <div className={`pr-6 ${isEven ? "" : ""}`}>
                        {isEven ? card : <span />}
                      </div>

                      {/* Column 2 — node is always centered here */}
                      <div className="flex items-center justify-center">
                        <div className="w-9 h-9 rounded-full bg-primary text-white border-4 border-white shadow-md flex items-center justify-center z-10 text-xs font-bold">
                          {idx + 1}
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="pl-6">
                        {!isEven ? card : <span />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE 3 MANUFACTURING INTEGRITY PILLARS ── */}
      <section className="py-14 sm:py-20 bg-white border-y border-primary-border">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl text-text mt-1 font-extrabold tracking-tight uppercase">
              The 3 Rules We Never Break
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden p-7 rounded-2xl bg-bg-cream border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-white px-2.5 py-1 rounded-md border border-primary-border group-hover:border-amber-400/50 group-hover:bg-[#faeee9] transition-all duration-300">
                      {p.tag}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mt-3 mb-2 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                      {p.description}
                    </p>
                  </div>
                  {/* High-contrast luxury travelling sheen sweep */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CERTIFICATIONS ACCREDITATION ── */}
      <section className="py-10 sm:py-14 bg-bg-cream border-t border-primary-border">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Certified &amp; Compliant</span>
            <h2 className="text-2xl sm:text-3xl font-black text-text mt-1 tracking-tight">
              Regulated At Every Level
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Every batch, every scoop — backed by India&apos;s highest food safety and pharmaceutical compliance frameworks.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-primary-border shadow-sm hover:shadow-[0_12px_28px_rgba(27,54,93,0.1)] hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-light border border-primary-border flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-105 transition-all duration-300 shadow-xs relative z-10">
                    <Icon size={18} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight">
                      {c.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-light">
                      {c.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. EXPERIENCE THE DIFFERENCE CTA BANNER ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-border bg-gradient-to-r from-primary-light/60 via-white to-primary-light/40 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-primary-border shadow-xs mb-3">
                Verified Purity In Every Scoop
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
                Experience the Gomzi Difference
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-2 leading-relaxed">
                Join 500,000+ athletes fueled by pure protein, transparent formulations, and zero compromises.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/gomzi-supplement"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold text-xs uppercase tracking-wider hover:bg-primary-hover active:scale-[0.98] transition-all shadow-sm cursor-pointer"
              >
                <span>Shop Catalog</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/faq"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-white text-text hover:bg-bg-light font-semibold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>View FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}