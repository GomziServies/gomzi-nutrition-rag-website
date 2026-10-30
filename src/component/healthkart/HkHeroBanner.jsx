import { useEffect, useState } from "react";
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
    swiper.updateAutoHeight(0);
  };

  if (!banners.length) return null;

  return (
    <section
      aria-label="Featured offers"
      aria-roledescription="carousel"
      className="w-full overflow-hidden"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="relative w-full bg-white overflow-hidden">
        <Swiper
          key={banners.map(banner => banner.id || banner.desktopImage).join(",")}
          modules={[A11y, Autoplay, Keyboard]}
          onSwiper={setSwiper}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={multiple}
          autoHeight
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
          className="hero-banner-carousel"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id || banner.desktopImage}>
              <div className="block bg-[#faf7f4] select-none">
                <picture className="block">
                  <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
                  <img
                    src={banner.desktopImage}
                    alt={banner.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    draggable={false}
                    onDragStart={event => event.preventDefault()}
                    onLoad={updateImageLayout}
                    className="block w-full h-auto object-cover select-none"
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {multiple && <>
          <button type="button" onClick={() => swiper?.slidePrev()} aria-label="Previous hero banner" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white/95 hover:bg-primary text-stone-800 hover:text-white flex items-center justify-center transition-colors"><ChevronLeft size={22} /></button>
          <button type="button" onClick={() => swiper?.slideNext()} aria-label="Next hero banner" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white/95 hover:bg-primary text-stone-800 hover:text-white flex items-center justify-center transition-colors"><ChevronRight size={22} /></button>
        </>}
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
    <section aria-label="Loading featured offers" role="status" className="w-full">
      <div className="w-full aspect-square md:aspect-[4/1] skeleton-shimmer"><span className="sr-only">Loading featured offers…</span></div>
    </section>
  );

  return <HeroBannerCarousel banners={banners} />;
}
