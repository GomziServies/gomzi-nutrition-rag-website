import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStaticBannerApi, getAdBannersApi } from "../../api/banner.api";

/**
 * Fallback Creatine banner (default when offline or DB has no active banners)
 */
const FALLBACK_BANNERS = [
  {
    image: "/images/banners/banner-creatine.svg",
    alt: "Creatine monohydrate - pure strength, zero compromise",
    url: "/gomzi-supplement?search=creatine",
    title: "Pure Strength, Zero Compromise",
    subtitle: "Unflavoured micronised monohydrate, lab tested for purity and potency.",
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
 * Static Promotional Banner Section.
 * Displays a single static banner configured from the RAG Admin panel.
 * Admin can upload/update the banner image, title, and target destination URL.
 */
export default function AdsBannerSection() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(FALLBACK_BANNERS[0]);

  useEffect(() => {
    let isMounted = true;

    const fetchStaticBanner = async () => {
      try {
        const res = await (getStaticBannerApi ? getStaticBannerApi() : getAdBannersApi());
        if (!isMounted) return;

        const data = res?.data?.data;
        const rawList = data?.banners;

        if (Array.isArray(rawList) && rawList.length > 0) {
          const activeList = rawList.filter(
            (b) => b.status !== false && Boolean(b.image)
          );
          if (activeList.length > 0) {
            const primary = activeList[0];
            setBanner({
              _id: primary._id || primary.id,
              image: primary.image,
              alt: primary.alt_text || primary.title || "Featured Static Banner",
              url: primary.url || "/gomzi-supplement?search=creatine",
              title: primary.title || "",
              subtitle: primary.subtitle || "",
            });
            return;
          }
        }

        // If backend returned a single banner object directly
        if (data && data.image && data.status !== false) {
          setBanner({
            _id: data._id || data.id,
            image: data.image,
            alt: data.alt_text || data.title || "Featured Static Banner",
            url: data.url || "/gomzi-supplement?search=creatine",
            title: data.title || "",
            subtitle: data.subtitle || "",
          });
        }
      } catch (err) {
        console.warn("Using fallback static banner:", err);
      }
    };

    fetchStaticBanner();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = () => {
    const target = banner.url || "/gomzi-supplement?search=creatine";
    if (target.startsWith("http://") || target.startsWith("https://")) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      navigate(target);
    }
  };

  const imgSrc = resolveImageUrl(banner.image);

  return (
    <section id="static-banner-section" className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <button
          type="button"
          onClick={handleClick}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-50 shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none"
          aria-label={banner.alt || banner.title || "Featured static banner"}
        >
          <img
            src={imgSrc}
            alt={banner.alt || banner.title || "Featured Banner"}
            loading="lazy"
            className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            onError={(e) => {
              if (e.target.src !== FALLBACK_BANNERS[0].image) {
                e.target.src = FALLBACK_BANNERS[0].image;
              }
            }}
          />
        </button>
      </div>
    </section>
  );
}

// Named alias export for explicit semantics
export { AdsBannerSection as StaticBannerSection };
