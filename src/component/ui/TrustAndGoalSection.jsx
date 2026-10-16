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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fdfbf9] to-[#fbf8f5] border border-[#ebdcd7] p-6 sm:p-10 md:p-12 lg:p-14 shadow-xl shadow-[#5C3124]/5">
          {/* Ambient radial glows */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#5C3124]/8 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"
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

              {/* 3 Verification Proof Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-8 max-w-xl">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-[#ebdcd7] text-xs font-semibold text-gray-800 shadow-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>Protein Content</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-[#ebdcd7] text-xs font-semibold text-gray-800 shadow-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>Heavy Metals Zero</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-[#ebdcd7] text-xs font-semibold text-gray-800 shadow-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                  <span>NABL Accredited</span>
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
                    inline-flex items-center justify-center gap-2
                    px-5 py-3.5
                    bg-white hover:bg-[#fdf6f4]
                    border-2 border-[#ebdcd7] hover:border-[#5C3124]
                    text-[#3d1e15] hover:text-[#5C3124]
                    font-bold text-sm
                    rounded-xl sm:rounded-2xl
                    shadow-xs hover:shadow-md
                    transition-all duration-300
                    hover:-translate-y-0.5 active:scale-[0.98]
                    cursor-pointer whitespace-nowrap
                  "
                >
                  <ExternalLink className="w-4 h-4 text-[#5C3124]" />
                  <span>Preview in Browser</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <p className="text-[11.5px] text-gray-500 mt-3.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Official Certified Report • PDF 117 KB • Free Public Access
              </p>
            </div>

            {/* ================= RIGHT CERTIFICATE STAGING ================= */}
            <div className="relative group">
              {/* Soft ambient aura */}
              <div
                className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#5C3124]/10 to-amber-500/10 blur-xl transition-all duration-500 group-hover:blur-2xl"
                aria-hidden="true"
              />

              {/* Framed Certificate Container */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-3 sm:p-5 border border-[#ebdcd7] shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <img
                  src="/images/report.webp"
                  alt="Assure Analytical Laboratories Official Test Certificate for Gomzi Supplement"
                  loading="lazy"
                  className="w-full h-auto max-h-[420px] object-contain rounded-xl border border-gray-100 group-hover:scale-[1.01] transition-transform duration-500"
                />

                {/* Floating Seal 1: NABL Accreditation */}
                <div className="absolute top-5 right-5 sm:top-7 sm:right-7 bg-white/95 backdrop-blur-md border border-[#ebdcd7] shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-gray-900 tracking-tight">
                    NABL Accredited
                  </span>
                </div>

                {/* Floating Seal 2: Verified Protein Result */}
                <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-[#18110D]/92 backdrop-blur-md border border-amber-400/25 shadow-xl px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
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
