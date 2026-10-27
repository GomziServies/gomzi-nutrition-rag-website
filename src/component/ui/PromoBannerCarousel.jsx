import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPromoBannersApi } from "../../api/banner.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const PROMO_BANNERS_CACHE_KEY = "gomzi_promo_banners_live_cache";

/**
 * Resolve absolute or remote S3 / FG Group image path.
 */
const resolveImageUrl = (img) => {
  if (!img) return "";
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
 * Wide promotional banner carousel.
 * Live data: Fetches directly from RAG Admin / Backend.
 * Renders nothing (null) if no active promotional banners are configured.
 */
export default function PromoBannerCarousel() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState(() => {
    const cached = getLocalCache(PROMO_BANNERS_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      // Filter out any stale dummy data from earlier versions
      const valid = cached.filter((c) => c && c.image && !c.image.includes("/images/banners/"));
      if (valid.length > 0) return valid;
    }
    return [];
  });
  const [swiper, setSwiper] = useState(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchPromoBanners = async () => {
      try {
        const res = await getPromoBannersApi();
        if (!isMounted) return;

        const banners = res?.data?.data?.banners;
        if (Array.isArray(banners)) {
          const activeBanners = banners
            .filter((b) => b.status !== false && Boolean(b.image || b.desktop_image))
            .map((b) => ({
              _id: b._id || b.id,
              image: b.image || b.desktop_image,
              alt: b.alt_text || b.title || b.brand || "Promo Banner",
              href: b.url || b.shop_link || "/gomzi-supplement",
            }));

          setSlides(activeBanners);
          setLocalCache(PROMO_BANNERS_CACHE_KEY, activeBanners);
        }
      } catch {
        // Silent catch: no dummy fallback data
      }
    };

    fetchPromoBanners();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigate = (href) => {
    if (!href) {
      navigate("/gomzi-supplement");
      return;
    }
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      navigate(href.startsWith("/") ? href : `/${href}`);
    }
  };

  // If no live banners are configured, do not render any dummy section
  if (!slides || slides.length === 0) {
    return null;
  }

  const slidesKey = slides.map((s) => s._id || s.image).join(",");

  return (
    <section className="w-full bg-white" aria-label="Promotional Offer Banners">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-3 md:py-4">
        <div className="relative">
          {slides.length === 1 ? (
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleNavigate(slides[0].href)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleNavigate(slides[0].href);
                }
              }}
              className="block w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none"
            >
              <img
                src={resolveImageUrl(slides[0].image)}
                alt={slides[0].alt}
                loading="eager"
                className="block h-auto w-full select-none"
              />
            </div>
          ) : (
            <>
              <Swiper
                key={slidesKey}
                modules={[Autoplay, Pagination]}
                onSwiper={setSwiper}
                onSlideChange={(s) => setActive(s.realIndex)}
                slidesPerView={1}
                loop={slides.length > 1}
                speed={500}
                autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                pagination={{ clickable: true }}
                className="!overflow-hidden !rounded-xl"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={slide._id || slide.image || index}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleNavigate(slide.href)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleNavigate(slide.href);
                        }
                      }}
                      className="block w-full cursor-pointer overflow-hidden rounded-xl bg-white"
                    >
                      <img
                        src={resolveImageUrl(slide.image)}
                        alt={slide.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="block h-auto w-full select-none"
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
                className="absolute left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                aria-label="Next banner"
                className="absolute right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition-colors hover:bg-black/70 sm:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Pill pagination dots */}
              <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 backdrop-blur-sm">
                {slides.map((slide, i) => (
                  <button
                    key={slide._id || slide.image || i}
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


