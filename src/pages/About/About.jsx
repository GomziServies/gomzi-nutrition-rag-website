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
    <div className="bg-[#faf8f6] font-modelica text-[#1c1c28]">
      <SEO
        title="About Gomzi Nutrition by RAG - Certified Sports Nutrition & Manufacturing"
        description="Learn about Gomzi Nutrition: Founded by Dietitians & Manufacturing Experts in Surat. Certified FSSAI, ISO 22000 & WHO-GMP clean sports nutrition."
      />

      {/* ── 1. LUXURY HERO BANNER (COMPACT & MODERN) ── */}
      <section
        className="relative overflow-hidden pt-8 pb-10 sm:pt-10 sm:pb-12 text-white select-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 15%, #3d1b12 0%, #170d09 45%, #0a0604 100%)",
        }}
      >
        {/* Ambient atmospheric glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[220px] rounded-full pointer-events-none blur-[100px]"
          style={{ background: "rgba(92, 49, 36, 0.45)" }}
        />
        <div
          className="absolute top-1/4 right-10 w-64 h-64 rounded-full pointer-events-none blur-[90px]"
          style={{ background: "rgba(255, 137, 20, 0.12)" }}
        />
        <div
          className="absolute bottom-10 left-10 w-60 h-60 rounded-full pointer-events-none blur-[90px]"
          style={{ background: "rgba(92, 49, 36, 0.3)" }}
        />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient RAG Background Typographic Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-toma font-black uppercase leading-none text-white/[0.025] tracking-widest"
            style={{ fontSize: "clamp(90px, 18vw, 220px)" }}
          >
            RAG
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#ffaa5a]">
            <Sparkles size={12} className="text-[#ff8914]" />
            <span>Purity • Science • Athletic Legacy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914] animate-pulse ml-0.5" />
          </div>

          {/* Heading */}
          <h1 className="mt-3 sm:mt-4 font-toma text-white uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            <span>BORN FROM SCIENCE. </span>
            <span
              style={{
                background: "linear-gradient(90deg, #ffaa5a 0%, #ff8914 50%, #f3a055 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MADE FOR ATHLETES.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm leading-relaxed text-gray-300 font-light">
            We didn't begin as marketers outsourcing formulas to anonymous factories. We started as the cGMP laboratory holding the highest standard. Here is why we put our name on the label.
          </p>

          {/* 4 Key Stat Metrics */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber-400/30 hover:bg-white/[0.07] hover:-translate-y-0.5 shadow-lg transition-all duration-300"
              >
                <span className="relative z-10 font-toma text-xl sm:text-2xl md:text-3xl font-extrabold text-[#ffaa5a] tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {s.value}
                </span>
                <span className="relative z-10 font-toma text-[11px] sm:text-xs font-bold text-white uppercase mt-0.5">
                  {s.label}
                </span>
                <span className="relative z-10 text-[10px] text-gray-400 font-modelica mt-0.5 hidden sm:block">
                  {s.sub}
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. THE BRAND GENESIS & FACILITY SPLIT ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#faf8f6]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5C3124]">
                <Factory size={14} className="text-[#5C3124]" />
                <span>Our Manufacturing Origin</span>
              </div>

              <h2 className="font-toma text-3xl sm:text-4xl md:text-5xl font-black text-[#1c1c28] leading-[1.08] tracking-tight">
                We are the manufacturer.
                <br />
                <span className="text-[#5C3124]">We don't cut corners.</span>
              </h2>

              <p className="font-modelica text-sm sm:text-base leading-relaxed text-gray-600 font-light">
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
                    <div className="w-5 h-5 rounded-full bg-[#fdf6f4] border border-[#ebdcd7] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} className="text-[#5C3124]" />
                    </div>
                    <span className="font-modelica text-xs sm:text-sm text-gray-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/gomzi-supplement"
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-toma font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 cursor-pointer"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <span className="relative z-10">Explore Certified Catalog</span>
                  <ArrowRight size={15} className="relative z-10 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <MapPin size={15} className="text-[#5C3124]" />
                  <span>Facility: Surat, India</span>
                </div>
              </div>
            </div>

            {/* Right Facility Image & Glass Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#ebdcd7] shadow-2xl bg-white group">
                <img
                  src="/images/about-manufacturing.jpg"
                  alt="Gomzi Nutrition Certified Facility in Surat"
                  className="w-full h-[450px] sm:h-[520px] object-cover object-top group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffaa5a]">
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
      <section
        className="py-16 sm:py-24 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #120b08 0%, #1a0f0a 50%, #0d0705 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ffaa5a] mb-2">
              <Users size={14} className="text-[#ff8914]" />
              <span>Leadership & Vision</span>
            </div>
            <h2 className="font-toma text-3xl sm:text-5xl uppercase leading-tight font-black tracking-tight text-white">
              Guided By Dietetics.
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Driven By Quality.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 font-light leading-relaxed">
              Every formula is spearheaded by practicing dietitians who understand physiological bio-availability and manufacturing executives who refuse to compromise batch standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5C3124]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#ff8914]/40 group-hover:border-amber-400 group-hover:shadow-lg group-hover:shadow-[#ffaa5a]/20 shrink-0 bg-[#1c120e] transition-all duration-300">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-toma text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-100 transition-colors">
                        {founder.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#ffaa5a] font-semibold mt-0.5">
                        {founder.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-5">
                    {founder.bio}
                  </p>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] italic text-xs text-gray-200 leading-relaxed mb-6 group-hover:border-white/10 transition-colors">
                    "{founder.quote}"
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                  {founder.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.05] text-gray-300 border border-white/10 group-hover:border-amber-400/30 group-hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CHRONOLOGY TIMELINE: HOW WE GOT HERE ── */}
      <section className="py-16 sm:py-24 bg-[#faf8f6]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C3124]">
              Our Evolution
            </span>
            <h2 className="font-toma text-3xl sm:text-5xl font-black text-[#1c1c28] mt-1 tracking-tight uppercase">
              How We Got Here
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2">
              From contract blending for third parties to building India’s cleanest direct-to-consumer nutrition brand.
            </p>
          </div>

          <div className="relative">
            {/* Center Timeline Line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-[#ebdcd7]" />

            <div className="flex flex-col gap-10 md:gap-14">
              {timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full md:w-1/2">
                      <div className="group relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white border border-[#ebdcd7] shadow-sm hover:shadow-xl hover:border-[#5C3124]/40 hover:-translate-y-1 transition-all duration-300">
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-toma text-lg font-black text-[#5C3124]">
                              {item.year}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8914] bg-[#fdf6f4] px-2.5 py-0.5 rounded-full border border-[#ebdcd7]">
                              {item.tag}
                            </span>
                          </div>
                          <h3 className="font-toma text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#5C3124] transition-colors tracking-tight mb-2">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Timeline Node Center Badge */}
                    <div className="hidden md:flex w-9 h-9 rounded-full bg-[#5C3124] text-white border-4 border-white shadow-md items-center justify-center shrink-0 z-10 text-xs font-bold">
                      {idx + 1}
                    </div>

                    {/* Empty half for spacing */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE 3 MANUFACTURING INTEGRITY PILLARS ── */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#ebdcd7]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C3124]">
              Uncompromising Standards
            </span>
            <h2 className="font-toma text-3xl sm:text-4xl text-[#1c1c28] mt-1 font-extrabold tracking-tight uppercase">
              The 3 Rules We Never Break
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden p-7 rounded-2xl bg-[#faf8f6] border border-[#ebdcd7] shadow-sm hover:shadow-xl hover:border-[#5C3124]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] text-[#ffaa5a] flex items-center justify-center mb-5 shadow-md border border-amber-400/30 group-hover:scale-105 group-hover:border-amber-400/50 group-hover:shadow-lg group-hover:shadow-[#5C3124]/30 transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C3124] bg-white px-2.5 py-1 rounded-md border border-[#ebdcd7] group-hover:border-[#5C3124]/30 transition-colors">
                      {p.tag}
                    </span>
                    <h3 className="font-toma text-xl font-bold text-gray-900 group-hover:text-[#5C3124] transition-colors mt-3 mb-2 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                      {p.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. CERTIFICATIONS ACCREDITATION ── */}
      <section className="py-14 bg-[#faf8f6]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {certifications.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-[#ebdcd7] shadow-sm hover:shadow-lg hover:border-[#5C3124]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#fdf6f4] border border-[#ebdcd7] flex items-center justify-center shrink-0 text-[#5C3124] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:text-[#ffaa5a] group-hover:border-amber-400/30 transition-all duration-300 shadow-xs relative z-10">
                    <Icon size={18} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-toma text-sm font-bold text-gray-900 group-hover:text-[#5C3124] transition-colors tracking-tight">
                      {c.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-light">
                      {c.sub}
                    </p>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. EXPERIENCE THE DIFFERENCE CTA BANNER ── */}
      <section className="py-16 sm:py-20 bg-[#faf8f6]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#1c120e] via-[#261712] to-[#140c09] text-white shadow-2xl relative overflow-hidden border border-[#5C3124]/30 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff8914]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffaa5a]">
                Verified Purity In Every Scoop
              </span>
              <h2 className="font-toma text-2xl sm:text-4xl font-extrabold text-white mt-1 leading-snug">
                Experience the Gomzi Difference for Yourself.
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light leading-relaxed">
                Join 500,000+ elite athletes fueled by pure protein, transparent formulations, and zero compromises.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link
                to="/gomzi-supplement"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6d3a2b] via-[#854432] to-[#5C3124] hover:from-[#5C3124] hover:to-[#48261c] border-2 border-amber-400/50 text-white font-toma font-extrabold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-[#5C3124]/40 hover:shadow-2xl hover:shadow-[#5C3124]/60 cursor-pointer"
              >
                <span className="relative z-10 tracking-wider">Shop Catalog</span>
                <ArrowRight size={16} className="relative z-10 text-amber-200 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </Link>

              <Link
                to="/faq"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-amber-400/40 text-white font-toma font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-black/20 cursor-pointer"
              >
                <span className="relative z-10">View FAQs</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
