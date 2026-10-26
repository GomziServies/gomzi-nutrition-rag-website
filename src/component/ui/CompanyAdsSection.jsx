import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiTag,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";
import { FaBolt, FaStar } from "react-icons/fa";
import { successToast } from "../../utils/toast";
import { getCompanyAdsApi } from "../../api/company-ad.api";

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("blob:") ||
    img.startsWith("data:") ||
    img.startsWith("/")
  ) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

const DEFAULT_COMPANY_ADS = [
  {
    _id: "ad-mb",
    company: "MuscleBlaze",
    title: "FLAT 25% OFF On Biozyme Performance Whey",
    subtitle: "Clinically Proven 50% Higher Protein Absorption • Free 700ml Pro Shaker Bottle",
    badge: "OFFICIAL BRAND PARTNER",
    discountText: "25% OFF",
    couponCode: "MBZIDDI25",
    image: "https://files.fggroup.in/production/products/FILE-muscleblaze-pre-workout-w-1-8cb51ba2-9ea0-4f57-897b-94420ec26bc2.webp",
    url: "/gomzi-supplement?brand=MuscleBlaze",
    buttonText: "Shop MuscleBlaze Store",
    bgGradient: "linear-gradient(135deg, #1f0707 0%, #3d0d14 50%, #170507 100%)",
  },
  {
    _id: "ad-on",
    company: "Optimum Nutrition (ON)",
    title: "Gold Standard 100% Whey & Isopure Range",
    subtitle: "The World’s #1 Selling Protein • Microfiltered Whey Isolate Matrix Across 90+ Countries",
    badge: "GLOBAL GOLD STANDARD",
    discountText: "SAVE UP TO 35%",
    couponCode: "ONGOLD35",
    image: "https://files.fggroup.in/production/products/FILE-isopure-2-kg-creamy-vanil-1-678fe8a1-cf0b-47e1-b472-7a76e9389270.webp",
    url: "/gomzi-supplement?brand=Optimum%20Nutrition",
    buttonText: "Shop Optimum Nutrition",
    bgGradient: "linear-gradient(135deg, #0d131f 0%, #17243c 50%, #090e18 100%)",
  },
  {
    _id: "ad-wellcore",
    company: "Wellcore",
    title: "100% Pure Micronised Creapure Creatine",
    subtitle: "Ultra-Fine Micronised Formula for Explosive Strength, Power & Cellular Muscle Hydration",
    badge: "PURITY GUARANTEED",
    discountText: "BUY 1 GET 1 50% OFF",
    couponCode: "WELLCOREB1G1",
    image: "https://files.fggroup.in/production/products/FILE-muscleblaze-creatine-mono-1-29e1eb1c-c760-4b8c-ab37-c8c36dfc2bf7.webp",
    url: "/gomzi-supplement?brand=Wellcore",
    buttonText: "Shop Wellcore Creapure",
    bgGradient: "linear-gradient(135deg, #081721 0%, #0f2c3d 50%, #050e14 100%)",
  },
  {
    _id: "ad-gomzi",
    company: "Gomzi Nutrition",
    title: "Science-Backed Certified Pure Nutrition",
    subtitle: "Direct From Lab To You • 100% Transparent Label Purity • Zero Fillers & Heavy Metals",
    badge: "FLAGSHIP IN-HOUSE BRAND",
    discountText: "FLAT ₹500 OFF",
    couponCode: "GOMZI500",
    image: "https://files.fggroup.in/production/products/FILE-muscleblaze-high-protein-1-79fc04e9-ae1e-451e-976c-31a89c8ea087.webp",
    url: "/gomzi-supplement?brand=Gomzi%20Nutrition",
    buttonText: "Explore Gomzi Nutrition",
    bgGradient: "linear-gradient(135deg, #22140a 0%, #442410 50%, #150c05 100%)",
  },
];

export default function CompanyAdsSection() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [ads, setAds] = useState(DEFAULT_COMPANY_ADS);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeBrandFilter, setActiveBrandFilter] = useState("All");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getCompanyAdsApi();
        if (res?.data?.data?.ads && Array.isArray(res.data.data.ads) && res.data.data.ads.length > 0) {
          setAds(res.data.data.ads);
        }
      } catch (err) {
        console.warn("Using fallback company ads:", err?.message);
      }
    };
    fetchAds();
  }, []);

  const copyCoupon = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    successToast(`Coupon "${code}" copied!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const filteredAds =
    activeBrandFilter === "All"
      ? ads
      : ads.filter((ad) => ad.company?.toLowerCase() === activeBrandFilter.toLowerCase());

  const availableBrands = Array.from(new Set(ads.map((a) => a.company))).filter(Boolean);

  if (ads.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 bg-[#0f0e0d] text-white border-t border-b border-white/10 relative overflow-hidden">
      {/* Background Decorative Glow Elements */}

      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
              <FaBolt className="w-3 h-3 text-amber-400" />
              <span>Official Brand Campaigns</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Brand Advertisements & Special Offers
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1.5 max-w-2xl">
              Authentic partner campaigns, certified origin guarantees, and exclusive brand coupons available only on Gomzi Nutrition.
            </p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
              title="Previous Ad"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
              title="Next Ad"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brand Filter Pills */}
        {availableBrands.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            <button
              onClick={() => setActiveBrandFilter("All")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeBrandFilter === "All"
                  ? "bg-amber-400 text-gray-950 shadow-md shadow-amber-400/20"
                  : "bg-white/10 text-gray-300 hover:bg-white/15 border border-white/10"
              }`}
            >
              All Brands ({ads.length})
            </button>
            {availableBrands.map((brand, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBrandFilter(brand)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeBrandFilter === brand
                    ? "bg-amber-400 text-gray-950 shadow-md shadow-amber-400/20"
                    : "bg-white/10 text-gray-300 hover:bg-white/15 border border-white/10"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}

        {/* ================= SWIPER CAROUSEL ================= */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={filteredAds.length > 1}
          spaceBetween={24}
          slidesPerView={1}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {filteredAds.map((ad, idx) => {
            const bg = ad.bgGradient || "linear-gradient(135deg, #1a1614 0%, #291f1a 50%, #140d09 100%)";
            return (
              <SwiperSlide key={ad._id || idx}>
                <div
                  className="w-full rounded-3xl border border-white/15 p-6 sm:p-10 lg:p-12 relative overflow-hidden transition-all"
                  style={{ background: bg }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Left Column (60%): Headline, Badges, Coupon, CTA */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      {/* Brand & Badge Tags */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white font-extrabold text-xs shadow-sm">
                          <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{ad.company}</span>
                        </span>
                        {ad.badge && (
                          <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider">
                            {ad.badge}
                          </span>
                        )}
                        {ad.discountText && (
                          <span className="px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 font-black text-xs uppercase tracking-wider">
                            {ad.discountText}
                          </span>
                        )}
                      </div>

                      {/* Main Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                        {ad.title}
                      </h3>
                      {ad.subtitle && (
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 max-w-xl">
                          {ad.subtitle}
                        </p>
                      )}

                      {/* Coupon Code Pill & CTA Row */}
                      <div className="flex flex-wrap items-center gap-3.5 mt-2">
                        {ad.couponCode && (
                          <div className="flex items-center bg-black/60 border border-white/20 rounded-2xl px-4 py-2.5 shadow-inner">
                            <FiTag className="w-4 h-4 text-amber-400 mr-2" />
                            <span className="text-xs text-gray-400 mr-2 uppercase tracking-wider font-bold">
                              Code:
                            </span>
                            <span className="font-mono font-black text-amber-300 text-sm sm:text-base tracking-widest mr-3">
                              {ad.couponCode}
                            </span>
                            <button
                              onClick={() => copyCoupon(ad.couponCode)}
                              className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                              title="Copy Coupon"
                            >
                              {copiedCode === ad.couponCode ? (
                                <>
                                  <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <FiCopy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Direct Shop Store CTA */}
                        <button
                          onClick={() => navigate(ad.url || `/gomzi-supplement?brand=${encodeURIComponent(ad.company)}`)}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer border border-amber-300/40"
                        >
                          <span>{ad.buttonText || `Shop ${ad.company}`}</span>
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column (40%): Big Visual Ad Banner Image */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                      <div
                        onClick={() => navigate(ad.url || `/gomzi-supplement?brand=${encodeURIComponent(ad.company)}`)}
                        className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-2xl group cursor-pointer bg-black/40"
                      >
                        <img
                          src={resolveImageUrl(ad.image)}
                          alt={ad.title}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/product-placeholder.webp";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Interactive Hover Pill */}
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 group-hover:bg-amber-400 group-hover:text-gray-950 transition-colors">
                          <span>View Brand Campaign</span>
                          <FiExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}