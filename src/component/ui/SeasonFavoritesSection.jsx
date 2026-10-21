import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import {
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
} from "lucide-react";
import { getCategoriesApi } from "../../api/category.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const CATEGORIES_CACHE_KEY = "gomzi_categories_cache";

// Resolves category image URLs from backend (relative paths, CDN, or absolute URLs)
const resolveCategoryImageUrl = (img) => {
  if (!img || typeof img !== "string" || !img.trim()) {
    return "";
  }
  const cleanImg = img.trim();
  if (
    cleanImg.startsWith("http://") ||
    cleanImg.startsWith("https://") ||
    cleanImg.startsWith("/")
  ) {
    return cleanImg;
  }
  return `https://files.fggroup.in/${cleanImg}`;
};

// Curated Fallback Categories matching the exact database items in the reference screenshot
const FALLBACK_CATEGORIES = [
  {
    id: "pre-workout",
    title: "Pre Workout",
    subtitle: "High-potency ergogenic formula delivering intense mental focus, explosive pump, and raw power.",
    badge: "EXPLOSIVE ENERGY",
    image: "/images/product-category/pre-workout.webp",
    url: "/gomzi-supplement?search=pre-workout",
    tagCount: "38 Products",
    rating: "4.9",
  },
  {
    id: "bcaa-amino-acids",
    title: "BCAA & Amino Acids",
    subtitle: "2:1:1 ratio of Leucine, Isoleucine, and Valine with instant electrolyte hydration.",
    badge: "RAPID RECOVERY",
    image: "/images/product-category/bcaa.jpg",
    url: "/gomzi-supplement?search=bcaa",
    tagCount: "5 Products",
    rating: "4.8",
  },
  {
    id: "creatine-monohydrate",
    title: "Creatine Monohydrate",
    subtitle: "Ultra-micronized pure creatine for cellular ATP replenishment, explosive strength, and volume.",
    badge: "RAW STRENGTH",
    image: "/images/product-category/creatine.webp",
    url: "/gomzi-supplement?search=creatine",
    tagCount: "53 Products",
    rating: "4.9",
  },
  {
    id: "wellness-health",
    title: "Wellness & Health",
    subtitle: "Essential multivitamins, omega fatty acids, and immune-supporting botanical extracts.",
    badge: "DAILY HEALTH",
    image: "/images/product-category/APEX-MULTIVITAMIN.jpg",
    url: "/gomzi-supplement?search=wellness",
    tagCount: "3 Products",
    rating: "4.7",
  },
  {
    id: "whey-protein",
    title: "Whey Protein",
    subtitle: "Premium fast-absorbing whey isolate and concentrate for maximum lean muscle synthesis.",
    badge: "LEAN MUSCLE",
    image: "/images/product-category/whey-protein.webp",
    url: "/gomzi-supplement?search=whey",
    tagCount: "42 Products",
    rating: "4.9",
  },
  {
    id: "mass-gainer",
    title: "Mass Gainer",
    subtitle: "Calorie-dense complex carbohydrate & whey matrix for rapid, clean bulking.",
    badge: "MAX BULK",
    image: "/images/product-category/mass-gainer.webp",
    url: "/gomzi-supplement?search=gainer",
    tagCount: "16 Products",
    rating: "4.8",
  },
];

export default function SeasonFavoritesSection() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  // Instant hydration from localStorage: 0ms initial render, zero layout shift
  const [categories, setCategories] = useState(() => {
    const cached = getLocalCache(CATEGORIES_CACHE_KEY);
    return Array.isArray(cached) && cached.length > 0 ? cached : FALLBACK_CATEGORIES;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        if (isMounted && res?.data?.data) {
          const rawCategories = res.data.data.categories || [];

          // Deduplicate by slug or title
          const uniqueCategories = [];
          const seenKeys = new Set();

          for (const cat of rawCategories) {
            if (!cat) continue;
            const uniqueKey = (cat.slug || cat.title || cat.name || "")
              .toLowerCase()
              .trim();

            if (uniqueKey && !seenKeys.has(uniqueKey)) {
              seenKeys.add(uniqueKey);
              uniqueCategories.push({
                id: cat._id || cat.slug || uniqueKey,
                title: cat.title || cat.name || "Category",
                subtitle:
                  cat.subtitle ||
                  cat.description ||
                  "Science-backed sports nutrition formulated for maximum athletic performance.",
                badge:
                  cat.tag ||
                  cat.badge ||
                  (cat.spec ? cat.spec : "PREMIUM"),
                image: resolveCategoryImageUrl(cat.image) || "/images/product-placeholder.webp",
                url:
                  cat.url ||
                  (cat.slug
                    ? `/gomzi-supplement/${cat.slug}`
                    : "/category"),
                tagCount: cat.productCount
                  ? `${cat.productCount} ${
                      cat.productCount === 1 ? "Product" : "Products"
                    }`
                  : "Explore All",
                rating: (4.7 + (uniqueCategories.length % 3) * 0.1).toFixed(1),
              });
            }
          }

          if (uniqueCategories.length > 0) {
            setCategories(uniqueCategories);
            setLocalCache(CATEGORIES_CACHE_KEY, uniqueCategories);
          }
        }
      } catch (err) {
        console.warn(
          "Failed to fetch dynamic categories for SeasonFavoritesSection:",
          err?.message
        );
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <section
      className="w-full py-8 sm:py-12 bg-[#f4f4f4] overflow-hidden font-modelica select-none"
      aria-label="Shop By Category"
    >
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 gap-3 sm:gap-4">
          <div>
            <div className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-2">
              Explore Our Range
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c28] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Target your fitness goals with pure, lab-certified nutrition formulated for clean muscle growth and peak athletic recovery.
            </p>
          </div>

          {/* Right Header Action */}
          <Link
            to="/category"
            className="text-xs sm:text-sm font-bold text-[#5C3124] hover:text-[#3d1e15] flex items-center gap-1 group cursor-pointer self-end shrink-0"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid Container: 2 per row on mobile (2x2 grid), 4 on desktop */}
        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {displayedCategories.slice(0, 4).map((cat, idx) => (
              <div
                key={cat.id || idx}
                onClick={() => navigate(cat.url || "/category")}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-[#5C3124]/40 hover:shadow-xl transition-all duration-200 p-2.5 sm:p-4 flex flex-col justify-between h-full relative cursor-pointer group/card"
              >
                {/* Top Row: Category Highlight Badge & Product Count */}
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  {cat.badge ? (
                    <div className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1 sm:px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 flex-shrink-0" />
                      <span className="uppercase truncate">{cat.badge}</span>
                    </div>
                  ) : (
                    <div />
                  )}

                  {cat.tagCount && (
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-200 px-1.5 sm:px-2 py-0.5 rounded ml-auto">
                      {cat.tagCount}
                    </span>
                  )}
                </div>

                {/* Clean Category Image Container */}
                <div className="h-28 sm:h-44 w-full flex items-center justify-center p-1 sm:p-2 mb-2 sm:mb-3 bg-white">
                  <img
                    src={cat.image || "/images/product-placeholder.webp"}
                    alt={cat.title}
                    className="max-h-full max-w-full object-contain block group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                  />
                </div>

                {/* Rating / Quality Pill (Gomzi Signature Theme #5C3124 + Gold Star) */}
                <div className="flex items-center gap-1 bg-[#5C3124] text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded w-fit mb-1.5 shadow-2xs">
                  <span>{cat.rating || "4.9"}</span>
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[8px] sm:text-[9px] font-medium text-amber-200 hidden xs:inline">
                    Lab Certified
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-[11px] sm:text-[13px] font-bold text-[#1c1c28] group-hover/card:text-[#5C3124] transition-colors line-clamp-1 leading-snug mb-1">
                  {cat.title}
                </h3>

                {/* Category Subtitle / Short Description */}
                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 leading-tight mb-2 min-h-[26px] sm:min-h-[32px]">
                  {cat.subtitle}
                </p>

                {/* Value / Authenticity Box (Gomzi Brown Palette) */}
                <div className="bg-[#fdf6f4] border border-[#ebdcd7] rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1.5 mb-2.5 sm:mb-3.5 mt-auto">
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#5C3124] text-amber-200 flex items-center justify-center text-[8px] sm:text-[9px] font-bold flex-shrink-0">
                    ★
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#5C3124] truncate">
                    100% Authentic • Zero Adulteration
                  </span>
                </div>

                {/* Double Action CTA Buttons (Gomzi Signature Brown Theme) */}
                <div className="space-y-1.5 sm:space-y-2 mt-auto">
                  {/* Outline Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(cat.url || "/category");
                    }}
                    className="w-full py-1.5 sm:py-2 px-1 border-2 border-[#5C3124] bg-white hover:bg-[#fdf6f4] text-[#5C3124] text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <span>View Products</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  {/* Solid Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(cat.url || "/category");
                    }}
                    className="w-full py-2 sm:py-2.5 px-1 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border border-amber-400/25 shadow-sm shadow-[#5C3124]/20 hover:shadow-md hover:shadow-[#5C3124]/35 active:scale-[0.98]"
                  >
                    Explore Range
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
