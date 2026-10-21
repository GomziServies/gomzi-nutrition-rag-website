import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroBannerApi } from "../../api/banner.api";

/**
 * Official Live Gomzi Hero Banner
 * Science-Backed Nutrition For Everyday Performance
 * 100% identical with the active live website banner.
 */
const CURRENT_LIVE_BANNER_SLIDE = {
  _id: "current-gomzi-live-hero-banner",
  desktop_image: "/images/banners/current-hero-banner.jpg",
  mobile_image: "/images/banners/current-hero-banner.jpg",
  alt_text: "Science-Backed Nutrition For Everyday Performance - Gomzi Nutrition",
  shop_link: "/gomzi-supplement",
  title: "SCIENCE-BACKED NUTRITION FOR EVERYDAY PERFORMANCE",
};

const resolveImageUrl = (img) => {
  if (!img) return "/images/banners/current-hero-banner.jpg";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

/**
 * Hero Section Master Banner Carousel
 * Renders the authentic live banner from the website, smoothly compressing on all screen sizes (Desktop, Tablet, Mobile)
 * without cropping, horizontal scroll, or aspect distortion.
 */
export default function HeroSectionWithIcons() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([CURRENT_LIVE_BANNER_SLIDE]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHeroBanners = async () => {
      try {
        const res = await getHeroBannerApi();
        if (isMounted && res.data?.data) {
          const raw = res.data.data;
          let list = [];
          if (Array.isArray(raw.banners) && raw.banners.length > 0) {
            list = raw.banners;
          } else if (Array.isArray(raw) && raw.length > 0) {
            list = raw;
          } else if (raw.desktop_image || raw.mobile_image) {
            list = [raw];
          }

          if (list.length > 0) {
            // Always prioritize the official desktop_image so the exact same banner compresses everywhere without divergence
            const formatted = list.map((b) => ({
              ...b,
              desktop_image: b.desktop_image || b.mobile_image || "/images/banners/current-hero-banner.jpg",
            }));
            setBanners(formatted);
          }
        }
      } catch (err) {
        console.warn("Hero banner API failed, using verified live fallback:", err.message);
      }
    };

    fetchHeroBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  const displaySlides = banners.length > 0 ? banners : [CURRENT_LIVE_BANNER_SLIDE];

  const handleSlideNavigation = (link) => {
    if (!link) {
      navigate("/gomzi-supplement");
      return;
    }
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      navigate(link.startsWith("/") ? link : `/${link}`);
    }
  };

  return (
    <section className="group relative w-full overflow-hidden select-none bg-[#f4f4f4]">
      {/* 
        ========================================================================
        HERO BANNER CONTAINER:
        Scales and compresses proportionately on all screens (Desktop, Tablet, Mobile).
        ZERO cropping, zero horizontal scroll, zero visual degradation.
        ========================================================================
      */}
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation]}
          speed={650}
          grabCursor={displaySlides.length > 1}
          loop={displaySlides.length > 1}
          autoplay={
            displaySlides.length > 1
              ? {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full relative z-10"
        >
          {displaySlides.map((slide, index) => {
            const bannerSrc = resolveImageUrl(slide.desktop_image);

            return (
              <SwiperSlide key={slide._id || slide.id || index} className="w-full">
                <div
                  onClick={() => handleSlideNavigation(slide.shop_link || slide.shopLink)}
                  className="w-full cursor-pointer block bg-[#f4f4f4] overflow-hidden"
                >
                  {/* Unified Banner: Compresses smoothly without cutting off any text or graphics */}
                  <img
                    src={bannerSrc}
                    alt={slide.alt_text || slide.title || "Gomzi Nutrition Hero Banner"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-auto block select-none transition-transform duration-300 hover:scale-[1.003]"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/banners/current-hero-banner.jpg";
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Circular Navigation Chevrons (< and >) - Desktop/Tablet Only */}
        {displaySlides.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                swiperRef.current?.slidePrev();
              }}
              type="button"
              className="hidden sm:flex absolute z-20 left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                swiperRef.current?.slideNext();
              }}
              type="button"
              className="hidden sm:flex absolute z-20 right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/45 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 items-center justify-center shadow-2xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Bottom Pill Capsule Pagination Dots */}
        {displaySlides.length > 1 && (
          <div className="absolute z-20 bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/15 shadow-lg">
              {displaySlides.map((_, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    className={`transition-all duration-300 rounded-full border-none cursor-pointer p-0 ${
                      isActive
                        ? "w-4 sm:w-5 h-1.5 bg-white"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
