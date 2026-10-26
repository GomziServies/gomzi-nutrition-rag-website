import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "../common/Marquee";
import { getCompaniesApi } from "../../api/company.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const COMPANIES_CACHE_KEY = "gomzi_companies_brand_rail_cache";

const FALLBACK_BRAND_LOGOS = {
  "truebasics": "/images/brands/truebasics.svg",
  "ronnie coleman": "/images/brands/ronnie-coleman.svg",
  "optimum nutrition": "/images/brands/optimum-nutrition.svg",
  "optimum nutrition (on)": "/images/brands/optimum-nutrition.svg",
  "gritzo": "/images/brands/gritzo.svg",
  "fuel one": "/images/brands/fuel-one.svg",
  "isopure": "/images/brands/isopure.svg",
  "dymatize": "/images/brands/dymatize.svg",
  "muscleblaze": "/images/brands/muscleblaze.svg",
  "muscletech": "/images/brands/muscletech.svg",
  "myprotein": "/images/brands/myprotein.svg",
  "gnc": "/images/brands/gnc.svg",
  "as-it-is": "/images/brands/as-it-is.svg",
  "asitis": "/images/brands/as-it-is.svg",
  "hk vitals": "/images/brands/hk-vitals.svg",
  "gomzi nutrition": "/images/brands/gomzi.svg",
};

const DEFAULT_BRANDS = [
  {
    id: "b1",
    name: "TrueBasics",
    logo: "/images/brands/truebasics.svg",
    href: "/gomzi-supplement?search=truebasics",
  },
  {
    id: "b2",
    name: "Ronnie Coleman",
    logo: "/images/brands/ronnie-coleman.svg",
    href: "/gomzi-supplement?search=ronnie",
  },
  {
    id: "b3",
    name: "Optimum Nutrition",
    logo: "/images/brands/optimum-nutrition.svg",
    href: "/gomzi-supplement?search=optimum",
  },
  {
    id: "b4",
    name: "Gritzo",
    logo: "/images/brands/gritzo.svg",
    href: "/gomzi-supplement?search=gritzo",
  },
  {
    id: "b5",
    name: "Fuel One",
    logo: "/images/brands/fuel-one.svg",
    href: "/gomzi-supplement?search=fuel",
  },
  {
    id: "b6",
    name: "Isopure",
    logo: "/images/brands/isopure.svg",
    href: "/gomzi-supplement?search=isopure",
  },
  {
    id: "b7",
    name: "Dymatize",
    logo: "/images/brands/dymatize.svg",
    href: "/gomzi-supplement?search=dymatize",
  },
  {
    id: "b8",
    name: "MuscleBlaze",
    logo: "/images/brands/muscleblaze.svg",
    href: "/gomzi-supplement?search=muscleblaze",
  },
  {
    id: "b9",
    name: "MuscleTech",
    logo: "/images/brands/muscletech.svg",
    href: "/gomzi-supplement?search=muscletech",
  },
  {
    id: "b10",
    name: "MyProtein",
    logo: "/images/brands/myprotein.svg",
    href: "/gomzi-supplement?search=myprotein",
  },
  {
    id: "b11",
    name: "GNC",
    logo: "/images/brands/gnc.svg",
    href: "/gomzi-supplement?search=gnc",
  },
  {
    id: "b12",
    name: "AS-IT-IS",
    logo: "/images/brands/as-it-is.svg",
    href: "/gomzi-supplement?search=asitis",
  },
  {
    id: "b13",
    name: "HK Vitals",
    logo: "/images/brands/hk-vitals.svg",
    href: "/gomzi-supplement?search=shilajit",
  },
  {
    id: "b14",
    name: "Gomzi Nutrition",
    logo: "/images/brands/gomzi.svg",
    href: "/gomzi-supplement",
  },
];

function resolveLogo(comp) {
  if (comp.logo && typeof comp.logo === "string" && comp.logo.trim()) {
    const clean = comp.logo.trim();
    if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("/")) {
      return clean;
    }
    return `https://files.fggroup.in/${clean}`;
  }
  const key = (comp.name || comp.slug || "").toLowerCase().trim();
  return FALLBACK_BRAND_LOGOS[key] || "";
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
 */
export default function BrandRangeSection() {
  const navigate = useNavigate();
  const railRef = useRef(null);

  const [brands, setBrands] = useState(() => {
    const cached = getLocalCache(COMPANIES_CACHE_KEY);
    if (Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return DEFAULT_BRANDS;
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
            }));

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
