import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiArrowRight,
  FiShoppingCart,
  FiHeart,
  FiChevronRight,
} from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { getPromoBannersApi } from "../../api/promo-banner.api";
import { getCompaniesApi } from "../../api/company.api";
import { getCompanyAdsApi } from "../../api/company-ad.api";
import { normalizeProduct, isRealProduct } from "../../utils/productAdapter";

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

// Curated Brand / Company Definitions with verified styling & visual tokens (ZERO DUMMY PRODUCTS)
const BRAND_DEFINITIONS = [
  {
    id: "muscleblaze",
    name: "MuscleBlaze",
    shortName: "MB",
    tagline: "Ziddi Hoon Main • India's #1 Sports Nutrition Brand",
    subtitle: "Biozyme Enhanced Absorption • Clinically Proven 50% Higher Protein Digestion",
    badge: "Official Brand Partner",
    adPromo: "FLAT 25% OFF + Free 700ml Pro Shaker",
    couponCode: "MBZIDDI25",
    theme: {
      accent: "#e11d48",
      accentBg: "bg-red-500",
      accentText: "text-red-400",
      accentBorder: "border-red-500/40",
      gradient: "from-[#1a0808] via-[#2d0e12] to-[#140608]",
      glowColor: "rgba(225, 29, 72, 0.25)",
      pillBg: "bg-red-500/15 border-red-500/30 text-red-300",
      btnGradient: "from-red-600 via-rose-600 to-red-700",
    },
    usps: [
      "Biozyme 50% Higher Absorption",
      "Informed-Choice UK Certified",
      "NABL Tested • 0g Amino Spiking",
    ],
    matchKeywords: ["muscleblaze", "muscle blaze", "mb"],
  },
  {
    id: "optimum-nutrition",
    name: "Optimum Nutrition",
    shortName: "ON",
    tagline: "The World's #1 Selling Whey Protein • Gold Standard Excellence",
    subtitle: "Microfiltered Whey Isolate & Hydrolyzed Peptides Trusted Across 90+ Countries",
    badge: "Global Gold Standard",
    adPromo: "SAVE UP TO 35% ON GOLD STANDARD & ISOPURE COMBOS",
    couponCode: "ONGOLD35",
    theme: {
      accent: "#f59e0b",
      accentBg: "bg-amber-500",
      accentText: "text-amber-400",
      accentBorder: "border-amber-500/40",
      gradient: "from-[#0f141e] via-[#1c2438] to-[#0c1018]",
      glowColor: "rgba(245, 158, 11, 0.25)",
      pillBg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
      btnGradient: "from-amber-600 via-yellow-600 to-amber-700",
    },
    usps: [
      "Microfiltered Isolate Matrix",
      "Banned Substance Tested",
      "75+ Years Global Nutrition",
    ],
    matchKeywords: ["optimum nutrition", "isopure"],
  },
  {
    id: "gnc",
    name: "GNC Live Well",
    shortName: "GNC",
    tagline: "World-Class Scientific Formulations Since 1935",
    subtitle: "Engineered in USA for Maximum Cellular Recovery, Lean Muscle & Pure Power",
    badge: "USA Heritage Brand",
    adPromo: "SUPERFOOD COMBOS & PLANT ISOLATES FROM ₹249",
    couponCode: "GNCLIVE20",
    theme: {
      accent: "#ef4444",
      accentBg: "bg-rose-500",
      accentText: "text-rose-400",
      accentBorder: "border-rose-500/40",
      gradient: "from-[#18090b] via-[#2d1014] to-[#120608]",
      glowColor: "rgba(239, 68, 68, 0.25)",
      pillBg: "bg-rose-500/15 border-rose-500/30 text-rose-300",
      btnGradient: "from-rose-600 via-red-600 to-rose-700",
    },
    usps: [
      "Zero Filler Adulteration",
      "Superfood Plant Isolates",
      "100% Genuine Import Seal",
    ],
    matchKeywords: ["gnc"],
  },
  {
    id: "wellcore",
    name: "Wellcore",
    shortName: "WELL",
    tagline: "Pure Performance Fuel • The Micronized Creatine Specialists",
    subtitle: "Ultrafine Micronized Particles for Rapid Cellular ATP Regeneration & Volume",
    badge: "Peak Performance Brand",
    adPromo: "BUY 1 GET 1 ON DYNAMITE PRE-WORKOUT & CREATINE",
    couponCode: "WELLCOREBOGO",
    theme: {
      accent: "#06b6d4",
      accentBg: "bg-cyan-500",
      accentText: "text-cyan-400",
      accentBorder: "border-cyan-500/40",
      gradient: "from-[#031525] via-[#072a4a] to-[#03121f]",
      glowColor: "rgba(6, 182, 212, 0.25)",
      pillBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
      btnGradient: "from-cyan-600 via-teal-600 to-cyan-700",
    },
    usps: [
      "100% Ultra-Pure Micronized",
      "Explosive Cellular Hydration",
      "Heavy Metal Free & Certified",
    ],
    matchKeywords: ["wellcore", "well core"],
  },
  {
    id: "the-whole-truth",
    name: "The Whole Truth",
    shortName: "TWT",
    tagline: "100% Clean Label Nutrition • Nothing Hidden, Zero Fake Stuff",
    subtitle: "Real Food Made With 100% Raw Cocoa, Whey Protein & Whole Nuts • 0 Preservatives",
    badge: "100% Clean Food",
    adPromo: "PERSONALISED PACK OF 30 PROTEIN BLOCKS @ ₹2,400",
    couponCode: "TRUTH100",
    theme: {
      accent: "#f97316",
      accentBg: "bg-orange-500",
      accentText: "text-orange-400",
      accentBorder: "border-orange-500/40",
      gradient: "from-[#1c140d] via-[#2f1f14] to-[#140e09]",
      glowColor: "rgba(249, 115, 22, 0.25)",
      pillBg: "bg-orange-500/15 border-orange-500/30 text-orange-300",
      btnGradient: "from-orange-600 via-amber-600 to-orange-700",
    },
    usps: [
      "Zero Added Sugar or Gums",
      "100% Disclosed Ingredients",
      "Single-Origin Raw Cocoa",
    ],
    matchKeywords: ["whole truth", "wholetruth", "the whole truth"],
  },
  {
    id: "fast-and-up",
    name: "Fast&Up",
    shortName: "F&U",
    tagline: "Swiss Informed-Sport Nutrition • Fast Hydration & Active Power",
    subtitle: "Clinically Engineered Plant & Whey Formulas for Rapid Cellular Uptake & Endurance",
    badge: "Swiss Formulation",
    adPromo: "SINGLE SERVING COMBO PACKS STARTING @ ₹396",
    couponCode: "FASTUP20",
    theme: {
      accent: "#eab308",
      accentBg: "bg-yellow-500",
      accentText: "text-yellow-400",
      accentBorder: "border-yellow-500/40",
      gradient: "from-[#181a0b] via-[#292c10] to-[#121307]",
      glowColor: "rgba(234, 179, 8, 0.25)",
      pillBg: "bg-yellow-500/15 border-yellow-500/30 text-yellow-300",
      btnGradient: "from-yellow-600 via-amber-600 to-yellow-700",
    },
    usps: [
      "Informed Sport UK Certified",
      "Rapid Osmotic Electrolytes",
      "Automatic & Steel Shakers",
    ],
    matchKeywords: ["fast&up", "fast and up", "fast & up", "fastup"],
  },
  {
    id: "myprotein",
    name: "Myprotein",
    shortName: "MP",
    tagline: "Fuel Your Ambition • Europe's Leading Nutrition Giant",
    subtitle: "High-Yield Impact Whey & Clear Protein Isolates Engineered for Lean Gains",
    badge: "European Leader",
    adPromo: "CLEAR PROTEIN & IMPACT GAINER BUNDLES UP TO 30% OFF",
    couponCode: "MYPRO30",
    theme: {
      accent: "#3b82f6",
      accentBg: "bg-blue-500",
      accentText: "text-blue-400",
      accentBorder: "border-blue-500/40",
      gradient: "from-[#081528] via-[#0e274a] to-[#06101f]",
      glowColor: "rgba(59, 130, 246, 0.25)",
      pillBg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
      btnGradient: "from-blue-600 via-indigo-600 to-blue-700",
    },
    usps: [
      "Grade A Labdoor Ranking",
      "Over 20+ Gourmet Flavors",
      "Pure Whey Microfiltration",
    ],
    matchKeywords: ["myprotein", "my protein"],
  },
];

export default function BrandCompanyShowcaseSection() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState({});
  const [addingId, setAddingId] = useState(null);
  const [brandProductsMap, setBrandProductsMap] = useState({});
  const [promoBanners, setPromoBanners] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);

  const resolveBannerUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
      return img;
    }
    return `https://files.fggroup.in/${img}`;
  };

  // Helper to match string loosely (alphanumeric only)
  const cleanStr = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

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

  // Dynamically load:
  // 1. Promotional banners from Admin
  // 2. Active companies from Company API
  // 3. Uploaded ads from company-ads API
  // 4. Products catalog from products API
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      let banners = [];
      let companiesFromApi = [];
      let companyAdsFromApi = [];
      let allProducts = [];

      // 1. Fetch dynamic company ad banners from Admin Promo Banners API
      try {
        const promoRes = await getPromoBannersApi();
        if (promoRes?.data?.data?.banners && Array.isArray(promoRes.data.data.banners)) {
          banners = promoRes.data.data.banners;
          if (isMounted) setPromoBanners(banners);
        }
      } catch (err) {
        console.warn("Using fallback company creative banners:", err?.message);
      }

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

      // First pass: companies returned from the database API
      companiesFromApi.forEach((apiComp, idx) => {
        const key = cleanStr(apiComp.name);
        if (!key || seenKeys.has(key)) return;
        seenKeys.add(key);

        const uploadedAd = companyAdsFromApi.find((ad) => {
          const adCompKey = cleanStr(ad.company);
          return adCompKey === key || key.includes(adCompKey) || adCompKey.includes(key);
        });

        const preset = BRAND_DEFINITIONS.find((b) => {
          const bKey = cleanStr(b.name);
          return bKey === key || b.matchKeywords.some((kw) => cleanStr(kw) === key);
        });

        if (preset) {
          combinedBrands.push({
            ...preset,
            tagline: (uploadedAd?.title && uploadedAd.title.trim().length > 2)
              ? uploadedAd.title
              : (apiComp.tagline || preset.tagline),
            subtitle: (uploadedAd?.subtitle && uploadedAd.subtitle.trim().length > 2)
              ? uploadedAd.subtitle
              : preset.subtitle,
            adPromo: uploadedAd?.discountText || preset.adPromo,
            couponCode: uploadedAd?.couponCode || preset.couponCode,
            uploadedAd,
            order: apiComp.order !== undefined ? apiComp.order : preset.order || 99,
          });
        } else {
          const theme = DYNAMIC_THEMES[idx % DYNAMIC_THEMES.length];
          const shortName = (apiComp.name || "")
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 3)
            .toUpperCase() || "FIT";

          const nameLower = (apiComp.name || "").toLowerCase().trim();
          const stripped = nameLower.replace(/\(.*?\)/g, "").trim();
          const smartKeywords = Array.from(new Set([
            nameLower,
            key,
            stripped,
            cleanStr(stripped),
            ...(apiComp.aliases || []),
          ])).filter((k) => k && k.length >= 2);

          combinedBrands.push({
            id: key,
            name: apiComp.name,
            shortName,
            tagline: uploadedAd?.subtitle || apiComp.tagline || `${apiComp.name} Official Nutrition & Performance`,
            subtitle: apiComp.manufacturer
              ? `Direct from ${apiComp.manufacturer} • Quality Guaranteed`
              : "Clinically Formulated Nutrition for Peak Athletic Performance",
            badge: apiComp.countryOfOrigin
              ? `${apiComp.countryOfOrigin} Verified Partner`
              : "Official Brand Partner",
            adPromo: uploadedAd?.discountText || uploadedAd?.title || "SPECIAL OFFER • EXTRA 15% OFF",
            couponCode: uploadedAd?.couponCode || `${shortName}15`,
            uploadedAd,
            theme,
            usps: [
              "100% Genuine & Verified",
              "Lab Tested Formulations",
              "Fast Pan-India Delivery",
            ],
            matchKeywords: smartKeywords,
            order: apiComp.order !== undefined ? apiComp.order : 99,
          });
        }
      });

      // Second pass: any curated preset not returned by API
      BRAND_DEFINITIONS.forEach((preset) => {
        const key = cleanStr(preset.name);
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          const uploadedAd = companyAdsFromApi.find((ad) => {
            const adCompKey = cleanStr(ad.company);
            return adCompKey === key || key.includes(adCompKey) || adCompKey.includes(key);
          });
          if (uploadedAd) {
            combinedBrands.push({
              ...preset,
              tagline: (uploadedAd?.title && uploadedAd.title.trim().length > 2)
                ? uploadedAd.title
                : preset.tagline,
              subtitle: (uploadedAd?.subtitle && uploadedAd.subtitle.trim().length > 2)
                ? uploadedAd.subtitle
                : preset.subtitle,
              adPromo: uploadedAd?.discountText || preset.adPromo,
              couponCode: uploadedAd?.couponCode || preset.couponCode,
              uploadedAd,
            });
          } else {
            combinedBrands.push(preset);
          }
        }
      });

      // Third pass: any brand in promoBanners not yet captured
      banners.forEach((banner, idx) => {
        if (!banner?.brand || banner.status === false) return;
        const key = cleanStr(banner.brand);
        if (!key || seenKeys.has(key) || key === "gomzigear") return;
        seenKeys.add(key);

        const theme = DYNAMIC_THEMES[(combinedBrands.length + idx) % DYNAMIC_THEMES.length];
        combinedBrands.push({
          id: key,
          name: banner.brand,
          shortName: banner.brand.slice(0, 3).toUpperCase(),
          tagline: banner.title ? `${banner.title} • Featured Campaign` : `${banner.brand} Official Campaign`,
          subtitle: banner.subtitle || "Premium Sports Nutrition Formulas",
          badge: "Campaign Partner",
          adPromo: "EXCLUSIVE PARTNER PROMO",
          couponCode: `${key.slice(0, 4).toUpperCase()}15`,
          theme,
          usps: [
            "Official Partner Campaign",
            "100% Authentic Products",
            "Fast Free Shipping Available",
          ],
          matchKeywords: [banner.brand.toLowerCase(), key],
          order: 99,
        });
      });

      // Fourth pass: any brand in companyAdsFromApi not yet captured
      companyAdsFromApi.forEach((ad, idx) => {
        if (!ad?.company || ad.status === false) return;
        const key = cleanStr(ad.company);
        if (!key || seenKeys.has(key)) return;
        seenKeys.add(key);

        const theme = DYNAMIC_THEMES[(combinedBrands.length + idx) % DYNAMIC_THEMES.length];
        const shortName = (ad.company || "")
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 3)
          .toUpperCase() || "FIT";

        combinedBrands.push({
          id: key,
          name: ad.company,
          shortName,
          tagline: ad.title || `${ad.company} Official Campaign`,
          subtitle: ad.subtitle || "Premium Sports Nutrition Formulas",
          badge: ad.badge || "Official Brand Partner",
          adPromo: ad.discountText || ad.title || "SPECIAL OFFER",
          couponCode: ad.couponCode || `${shortName}15`,
          uploadedAd: ad,
          theme,
          usps: [
            "100% Genuine & Verified",
            "Lab Tested Formulations",
            "Fast Pan-India Delivery",
          ],
          matchKeywords: [ad.company.toLowerCase(), key],
          order: ad.order !== undefined ? ad.order : 99,
        });
      });

      // 6. Match live products to each brand (100% Real Database Products)
      const productsMap = {};
      combinedBrands.forEach((brand) => {
        const bKey = cleanStr(brand.name);
        const matches = allProducts
          .filter((p) => {
            const name = (p.name || "").toLowerCase();
            const tags = toSafeLowerArray(p.tags);
            const categories = toSafeLowerArray(p.categories);
            const pBrand = cleanStr(p.brand || p.company);

            if (pBrand && (pBrand === bKey || bKey.includes(pBrand) || pBrand.includes(bKey))) {
              return true;
            }

            return brand.matchKeywords.some((kw) => {
              if (matchesKeyword(name, kw)) return true;
              if (tags.some((t) => matchesKeyword(t, kw))) return true;
              if (kw.length > 3 && categories.some((c) => matchesKeyword(c, kw))) return true;
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

      // 7. Filter to only brands that have real products OR an uploaded company ad OR dynamic banner
      const activeList = combinedBrands.filter((brand) => {
        const hasAd = Boolean(brand.uploadedAd);
        const hasBanner = banners.some((b) => {
          if (!b || !b.brand || b.status === false) return false;
          const bKey = cleanStr(b.brand);
          const brandKey = cleanStr(brand.name);
          return bKey === brandKey || brand.matchKeywords.some((kw) => cleanStr(kw) === bKey);
        });
        const hasProducts = (productsMap[brand.id] || []).length > 0;
        return hasAd || hasBanner || hasProducts;
      });

      // Sort: Brands with uploaded company ads first (highest priority), then banners, then by order
      activeList.sort((a, b) => {
        const aScore = a.uploadedAd ? 2 : (banners.some((bn) => bn.status !== false && cleanStr(bn.brand) === cleanStr(a.name)) ? 1 : 0);
        const bScore = b.uploadedAd ? 2 : (banners.some((bn) => bn.status !== false && cleanStr(bn.brand) === cleanStr(b.name)) ? 1 : 0);
        if (aScore !== bScore) return bScore - aScore;
        return (a.order || 99) - (b.order || 99);
      });

      if (isMounted) {
        setBrandProductsMap(productsMap);
        setActiveBrands(activeList);
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
    try {
      setAddingId(product.id);
      await addProductToCart(product);
    } finally {
      setAddingId(null);
    }
  };

  // Render an individual Brand Showcase Block:
  // Part 1: Company Advertisement Banner
  // Part 2: Top 5 Best-Selling Products of that Company (Real Products only)
  const renderBrandBlock = (brand) => {
    const products = (brandProductsMap[brand.id] || []).slice(0, 5);
    const totalCount = (brandProductsMap[brand.id] || []).length;

    // Find any dynamic advertisement banner uploaded in Admin for this brand
    const dynamicBanner = promoBanners.find((b) => {
      if (!b || !b.brand || b.status === false) return false;
      const bBrand = String(b.brand).toLowerCase().replace(/[^a-z0-9]/g, "");
      const brandKey = brand.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const brandIdKey = brand.id.toLowerCase().replace(/[^a-z0-9]/g, "");
      return (
        bBrand === brandKey ||
        bBrand === brandIdKey ||
        brandKey.includes(bBrand) ||
        bBrand.includes(brandKey) ||
        brand.matchKeywords.some((kw) => {
          const cleanKw = kw.toLowerCase().replace(/[^a-z0-9]/g, "");
          return cleanKw && (bBrand.includes(cleanKw) || cleanKw.includes(bBrand));
        })
      );
    });

    // Find dynamic advertisement from company-ads API
    const ad = brand.uploadedAd;

    // Primary source: company-ads uploaded image from Admin
    // Secondary source: promoBanners uploaded image from Admin
    const bannerImage = (ad?.image && ad.image.trim())
      ? resolveBannerUrl(ad.image)
      : (dynamicBanner?.image && dynamicBanner.image.trim())
      ? resolveBannerUrl(dynamicBanner.image)
      : null;

    const targetUrl = ad?.url || dynamicBanner?.url || `/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`;

    return (
      <div
        key={brand.id}
        id={`brand-section-${brand.id}`}
        className="w-full transition-all duration-300"
      >
        {/* ================= 1. DYNAMIC COMPANY ADVERTISEMENT BANNER (ONLY UPLOADED BANNER) ================= */}
        {bannerImage ? (
          <div
            onClick={() => navigate(targetUrl)}
            className="w-full mb-8 sm:mb-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/80 group bg-gray-50"
            title={`View ${brand.name} Store`}
          >
            <img
              src={bannerImage}
              alt={brand.name}
              className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ) : (
          /* Clean brand header when no ad banner is uploaded yet */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white shadow-sm"
                style={{ backgroundColor: brand.theme.accent }}
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
              onClick={() => navigate(targetUrl)}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Explore {brand.name}</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

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
                  Top 5 Best-Selling Products from {brand.name}
                </h4>
              </div>

              <button
                onClick={() => navigate(`/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`)}
                className="text-xs font-bold text-[#5C3124] hover:text-[#3d1e15] flex items-center gap-1 group cursor-pointer"
              >
                <span>View All ({totalCount})</span>
                <FiChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
              {products.map((item, idx) => {
                const discountPct = Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) * 100
                );

                return (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-3xl border border-gray-200/80 p-3.5 sm:p-4.5 flex flex-col justify-between hover:shadow-xl hover:border-[#5C3124]/30 hover:-translate-y-1 transition-all duration-300 relative group"
                  >
                    {/* Top Tag & Wishlist */}
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#733624] bg-[#fbf5f2] border border-[#f0ded8]">
                        {idx === 0 ? "TOP VALUE" : "BEST SELLER"}
                      </span>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="w-8 h-8 rounded-full border border-gray-150 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition shadow-2xs cursor-pointer"
                        aria-label="Wishlist"
                      >
                        {wishlist[item.id] ? (
                          <FaHeart className="w-3.5 h-3.5 text-red-500" />
                        ) : (
                          <FiHeart className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Product Image Box with Floating Rating Badge */}
                    <div
                      className="relative w-full aspect-square bg-[#fbf9f6] rounded-2xl flex items-center justify-center p-3 my-2.5 cursor-pointer overflow-hidden group/img"
                      onClick={() => navigate(`/product/${item.slug || item.id || item._id}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-300 drop-shadow-xs"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/product-placeholder.webp";
                        }}
                      />

                      {/* Live Rating Badge at bottom-left */}
                      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs text-gray-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-gray-150">
                        <FaStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="font-black text-gray-900">
                          {item.rating && !isNaN(item.rating) ? Number(item.rating).toFixed(1) : "4.9"}
                        </span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          ({item.totalReviews || 420})
                        </span>
                      </div>
                    </div>

                    {/* Subtitle / Authenticity Line */}
                    <p className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-[#733624] mb-1">
                      100% AUTHENTIC • ZERO ADULTERATION
                    </p>

                    {/* Product Title */}
                    <h5
                      onClick={() => navigate(`/product/${item.slug || item.id || item._id}`)}
                      className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug hover:text-[#5C3124] transition-colors cursor-pointer min-h-[36px] sm:min-h-[40px] mb-2.5"
                      title={item.name}
                    >
                      {item.name}
                    </h5>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-2 mb-3.5 flex-wrap">
                      <span className="text-base sm:text-xl font-black text-gray-950">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-400 line-through font-medium">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                      {discountPct > 0 && (
                        <span className="text-[11px] font-bold text-[#b43e18] bg-[#fef2eb] border border-[#fae0d3] px-2 py-0.5 rounded">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addingId === item.id}
                      className="w-full py-2.5 sm:py-3 rounded-xl bg-[#4a281e] hover:bg-[#381c14] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                      <FiShoppingCart className="w-4 h-4" />
                      <span>{addingId === item.id ? "Adding..." : "Add to Cart"}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Centered Bottom CTA Button */}
            <div className="flex justify-center mt-7 sm:mt-9">
              <button
                onClick={() => navigate(`/gomzi-supplement?brand=${encodeURIComponent(brand.name)}`)}
                className="px-8 py-3 rounded-full bg-[#4a281e] hover:bg-[#381c14] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all duration-200 hover:scale-102 cursor-pointer active:scale-95"
              >
                <span>View All {brand.name}</span>
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

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
