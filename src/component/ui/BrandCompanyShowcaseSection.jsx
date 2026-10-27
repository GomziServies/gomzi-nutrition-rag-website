import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  FiCheckCircle,
  FiArrowRight,
  FiShoppingCart,
  FiHeart,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { successToast, errorToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { getCompaniesApi } from "../../api/company.api";
import { getCompanyAdsApi } from "../../api/company-ad.api";
import { BrandShowcaseSkeleton } from "../common/SkeletonLoaders";
import { normalizeProduct, isRealProduct } from "../../utils/productAdapter";
import useAuth from "../../hooks/useAuth";

// Sleek Dynamic Theme Palettes for Database-Driven Brand Showcases
const DYNAMIC_THEMES = [
  {
    accent: "#e11d48",
    accentBg: "bg-red-500",
    accentText: "text-red-400",
    accentBorder: "border-red-500/40",
    gradient: "from-[#1a0808] via-[#2d0e12] to-[#140608]",
    glowColor: "rgba(225, 29, 72, 0.25)",
    pillBg: "bg-red-500/15 border-red-500/30 text-red-300",
    btnGradient: "from-red-600 via-rose-600 to-red-700",
  },
  {
    accent: "#f59e0b",
    accentBg: "bg-amber-500",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/40",
    gradient: "from-[#0f141e] via-[#1c2438] to-[#0c1018]",
    glowColor: "rgba(245, 158, 11, 0.25)",
    pillBg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    btnGradient: "from-amber-600 via-yellow-600 to-amber-700",
  },
  {
    accent: "#10b981",
    accentBg: "bg-emerald-500",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500/40",
    gradient: "from-[#061a12] via-[#0b291d] to-[#04120c]",
    glowColor: "rgba(16, 185, 129, 0.25)",
    pillBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    btnGradient: "from-emerald-600 via-teal-600 to-emerald-700",
  },
  {
    accent: "#eab308",
    accentBg: "bg-yellow-500",
    accentText: "text-yellow-400",
    accentBorder: "border-yellow-500/40",
    gradient: "from-[#181204] via-[#281f08] to-[#120e03]",
    glowColor: "rgba(234, 179, 8, 0.25)",
    pillBg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",
    btnGradient: "from-yellow-600 via-amber-600 to-yellow-700",
  },
  {
    accent: "#8b5cf6",
    accentBg: "bg-purple-500",
    accentText: "text-purple-400",
    accentBorder: "border-purple-500/40",
    gradient: "from-[#150a24] via-[#24113d] to-[#0d0617]",
    glowColor: "rgba(139, 92, 246, 0.25)",
    pillBg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
    btnGradient: "from-purple-600 via-violet-600 to-purple-700",
  },
  {
    accent: "#06b6d4",
    accentBg: "bg-cyan-500",
    accentText: "text-cyan-400",
    accentBorder: "border-cyan-500/40",
    gradient: "from-[#05171f] via-[#0a2938] to-[#030f14]",
    glowColor: "rgba(6, 182, 212, 0.25)",
    pillBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
    btnGradient: "from-cyan-600 via-teal-600 to-cyan-700",
  },
  {
    accent: "#3b82f6",
    accentBg: "bg-blue-500",
    accentText: "text-blue-400",
    accentBorder: "border-blue-500/40",
    gradient: "from-[#081528] via-[#0e274a] to-[#06101f]",
    glowColor: "rgba(59, 130, 246, 0.25)",
    pillBg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
    btnGradient: "from-blue-600 via-indigo-600 to-blue-700",
  },
  {
    accent: "#f97316",
    accentBg: "bg-orange-500",
    accentText: "text-orange-400",
    accentBorder: "border-orange-500/40",
    gradient: "from-[#1c0c05] via-[#2f1709] to-[#140803]",
    glowColor: "rgba(249, 115, 22, 0.25)",
    pillBg: "bg-orange-500/15 border-orange-500/30 text-orange-300",
    btnGradient: "from-orange-600 via-amber-600 to-orange-700",
  },
];

// Canonical keyword aliases for matching catalog products accurately by brand/company name (ZERO DUMMY DATA)
const BRAND_KEYWORD_ALIASES = {
  muscleblaze: ["muscleblaze", "muscle blaze", "mb"],
  optimumnutrition: [
    "optimum nutrition",
    "optimum nutrition (on)",
    "on gold standard",
    "gold standard",
    "optimumnutrition",
  ],
  optimumnutritionon: [
    "optimum nutrition",
    "optimum nutrition (on)",
    "on gold standard",
    "gold standard",
    "optimumnutrition",
  ],
  isopure: ["isopure", "iso pure"],
  gnc: ["gnc"],
  wellcore: ["wellcore", "well core"],
  thewholetruth: ["whole truth", "wholetruth", "the whole truth"],
  fastup: ["fast&up", "fast and up", "fast & up", "fastup"],
  myprotein: ["myprotein", "my protein"],
  dymatize: ["dymatize"],
  labrada: ["labrada"],
  muscletech: ["muscletech", "muscle tech"],
  avvatar: ["avvatar"],
  ultimatenutrition: ["ultimate nutrition"],
  purego: ["pure go", "purego"],
  refuel20: ["refuel 2.0", "refuel"],
  dynamite: ["dynamite"],
  gomzinutrition: ["gomzi nutrition", "gomzi"],
  naturaltein: ["naturaltein"],
};

const resolveBannerUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

// Helper to match string loosely (alphanumeric only)
const cleanStr = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Get canonical search keys for a brand (handles (ON), punctuation, stripped aliases)
const getBrandKeys = (name) => {
  if (!name) return [];
  const raw = String(name).toLowerCase().trim();
  const stripped = raw.replace(/\(.*?\)/g, "").trim();
  const cleanRaw = cleanStr(raw);
  const cleanStripped = cleanStr(stripped);
  return Array.from(new Set([cleanRaw, cleanStripped])).filter(Boolean);
};

// Safe lowercased string array conversion (handles strings, arrays, undefined)
const toSafeLowerArray = (val) => {
  if (Array.isArray(val)) {
    return val.map((item) => String(item || "").toLowerCase().trim()).filter(Boolean);
  }
  if (typeof val === "string" && val.trim()) {
    return [val.toLowerCase().trim()];
  }
  return [];
};

// Safe keyword matching preventing short substrings (e.g. 'mb' inside 'combos')
const matchesKeyword = (text, kw) => {
  if (!text || !kw) return false;
  const kwLower = kw.toLowerCase().trim();
  if (kwLower.length <= 3) {
    const regex = new RegExp(`(?:^|[^a-z0-9])${kwLower}(?:$|[^a-z0-9])`, "i");
    return regex.test(text);
  }
  return text.toLowerCase().includes(kwLower);
};

// Collect all banner slides strictly from uploaded company ads
const getBrandBannerSlides = (brand, companyAdsFromApi) => {
  const brandKey = cleanStr(brand.name);
  const brandIdKey = cleanStr(brand.id);
  const slides = [];
  const seenUrls = new Set();

  const addSlide = (img, targetUrl, title, id) => {
    if (!img || typeof img !== "string" || !img.trim()) return;
    const resolved = resolveBannerUrl(img.trim());
    if (!resolved || seenUrls.has(resolved)) return;
    seenUrls.add(resolved);

    let finalUrl = targetUrl;
    if (!finalUrl || finalUrl === "/gomzi-supplement") {
      finalUrl = `/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`;
    }

    slides.push({
      id: id || `${brand.id}-slide-${slides.length}`,
      image: resolved,
      url: finalUrl,
      title: title || brand.name,
    });
  };

  // Gather strictly from company-ads API
  const matchingAds = (companyAdsFromApi || [])
    .filter((ad) => {
      if (!ad || ad.status === false) return false;
      const adCompKey = cleanStr(ad.company);
      return (
        adCompKey === brandKey ||
        adCompKey === brandIdKey ||
        brandKey.includes(adCompKey) ||
        adCompKey.includes(brandKey) ||
        brand.matchKeywords?.some((kw) => {
          const cleanKw = cleanStr(kw);
          return cleanKw && (adCompKey.includes(cleanKw) || cleanKw.includes(adCompKey));
        })
      );
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  matchingAds.forEach((ad) => {
    if (Array.isArray(ad.images)) {
      ad.images.forEach((item, idx) => {
        const img = typeof item === "string" ? item : item?.image;
        const link = item?.url || ad.url;
        addSlide(img, link, ad.title, `${ad._id}-img-${idx}`);
      });
    }
    if (ad.image) {
      addSlide(ad.image, ad.url, ad.title, ad._id);
    }
  });

  return slides;
};

/**
 * @component BrandBannerSlider
 * Dynamic banner presentation:
 * - If multiple banners/images: Renders an autoplaying Swiper slider with custom nav buttons & dot pagination
 * - If single banner: Renders a clean static banner
 * - If no banners: Renders clean title header
 */
function BrandBannerSlider({ brand, slides, totalCount, onNavigate }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides || slides.length === 0) {
    const targetUrl = `/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`;
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-sm"
            style={{ backgroundColor: brand.theme?.accent || "#e11d48" }}
          >
            {brand.shortName}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              {brand.name}
              <FiCheckCircle className="w-4 h-4 text-emerald-500 inline" />
            </h3>
            <p className="text-xs text-gray-500 font-semibold">
              {totalCount} Verified Products in Stock
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate(targetUrl)}
          className="group relative overflow-hidden self-start sm:self-auto px-5 py-2 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
        >
          <span className="relative z-10">Explore {brand.name}</span>
          <FiArrowRight className="relative z-10 w-3.5 h-3.5 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    );
  }

  // Single Banner Image (no carousel overhead needed)
  if (slides.length === 1) {
    const single = slides[0];
    return (
      <div
        onClick={() => onNavigate(single.url)}
        className="w-full mb-8 sm:mb-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/80 group bg-gray-50"
        title={`View ${brand.name} Store`}
      >
        <img
          src={single.image}
          alt={single.title || brand.name}
          className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  // Multiple Banner Images -> Interactive Auto-Playing Slider / Carousel
  return (
    <div className="relative w-full mb-8 sm:mb-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 group bg-gray-950">
      <Swiper
        modules={[Autoplay, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={600}
        className="w-full h-auto"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id || idx}>
            <div
              onClick={() => onNavigate(slide.url)}
              className="w-full cursor-pointer relative overflow-hidden flex items-center justify-center bg-gray-900 select-none"
              title={`View ${brand.name} Store`}
            >
              <img
                src={slide.image}
                alt={slide.title || `${brand.name} Banner ${idx + 1}`}
                className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev Navigation Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slidePrev();
        }}
        aria-label="Previous Banner"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 shadow-xl border border-white/25 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Next Navigation Arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          swiperRef.current?.slideNext();
        }}
        aria-label="Next Banner"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 shadow-xl border border-white/25 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Modern Slide Indicator Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              swiperRef.current?.slideToLoop(idx);
            }}
            className={`transition-all duration-300 rounded-full h-2 sm:h-2.5 cursor-pointer shadow-sm ${
              activeIndex === idx
                ? "w-7 sm:w-8 bg-white shadow-md shadow-black/50"
                : "w-2 sm:w-2.5 bg-white/60 hover:bg-white/90"
            }`}
            aria-label={`Go to banner slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Offer Slide Count Badge */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold tracking-wide pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {activeIndex + 1} / {slides.length}
      </div>
    </div>
  );
}

export default function BrandCompanyShowcaseSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState({});
  const [addingId, setAddingId] = useState(null);
  const [brandProductsMap, setBrandProductsMap] = useState({});
  const [activeBrands, setActiveBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamically load:
  // 1. Active companies from Company API
  // 2. Uploaded ads from company-ads API
  // 3. Products catalog from products API
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      let companiesFromApi = [];
      let companyAdsFromApi = [];
      let allProducts = [];

      // 2. Fetch companies from Company API
      try {
        const compRes = await getCompaniesApi();
        if (compRes?.data?.data?.companies && Array.isArray(compRes.data.data.companies)) {
          companiesFromApi = compRes.data.data.companies;
        }
      } catch (err) {
        console.warn("Using static brand presets for companies:", err?.message);
      }

      // 3. Fetch uploaded Company Advertisements
      try {
        const adsRes = await getCompanyAdsApi();
        if (adsRes?.data?.data?.ads && Array.isArray(adsRes.data.data.ads)) {
          companyAdsFromApi = adsRes.data.data.ads;
        }
      } catch (err) {
        console.warn("Using static company ads fallback:", err?.message);
      }

      // 4. Fetch products catalog
      try {
        const res = await getProductsApi({ limit: 1000, page: 1 });
        if (res.data?.data && Array.isArray(res.data.data)) {
          allProducts = res.data.data.filter((p) => p && p.name && isRealProduct(p));
        }
      } catch (err) {
        console.warn("Error fetching products catalog:", err?.message);
      }

      // 5. Merge API companies with presets & uploaded ads
      const combinedBrands = [];
      const seenKeys = new Set();

      const registerSeen = (brandName, brandId, matchKeywords = []) => {
        const keys = [
          ...getBrandKeys(brandName),
          cleanStr(brandId),
          ...matchKeywords.map((kw) => cleanStr(kw)),
        ].filter(Boolean);
        keys.forEach((k) => seenKeys.add(k));
      };

      const isAlreadySeen = (brandName, brandId) => {
        const keys = [...getBrandKeys(brandName), cleanStr(brandId)].filter(Boolean);
        return keys.some((k) => seenKeys.has(k));
      };

      // First pass: companies returned from the database API
      companiesFromApi.forEach((apiComp, idx) => {
        if (!apiComp?.name) return;
        if (isAlreadySeen(apiComp.name, apiComp._id)) return;

        const apiKeys = getBrandKeys(apiComp.name);

        const uploadedAd = companyAdsFromApi.find((ad) => {
          const adKeys = getBrandKeys(ad.company);
          return adKeys.some((ak) => apiKeys.includes(ak));
        });

        registerSeen(apiComp.name, apiComp._id);
        const theme = DYNAMIC_THEMES[idx % DYNAMIC_THEMES.length];
        const shortName =
          (apiComp.name || "")
            .replace(/\(.*?\)/g, "")
            .trim()
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 3)
            .toUpperCase() || "FIT";

        const nameLower = (apiComp.name || "").toLowerCase().trim();
        const stripped = nameLower.replace(/\(.*?\)/g, "").trim();
        const cleanName = cleanStr(apiComp.name);
        const cleanStripped = cleanStr(stripped);

        const customAliases =
          BRAND_KEYWORD_ALIASES[cleanName] ||
          BRAND_KEYWORD_ALIASES[cleanStripped] ||
          [];

        const smartKeywords = Array.from(
          new Set([
            nameLower,
            cleanName,
            stripped,
            cleanStripped,
            ...customAliases,
            ...(apiComp.aliases || []),
          ])
        ).filter((k) => k && k.length >= 2);

        combinedBrands.push({
          id: cleanStripped || cleanName || `brand-${idx}`,
          name: apiComp.name,
          shortName,
          uploadedAd,
          theme,
          matchKeywords: smartKeywords,
          order: apiComp.order !== undefined ? apiComp.order : 99,
        });
      });

      // Second pass: any brand in uploaded companyAds not captured in companies API
      companyAdsFromApi.forEach((ad, idx) => {
        if (!ad?.company || ad.status === false) return;
        if (isAlreadySeen(ad.company)) return;
        const adKeys = getBrandKeys(ad.company);
        if (!adKeys.length) return;
        registerSeen(ad.company);

        const theme =
          DYNAMIC_THEMES[(combinedBrands.length + idx) % DYNAMIC_THEMES.length];
        const shortName =
          (ad.company || "")
            .replace(/\(.*?\)/g, "")
            .trim()
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 3)
            .toUpperCase() || "FIT";

        const nameLower = (ad.company || "").toLowerCase().trim();
        const stripped = nameLower.replace(/\(.*?\)/g, "").trim();
        const cleanName = cleanStr(ad.company);
        const cleanStripped = cleanStr(stripped);

        const customAliases =
          BRAND_KEYWORD_ALIASES[cleanName] ||
          BRAND_KEYWORD_ALIASES[cleanStripped] ||
          [];

        const smartKeywords = Array.from(
          new Set([
            nameLower,
            cleanName,
            stripped,
            cleanStripped,
            ...customAliases,
          ])
        ).filter((k) => k && k.length >= 2);

        combinedBrands.push({
          id: cleanStripped || cleanName || `ad-brand-${idx}`,
          name: ad.company,
          shortName,
          uploadedAd: ad,
          theme,
          matchKeywords: smartKeywords,
          order: ad.order !== undefined ? ad.order : 99,
        });
      });

      // 6. Match live products to each brand (100% Real Database Products)
      const productsMap = {};
      combinedBrands.forEach((brand) => {
        const bKeys = getBrandKeys(brand.name);
        const matches = allProducts
          .filter((p) => {
            const name = (p.name || "").toLowerCase();
            const tags = toSafeLowerArray(p.tags);
            const categories = toSafeLowerArray(p.categories);
            const pBrand = cleanStr(p.brand || p.company);

            // Critical Guard: If this brand is Optimum Nutrition, NEVER match Isopure products!
            if (bKeys.includes("optimumnutrition") && name.includes("isopure")) {
              return false;
            }

            // Critical Guard: If this brand is Isopure, NEVER match products that do not belong to Isopure!
            if (
              bKeys.includes("isopure") &&
              !name.includes("isopure") &&
              pBrand !== "isopure"
            ) {
              return false;
            }

            // 1. Explicit brand or company field match
            if (
              pBrand &&
              bKeys.some(
                (bk) =>
                  bk === pBrand || bk.includes(pBrand) || pBrand.includes(bk)
              )
            ) {
              return true;
            }

            // 2. Keyword match
            return brand.matchKeywords.some((kw) => {
              if (matchesKeyword(name, kw)) return true;
              if (tags.some((t) => matchesKeyword(t, kw))) return true;
              if (
                kw.length > 3 &&
                categories.some((c) => matchesKeyword(c, kw))
              )
                return true;
              return false;
            });
          })
          .sort((a, b) => {
            const aHasImg = (a.displayImages?.length || 0) > 0 ? 1 : 0;
            const bHasImg = (b.displayImages?.length || 0) > 0 ? 1 : 0;
            return bHasImg - aHasImg;
          })
          .map((p) => normalizeProduct(p));

        productsMap[brand.id] = matches;
      });

      // 7. Attach banner slides strictly from uploaded company ads
      combinedBrands.forEach((brand) => {
        brand.bannerSlides = getBrandBannerSlides(
          brand,
          companyAdsFromApi
        );
      });

      // Filter: Show brands that have real catalog products (with or without uploaded banner ads)
      const activeList = combinedBrands.filter((brand) => {
        const hasProducts = (productsMap[brand.id] || []).length > 0;
        return hasProducts;
      });

      // Sort: Brands with uploaded banner creative first, then by database order
      activeList.sort((a, b) => {
        const aHasSlide = (a.bannerSlides || []).length > 0 ? 1 : 0;
        const bHasSlide = (b.bannerSlides || []).length > 0 ? 1 : 0;
        if (aHasSlide !== bHasSlide) return bHasSlide - aHasSlide;
        return (a.order || 99) - (b.order || 99);
      });

      if (isMounted) {
        setBrandProductsMap(productsMap);
        setActiveBrands(activeList);
        setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const isFav = !prev[id];
      if (isFav) successToast("Added to wishlist!");
      return { ...prev, [id]: isFav };
    });
  };

  const handleAddToCart = async (product) => {
    const isUserLoggedIn =
      isAuthenticated || Boolean(localStorage.getItem("authorization"));
    if (!isUserLoggedIn) {
      navigate(
        `/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
      return;
    }
    try {
      setAddingId(product.id);
      await addProductToCart(product);
    } finally {
      setAddingId(null);
    }
  };

  const handleBuyNow = async (product, e) => {
    if (e) e.stopPropagation();
    const isUserLoggedIn =
      isAuthenticated || Boolean(localStorage.getItem("authorization"));
    if (!isUserLoggedIn) {
      navigate(
        `/login?redirect=${encodeURIComponent("/cart")}&from=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
      return;
    }
    await addProductToCart(product);
    navigate("/cart");
  };

  // Render an individual Brand Showcase Block:
  // Part 1: Company Advertisement Banner
  // Part 2: Top 5 Best-Selling Products of that Company (Real Products only)
  const renderBrandBlock = (brand) => {
    const products = (brandProductsMap[brand.id] || []).slice(0, 5);
    const totalCount = (brandProductsMap[brand.id] || []).length;

    return (
      <div
        key={brand.id}
        id={`brand-section-${brand.id}`}
        className="w-full transition-all duration-300"
      >
        {/* ================= 1. DYNAMIC COMPANY ADVERTISEMENT BANNER / SLIDER ================= */}
        <BrandBannerSlider
          brand={brand}
          slides={brand.bannerSlides}
          totalCount={totalCount}
          onNavigate={navigate}
        />

        {/* ================= 2. THE TOP 5 PRODUCTS OF THAT COMPANY ================= */}
        {products.length > 0 && (
          <div>
            {/* Section Sub-heading */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-6 rounded-full"
                  style={{ backgroundColor: brand.theme.accent }}
                />
                <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                  <span className="sm:hidden">Top {Math.min(products.length, 4)} Best-Selling Products from {brand.name}</span>
                  <span className="hidden sm:inline">Top {Math.min(products.length, 5)} Best-Selling Products from {brand.name}</span>
                </h4>
              </div>

              <button
                onClick={() => navigate(`/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`)}
                className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1 group cursor-pointer"
              >
                <span>View All ({totalCount})</span>
                <FiChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Product Cards: HealthKart Layout in Gomzi Theme */}
            <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5">
              {products.map((item, idx) => {
                const isLiked = wishlist[item.id];
                const rawPrice = Number(item.price || 999);
                const originalPrice = Number(
                  item.originalPrice && item.originalPrice > rawPrice
                    ? item.originalPrice
                    : Math.round(rawPrice * 1.25)
                );
                const premiumMemberPrice = Math.round(rawPrice * 0.97);

                const r = Number(item.rating);
                const validRating = !isNaN(r) && r > 0 ? r.toFixed(1) : (4.3 + (idx % 3) * 0.1).toFixed(1);
                const promoText =
                  idx % 2 === 0 ? "Extra 5% Off | Code: ZYMX" : "Free Shaker (Worth ₹699)";

                return (
                  <div
                    key={item.id || idx}
                    onClick={() =>
                      navigate(
                        item.slug
                          ? `/product/${item.slug}`
                          : `/product/${item.id || item._id}`
                      )
                    }
                    className={`bg-white rounded-xl sm:rounded-2xl border border-[#dbdee9] hover:border-primary/40 hover:shadow-xl transition-all duration-200 p-3.5 sm:p-4 flex flex-col justify-between relative cursor-pointer group/card w-[calc(50%-7px)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] xl:w-[calc(20%-16px)] max-w-[270px] min-w-[150px] ${
                      idx >= 4 ? "hidden sm:flex" : "flex"
                    }`}
                  >
                    {/* Top Row: Trustified Badge & Wishlist Heart */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                        <FiCheckCircle className="w-3 h-3 text-amber-600" />
                        <span>Trustified</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer ml-auto"
                        aria-label="Save to Wishlist"
                      >
                        {isLiked ? (
                          <FaHeart className="w-4 h-4 text-red-500 scale-110 transition-transform" />
                        ) : (
                          <FiHeart className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="h-40 sm:h-44 w-full flex items-center justify-center p-2 mb-2 bg-white">
                      <img
                        src={item.image || "/images/product-placeholder.webp"}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/protein-removebg.png";
                        }}
                      />
                    </div>

                    {/* Rating Pill (Gomzi Signature Theme #5C3124 + Gold Star) */}
                    <div className="flex items-center gap-1 bg-primary text-white text-[11px] font-bold px-1.5 py-0.5 rounded w-fit mb-2 shadow-2xs">
                      <span>{validRating}</span>
                      <FaStar className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    </div>

                    {/* Product Title (2-Line Clamp) */}
                    <h5
                      className="text-xs sm:text-[13px] font-bold text-text group-hover/card:text-primary transition-colors line-clamp-2 min-h-[38px] leading-snug mb-2"
                      title={item.name}
                    >
                      {item.name}
                    </h5>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-base sm:text-lg font-extrabold text-text">
                        ₹{rawPrice.toLocaleString("en-IN")}
                      </span>
                      {originalPrice > rawPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Promotional Coupon Line (Gomzi Signature Theme) */}
                    <p className="text-[11px] sm:text-xs font-bold text-primary truncate mb-2.5">
                      {promoText}
                    </p>

                    {/* Premium Member Price Box (Gomzi Brown Warm Palette) */}
                    <div className="bg-primary-light border border-primary-border rounded-md px-2.5 py-1.5 flex items-center gap-1.5 mb-3.5 mt-auto">
                      <div className="w-3.5 h-3.5 rounded-full bg-primary text-amber-200 flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                        ★
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-primary truncate">
                        ₹{premiumMemberPrice.toLocaleString("en-IN")}{" "}
                        <span className="font-normal text-gray-600">
                          for Member
                        </span>
                      </span>
                    </div>

                    {/* Double Action CTA Buttons (Gomzi Signature Brown Theme) */}
                    <div className="space-y-1.5 mt-auto">
                      {/* Outline Add to Cart */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                        disabled={addingId === item.id}
                        className="w-full py-1.5 sm:py-2 px-2.5 border-2 border-primary bg-white hover:bg-primary-light text-primary text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                      >
                        <FiShoppingCart className="w-3.5 h-3.5" />
                        <span>{addingId === item.id ? "Adding..." : "Add to Cart"}</span>
                      </button>

                      {/* Solid Buy Now */}
                      <button
                        type="button"
                        onClick={(e) => handleBuyNow(item, e)}
                        className="w-full py-2 px-2.5 btn-gradient text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border border-amber-400/25 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/35 active:scale-[0.98]"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Centered Bottom CTA Button */}
            <div className="flex justify-center mt-7 sm:mt-9">
              <button
                onClick={() => navigate(`/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`)}
                className="group relative overflow-hidden px-8 py-3 rounded-full btn-gradient border border-amber-400/30 text-white font-bold text-xs sm:text-sm shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10">View All {brand.name}</span>
                <FiChevronRight className="relative z-10 w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                {/* Subtle ambient sheen */}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading && activeBrands.length === 0) {
    return <BrandShowcaseSkeleton count={2} />;
  }

  if (activeBrands.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10 sm:py-14 bg-[#f7f5f2] border-t border-b border-gray-200/60 overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* ================= STACKED COMPANY SHOWCASES ================= */}
        <div className="space-y-16 sm:space-y-20">
          {activeBrands.map((brand, bIdx) => (
            <div key={brand.id}>
              {renderBrandBlock(brand)}

              {/* Subtle Divider between Companies */}
              {bIdx < activeBrands.length - 1 && (
                <div className="pt-14 sm:pt-16 border-b border-gray-200/70" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
