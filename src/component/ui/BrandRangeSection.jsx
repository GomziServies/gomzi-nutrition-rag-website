import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "../common/Marquee";
import { getCompaniesApi } from "../../api/company.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const COMPANIES_CACHE_KEY = "gomzi_companies_brand_rail_cache";

function resolveLogo(comp) {
  if (comp.logo && typeof comp.logo === "string" && comp.logo.trim()) {
    const clean = comp.logo.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      return clean;
    }
    if (clean.startsWith("/")) {
      return clean.includes("/images/brands/") ? "" : clean;
    }
    return `https://files.fggroup.in/${clean}`;
  }
  if (comp.image && typeof comp.image === "string" && comp.image.trim()) {
    const clean = comp.image.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://")) {
      return clean;
    }
    if (clean.startsWith("/")) {
      return clean.includes("/images/brands/") ? "" : clean;
    }
    return `https://files.fggroup.in/${clean}`;
  }
  return "";
}

function resolveHref(comp) {
  const name = (comp.name || "").trim().toLowerCase();
  if (name.includes("gomzi")) return "/gomzi-supplement";
  if (name.includes("as-it-is") || name.includes("asitis")) return "/gomzi-supplement?search=asitis";
  return `/gomzi-supplement?search=${encodeURIComponent(comp.name)}`;
}

/**
 * HealthKart "Brand Range" rail.
 * Loaded dynamically from Admin Panel Companies catalog (/public/v1/companies).
 * Zero static mock/fallback brand SVGs.
 */
export default function BrandRangeSection() {
  const navigate = useNavigate();
  const railRef = useRef(null);

  const [brands, setBrands] = useState(() => {
    const cached = getLocalCache(COMPANIES_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      const valid = cached.filter((c) => c && c.logo && !c.logo.includes("/images/brands/"));
      if (valid.length > 0) return valid;
    }
    return [];
  });

  useEffect(() => {
    let isMounted = true;

    getCompaniesApi()
      .then((res) => {
        if (!isMounted) return;
        const rawCompanies = res?.data?.data?.companies || res?.data?.companies || [];
        if (Array.isArray(rawCompanies) && rawCompanies.length > 0) {
          const activeCompanies = rawCompanies
            .filter((c) => c && c.status !== false)
            .map((c) => ({
              id: c._id || c.id || c.name,
              name: c.name,
              logo: resolveLogo(c),
              href: resolveHref(c),
              tagline: c.tagline || "",
            }))
            .filter((c) => Boolean(c.logo));

          if (activeCompanies.length > 0) {
            setBrands(activeCompanies);
            setLocalCache(COMPANIES_CACHE_KEY, activeCompanies);
          }
        }
      })
      .catch((err) => {
        console.warn("[BrandRangeSection] Failed to fetch companies from admin API:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white border-t border-b border-gray-100 py-6 md:py-8 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 md:px-0">
        <div className="relative">
          <Marquee ref={railRef} duration={60} className="px-4">
            {brands.map((brand, idx) => (
              <button
                key={`${brand.id || brand.name}-${idx}`}
                onClick={() => navigate(brand.href)}
                title={brand.tagline ? `${brand.name} - ${brand.tagline}` : brand.name}
                aria-label={brand.name}
                className="group mx-5 flex h-[56px] w-[170px] shrink-0 items-center justify-center bg-white transition-transform duration-200 hover:scale-105 focus:outline-none"
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-200"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      if (img.nextElementSibling) {
                        img.nextElementSibling.style.display = "flex";
                      }
                    }}
                  />
                ) : null}
                <span
                  style={{ display: brand.logo ? "none" : "flex" }}
                  className="items-center justify-center text-sm font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors"
                >
                  {brand.name}
                </span>
              </button>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
