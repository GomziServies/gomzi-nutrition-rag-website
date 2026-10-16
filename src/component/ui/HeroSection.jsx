import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import BlackFeatureBar from "../common/Black-Feature-Bar";
import CertificationBadges from "../common/CertificationBadges";
import { Download, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroBannerApi } from "../../api/banner.api";

const DEFAULT_BANNER = {
  desktop_image: "/images/banner-(gls)-web-view.webp",
  mobile_image: "/images/banner-(gls)-mobile-view.webp",
  alt_text: "Science-backed sports nutrition products by Gomzi Supplement.",
  shop_link: "/gomzi-supplement",
  brochure_url: "/pdf/gomzi-brochure.pdf",
};

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

export default function HeroSectionWithIcons() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([DEFAULT_BANNER]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHeroBanners = async () => {
      try {
        const res = await getHeroBannerApi();
        if (isMounted && res.data?.data) {
          const data = res.data.data;
          if (Array.isArray(data.banners) && data.banners.length > 0) {
            setBanners(data.banners);
          } else if (data.desktop_image) {
            setBanners([data]);
          }
        }
      } catch (err) {
        console.warn("Using default hero banner fallback:", err.message);
      }
    };

    fetchHeroBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentBanner = banners[activeIndex] || banners[0] || DEFAULT_BANNER;

  const handleShopNow = () => {
    const link = (currentBanner.shop_link || "/gomzi-supplement").trim();
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else if (link.startsWith("www.")) {
      window.open(`https://${link}`, "_blank", "noopener,noreferrer");
    } else {
      navigate(link.startsWith("/") ? link : `/${link}`);
    }
  };

  const handleDownload = () => {
    const brochure = resolveImageUrl(currentBanner.brochure_url || "/pdf/gomzi-brochure.pdf");
    const link = document.createElement("a");
    link.href = brochure;
    link.download = "Gomzi-Brochure.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="group relative w-full overflow-hidden select-none">
      <div className="relative w-full">
        {/* ================= Swiper Banner Slider ================= */}
        <Swiper
          key={`hero-swiper-${banners.length}`}
          modules={[Autoplay, Pagination, Navigation]}
          speed={800}
          grabCursor={banners.length > 1}
          loop={banners.length > 1}
          autoplay={
            banners.length > 1
              ? {
                  delay: 4500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={
            banners.length > 1
              ? {
                  clickable: true,
                }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="hero-swiper w-full relative z-10"
        >
          {banners.map((slide, index) => (
            <SwiperSlide key={slide._id || index} className="w-full">
              <picture className="block w-full">
                <source
                  srcSet={resolveImageUrl(slide.mobile_image || slide.desktop_image)}
                  media="(max-width: 1023px)"
                />

                <source
                  srcSet={resolveImageUrl(slide.desktop_image)}
                  media="(min-width: 1024px)"
                />

                <img
                  src={resolveImageUrl(slide.desktop_image)}
                  alt={slide.alt_text || "Science-backed sports nutrition products by Gomzi Supplement."}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="
                    block
                    w-full
                    h-auto
                    object-cover
                    select-none
                  "
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ================= Minimal Navigation Chevron Arrows ================= */}
        {banners.length > 1 && (
          <>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              type="button"
              className="
                hidden md:flex
                absolute z-30
                left-3 sm:left-4
                top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-black/35 hover:bg-[#5C3124]
                text-white
                backdrop-blur-md
                border border-white/20
                items-center justify-center
                shadow-lg
                transition-all duration-300
                opacity-0 group-hover:opacity-90 hover:!opacity-100
                hover:scale-105 active:scale-95
                cursor-pointer
              "
              aria-label="Previous Hero Slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              type="button"
              className="
                hidden md:flex
                absolute z-30
                right-3 sm:right-4
                top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-black/35 hover:bg-[#5C3124]
                text-white
                backdrop-blur-md
                border border-white/20
                items-center justify-center
                shadow-lg
                transition-all duration-300
                opacity-0 group-hover:opacity-90 hover:!opacity-100
                hover:scale-105 active:scale-95
                cursor-pointer
              "
              aria-label="Next Hero Slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* ================= DESKTOP STATIC OVERLAY (>= 1024px) ================= */}
        <div
          className="
            hidden lg:flex
            absolute z-20
            left-[2.8%] xl:left-[3.2%] 2xl:left-[3.8%]
            top-[10%] xl:top-[12%] 2xl:top-[14%]
            max-w-[55%] xl:max-w-[50%]
            flex-col items-start
            select-none
            pointer-events-none
          "
        >
          {/* Static 3-Line Luxury Brand Heading */}
          <h1 className="flex flex-col font-black tracking-[-0.035em] uppercase leading-[0.92] text-left">
            <span className="text-[#964816] text-3xl lg:text-4xl xl:text-[54px] 2xl:text-[66px] drop-shadow-sm font-black">
              SCIENCE-BACKED
            </span>
            <span className="text-[#23150E] text-3xl lg:text-4xl xl:text-[54px] 2xl:text-[66px] drop-shadow-sm font-black mt-1 xl:mt-1.5">
              NUTRITION FOR EVERYDAY
            </span>
            <span className="text-[#23150E] text-3xl lg:text-4xl xl:text-[54px] 2xl:text-[66px] drop-shadow-sm font-black mt-1 xl:mt-1.5">
              PERFORMANCE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-bold text-[#5A2F20] text-sm lg:text-base xl:text-lg 2xl:text-xl tracking-tight mt-2.5 xl:mt-3.5 text-left">
            Premium Protein | Wellness | No Amino Spiking 100%
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center gap-3.5 xl:gap-5 mt-4 xl:mt-6 pointer-events-auto">
            {/* Shop Now Primary Button */}
            <button
              onClick={handleShopNow}
              className="
                group relative overflow-hidden
                bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c]
                hover:from-[#48261c] hover:to-[#381c14]
                text-white
                font-bold
                rounded-xl
                sm:rounded-2xl
                shadow-lg shadow-[#5C3124]/35
                hover:shadow-xl hover:shadow-[#5C3124]/50
                border border-amber-400/30
                transition-all duration-300
                hover:-translate-y-0.5 active:scale-[0.98]
                cursor-pointer
                whitespace-nowrap
                flex items-center justify-center
                gap-2 sm:gap-2.5
                text-sm sm:text-base xl:text-lg px-6 py-3 lg:px-7 lg:py-3.5
              "
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 text-amber-200" />
              <span className="tracking-tight">Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />

              {/* Subtle ambient sheen */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            </button>

            {/* Download Brochure Secondary Frosted Button */}
            <button
              onClick={handleDownload}
              className="
                group relative overflow-hidden
                bg-white/95 hover:bg-white
                backdrop-blur-md
                border-2 border-[#5C3124]/30 hover:border-[#5C3124]
                text-[#3d1e15] hover:text-[#5C3124]
                font-bold
                rounded-xl
                sm:rounded-2xl
                shadow-md hover:shadow-xl hover:shadow-[#5C3124]/15
                transition-all duration-300
                hover:-translate-y-0.5 active:scale-[0.98]
                cursor-pointer
                whitespace-nowrap
                flex items-center justify-center
                gap-2 sm:gap-2.5
                text-sm sm:text-base xl:text-lg px-6 py-3 lg:px-7 lg:py-3.5
              "
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C3124] transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="tracking-tight">Download Brochure</span>
            </button>
          </div>

          {/* Certification Badges */}
          <div className="mt-4 xl:mt-6 pointer-events-auto">
            <CertificationBadges
              className="flex flex-row items-center gap-2 sm:gap-2.5 xl:gap-3.5"
              badgeSize="h-7 lg:h-8 xl:h-9 2xl:h-10"
            />
          </div>
        </div>

        {/* ================= MOBILE & TABLET STATIC OVERLAY (< 1024px) ================= */}
        {/* Top: Headline, Subtitle, Badges */}
        <div
          className="
            lg:hidden
            absolute z-20
            top-[3%] sm:top-[4%]
            left-1/2 -translate-x-1/2
            w-full px-3 sm:px-6
            flex flex-col items-center text-center
            select-none
            pointer-events-none
          "
        >
          <h1 className="flex flex-col font-black tracking-[-0.035em] uppercase leading-[0.94] text-center">
            <span className="text-[#964816] text-xl sm:text-2xl md:text-3xl font-black">
              SCIENCE-BACKED
            </span>
            <span className="text-[#23150E] text-xl sm:text-2xl md:text-3xl font-black mt-0.5">
              NUTRITION FOR EVERYDAY
            </span>
            <span className="text-[#23150E] text-xl sm:text-2xl md:text-3xl font-black mt-0.5">
              PERFORMANCE
            </span>
          </h1>

          <p className="font-bold text-[#5A2F20] text-[10.5px] sm:text-xs md:text-sm tracking-tight mt-1 sm:mt-1.5">
            Premium Protein | Wellness | No Amino Spiking 100%
          </p>

          <div className="mt-2 sm:mt-2.5 pointer-events-auto">
            <CertificationBadges
              className="flex flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-2"
              badgeSize="h-5 sm:h-6 md:h-7"
            />
          </div>
        </div>

        {/* Bottom: Action Buttons */}
        <div
          className="
            lg:hidden
            absolute z-20
            bottom-[3%] sm:bottom-[3.5%] md:bottom-[4%]
            left-1/2 -translate-x-1/2
            w-full px-3 sm:px-5
            flex flex-row items-center justify-center gap-2 sm:gap-3
          "
        >
          <button
            onClick={handleShopNow}
            className="
              group relative overflow-hidden
              bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c]
              hover:from-[#48261c] hover:to-[#381c14]
              text-white
              font-bold
              rounded-xl
              shadow-lg shadow-[#5C3124]/35
              border border-amber-400/30
              transition-all duration-300
              hover:-translate-y-0.5 active:scale-[0.98]
              cursor-pointer
              whitespace-nowrap
              flex items-center justify-center
              gap-2
              text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3
            "
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            <span className="tracking-tight">Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
          </button>

          <button
            onClick={handleDownload}
            className="
              group relative overflow-hidden
              bg-white/95 hover:bg-white
              backdrop-blur-md
              border-2 border-[#5C3124]/30 hover:border-[#5C3124]
              text-[#3d1e15]
              font-bold
              rounded-xl
              shadow-md hover:shadow-xl hover:shadow-[#5C3124]/15
              transition-all duration-300
              hover:-translate-y-0.5 active:scale-[0.98]
              cursor-pointer
              whitespace-nowrap
              flex items-center justify-center
              gap-2
              text-xs sm:text-sm px-4 py-2.5 sm:px-5 sm:py-3
            "
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C3124]" />
            <span className="tracking-tight">Download Brochure</span>
          </button>
        </div>
      </div>

      <BlackFeatureBar />
    </section>
  );
}

