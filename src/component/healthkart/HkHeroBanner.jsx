import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FALLBACK_HERO_BANNERS, fetchHeroBanners } from "../../services/banner.service";
import { observeHeroEnvironment, shouldPlayHero, syncHeroPlayback } from "./hero-playback";
import "swiper/css";

export function HeroBannerCarousel({ banners }) {
  const [swiper, setSwiper] = useState(null);
  const [environment, setEnvironment] = useState({ reducedMotion: false, hidden: false });
  const [focused, setFocused] = useState(false);
  const multiple = banners.length > 1;
  const playing = shouldPlayHero({ count: banners.length, focused, ...environment });

  useEffect(() => observeHeroEnvironment(setEnvironment), []);
  useEffect(() => { syncHeroPlayback(swiper, playing); }, [swiper, playing]);

  const updateImageLayout = () => {
    if (!swiper || swiper.destroyed) return;
    swiper.update();
  };

  if (!banners.length) return null;

  return (
    <section
      aria-label="Featured offers"
      aria-roledescription="carousel"
      className="w-full bg-[#f6ece4] bg-gradient-to-r from-[#faf2ec] via-[#f6ece4] to-[#ebdccf] overflow-hidden"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <style>{`
        .hk-hero-viewport {
          aspect-ratio: 3 / 2;
        }
        @media (min-width: 768px) {
          .hk-hero-viewport {
            aspect-ratio: 2814 / 684;
            max-height: 360px;
          }
        }
      `}</style>
      <div
        className="relative w-full max-w-[1600px] mx-auto hk-hero-viewport aspect-[3/2] md:aspect-[2814/684] md:max-h-[360px] overflow-hidden"
      >
        <Swiper
          key={banners.map(banner => banner.id || banner.desktopImage).join(",")}
          modules={[A11y, Autoplay, Keyboard]}
          onSwiper={setSwiper}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={multiple}
          speed={environment.reducedMotion ? 0 : 600}
          autoplay={multiple ? {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            // Continue even when a browser suppresses a CSS transition event.
            waitForTransition: false,
          } : false}
          keyboard={{ enabled: multiple, onlyInViewport: true }}
          a11y={{ containerMessage: "Gomzi Nutrition featured offers", itemRoleDescriptionMessage: "slide" }}
          allowTouchMove={multiple}
          simulateTouch
          grabCursor={multiple}
          resizeObserver
          observer
          observeParents
          lazyPreloadPrevNext={1}
          className="hero-banner-carousel w-full h-full"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id || banner.desktopImage}>
              <Link
                to={banner.shopLink || "/gomzi-supplement"}
                className="block bg-[#f6ece4] select-none w-full h-full hk-hero-viewport aspect-[3/2] md:aspect-[2814/684] md:max-h-[360px] overflow-hidden cursor-pointer"
              >
                <picture className="block w-full h-full">
                  <source
                    media="(max-width: 767px)"
                    srcSet={banner.mobileImage || banner.desktopImage}
                    width="784"
                    height="522"
                  />
                  <img
                    src={banner.desktopImage}
                    alt={banner.alt || banner.title || "Optimum Nutrition Gold Standard Whey Buy 2 Get 4 Free Combo Offer"}
                    width="2814"
                    height="684"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    draggable={false}
                    onDragStart={event => event.preventDefault()}
                    onLoad={updateImageLayout}
                    className="block w-full h-full object-cover object-center select-none"
                    onError={event => {
                      const img = event.currentTarget;
                      const source = img.parentElement?.querySelector("source");
                      if (source) source.srcset = "";
                      if (img.dataset.fallback !== "desktop") {
                        img.dataset.fallback = "desktop";
                        img.src = banner.desktopImage;
                      } else if (img.dataset.localFallback !== "true") {
                        img.dataset.localFallback = "true";
                        img.src = FALLBACK_HERO_BANNERS[0].desktopImage;
                      }
                    }}
                  />
                </picture>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {multiple && (
          <>
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous hero banner"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white/95 hover:bg-primary text-stone-800 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              aria-label="Next hero banner"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white/95 hover:bg-primary text-stone-800 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default function HkHeroBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchHeroBanners({ signal: controller.signal })
      .then(result => { if (!controller.signal.aborted) setBanners(result); })
      .catch(() => { if (!controller.signal.aborted) setBanners(FALLBACK_HERO_BANNERS); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  if (loading) return (
    <section aria-label="Loading featured offers" role="status" className="w-full bg-[#f6ece4]">
      <div
        className="w-full max-w-[1600px] mx-auto hk-hero-viewport aspect-[3/2] md:aspect-[2814/684] md:max-h-[360px] skeleton-shimmer"
      >
        <span className="sr-only">Loading featured offers…</span>
      </div>
    </section>
  );

  return <HeroBannerCarousel banners={banners} />;
}
