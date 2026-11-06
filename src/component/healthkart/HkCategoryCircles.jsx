// src/component/healthkart/HkCategoryCircles.jsx
import React, { useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowRight, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import useCategories from "../../hooks/useCategories";
import ScallopedCrestFrame from "../common/ScallopedCrestFrame";

export { ScallopedCrestFrame };

// Curated badge mapping so tags are punchy, vibrant, and never overflow
const TAG_BADGES = {
  "MOST POPULAR": { label: "POPULAR", icon: "🔥", color: "text-amber-800 bg-amber-50 border-amber-200" },
  "BULK SEASON": { label: "MASS GAIN", icon: "💪", color: "text-emerald-800 bg-emerald-50 border-emerald-200" },
  "EXPLOSIVE ENERGY": { label: "ENERGY", icon: "⚡", color: "text-rose-800 bg-rose-50 border-rose-200" },
  "RAPID RECOVERY": { label: "RECOVERY", icon: "🔄", color: "text-blue-800 bg-blue-50 border-blue-200" },
  "RAW STRENGTH": { label: "STRENGTH", icon: "🏋️", color: "text-stone-800 bg-stone-100 border-stone-200" },
  "DAILY HEALTH": { label: "WELLNESS", icon: "🌿", color: "text-teal-800 bg-teal-50 border-teal-200" },
  "100% VEGAN": { label: "VEGAN", icon: "🌱", color: "text-emerald-800 bg-emerald-50 border-emerald-200" },
  "POWER STACKS & VALUE BUNDLES": { label: "BUNDLES", icon: "📦", color: "text-amber-800 bg-amber-50 border-amber-200" },
};

function getBadge(tag) {
  if (!tag) return null;
  const upper = tag.trim().toUpperCase();
  if (TAG_BADGES[upper]) return TAG_BADGES[upper];
  if (upper.includes("BUNDLE") || upper.includes("STACK")) {
    return { label: "BUNDLES", icon: "📦", color: "text-amber-800 bg-amber-50 border-amber-200" };
  }
  if (upper.includes("VEGAN") || upper.includes("PLANT")) {
    return { label: "VEGAN", icon: "🌱", color: "text-emerald-800 bg-emerald-50 border-emerald-200" };
  }
  if (upper.includes("HEALTH") || upper.includes("WELLNESS")) {
    return { label: "WELLNESS", icon: "🌿", color: "text-teal-800 bg-teal-50 border-teal-200" };
  }
  const shortLabel = upper.length > 10 ? upper.slice(0, 10).trim() : upper;
  return { label: shortLabel, icon: "✦", color: "text-primary bg-primary/10 border-primary/20" };
}

export function PopularCategories({ categories, loading = false, error = "", onRetry }) {
  const swiperRef = useRef(null);

  // Deduplicate categories by slug or title to guarantee zero repeats
  const displayCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    const seen = new Set();
    return categories.filter((c) => {
      const key = (c.slug || c.title || c.id || "").toLowerCase().trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [categories]);

  if (!loading && !error && !displayCategories.length) return null;
  const visibleSlides = (maximum) => Math.max(1, Math.min(displayCategories.length, maximum));

  return (
    <section className="w-full py-6 sm:py-9 md:py-12 border-b border-stone-200/70 bg-gradient-to-b from-[#FAF7F3] via-[#FFFFFF] to-[#FAF6F2] font-sans relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-5 md:px-6 relative z-10">
        
        {/* ── Modern Responsive Header ── */}
        <div className="flex flex-row items-end justify-between gap-3 mb-5 sm:mb-7 md:mb-9">
          <div className="max-w-[70%] sm:max-w-xl">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-wider mb-1 sm:mb-2 shadow-2xs">
              <Zap size={11} className="text-primary fill-primary/30 sm:w-3 sm:h-3" />
              <span>Explore By Fitness Goal</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight font-tomato leading-tight">
              <span className="text-[#1c1917]">Popular </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#b35337] to-[#e06d48]">
                Categories
              </span>
            </h2>

          </div>

          {/* Action Row: View All + Desktop Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/category"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs md:text-sm font-bold text-primary hover:text-[#7a3420] transition-colors underline-offset-4 hover:underline font-tomato whitespace-nowrap"
            >
              <span>View All Categories</span>
              <ArrowRight size={13} className="sm:w-3.5 sm:h-3.5" />
            </Link>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-stone-200 bg-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 hover:bg-primary hover:text-white hover:border-primary"
                aria-label="Previous categories"
              >
                <ChevronLeft size={16} className="md:w-4.5 md:h-4.5" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-stone-200 bg-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 hover:bg-primary hover:text-white hover:border-primary"
                aria-label="Next categories"
              >
                <ChevronRight size={16} className="md:w-4.5 md:h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Category Carousel ── */}
        {loading ? (
          <div
            role="status"
            aria-label="Loading popular categories"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="h-[265px] sm:h-[295px] md:h-[315px] lg:h-[320px] rounded-[20px] sm:rounded-[24px] bg-stone-100/50 p-3 sm:p-4 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 text-center max-w-md mx-auto shadow-xs">
            <p className="text-xs sm:text-sm text-stone-600 font-medium">We couldn't load the categories right now.</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-2 text-xs sm:text-sm font-bold text-primary underline underline-offset-4 cursor-pointer"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={displayCategories.length > 5}
              speed={700}
              spaceBetween={10}
              slidesPerView={visibleSlides(2.15)}
              grabCursor={true}
              breakpoints={{
                360: { slidesPerView: visibleSlides(2.2), spaceBetween: 10 },
                480: { slidesPerView: visibleSlides(2.6), spaceBetween: 12 },
                640: { slidesPerView: visibleSlides(3.4), spaceBetween: 14 },
                768: { slidesPerView: visibleSlides(4.2), spaceBetween: 16 },
                1024: { slidesPerView: visibleSlides(5), spaceBetween: 16 },
                1280: { slidesPerView: visibleSlides(5.8), spaceBetween: 18 },
              }}
              className="py-2.5 sm:py-3"
            >
              {displayCategories.map((cat) => {
                const badge = getBadge(cat.tag);
                // Subtitle fallback guarantees consistent 2-tier baseline alignment
                const subtitle = cat.spec || (cat.productCount ? `${cat.productCount} Products Available` : "Featured Range");

                return (
                  <SwiperSlide key={cat.id} className="!h-auto flex">
                    <CategoryLink
                      href={cat.url}
                      className="group relative flex flex-col justify-between w-full h-[265px] sm:h-[295px] md:h-[315px] lg:h-[320px] min-h-[265px] sm:min-h-[295px] md:min-h-[315px] lg:min-h-[320px] max-h-[265px] sm:max-h-[295px] md:max-h-[315px] lg:max-h-[320px] rounded-[18px] sm:rounded-[22px] md:rounded-[24px] p-2.5 sm:p-3.5 md:p-4 bg-white hover:bg-gradient-to-b hover:from-white hover:via-[#FFFDFB] hover:to-[#FAF4EE] border border-stone-200/90 hover:border-primary/50 shadow-[0_3px_14px_rgba(42,23,17,0.04)] hover:shadow-[0_14px_28px_rgba(149,68,44,0.14)] transition-all duration-300 cursor-pointer overflow-hidden box-border select-none"
                    >
                      {/* Ambient Accent Glow on Hover */}
                      <div
                        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"
                        style={{ backgroundColor: cat.accent || "#95442c" }}
                      />

                      {/* ── Fixed Header Slot (Badge + Count) ── */}
                      <div className="h-[22px] sm:h-[24px] md:h-[26px] flex items-center justify-between gap-1.5 w-full shrink-0">
                        {badge ? (
                          <span className={`inline-flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[9px] md:text-[9.5px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full border shadow-2xs shrink-0 max-w-[62%] truncate ${badge.color}`}>
                            <span>{badge.icon}</span>
                            <span className="truncate">{badge.label}</span>
                          </span>
                        ) : (
                          <span className="inline-block text-[8px] sm:text-[9px] md:text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                            GOMZI
                          </span>
                        )}

                        {cat.productCount !== null && (
                          <span className="inline-block text-[8.5px] sm:text-[9.5px] md:text-[10px] font-bold text-stone-500 bg-stone-100 group-hover:bg-primary/10 group-hover:text-primary px-1.5 sm:px-2 py-0.5 rounded-full transition-colors font-modelica shrink-0 whitespace-nowrap ml-auto">
                            {cat.productCount} {cat.productCount === 1 ? "item" : "items"}
                          </span>
                        )}
                      </div>

                      {/* ── Fixed Circular Cameo Stage Slot (100% Clipped & Normalized) ── */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-[136px] lg:h-[136px] mx-auto flex items-center justify-center my-auto shrink-0">
                        {/* Ambient Radial Spotlight */}
                        <div
                          className="absolute -inset-1 rounded-full opacity-40 group-hover:opacity-90 blur-md transition-all duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle, ${cat.accent ? cat.accent + "33" : "rgba(149,68,44,0.18)"} 0%, rgba(255,255,255,0) 70%)`,
                          }}
                        />

                        {/* Circular Masked Stage: Clips ANY square or lifestyle background cleanly */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-stone-200/80 group-hover:border-primary/40 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(42,23,17,0.06)] bg-gradient-to-b from-[#FBF8F5] via-[#F6EFE9] to-[#EFE4DA] group-hover:from-[#FFF6F0] group-hover:via-[#FDEEE4] group-hover:to-[#F9DEC8] flex items-center justify-center p-2">
                          <img
                            src={cat.image}
                            alt={cat.title}
                            loading="lazy"
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out pointer-events-none drop-shadow-[0_6px_12px_rgba(42,23,17,0.18)]"
                            onError={(e) => {
                              if (!e.currentTarget.dataset.fallback) {
                                e.currentTarget.dataset.fallback = "true";
                                e.currentTarget.src = "/images/product-placeholder.webp";
                              }
                            }}
                          />
                        </div>

                        {/* Ground Contact Shadow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 sm:w-14 md:w-16 h-1 sm:h-1.5 rounded-full bg-stone-900/15 blur-[2px] group-hover:w-18 transition-all duration-300" />
                      </div>

                      {/* ── Fixed 2-Tier Title & Subtitle Slot (Consistent Baseline) ── */}
                      <div className="h-[30px] sm:h-[34px] md:h-[38px] flex flex-col items-center justify-center w-full px-1 text-center shrink-0">
                        <h3 className="text-[11px] sm:text-xs md:text-sm font-black text-[#1c1917] group-hover:text-primary transition-colors truncate w-full font-tomato tracking-tight leading-tight">
                          {cat.title}
                        </h3>
                        <span className="text-[8.5px] sm:text-[9.5px] md:text-[10px] text-stone-500 font-medium truncate w-full font-modelica">
                          {subtitle}
                        </span>
                      </div>

                      {/* ── Fixed Action Button Slot ── */}
                      <div className="h-[28px] sm:h-[32px] md:h-[34px] w-full shrink-0 mt-0.5 sm:mt-1">
                        <div className="w-full h-full rounded-full bg-[#FAF5F0] group-hover:bg-primary text-stone-700 group-hover:text-white text-[10px] sm:text-[11px] md:text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-1.5 shadow-2xs group-hover:shadow-md group-hover:shadow-primary/25 font-modelica">
                          <span>Explore Range</span>
                          <ArrowRight size={11} className="sm:w-3 sm:h-3 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </CategoryLink>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

      </div>
    </section>
  );
}

function CategoryLink({ href, children, ...props }) {
  return href && href.startsWith("/") ? (
    <Link to={href} {...props}>
      {children}
    </Link>
  ) : (
    <a href={href || "#"} {...props}>
      {children}
    </a>
  );
}

export default function HkCategoryCircles() {
  const { categories, loading, error, retry } = useCategories();
  return <PopularCategories categories={categories} loading={loading} error={error} onRetry={retry} />;
}