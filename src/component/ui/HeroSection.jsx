import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { getHeroBannerApi } from "../../api/banner.api";
import CarouselControls from "../common/CarouselControls";

const FALLBACK_BANNER = {
  _id: "gomzi-hero-banner",
  desktop_image: "/images/banners/current-hero-banner.jpg",
  alt_text: "Science-Backed Nutrition For Everyday Performance - Gomzi Nutrition",
  shop_link: "/gomzi-supplement",
};

/**
 * Hero banner carousel.
 * Full-bleed imagery, minimal chrome, quiet pagination.
 */
export default function HeroSection() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([FALLBACK_BANNER]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchHeroBanners = async () => {
      try {
        const res = await getHeroBannerApi();
        if (!isMounted || !res.data?.data) return;

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
          setBanners(
            list.map((b) => ({
              ...b,
              desktop_image:
                b.desktop_image || b.mobile_image || FALLBACK_BANNER.desktop_image,
            }))
          );
        }
      } catch {
        // keep the fallback banner
      }
    };

    fetchHeroBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  const resolveImageUrl = (img) => {
    if (!img) return FALLBACK_BANNER.desktop_image;
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
      return img;
    }
    return `https://files.fggroup.in/${img}`;
  };

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
    <section className="relative w-full bg-bg-light">
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          speed={600}
          grabCursor={banners.length > 1}
          loop={banners.length > 1}
          autoplay={
            banners.length > 1
              ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }
              : false
          }
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {banners.map((slide, index) => (
            <SwiperSlide key={slide._id || slide.id || index}>
              <div
                onClick={() => handleSlideNavigation(slide.shop_link || slide.shopLink)}
                className="w-full cursor-pointer bg-bg-page"
              >
                <img
                  src={resolveImageUrl(slide.desktop_image)}
                  alt={slide.alt_text || slide.title || "Gomzi Nutrition"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="block h-auto w-full select-none"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_BANNER.desktop_image;
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {banners.length > 1 && (
          <>
            <CarouselControls
              variant="overlay"
              showNext={false}
              onPrev={() => swiperRef.current?.slidePrev()}
              className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 sm:flex"
            />
            <CarouselControls
              variant="overlay"
              showPrev={false}
              onNext={() => swiperRef.current?.slideNext()}
              className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 sm:flex"
            />

            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur-sm">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full border-none p-0 transition-all duration-300 ${
                      activeIndex === i ? "w-4 bg-primary" : "w-1.5 bg-[#dbdee9]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
