import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getPromoBannersApi } from "../../api/promo-banner.api";

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

const DEFAULT_PROMO_SLIDES = [
  {
    _id: "slide-1",
    brand: "GOMZI GEAR",
    title: "Steel Shaker Range",
    subtitle: "Anti-Leak • BPA Free • Pro Blender Ball",
    priceText: "Starts @",
    priceValue: "₹469",
    image: "",
    bgGradient: "linear-gradient(135deg, #e4e7ec 0%, #f4f5f8 50%, #e2e5ea 100%)",
    url: "/gomzi-supplement",
    order: 1,
  },
  {
    _id: "slide-2",
    brand: "WORKOUT PRO",
    title: "Lifting Gear & Straps",
    subtitle: "Heavy-Duty Power Support • Max Grip",
    priceText: "Starts @",
    priceValue: "₹299",
    image: "",
    bgGradient: "linear-gradient(135deg, #f5efe6 0%, #fbf8f3 50%, #eee5d8 100%)",
    url: "/gomzi-supplement",
    order: 2,
  },
  {
    _id: "slide-3",
    brand: "FIT FOODS",
    title: "Natural Peanut Butter",
    subtitle: "Zero Added Sugar • 30g Clean Protein",
    priceText: "Starts @",
    priceValue: "₹349",
    image: "",
    bgGradient: "linear-gradient(135deg, #fef5e7 0%, #fffbf2 50%, #faecd5 100%)",
    url: "/gomzi-supplement",
    order: 3,
  },
];

export default function PromoBannerSlider() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [banners, setBanners] = useState(DEFAULT_PROMO_SLIDES);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      try {
        const res = await getPromoBannersApi();
        if (isMounted && res?.data?.data?.banners?.length > 0) {
          setBanners(res.data.data.banners);
        }
      } catch (err) {
        console.warn("Could not fetch promo banners, displaying defaults:", err?.message);
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
    <section className="w-full py-6 sm:py-8 bg-[#faf8f6] overflow-hidden" aria-label="Promotional Carousel">
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
              const slideId = slide._id || slide.id || `promo-${idx}`;
              const bg = slide.bgGradient || "linear-gradient(135deg, #e4e7ec 0%, #f4f5f8 50%, #e2e5ea 100%)";
              const hasCustomImage = Boolean(slide.image && slide.image.trim());

              return (
                <SwiperSlide key={slideId}>
                  {hasCustomImage ? (
                    /* ── FULL UPLOADED BANNER FROM ADMIN PORTAL ── */
                    <div
                      onClick={() => handleBannerClick(slide.url)}
                      className="relative w-full cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/60 bg-gray-50 flex items-center justify-center select-none shadow-xs hover:shadow-md transition-shadow"
                    >
                      <img
                        src={resolveImageUrl(slide.image)}
                        alt={slide.title || "Promotional Banner"}
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
                      className="relative w-full min-h-[200px] sm:min-h-[220px] md:min-h-[240px] cursor-pointer flex items-center justify-between px-6 sm:px-12 md:px-16 py-6 sm:py-8 overflow-hidden select-none border border-gray-200/60"
                      style={{ background: bg }}
                    >
                      {/* Subtle Background Graphic Rings & Radial Arrows */}
                      <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full border-2 border-gray-400/50" />
                        <div className="absolute -left-8 -top-8 w-64 h-64 rounded-full border border-gray-400/40" />
                        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gray-400/30" />
                        <svg
                          className="absolute right-12 top-6 w-28 h-28 text-white/40 transform rotate-12"
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
                        <svg
                          className="absolute left-12 bottom-4 w-28 h-28 text-white/40 transform -rotate-12"
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
                      </div>

                      {/* ── LEFT: Title & Brand Info ── */}
                      <div className="relative z-10 flex flex-col items-start max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                        {/* Brand Badge */}
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <div className="w-5 h-5 rounded-md bg-[#5C3124] text-white flex items-center justify-center font-black text-[9px] shadow-2xs">
                            G
                          </div>
                          <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-gray-800">
                            {slide.brand || "GOMZI GEAR"}
                          </span>
                        </div>

                        {/* Main Title */}
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                          {slide.title}
                        </h2>

                        {/* Subtitle */}
                        {slide.subtitle && (
                          <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-2 max-w-sm">
                            {slide.subtitle}
                          </p>
                        )}
                      </div>

                      {/* ── RIGHT: Dashed Price Callout Box ── */}
                      <div className="relative z-10 flex flex-col items-center flex-shrink-0">
                        <div className="bg-white/95 backdrop-blur-xs border-2 border-dashed border-[#b42318] rounded-xl px-5 sm:px-7 py-3 sm:py-4 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center">
                          <span className="text-xs sm:text-sm font-bold text-[#b42318] tracking-tight">
                            {slide.priceText || "Starts @"}
                          </span>
                          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#b42318] leading-none mt-1">
                            {slide.priceValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Controls: Left & Right circular dark buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900/60 hover:bg-gray-900 text-white flex items-center justify-center transition-all absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-md backdrop-blur-xs"
            aria-label="Previous Slide"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900/60 hover:bg-gray-900 text-white flex items-center justify-center transition-all absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-md backdrop-blur-xs"
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
                    ? "w-6 h-1.5 bg-gray-900"
                    : "w-1.5 h-1.5 bg-gray-400/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
