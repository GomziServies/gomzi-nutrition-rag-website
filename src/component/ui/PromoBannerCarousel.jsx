import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPromoBannersApi } from "../../api/banner.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const PROMO_BANNERS_CACHE_KEY = "gomzi_promo_banners_cache";

const FALLBACK_SLIDES = [
  {
    image: "/images/banners/banner-sale-myprotein.svg",
    alt: "Myprotein - your workout deserves better nutrition, up to 50% off",
    href: "/gomzi-supplement?search=myprotein",
  },
  {
    image: "/images/banners/banner-sale-muscleblaze.svg",
    alt: "MuscleBlaze - power every single rep, up to 40% off",
    href: "/gomzi-supplement?search=muscleblaze",
  },
  {
    image: "/images/banners/banner-combo-performance.svg",
    alt: "Performance power combos - whey, creatine and a free shaker",
    href: "/gomzi-supplement?search=fuel+one",
  },
  {
    image: "/images/banners/banner-creatine.svg",
    alt: "Creatine monohydrate - pure strength, zero compromise",
    href: "/gomzi-supplement?search=creatine",
  },
  {
    image: "/images/banners/banner-preworkout.svg",
    alt: "Pre-workout formulas - train like you mean it",
    href: "/gomzi-supplement?search=pre-workout",
  },
];

/**
 * Resolve absolute or remote S3 / FG Group image path.
 */
const resolveImageUrl = (img) => {
  if (!img) return "/images/banners/banner-combo-performance.svg";
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
 * Dynamic: Fetches from RAG Admin / Backend with fallback to initial brand graphics.
 */
export default function PromoBannerCarousel() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState(() => {
    const cached = getLocalCache(PROMO_BANNERS_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return FALLBACK_SLIDES;
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
        if (Array.isArray(banners) && banners.length > 0) {
          const activeBanners = banners
            .filter((b) => b.status !== false && Boolean(b.image || b.desktop_image))
            .map((b) => ({
              _id: b._id || b.id,
              image: b.image || b.desktop_image,
              alt: b.alt_text || b.title || b.brand || "Promo Banner",
              href: b.url || b.shop_link || "/gomzi-supplement",
            }));

          if (activeBanners.length > 0) {
            setSlides(activeBanners);
            setLocalCache(PROMO_BANNERS_CACHE_KEY, activeBanners);
          }
        }
      } catch (err) {
        // Fallback slides remain seamlessly active if API fails
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

  const slidesKey = slides.map((s) => s._id || s.image).join(",");

  return (
    <section className="w-full bg-white" aria-label="Promotional Offer Banners">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <div className="relative">
          <Swiper
            key={slidesKey}
            modules={[Autoplay, Pagination]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActive(s.realIndex)}
            slidesPerView={1}
            loop={slides.length > 1}
            speed={500}
            autoplay={
              slides.length > 1
                ? { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }
                : false
            }
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
                  className="block w-full cursor-pointer overflow-hidden rounded-xl"
                >
                  <img
                    src={resolveImageUrl(slide.image)}
                    alt={slide.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="block h-auto w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/banners/banner-combo-performance.svg";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Edge navigation arrows */}
          {slides.length > 1 && (
            <>
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
            </>
          )}

          {/* Pill pagination dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm">
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
          )}
        </div>
      </div>
    </section>
  );
}

