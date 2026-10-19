import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getCategoriesApi } from "../../api/category.api";

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

export default function SeasonFavoritesSection() {
  const swiperRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategoriesApi();
        if (isMounted && res?.data?.data) {
          const rawCategories = res.data.data.categories || [];

          // Deduplicate by slug or title (backend can contain duplicate historical seeds)
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
                image: resolveCategoryImageUrl(cat.image),
                url:
                  cat.url ||
                  (cat.slug
                    ? `/gomzi-supplement/${cat.slug}`
                    : "/category"),
                tagCount: cat.productCount
                  ? `${cat.productCount} ${
                      cat.productCount === 1 ? "Product" : "Products"
                    }`
                  : "",
              });
            }
          }

          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.warn(
          "Failed to fetch dynamic categories for SeasonFavoritesSection:",
          err?.message
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="w-full py-12 sm:py-16 bg-white overflow-hidden"
      aria-label="Shop By Category"
    >
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-3 py-1 rounded-full mb-2">
              Explore Our Range
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c28] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Target your fitness goals with pure, lab-certified nutrition
              formulated for clean muscle growth and peak athletic recovery.
            </p>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <Link
              to="/category"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5C3124] hover:text-[#3d1e15] transition-colors group mr-2"
            >
              <span>View All Categories</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Slider Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gradient-to-r hover:from-[#5C3124] hover:to-[#48261c] hover:text-white hover:border-amber-400/30 text-[#5C3124] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                aria-label="Previous Category"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gradient-to-r hover:from-[#5C3124] hover:to-[#48261c] hover:text-white hover:border-amber-400/30 text-[#5C3124] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                aria-label="Next Category"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && categories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl border border-[#ebdcd7]/80 bg-[#fcfbf9] overflow-hidden p-0 flex flex-col justify-between animate-pulse"
              >
                <div className="w-full aspect-[4/3.2] bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-1/4" />
                  </div>
                  <div className="h-3 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                  <div className="pt-3 border-t border-[#ebdcd7]/60 flex justify-between items-center">
                    <div className="h-3 bg-slate-200 rounded w-20" />
                    <div className="w-7 h-7 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? null : (
          /* Category Swiper Slider */
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.25}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={categories.length > 4}
              speed={600}
              breakpoints={{
                540: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                },
                768: {
                  slidesPerView: 2.75,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3.25,
                  spaceBetween: 22,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="pb-2"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id} className="h-auto">
                  <Link
                    to={cat.url}
                    className="group relative flex flex-col h-full bg-[#fcfbf9] hover:bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ebdcd7]/90 hover:border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                  >
                    {/* Subtle moving card sheen sweep on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.04] to-transparent pointer-events-none z-20" />

                    {/* Dynamic Category Image Area (from backend) */}
                    {cat.image ? (
                      <div className="relative w-full aspect-[4/3.2] overflow-hidden bg-gradient-to-b from-[#f5f1ed] to-[#ede6df]">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "/images/product-placeholder.webp";
                          }}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        />

                        {/* Badge Pill */}
                        {cat.badge && (
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#5C3124] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-[#ebdcd7] group-hover:border-amber-400/40 group-hover:scale-105 transition-all duration-300">
                            {cat.badge}
                          </div>
                        )}

                        {/* Subtle Overlay Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      /* Fallback luxury header bar if category has no image in backend */
                      <div className="relative w-full p-4 pb-0 flex items-center justify-between">
                        {cat.badge && (
                          <div className="inline-block bg-[#fdf6f4] text-[#5C3124] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#ebdcd7]">
                            {cat.badge}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Category Content Area */}
                    <div className="flex flex-col flex-1 p-5 relative z-10">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-extrabold text-[#1c1c28] group-hover:text-[#5C3124] transition-colors leading-snug">
                          {cat.title}
                        </h3>
                        {cat.tagCount && (
                          <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
                            {cat.tagCount}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed mt-1.5 line-clamp-2 font-normal">
                        {cat.subtitle}
                      </p>

                      <div className="flex-1 min-h-[14px]" />

                      {/* Interactive Action Bar */}
                      <div className="mt-3.5 pt-3 border-t border-[#ebdcd7]/60 flex items-center justify-between text-xs font-bold text-[#5C3124] group-hover:text-[#3d1e15]">
                        <span>Explore Range</span>
                        <div className="w-7 h-7 rounded-full bg-[#fdf6f4] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:text-white group-hover:border group-hover:border-amber-400/40 group-hover:shadow-md group-hover:scale-110 flex items-center justify-center transition-all duration-300">
                          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

