import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCompaniesApi } from "../../api/company.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const COMPANIES_CACHE_KEY = "gomzi_companies_brand_rail_cache";

const FALLBACK_BRANDS = [
  {
    id: "gomzi",
    name: "Gomzi Nutrition",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot_2026-10-27_161306-removebg-preview-c34a56b2-03cc-4a40-bdb9-a4270d4d4e8e.png",
    href: "/gomzi-supplement",
  },
  {
    id: "muscleblaze",
    name: "MuscleBlaze",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot_2026-10-27_161430-removebg-preview-9f691fb8-06e7-4d49-b01d-c7dd2b394320.png",
    href: "/gomzi-supplement?search=MuscleBlaze",
  },
  {
    id: "on",
    name: "Optimum Nutrition (ON)",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot-2026-10-27-161535-944d96a4-970b-4445-9f4d-cf55de078262.png",
    href: "/gomzi-supplement?search=Optimum%20Nutrition",
  },
  {
    id: "wellcore",
    name: "Wellcore",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot_2026-10-27_161731-removebg-preview-63d9839d-3a42-473c-b95f-3eac412c54e2.png",
    href: "/gomzi-supplement?search=Wellcore",
  },
  {
    id: "isopure",
    name: "Isopure",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot-2026-10-27-161851-2d0817c4-e268-4cf7-93e4-c613466ffbe7.png",
    href: "/gomzi-supplement?search=Isopure",
  },
  {
    id: "myprotein",
    name: "MyProtein",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot-2026-10-27-161955-7c2d5f7c-7254-4b26-a9cd-8f38fcfe62a8.png",
    href: "/gomzi-supplement?search=MyProtein",
  },
  {
    id: "asitis",
    name: "AS-IT-IS",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot-2026-10-27-162036-371db7b2-c022-46b7-8ab8-3ee09b217dbb.png",
    href: "/gomzi-supplement?search=asitis",
  },
  {
    id: "dymatize",
    name: "Dymatize",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot-2026-10-27-162114-10085adf-ef1b-430a-a6dc-5feecebeee21.png",
    href: "/gomzi-supplement?search=Dymatize",
  },
  {
    id: "labrada",
    name: "Labrada",
    logo: "https://labradanutrition.in/cdn/shop/files/labrada-transparent-darkbkgrd_500x.png?v=1624537909",
    href: "/gomzi-supplement?search=Labrada",
  },
  {
    id: "muscletech",
    name: "MuscleTech",
    logo: "https://files.fggroup.in/development/files/FILE-Screenshot-2026-10-27-162336-7142671d-0e24-4375-b5dc-2710d8a05d6f.png",
    href: "/gomzi-supplement?search=MuscleTech",
  },
  {
    id: "fastandup",
    name: "Fast&Up",
    logo: "https://files.fggroup.in/development/files/FILE-fastandup-logo-dark-1795004770187.png",
    href: "/gomzi-supplement?search=Fast%26Up",
  },
];

function resolveLogo(comp) {
  const name = (comp?.name || "").trim().toLowerCase();
  const rawLogo = (comp?.logo || comp?.image || "").trim();
  if (
    name.includes("fast&up") ||
    name.includes("fast & up") ||
    name.includes("fastandup") ||
    rawLogo.includes("fup-logo")
  ) {
    return "https://files.fggroup.in/development/files/FILE-fastandup-logo-dark-1795004770187.png";
  }

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

function BrandItem({ brand, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(brand.href)}
      title={brand.tagline ? `${brand.name} - ${brand.tagline}` : brand.name}
      aria-label={brand.name}
      className="group flex h-12 sm:h-14 md:h-16 w-[130px] sm:w-[155px] md:w-[170px] shrink-0 items-center justify-center bg-white px-2 py-1 transition-transform duration-200 hover:scale-110 focus:outline-none cursor-pointer"
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain filter transition-all duration-200 group-hover:drop-shadow-sm"
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
        className="items-center justify-center text-sm font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors text-center"
      >
        {brand.name}
      </span>
    </button>
  );
}

/**
 * Brand stickers marquee moving smoothly from right to left.
 * Loaded dynamically from Admin Panel Companies catalog (/public/v1/companies).
 * Seamless infinite loop with pause on hover for interactive brand selection.
 */
export default function BrandRangeSection() {
  const navigate = useNavigate();

  const [brands, setBrands] = useState(() => {
    const cached = getLocalCache(COMPANIES_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      const valid = cached
        .filter((c) => c && c.logo && !c.logo.includes("/images/brands/"))
        .map((c) => {
          const name = (c?.name || "").trim().toLowerCase();
          const logo = (c?.logo || "").trim();
          if (
            name.includes("fast&up") ||
            name.includes("fast & up") ||
            name.includes("fastandup") ||
            logo.includes("fup-logo")
          ) {
            return {
              ...c,
              logo: "https://files.fggroup.in/development/files/FILE-fastandup-logo-dark-1795004770187.png",
            };
          }
          return c;
        });
      if (valid.length > 0) return valid;
    }
    return FALLBACK_BRANDS;
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

  const activeList = brands && brands.length > 0 ? brands : FALLBACK_BRANDS;

  // Ensure enough items in a set to cleanly fill ultra-wide screens before looping
  const displaySet = activeList.length < 8 ? [...activeList, ...activeList] : activeList;

  return (
    <section className="relative w-full bg-white border-t border-b border-stone-200/80 py-5 sm:py-6 overflow-hidden select-none">
      {/* Edge gradient fade masks for smooth entrance & exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Right-to-Left Continuous Scrolling Track */}
      <div className="w-full overflow-hidden">
        <div className="brand-marquee-track flex items-center">
          {/* Track Set 1 */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-12 shrink-0 pr-6 sm:pr-10 md:pr-12">
            {displaySet.map((brand, idx) => (
              <BrandItem
                key={`b1-${brand.id || brand.name}-${idx}`}
                brand={brand}
                onSelect={(href) => navigate(href)}
              />
            ))}
          </div>

          {/* Track Set 2 (Identical replica for seamless infinite loop) */}
          <div
            className="flex items-center gap-6 sm:gap-10 md:gap-12 shrink-0 pr-6 sm:pr-10 md:pr-12"
            aria-hidden="true"
          >
            {displaySet.map((brand, idx) => (
              <BrandItem
                key={`b2-${brand.id || brand.name}-${idx}`}
                brand={brand}
                onSelect={(href) => navigate(href)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
