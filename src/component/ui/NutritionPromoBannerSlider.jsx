import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getNutritionPromoBannersApi } from "../../api/banner.api";

const FALLBACK_BANNERS = [
  {
    image: "/images/deals/koshaveda-shilajit-bogo-banner.jpg",
    alt: "MuscleBlaze Koshaveda Shilajit - Buy 1 Get 1 Free",
    url: "/gomzi-supplement?search=shilajit",
  },
];

const resolveImageUrl = (img) => {
  if (!img) return FALLBACK_BANNERS[0].image;
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("data:") ||
    img.startsWith("blob:") ||
    img.startsWith("/")
  ) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

/**
 * Flagship landscape promotional banner.
 * Dynamic: Fetches from RAG Admin / Backend with single-banner or multi-slide swiper.
 */
export default function NutritionPromoBannerSlider() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState(FALLBACK_BANNERS);
  const [swiper, setSwiper] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchNutritionBanners = async () => {
      try {
        const res = await getNutritionPromoBannersApi();
        if (!isMounted) return;

        const rawList = res?.data?.data?.banners;
        if (Array.isArray(rawList) && rawList.length > 0) {
          const activeList = rawList
            .filter((b) => b.status !== false && Boolean(b.image || b.desktop_image))
            .map((b) => ({
              _id: b._id || b.id,
              image: b.image || b.desktop_image,
              alt: b.alt_text || b.title || b.brand || "Nutrition Promo Banner",
              url: b.url || b.shop_link || "/gomzi-supplement",
            }));

          if (activeList.length > 0) {
            setBanners(activeList);
          }
        }
      } catch (err) {
        // Fallback banner remains seamlessly active if API fails
      }
    };

    fetchNutritionBanners();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigate = (link) => {
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

  const bannersKey = banners.map((b) => b._id || b.image).join(",");

  return (
    <section className="w-full bg-white" aria-label="Flagship Promotional Banner">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <div className="relative">
          {banners.length === 1 ? (
            <div
              onClick={() => handleNavigate(banners[0].url)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigate(banners[0].url);
                }
              }}
              className="hk-card cursor-pointer overflow-hidden rounded-xl"
            >
              <img
                src={resolveImageUrl(banners[0].image)}
                alt={banners[0].alt}
                className="block h-auto w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_BANNERS[0].image;
                }}
              />
            </div>
          ) : (
            <>
              <Swiper
                key={bannersKey}
                modules={[Autoplay, Pagination]}
                onSwiper={setSwiper}
                onSlideChange={(s) => setActive(s.realIndex)}
                slidesPerView={1}
                loop={banners.length > 1}
                speed={500}
                autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true }}
                className="!overflow-hidden !rounded-xl"
              >
                {banners.map((banner, index) => (
                  <SwiperSlide key={banner._id || banner.image || index}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleNavigate(banner.url)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleNavigate(banner.url);
                        }
                      }}
                      className="block w-full cursor-pointer overflow-hidden rounded-xl"
                    >
                      <img
                        src={resolveImageUrl(banner.image)}
                        alt={banner.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="block h-auto w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_BANNERS[0].image;
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Edge navigation arrows */}
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                aria-label="Previous banner"
                className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 sm:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="Next banner"
                className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 sm:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Pill pagination dots */}
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm">
                {banners.map((banner, i) => (
                  <button
                    key={banner._id || banner.image || i}
                    type="button"
                    onClick={() => swiper?.slideToLoop(i)}
                    aria-label={`Go to banner ${i + 1}`}
                    className={`h-1.5 rounded-full border-none p-0 transition-all duration-300 ${
                      active === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

