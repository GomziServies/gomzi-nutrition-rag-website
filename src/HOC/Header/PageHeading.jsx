import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";

const PageHeading = ({ head, subtitle, breadcrumb = true }) => {
  const title = head || "Gomzi Supplement";

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#1f110b] via-[#3d1f16] to-[#5C3124] border-b border-[#8B5A2B]/25">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Left decorative asset */}
      <img
        src="/images/pageheadingleft.png"
        alt=""
        className="pointer-events-none opacity-20 absolute left-0 top-0 h-full w-auto object-contain z-0 hidden md:block select-none"
      />

      {/* Right decorative asset */}
      <img
        src="/images/pageheadingright.png"
        alt=""
        className="pointer-events-none opacity-20 absolute right-0 top-0 h-full w-auto object-contain z-0 select-none"
      />

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
