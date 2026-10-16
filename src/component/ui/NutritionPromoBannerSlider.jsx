import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getNutritionPromoBannersApi } from "../../api/nutrition-promo-banner.api";

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

const DEFAULT_NUTRITION_SLIDES = [
  {
    _id: "workout-nutrition",
    brand: "GOMZI NUTRITION",
    title: "Your Workout Deserves Better Nutrition!",
    badge: "UPTO",
    discount: "50% OFF",
    terms: "*On selected products",
    image: "",
    bgGradient: "linear-gradient(135deg, #10b981 0%, #34d399 45%, #6ee7b7 85%, #a7f3d0 100%)",
    url: "/gomzi-supplement",
  },
  {
    _id: "muscle-recovery",
    brand: "ADVANCED FORMULAS",
    title: "Fuel Muscle Recovery & Peak Strength!",
    badge: "FLAT",
    discount: "40% OFF",
    terms: "*Includes Free Shaker Bottle",
    image: "",
    bgGradient: "linear-gradient(135deg, #059669 0%, #10b981 45%, #34d399 85%, #6ee7b7 100%)",
    url: "/gomzi-supplement",
  },
  {
    _id: "clean-gains",
    brand: "CERTIFIED PURITY",
    title: "Lab-Tested 100% Ultra-Filtered Protein",
    badge: "SAVE",
    discount: "₹1,200",
    terms: "*Instant Checkout Discount",
    image: "",
    bgGradient: "linear-gradient(135deg, #047857 0%, #059669 45%, #10b981 85%, #34d399 100%)",
    url: "/gomzi-supplement",
  },
];

export default function NutritionPromoBannerSlider() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [banners, setBanners] = useState(DEFAULT_NUTRITION_SLIDES);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      try {
        const res = await getNutritionPromoBannersApi();
        if (isMounted && res?.data?.data?.banners?.length > 0) {
          setBanners(res.data.data.banners);
        }
      } catch (err) {
        console.warn("Could not fetch nutrition promo banners, displaying default slides:", err?.message);
      }
    };

    fetchBanners();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleBannerClick = (rawUrl) => {
    const url = (rawUrl || "/gomzi-supplement").trim();
    if (!url) return;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (url.startsWith("www.")) {
      window.open(`https://${url}`, "_blank", "noopener,noreferrer");
    } else {
      navigate(url.startsWith("/") ? url : `/${url}`);
    }
  };


  return (
    <section className="w-full py-6 sm:py-8 bg-[#faf8f6] overflow-hidden" aria-label="Nutrition Promo Discount Carousel">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            loop={banners.length > 1}
            className="w-full"
          >
            {banners.map((slide, idx) => {
              const slideId = slide._id || slide.id || `slide-${idx}`;
              const gradient =
                slide.bgGradient ||
                "linear-gradient(135deg, #10b981 0%, #34d399 45%, #6ee7b7 85%, #a7f3d0 100%)";
              const hasCustomImage = Boolean(slide.image && slide.image.trim());

              return (
                <SwiperSlide key={slideId}>
                  {hasCustomImage ? (
                    /* ── FULL UPLOADED BANNER FROM ADMIN PORTAL ── */
                    <div
                      onClick={() => handleBannerClick(slide.url)}
                      className="relative w-full cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-200/60 bg-emerald-50 flex items-center justify-center select-none shadow-xs hover:shadow-md transition-shadow"
                    >
                      <img
                        src={resolveImageUrl(slide.image)}
                        alt={slide.title || "Nutrition Offer Banner"}
                        className="w-full h-auto max-h-[220px] sm:max-h-[260px] md:max-h-[300px] object-cover sm:object-fill rounded-2xl sm:rounded-3xl"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    /* ── FALLBACK GRADIENT STYLED CARD (When no image is uploaded) ── */
                    <div
                      onClick={() => handleBannerClick(slide.url)}
                      className="relative w-full min-h-[200px] sm:min-h-[220px] md:min-h-[240px] cursor-pointer flex items-center justify-between px-6 sm:px-12 md:px-16 py-6 sm:py-8 overflow-hidden select-none"
                      style={{ background: gradient }}
                    >
                      {/* Subtle Concentric Rings & Radial Flow in Background */}
                      <div className="absolute inset-0 pointer-events-none opacity-25">
                        <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full border-2 border-white/60" />
                        <div className="absolute -left-8 -top-8 w-72 h-72 rounded-full border border-white/50" />
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full border border-white/40" />

                        {/* Subtle curved directional arrows */}
                        <svg
                          className="absolute left-16 bottom-2 w-36 h-36 text-white/40 transform -rotate-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          />
                        </svg>
                        <svg
                          className="absolute right-20 top-2 w-36 h-36 text-white/40 transform rotate-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>

                      {/* ── LEFT: Title & Brand Info ── */}
                      <div className="relative z-10 flex flex-col items-start max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                        {/* Brand Logo & Name */}
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <div className="w-5 h-5 rounded-md bg-gray-900 text-white flex items-center justify-center font-black text-[9px] shadow-xs">
                            G
                          </div>
                          <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-gray-900">
                            {slide.brand || "GOMZI NUTRITION"}
                          </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                          {slide.title}
                        </h2>
                      </div>

                      {/* ── RIGHT: White Box with UPTO / Discount ── */}
                      <div className="relative z-10 flex flex-col items-center flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-lg border border-red-500/20 px-5 sm:px-8 py-3.5 sm:py-4 flex flex-col items-center justify-center relative min-w-[130px] sm:min-w-[160px] text-center transform hover:scale-[1.02] transition-transform">
                          {/* Top Red Badge */}
                          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[10px] sm:text-xs px-3 py-0.5 rounded-md uppercase tracking-wider -mt-6 sm:-mt-7 mb-1 shadow-xs">
                            {slide.badge || "UPTO"}
                          </div>

                          {/* Main Discount */}
                          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none mt-1">
                            {slide.discount}
                          </span>
                        </div>

                        {/* Disclaimer Subtext */}
                        <span className="text-[9px] sm:text-[10px] text-gray-900/80 font-bold mt-1.5 tracking-wide">
                          {slide.terms || "*On selected products"}
                        </span>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Controls: Circular dark buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-md backdrop-blur-xs"
            aria-label="Previous Slide"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-md backdrop-blur-xs"
            aria-label="Next Slide"
          >
            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
            {banners.map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-6 h-1.5 bg-gray-900 shadow-xs"
                    : "w-1.5 h-1.5 bg-gray-600/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
