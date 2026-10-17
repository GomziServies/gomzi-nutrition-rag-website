import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

const PageHeading = ({ head, subtitle, breadcrumb = true }) => {
  const title = head || "Gomzi Supplement";

  return (
    <div
      className="relative w-full overflow-hidden border-b border-[#3a1d15]"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 15%, #3d1b12 0%, #170d09 45%, #0a0604 100%)",
      }}
    >
      {/* Ambient Atmospheric Lighting */}
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

      {/* Subtle Geometric Grid Texture */}
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

      {/* Content Container */}
      <div className="relative z-10 max-w-[var(--container-width)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-14 md:py-16 text-center">
        {/* Breadcrumb Navigation */}
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/80 mb-4"
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
        <h1 className="font-toma text-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
          {title}
        </h1>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Trust Highlight Pill */}
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-amber-200/90 tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>FSSAI Certified · 100% Genuine Formula · NABL Lab Tested</span>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
