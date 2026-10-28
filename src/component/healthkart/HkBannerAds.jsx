// src/component/healthkart/HkBannerAds.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAdBanners, fetchPromoBanners, fetchNutritionPromoBanners } from "../../services/banner.service";

const BANNER_LOADERS = {
  static: fetchAdBanners,
  promo: fetchPromoBanners,
  nutrition: fetchNutritionPromoBanners,
};

function BannerLink({ href, children, ...props }) {
  return href.startsWith("/")
    ? <Link to={href} {...props}>{children}</Link>
    : <a href={href} {...props}>{children}</a>;
}

/**
 * Full-Width Promotional Banner Ad (HealthKart style)
 * Renders the full 100% original graphic banner without any cropping or text overlay.
 */
export function HkBannerAdWide({
  image = "/images/banners/banner-gains-season.png",
  ctaLink = "/gomzi-supplement/whey-protein",
  alt = "Gomzi Nutrition Promotional Banner",
  onImageError,
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 my-5 sm:my-7 font-sans">
      <BannerLink
        href={ctaLink}
        className="block group overflow-hidden rounded-2xl shadow-lg border border-border/30 bg-stone-950 transition-all duration-300 hover:shadow-2xl"
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-auto block object-contain transition-transform duration-300 group-hover:scale-[1.008]"
          loading="lazy"
          onError={onImageError}
        />
      </BannerLink>
    </div>
  );
}

export function ManagedBannerAd({ banner, loading = false, error = false, onRetry, onImageError }) {
  if (!loading && !error && !banner) return null;
  if (loading || error) return (
    <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 my-5 sm:my-7">
      {loading ? <div role="status" aria-label="Loading promotional banner" className="w-full aspect-[3/1] rounded-2xl bg-border/50 animate-pulse"><span className="sr-only">Loading promotional banner…</span></div>
        : <div role="alert" className="rounded-2xl border border-border bg-white px-5 py-8 text-center"><p className="text-sm text-stone-500">We couldn't load this promotion.</p><button type="button" onClick={onRetry} className="mt-3 text-sm font-bold text-primary underline underline-offset-4">Try again</button></div>}
    </div>
  );
  return <HkBannerAdWide image={banner.image} ctaLink={banner.link} alt={banner.alt} onImageError={onImageError} />;
}

export function HkManagedBannerAd({ source = "static" }) {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadBanners = BANNER_LOADERS[source] || BANNER_LOADERS.static;
    loadBanners({ signal: controller.signal })
      .then(banners => { if (!controller.signal.aborted) setBanner(banners[0] || null); })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt, source]);

  const retry = () => {
    setLoading(true);
    setError(false);
    setAttempt(value => value + 1);
  };

  return <ManagedBannerAd banner={banner} loading={loading} error={error} onRetry={retry} onImageError={() => setError(true)} />;
}
