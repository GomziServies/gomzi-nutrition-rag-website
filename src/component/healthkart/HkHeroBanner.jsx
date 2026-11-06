// src/component/healthkart/HkHeroBanner.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_BANNERS } from "../../data/homeProducts";

export default function HkHeroBanner() {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative w-full bg-[#f4f4f4] py-3 sm:py-5 font-sans">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 relative group">
        {/* Custom Navigation Arrows (HealthKart circular floating buttons) */}
        <button
          ref={prevRef}
          aria-label="Previous Slide"
          className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-[#95442c] text-stone-800 hover:text-white rounded-full shadow-xl border border-stone-200 flex items-center justify-center transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={24} className="stroke-[2.5]" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next Slide"
          className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 hover:bg-[#95442c] text-stone-800 hover:text-white rounded-full shadow-xl border border-stone-200 flex items-center justify-center transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 active:scale-95"
        >
          <ChevronRight size={24} className="stroke-[2.5]" />
        </button>

        {/* Swiper Slider displaying the 3 Full Graphical Offer Banners */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop={true}
          speed={650}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-[#af5438] !w-7 !rounded-full transition-all duration-300",
            bulletClass: "inline-block w-2.5 h-2.5 bg-white/70 rounded-full mx-1 cursor-pointer transition-all shadow-sm",
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="w-full aspect-[16/9] max-h-[460px] sm:max-h-[500px] rounded-2xl overflow-hidden shadow-xl bg-stone-950 border border-[#ebdcd2]/30"
        >
          {HERO_BANNERS.map((banner) => (
            <SwiperSlide key={banner.id} className="w-full h-full flex items-center justify-center">
              <div
                onClick={() => navigate(banner.ctaLink || "/gomzi-supplement")}
                className="relative w-full h-full cursor-pointer overflow-hidden group select-none bg-stone-950 flex items-center justify-center"
              >
                <img
                  src={banner.image}
                  alt={banner.alt || banner.title}
                  className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/banner-web-view.webp";
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
