import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { getAdBannersApi, getStaticBannerApi } from "../../api/banner.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const OFFER_BANNER_CACHE_KEY = "gomzi_supplement_offer_banner_cache";

const FALLBACK_BANNERS = [
  {
    id: "default-performance-combos",
    title: "Performance Power Combos",
    subtitle: "Whey, creatine and a free shaker - bundled to build more lean muscle.",
    image: "/images/banners/banner-combo-performance.svg",
    alt: "Performance power combos - whey, creatine and a free shaker",
    href: "/gomzi-supplement?search=fuel+one",
  },
  {
    id: "default-creatine",
    title: "Pure Strength, Zero Compromise",
    subtitle: "Unflavoured micronised monohydrate, lab tested for purity and potency.",
    image: "/images/banners/banner-creatine.svg",
    alt: "Creatine monohydrate - pure strength, zero compromise",
    href: "/gomzi-supplement?search=creatine",
  },
];

const resolveImageUrl = (img) => {
  if (!img || typeof img !== "string") return FALLBACK_BANNERS[0].image;
  const clean = img.trim();
  if (
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    clean.startsWith("data:") ||
    clean.startsWith("blob:") ||
    clean.startsWith("/")
  ) {
    return clean;
  }
  return `https://files.fggroup.in/${clean}`;
};

/**
 * Dynamic Promotional / Offer Banner at the top of the Supplement Catalog page (/gomzi-supplement).
 * Fully synchronized with the Admin Panel (http://localhost:3001/rag/static-banner & /rag/ad-banners).
 * Automatically supports single featured banner or multi-banner rotation with smooth Swiper carousel.
 */
export default function OfferBanner() {
  const navigate = useNavigate();

  // Instant zero-CLS hydration from local storage cache
  const [banners, setBanners] = useState(() => {
    const cached = getLocalCache(OFFER_BANNER_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return FALLBACK_BANNERS;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchBanners = async () => {
      try {
        const fetcher = getAdBannersApi || getStaticBannerApi;
        const res = await fetcher();
        if (!isMounted) return;

        const data = res?.data?.data || res?.data;
        const rawList = data?.banners;

        let activeItems = [];

        if (Array.isArray(rawList) && rawList.length > 0) {
          activeItems = rawList
            .filter((b) => b && b.status !== false && Boolean(b.image))
            .map((b) => ({
              id: b._id || b.id || b.title,
              title: b.title || "Special Offer",
              subtitle: b.subtitle || "",
              image: resolveImageUrl(b.image),
              alt: b.alt_text || b.title || "Performance Power Combos",
              href: b.url || "/gomzi-supplement?search=fuel+one",
            }));
        } else if (data && data.image && data.status !== false) {
          activeItems = [
            {
              id: data._id || data.id || "primary-banner",
              title: data.title || "Special Offer",
              subtitle: data.subtitle || "",
              image: resolveImageUrl(data.image),
              alt: data.alt_text || data.title || "Performance Power Combos",
              href: data.url || "/gomzi-supplement?search=fuel+one",
            },
          ];
        }

        if (activeItems.length > 0) {
          setBanners(activeItems);
          setLocalCache(OFFER_BANNER_CACHE_KEY, activeItems);
        }
      } catch (err) {
        console.warn("[OfferBanner] Error loading dynamic banners:", err?.message);
      }
    };

    fetchBanners();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBannerClick = (href) => {
    const target = href || "/gomzi-supplement?search=fuel+one";
    if (target.startsWith("http://") || target.startsWith("https://")) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      navigate(target);
    }
  };

  if (!banners || banners.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1240px] mx-auto px-4 md:px-0 pt-5">
        {banners.length === 1 ? (
          // Single Banner Display
          <div
            onClick={() => handleBannerClick(banners[0].href)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleBannerClick(banners[0].href)}
            className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-[#faf6f0] shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none"
            title={banners[0].title}
          >
            <img
              src={banners[0].image}
              alt={banners[0].alt}
              loading="eager"
              className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_BANNERS[0].image;
              }}
            />
          </div>
        ) : (
          // Multi-banner Carousel
          <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-[#faf6f0] shadow-sm">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              loop={banners.length > 1}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-gray-400 !opacity-60",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-primary !opacity-100 !w-6 !rounded-full transition-all",
              }}
              className="w-full"
            >
              {banners.map((item, idx) => (
                <SwiperSlide key={`${item.id || idx}`}>
                  <div
                    onClick={() => handleBannerClick(item.href)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleBannerClick(item.href)}
                    className="group block w-full cursor-pointer overflow-hidden focus:outline-none"
                    title={item.title}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_BANNERS[0].image;
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
