import React from "react";
import {
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Download,
  ExternalLink,
} from "lucide-react";

const TrustAndGoalSection = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/product-report.pdf";
    link.download = "Gomzi_Batch_Lab_Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 w-full overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        {/* ================= LUXURY TRUST CARD ================= */}
        <div className="group/section relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fdfbf9] to-[#fbf8f5] border border-[#ebdcd7]/90 p-6 sm:p-10 md:p-12 lg:p-14 shadow-xl shadow-[#5C3124]/5 hover:shadow-[0_24px_50px_rgba(92,49,36,0.10)] hover:border-amber-400/40 transition-all duration-500">
          {/* Moving card sheen sweep on hover across section background */}
          <div className="absolute inset-0 -translate-x-full group-hover/section:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.025] to-transparent pointer-events-none" />

          {/* Ambient radial glows with interactive expansion */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#5C3124]/8 group-hover/section:bg-[#5C3124]/12 blur-3xl transition-all duration-700 group-hover/section:scale-110"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/5 group-hover/section:bg-amber-500/10 blur-3xl transition-all duration-700 group-hover/section:scale-110"
            aria-hidden="true"
          />

          <div className="relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            {/* ================= LEFT CONTENT ================= */}
            <div>
              {/* Trust Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf6f4] border border-[#ebdcd7] text-[#5C3124] text-xs font-bold tracking-wide uppercase shadow-xs mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5C3124]" />
                <span>100% Batch Transparency</span>
              </div>

              {/* Punchy Headline */}
              <h2 className="font-toma text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] mb-5">
                See the lab report <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#5C3124] via-[#7d4332] to-[#5C3124] bg-clip-text text-transparent">
                  before you buy
                </span>
                ,
                <br />
                not after you complain.
              </h2>

              {/* Body Description */}
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                Every Gomzi supplement batch is independently tested for protein
                content, heavy metals, and microbiological safety by an
                accredited third-party lab. Download our official sample report
                to verify our testing methodology and purity before checking your
                own batch.
              </p>

              {/* 3 Verification Proof Chips with Card Sheen & Lift */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8 max-w-xl">
                <div className="group/chip relative overflow-hidden flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/95 border border-[#ebdcd7]/90 text-xs font-semibold text-gray-800 shadow-2xs hover:shadow-[0_10px_24px_rgba(92,49,36,0.10)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 -translate-x-full group-hover/chip:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.035] to-transparent pointer-events-none" />
                  <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover/chip:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span className="relative z-10">Protein Content</span>
                </div>

                <div className="group/chip relative overflow-hidden flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/95 border border-[#ebdcd7]/90 text-xs font-semibold text-gray-800 shadow-2xs hover:shadow-[0_10px_24px_rgba(92,49,36,0.10)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 -translate-x-full group-hover/chip:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.035] to-transparent pointer-events-none" />
                  <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover/chip:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span className="relative z-10">Heavy Metals Zero</span>
                </div>

                <div className="group/chip relative overflow-hidden flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/95 border border-[#ebdcd7]/90 text-xs font-semibold text-gray-800 shadow-2xs hover:shadow-[0_10px_24px_rgba(92,49,36,0.10)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 -translate-x-full group-hover/chip:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.035] to-transparent pointer-events-none" />
                  <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover/chip:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span className="relative z-10">NABL Accredited</span>
                </div>
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {/* Primary Download Button */}
                <button
                  onClick={handleDownload}
                  className="
                    group relative overflow-hidden
                    inline-flex items-center justify-center gap-2.5
                    px-7 py-3.5
                    bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c]
                    hover:from-[#48261c] hover:to-[#381c14]
                    text-white font-bold text-sm
                    rounded-xl sm:rounded-2xl
                    shadow-md shadow-[#5C3124]/25 hover:shadow-xl hover:shadow-[#5C3124]/40
                    border border-amber-400/20
                    transition-all duration-300
                    hover:-translate-y-0.5 active:scale-[0.98]
                    cursor-pointer whitespace-nowrap
                  "
                >
                  <FileCheck2 className="w-4.5 h-4.5 text-amber-200 transition-transform duration-300 group-hover:scale-110" />
                  <span>Check Batch Report</span>
                  <Download className="w-4 h-4 text-amber-200/80 transition-transform duration-300 group-hover:translate-y-0.5" />

                  {/* Subtle sheen highlight */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </button>

                {/* Secondary Preview Link */}
                <a
                  href="/pdf/product-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group/preview relative overflow-hidden
                    inline-flex items-center justify-center gap-2
                    px-5 py-3.5
                    bg-white hover:bg-[#fdf6f4]
                    border-2 border-[#ebdcd7] hover:border-amber-400/50
                    text-[#3d1e15] hover:text-[#5C3124]
                    font-bold text-sm
                    rounded-xl sm:rounded-2xl
                    shadow-xs hover:shadow-md hover:shadow-[#5C3124]/10
                    transition-all duration-300
                    hover:-translate-y-0.5 active:scale-[0.98]
                    cursor-pointer whitespace-nowrap
                  "
                >
                  <ExternalLink className="w-4 h-4 text-[#5C3124] group-hover/preview:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Preview in Browser</span>
                  <div className="absolute inset-0 -translate-x-full group-hover/preview:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.05] to-transparent pointer-events-none" />
                </a>
              </div>

              {/* Trust Subtext */}
              <p className="text-[11.5px] text-gray-500 mt-3.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Official Certified Report • PDF 117 KB • Free Public Access
              </p>
            </div>

            {/* ================= RIGHT CERTIFICATE STAGING ================= */}
            <div className="relative">
              {/* Soft ambient aura */}
              <div
                className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#5C3124]/10 to-amber-500/10 blur-xl transition-all duration-500"
                aria-hidden="true"
              />

              {/* Framed Certificate Container */}
              <div className="group/cert relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-5 border border-[#ebdcd7]/90 shadow-xl hover:shadow-[0_20px_45px_rgba(92,49,36,0.14)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                {/* Subtle moving sheen sweep on hover across certificate card */}
                <div className="absolute inset-0 -translate-x-full group-hover/cert:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.04] to-transparent pointer-events-none z-10" />

                <img
                  src="/images/report.webp"
                  alt="Assure Analytical Laboratories Official Test Certificate for Gomzi Supplement"
                  loading="lazy"
                  className="w-full h-auto max-h-[420px] object-contain rounded-xl border border-gray-100 group-hover/cert:scale-[1.01] transition-transform duration-500"
                />

                {/* Floating Seal 1: NABL Accreditation */}
                <div className="group/seal1 relative overflow-hidden absolute top-5 right-5 sm:top-7 sm:right-7 bg-white/95 backdrop-blur-md border border-[#ebdcd7] hover:border-amber-400/40 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <div className="absolute inset-0 -translate-x-full group-hover/seal1:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.04] to-transparent pointer-events-none" />
                  <span className="relative z-10 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="relative z-10 text-[11px] font-bold text-gray-900 tracking-tight">
                    NABL Accredited
                  </span>
                </div>

                {/* Floating Seal 2: Verified Protein Result */}
                <div className="group/seal2 relative overflow-hidden absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-[#18110D]/95 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-white">
                  <div className="absolute inset-0 -translate-x-full group-hover/seal2:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <ShieldCheck className="relative z-10 w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div className="relative z-10">
                    <p className="text-[11px] font-bold text-white tracking-tight leading-tight">
                      Batch GN250464
                    </p>
                    <p className="text-[9.5px] font-medium text-amber-200/90 leading-tight">
                      Protein Tested: 68.36%
                    </p>
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

export default TrustAndGoalSection;
