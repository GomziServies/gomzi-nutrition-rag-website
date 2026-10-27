import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { getHeroBannerApi } from "../../api/banner.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";
import CarouselControls from "../common/CarouselControls";

const HERO_BANNERS_CACHE_KEY = "gomzi_hero_banners_live_cache";

/**
 * Resolve absolute or remote S3 / FG Group image path.
 */
const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

/**
 * Hero banner carousel.
 * Live data: Displays only live banners configured via RAG Admin.
 * Zero dummy/mock images.
 */
export default function HeroSection() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState(() => {
    const cached = getLocalCache(HERO_BANNERS_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      const valid = cached.filter(
        (c) => c && (c.desktop_image || c.image) && !String(c.desktop_image || c.image).includes("current-hero-banner")
      );
      if (valid.length > 0) return valid;
    }
    return [];
  });
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
        } else if (raw.desktop_image || raw.image) {
          list = [raw];
        }

        if (list.length > 0) {
          const liveList = list
            .filter((b) => b.status !== false && Boolean(b.desktop_image || b.image))
            .map((b) => ({
              _id: b._id || b.id,
              desktop_image: b.desktop_image || b.image,
              alt_text: b.alt_text || b.title || "Gomzi Nutrition",
              shop_link: b.shop_link || b.shopLink || "/gomzi-supplement",
            }));

          if (liveList.length > 0) {
            setBanners(liveList);
            setLocalCache(HERO_BANNERS_CACHE_KEY, liveList);
          }
        }
      } catch {
        // Silent catch: zero dummy fallback images
      }
    };

    fetchHeroBanners();
    return () => {
      isMounted = false;
    };
  }, []);

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

  if (!banners || banners.length === 0) {
    return (
      <section className="relative w-full bg-white">
        <div className="w-full h-[180px] sm:h-[260px] md:h-[320px] lg:h-[380px] bg-gray-100 animate-pulse" />
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white">
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
                className="w-full cursor-pointer bg-white flex justify-center items-center overflow-hidden"
              >
                <img
                  src={resolveImageUrl(slide.desktop_image || slide.image)}
                  alt={slide.alt_text || slide.title || "Gomzi Nutrition"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="block w-full h-auto sm:max-h-[380px] lg:max-h-[420px] select-none"
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

            <div className="absolute bottom-2 sm:bottom-4 left-1/2 z-20 -translate-x-1/2">
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/40 px-2.5 py-1.5 sm:px-3 sm:py-2 backdrop-blur-sm">
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

