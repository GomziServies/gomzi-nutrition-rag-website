import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

const PageHeading = ({ head, title: propTitle, subtitle, breadcrumb = true }) => {
  const title = head || propTitle || "Gomzi Supplement";

  return (
    <div
      className="group relative w-full overflow-hidden border-b border-[#3a1d15] hover:border-amber-400/35 transition-colors duration-500 select-none"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 15%, #3d1b12 0%, #170d09 45%, #0a0604 100%)",
      }}
    >
      {/* Ambient Atmospheric Lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[220px] rounded-full pointer-events-none blur-[100px] transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-60"
        style={{ background: "rgba(92, 49, 36, 0.45)" }}
      />
      <div
        className="absolute top-1/4 right-10 w-64 h-64 rounded-full pointer-events-none blur-[90px] transition-all duration-700 ease-out group-hover:scale-125 group-hover:opacity-25"
        style={{ background: "rgba(255, 137, 20, 0.12)" }}
      />
      <div
        className="absolute bottom-10 left-10 w-60 h-60 rounded-full pointer-events-none blur-[90px] transition-all duration-700 ease-out group-hover:scale-120 group-hover:opacity-50"
        style={{ background: "rgba(92, 49, 36, 0.3)" }}
      />

      {/* Subtle Geometric Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient RAG Background Typographic Watermark */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-toma font-black uppercase leading-none text-white/[0.025] group-hover:text-white/[0.045] tracking-widest transition-all duration-700 ease-out group-hover:scale-105"
          style={{ fontSize: "clamp(90px, 18vw, 220px)" }}
        >
          RAG
        </span>
      </div>

      {/* Subtle Sheen Highlight Sweep across banner on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[var(--container-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-14 md:py-16 text-center">
        {/* Breadcrumb Navigation */}
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-amber-400/40 text-xs text-white/80 transition-all duration-300 mb-4"
          >
            <Link to="/" className="hover:text-amber-200 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">
              {title}
            </span>
          </nav>
        )}

        {/* Main Title */}
        <h1 className="font-toma text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_4px_24px_rgba(255,170,90,0.22)]">
          {title}
        </h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-medium leading-relaxed transition-colors duration-300 group-hover:text-white/95">
            {subtitle}
          </p>
        )}

        {/* High-Tech Trust Highlight Pill */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-amber-200/90 hover:text-amber-100 tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 cursor-default group/pill">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 transition-transform duration-300 group-hover/pill:rotate-12 group-hover/pill:scale-110" />
          <span>FSSAI Certified · 100% Genuine Formula · NABL Lab Tested</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
