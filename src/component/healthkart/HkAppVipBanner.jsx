// src/component/healthkart/HkAppVipBanner.jsx
import React from "react";
import { FileCheck, ShieldCheck, QrCode, ArrowRight, Download } from "lucide-react";

export default function HkAppVipBanner() {
  const handleDownloadReport = () => {
    const link = document.createElement("a");
    link.href = "/pdf/product-report.pdf";
    link.download = "Gomzi_Batch_Lab_Report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full bg-[#f4f4f4] py-8 sm:py-12 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* HealthKart downloadApp container equivalent */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#2a1711] via-[#43231a] to-[#1c110d] text-white shadow-xl border border-border/20 flex flex-col lg:flex-row items-center">
          {/* Left: Product & Batch Mockup Visual (35%) */}
          <div className="w-full lg:w-5/12 p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden bg-black/20">
            <div className="relative z-10 w-full max-w-xs text-center">
              <img
                src="/images/product-category/whey-protein.webp"
                alt="Gomzi Verified Whey Protein"
                className="w-48 sm:w-56 mx-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                <ShieldCheck size={14} className="text-emerald-400" />
                100% Tamper-Proof Hologram Seal
              </div>
            </div>
          </div>

          {/* Right: Content & Action (65%) */}
          <div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
              <FileCheck size={16} />
              <span>Unmatched Transparency</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-toma leading-tight">
              See Your Exact Lab Report Before You Buy.
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl">
              Don't trust marketing claims or influencer endorsements. Every batch of Gomzi
              supplements is tested by accredited NABL laboratories for accurate protein content,
              amino acid profile, and heavy metal safety.
            </p>

            {/* Quick Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-3">
                <QrCode size={24} className="text-amber-300 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold">Scan On-Pack QR Code</h4>
                  <p className="text-[11px] text-stone-300">Instant batch report on your phone</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center gap-3">
                <FileCheck size={24} className="text-amber-300 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold">NABL Certified Purity</h4>
                  <p className="text-[11px] text-stone-300">Zero spiked nitrogen, 100% clean</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleDownloadReport}
                className="px-6 py-3 bg-[#af5438] hover:bg-primary text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-amber-300/30"
              >
                <Download size={16} />
                <span>Download Sample Batch Report (PDF)</span>
              </button>

              <a
                href="/pdf/gomzi-brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl backdrop-blur-sm transition-colors border border-white/20 flex items-center gap-2"
              >
                <span>Product Catalog</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
