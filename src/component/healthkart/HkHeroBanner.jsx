import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FALLBACK_HERO_BANNERS, fetchHeroBanners } from "../../services/banner.service";
import "swiper/css";

function BannerLink({ href, children, ...props }) {
  return href.startsWith("/")
    ? <Link to={href} {...props}>{children}</Link>
    : <a href={href} {...props}>{children}</a>;
}

export function HeroBannerCarousel({ banners }) {
  const swiperRef = useRef(null);
  const multiple = banners.length > 1;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotion = () => {
      if (preference.matches) {
        swiperRef.current?.autoplay?.stop();
      }
    };
    respectMotion();
    preference.addEventListener("change", respectMotion);
    return () => preference.removeEventListener("change", respectMotion);
  }, []);

  if (!banners.length) return null;

  return (
    <section aria-label="Featured offers" aria-roledescription="carousel" className="w-full overflow-hidden">
      <div className="w-full">
        <div className="relative w-full bg-white overflow-hidden">
          <Swiper
            key={banners.map(banner => banner.id).join(",")}
            modules={[A11y, Autoplay, Keyboard]}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                swiper.autoplay?.stop();
              }
            }}
            loop={multiple}
            autoHeight
            speed={500}
            autoplay={multiple ? { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
            keyboard={{ enabled: multiple, onlyInViewport: true }}
            a11y={{ containerMessage: "Gomzi Nutrition featured offers", itemRoleDescriptionMessage: "slide" }}
            onFocusCapture={() => {
              if (multiple) {
                swiperRef.current?.autoplay?.stop();
              }
            }}
            className="hero-banner-carousel"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner.id}>
                <BannerLink href={banner.shopLink} aria-label={banner.title} className="block bg-[#faf7f4]">
                  <picture className="block">
                    <source media="(max-width: 767px)" srcSet={banner.mobileImage} />
                    <img
                      src={banner.desktopImage}
                      alt={banner.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className="block w-full h-auto object-cover"
                      onError={event => {
                        const img = event.currentTarget;
                        const source = img.parentElement.querySelector("source");
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
                </BannerLink>
              </SwiperSlide>
            ))}
          </Swiper>
          {multiple && <>
            <button type="button" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous hero banner" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white/95 hover:bg-primary text-stone-800 hover:text-white flex items-center justify-center transition-colors"><ChevronLeft size={22} /></button>
            <button type="button" onClick={() => swiperRef.current?.slideNext()} aria-label="Next hero banner" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full shadow-md bg-white/95 hover:bg-primary text-stone-800 hover:text-white flex items-center justify-center transition-colors"><ChevronRight size={22} /></button>
          </>}
        </div>
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
      <div className="w-full aspect-square md:aspect-[4/1] bg-border/50 animate-pulse"><span className="sr-only">Loading featured offers…</span></div>
    </section>
  );

  return <HeroBannerCarousel banners={banners} />;
}
