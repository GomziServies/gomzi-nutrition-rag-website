import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    bgGradient: "linear-gradient(180deg, #ffb877 0%, #ffd4a3 40%, #ffa556 100%)",
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
    bgGradient: "linear-gradient(180deg, #f6ede3 0%, #faf4ed 45%, #e8ded3 100%)",
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
    bgGradient: "linear-gradient(180deg, #fae4b2 0%, #fbedcb 45%, #efce86 100%)",
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
    bgGradient: "linear-gradient(180deg, #fae799 0%, #fcedb6 45%, #f4d36e 100%)",
    url: "/gomzi-supplement/bcaa",
    order: 4,
    status: true,
  },
];

export default function TrendingDealsSection() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState(DEFAULT_GOMZI_DEALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchDeals = async () => {
      try {
        const res = await getDealsApi();
        if (isMounted && res?.data?.data?.deals?.length > 0) {
          setDeals(res.data.data.deals);
        }
      } catch (err) {
        // Retain default authentic Gomzi deals gracefully on offline/network errors
        console.warn("Could not fetch promotional deals from API, displaying defaults:", err?.message);
      } finally {
        if (isMounted) setLoading(false);
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
    successToast(`Coupon code ${code} copied!`);
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
    <section className="w-full py-8 sm:py-10 bg-[#f4f4f4] overflow-hidden" aria-label="Trending Promotional Deals">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Dynamic Grid of Promotional Deal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {deals.map((deal, idx) => {
            const dealId = deal._id || deal.id || `deal-${idx}`;
            const bg = deal.bgGradient || "linear-gradient(180deg, #ffb877 0%, #ffd4a3 40%, #ffa556 100%)";
            const hasDiscount = deal.originalPrice && Number(deal.originalPrice) > Number(deal.dealPrice);

            return (
              <div
                key={dealId}
                onClick={() => handleCardClick(deal.url)}
                className="group relative rounded-2xl overflow-hidden p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[460px] border border-black/5"
                style={{ background: bg }}
              >
                {/* Top Text Content */}
                <div className="flex flex-col items-center text-center">
                  {/* Deal Title */}
                  <h3 className="font-extrabold text-gray-900 text-lg leading-tight max-w-[210px] line-clamp-2">
                    {deal.title}
                  </h3>

                  {/* Subtitle / Spec Tag */}
                  {deal.subtitle && (
                    <div className="mt-2.5 inline-block bg-white/95 text-gray-900 font-bold text-xs px-3.5 py-1 rounded-md shadow-2xs">
                      {deal.subtitle}
                    </div>
                  )}

                  {/* Promo Tag */}
                  {deal.tag && (
                    <p className="mt-3 text-[11px] font-extrabold tracking-wider text-[#b42318] uppercase">
                      {deal.tag}
                    </p>
                  )}

                  {/* Dashed Price Box with Coupon Action */}
                  <div
                    onClick={(e) => deal.code && handleCopyCode(deal.code, e)}
                    className="mt-2 bg-white/95 border border-dashed border-[#b42318] rounded-lg px-4 py-1.5 shadow-2xs hover:bg-white transition flex flex-col items-center"
                    title={deal.code ? `Click to copy coupon ${deal.code}` : undefined}
                  >
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{deal.originalPrice?.toLocaleString("en-IN")}
                      </span>
                    )}
                    <div className="text-base font-black text-[#b42318] leading-tight">
                      Grab @ ₹{deal.dealPrice?.toLocaleString("en-IN")}
                    </div>
                    {deal.code && (
                      <div className="mt-1 bg-amber-500/15 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded tracking-wider border border-amber-500/30">
                        CODE : <span className="text-[#b42318]">{deal.code}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Product Imagery */}
                <div className="relative mt-4 flex flex-col items-center justify-end pt-4">
                  <div className="relative w-40 h-44 sm:w-44 sm:h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={resolveImageUrl(deal.image)}
                      alt={deal.title}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.22)]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/product-category/whey-protein.webp";
                      }}
                    />
                  </div>

                  {/* Pedestal Blur Shadow */}
                  <div className="w-40 sm:w-44 h-3 bg-black/15 rounded-full blur-[2px] mt-1 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
