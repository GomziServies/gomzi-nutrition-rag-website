import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStaticBannerApi, getAdBannersApi } from "../../api/banner.api";

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
 * Static Promotional Banner Section.
 * Displays a single static banner configured from the RAG Admin panel.
 * Admin can upload/update the banner image, title, and target destination URL.
 * Renders nothing (null) if no banner is active.
 */
export default function AdsBannerSection() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);

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
      } catch {
        // Silent catch: no dummy fallback
      }
    };

    fetchStaticBanner();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!banner || !banner.image) {
    return null;
  }

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
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-3 md:py-4">
        <button
          type="button"
          onClick={handleClick}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none"
          aria-label={banner.alt || banner.title || "Featured static banner"}
        >
          <img
            src={imgSrc}
            alt={banner.alt || banner.title || "Featured Banner"}
            loading="lazy"
            className="block h-auto w-full select-none transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          />
        </button>
      </div>
    </section>
  );
}

// Named alias export for explicit semantics
export { AdsBannerSection as StaticBannerSection };

