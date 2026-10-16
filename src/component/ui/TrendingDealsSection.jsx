import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTag, FiCopy, FiCheck, FiArrowRight, FiZap } from "react-icons/fi";
import { getDealsApi } from "../../api/deal.api";
import { successToast } from "../../utils/toast";

const resolveImageUrl = (img) => {
  if (!img) return "/images/product-category/whey-protein.webp";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

// Authentic Gomzi Nutrition default deals
const DEFAULT_GOMZI_DEALS = [
  {
    _id: "deal-1",
    title: "100% Whey Protein Isolate",
    subtitle: "1kg • 27g Protein / Scoop",
    tag: "PRICE DROPPED BY ₹450",
    originalPrice: 3270,
    dealPrice: 2820,
    code: "WHEY450",
    image: "/images/product-category/whey-protein.webp",
    url: "/gomzi-supplement/whey-protein",
    order: 1,
    status: true,
  },
  {
    _id: "deal-2",
    title: "Pure Micronized Creatine",
    subtitle: "250g • 100% Creapure Matrix",
    tag: "EXTRA 15% OFF",
    originalPrice: 1510,
    dealPrice: 1280,
    code: "CREA15",
    image: "/images/product-category/creatine.webp",
    url: "/gomzi-supplement/creatine",
    order: 2,
    status: true,
  },
  {
    _id: "deal-3",
    title: "Explosive Pre-Workout",
    subtitle: "250g • Cola Blast Pump Matrix",
    tag: "PRICE DROPPED BY ₹350",
    originalPrice: 2550,
    dealPrice: 2200,
    code: "PUMP350",
    image: "/images/product-category/pre-workout.webp",
    url: "/gomzi-supplement/pre-workout",
    order: 3,
    status: true,
  },
  {
    _id: "deal-4",
    title: "BCAA 2:1:1 Rapid Recovery",
    subtitle: "250g • Tangy Orange + Electrolytes",
    tag: "EXCLUSIVE LAUNCH DEAL",
    originalPrice: 2150,
    dealPrice: 1799,
    code: "BCAA20",
    image: "/images/product-category/Bcaa-tangy-orange.webp",
    url: "/gomzi-supplement/bcaa",
    order: 4,
    status: true,
  },
];

export default function TrendingDealsSection() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState(DEFAULT_GOMZI_DEALS);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDeals = async () => {
      try {
        const res = await getDealsApi();
        if (isMounted && res?.data?.data?.deals?.length > 0) {
          setDeals(res.data.data.deals);
        }
      } catch (err) {
        console.warn("Could not fetch promotional deals from API, displaying defaults:", err?.message);
      }
    };

    fetchDeals();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    if (!code) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    successToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleCardClick = (url) => {
    if (url) {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        window.open(url, "_blank");
      } else {
        navigate(url);
      }
    } else {
      navigate("/gomzi-supplement");
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#faf8f6] border-t border-[#ebdcd7]/60 overflow-hidden" aria-label="Trending Promotional Deals">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#b42318] bg-[#fef3f2] border border-[#fecdca] px-3 py-1 rounded-full mb-2">
              <FiZap className="w-3.5 h-3.5 text-[#b42318]" />
              <span>Limited Time Offers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c28] tracking-tight">
              Trending Deals of the Week
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Exclusive pricing and direct coupon discounts on lab-verified sports nutrition. Limited stock remaining.
            </p>
          </div>

          <Link
            to="/gomzi-supplement"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5C3124] hover:text-[#3d1e15] transition-colors group self-start sm:self-end"
          >
            <span>Explore All Deals</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dynamic Grid of Promotional Deal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {deals.map((deal, idx) => {
            const dealId = deal._id || deal.id || `deal-${idx}`;
            const hasDiscount = deal.originalPrice && Number(deal.originalPrice) > Number(deal.dealPrice);
            const savings = hasDiscount ? Number(deal.originalPrice) - Number(deal.dealPrice) : null;
            const discountPercent = hasDiscount
              ? Math.round(((Number(deal.originalPrice) - Number(deal.dealPrice)) / Number(deal.originalPrice)) * 100)
              : null;
            const isCopied = copiedCode === deal.code;

            return (
              <div
                key={dealId}
                onClick={() => handleCardClick(deal.url)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#ebdcd7]/80 hover:border-[#5C3124]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Promo Tag Banner */}
                {deal.tag && (
                  <div className="bg-[#5C3124] text-white text-[10px] font-black uppercase tracking-wider text-center py-1.5 px-3">
                    {deal.tag}
                  </div>
                )}

                {/* Product Image Area */}
                <div className="relative w-full aspect-[4/3.5] bg-gradient-to-b from-[#fbf9f6] to-[#f4eee7] flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={resolveImageUrl(deal.image)}
                    alt={deal.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out drop-shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/product-category/whey-protein.webp";
                    }}
                  />

                  {/* Discount Badge Pill */}
                  {discountPercent && (
                    <div className="absolute top-2.5 right-2.5 bg-[#b42318] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                      {discountPercent}% OFF
                    </div>
                  )}
                </div>

                {/* Card Content Details */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Subtitle / Spec Pill */}
                  {deal.subtitle && (
                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                      {deal.subtitle}
                    </div>
                  )}

                  {/* Deal Title */}
                  <h3 className="mt-1 text-base font-extrabold text-[#1c1c28] group-hover:text-[#5C3124] transition-colors leading-snug line-clamp-2">
                    {deal.title}
                  </h3>

                  {/* Pricing Box */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#1c1c28]">
                      ₹{deal.dealPrice?.toLocaleString("en-IN")}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{deal.originalPrice?.toLocaleString("en-IN")}
                      </span>
                    )}
                    {savings && (
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Save ₹{savings.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-h-[10px]" />

                  {/* Coupon Code Pill */}
                  {deal.code && (
                    <div
                      onClick={(e) => handleCopyCode(deal.code, e)}
                      className={`mt-4 w-full flex items-center justify-between px-3 py-2 rounded-xl border border-dashed transition-all duration-200 ${
                        isCopied
                          ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                          : "bg-[#fdfbf9] border-[#5C3124]/40 hover:bg-[#fbf4ee] hover:border-[#5C3124] text-gray-800"
                      }`}
                      title="Click to copy coupon code"
                    >
                      <div className="flex items-center gap-1.5 text-xs">
                        <FiTag className="w-3.5 h-3.5 text-[#5C3124]" />
                        <span className="font-semibold text-gray-600">CODE:</span>
                        <span className="font-black text-[#5C3124] tracking-wider uppercase">
                          {deal.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#5C3124]">
                        {isCopied ? (
                          <>
                            <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">COPIED</span>
                          </>
                        ) : (
                          <>
                            <FiCopy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Primary CTA Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(deal.url);
                    }}
                    className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#5C3124] hover:bg-[#48261c] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Claim Deal</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
