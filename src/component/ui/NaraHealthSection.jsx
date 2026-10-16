import React from "react";
import {
  Award,
  GraduationCap,
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const pillars = [
  {
    icon: Award,
    title: "15+ Years Industry Experience",
    desc: "Decades of proven sports nutrition legacy",
  },
  {
    icon: GraduationCap,
    title: "Lecturers & Health Educators",
    desc: "Formulated by academic domain experts",
  },
  {
    icon: FlaskConical,
    title: "Science-Backed Formulations",
    desc: "Clinically validated, therapeutic dosages",
  },
  {
    icon: ShieldCheck,
    title: "100% Transparent Ingredients",
    desc: "Zero proprietary blends, full label honesty",
  },
  {
    icon: CheckCircle2,
    title: "Zero Amino Spiking",
    desc: "No hidden fillers, pure intact protein",
  },
  {
    icon: Users,
    title: "Trusted by Coaches & Dietitians",
    desc: "Prescribed across 500+ gyms & clinics",
  },
];

const NaraHealthSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8f6] via-white to-[#faf8f6] py-14 sm:py-16 lg:py-24 border-b border-[#ebdcd7]/60">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#5C3124]/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-width)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="self-center">
            {/* Trust Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf6f4] border border-[#ebdcd7] text-[#5C3124] text-xs font-bold tracking-wide uppercase shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#5C3124]" />
              <span>The Gomzi Standard</span>
            </div>

            {/* Section Headline */}
            <h2 className="font-toma text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] mb-4">
              Why Gomzi <span className="bg-gradient-to-r from-[#5C3124] via-[#7a3f2f] to-[#5C3124] bg-clip-text text-transparent">Supplement</span>?
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Gomzi Supplement is built on the legacy of RAG and years of
              real-world expertise in health and fitness education.
            </p>

            {/* 6 Value Pillars - Luxury 2-Column Responsive Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8">
              {pillars.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#ebdcd7]/80 hover:border-[#5C3124]/40 hover:shadow-md hover:shadow-[#5C3124]/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#fdf6f4] border border-[#ebdcd7] text-[#5C3124] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:border-amber-400/30 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs">
                      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#5C3124] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-normal mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-1">
              {/* Button 1 - Open Education Site */}
              <a
                href="https://fggroup.in/fgiit/fitness-courses"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative overflow-hidden
                  inline-flex items-center justify-center gap-2.5
                  px-6 py-3.5
                  bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c]
                  hover:from-[#48261c] hover:to-[#381c14]
                  text-white font-bold text-sm
                  rounded-xl
                  shadow-md shadow-[#5C3124]/20 hover:shadow-xl hover:shadow-[#5C3124]/35
                  border border-amber-400/20
                  transition-all duration-300
                  hover:-translate-y-0.5 active:scale-[0.98]
                  whitespace-nowrap cursor-pointer
                "
              >
                <span>Open Education Site</span>
                <ArrowUpRight className="w-4 h-4 text-amber-200 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              </a>

              {/* Button 2 - Open Founder Profile */}
              <a
                href="https://www.instagram.com/chirag_pandey16/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex items-center justify-center gap-2.5
                  px-6 py-3.5
                  bg-white hover:bg-[#fdf6f4]
                  border-2 border-[#ebdcd7] hover:border-[#5C3124]
                  text-[#3d1e15] hover:text-[#5C3124]
                  font-bold text-sm
                  rounded-xl
                  shadow-xs hover:shadow-md
                  transition-all duration-300
                  hover:-translate-y-0.5 active:scale-[0.98]
                  whitespace-nowrap cursor-pointer
                "
              >
                <FaInstagram className="w-4 h-4 text-rose-600 transition-transform duration-300 group-hover:scale-110" />
                <span>Open Founder Profile</span>
              </a>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT HERO STAGING ================= */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              {/* Backing Ambient Depth */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-[36px] bg-gradient-to-tr from-[#5C3124]/15 via-amber-500/10 to-transparent blur-2xl -z-10"
                aria-hidden="true"
              />

              {/* Outer Presentation Frame */}
              <div className="relative overflow-hidden rounded-[32px] bg-white p-2.5 shadow-2xl border border-[#ebdcd7]/80">
                <img
                  src="/images/Gomzi_Protein_Product_HD.webp"
                  alt="Gomzi Whey Protein Scoop & Shaker"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover rounded-[24px]"
                />

                {/* Floating Seal 1: Genuine Purity */}
                <div className="absolute top-6 left-6 bg-white/92 backdrop-blur-md border border-white/80 shadow-lg shadow-black/5 px-3.5 py-2 rounded-2xl flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[11.5px] font-bold text-gray-900 leading-tight">100% Genuine</p>
                    <p className="text-[9.5px] font-semibold text-emerald-700 leading-tight">Zero Amino Spiking</p>
                  </div>
                </div>

                {/* Floating Seal 2: FGIIT Academic Legacy */}
                <div className="absolute bottom-6 right-6 bg-[#18110D]/92 backdrop-blur-md border border-amber-400/30 shadow-xl px-4 py-2.5 rounded-2xl flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-xs">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[11.5px] font-bold text-white tracking-tight leading-tight">FGIIT Academic Heritage</p>
                    <p className="text-[9.5px] font-medium text-amber-200/80 leading-tight">50,000+ Students Guided</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NaraHealthSection;
