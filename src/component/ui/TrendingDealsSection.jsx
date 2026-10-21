import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTag, FiCopy, FiCheck, FiArrowRight, FiZap } from "react-icons/fi";
import { CheckCircle2, Heart, ShoppingCart, Star } from "lucide-react";
import { getDealsApi } from "../../api/deal.api";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { TrendingDealsSectionSkeleton } from "../common/SkeletonLoaders";

const resolveImageUrl = (img) => {
  if (!img) return "/images/product-category/whey-protein.webp";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

export default function TrendingDealsSection() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [wishlist, setWishlist] = useState({});
  const [isAdding, setIsAdding] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchDeals = async () => {
      try {
        const res = await getDealsApi();
        if (isMounted && res?.data?.data?.deals?.length > 0) {
          setDeals(res.data.data.deals);
        }
      } catch (err) {
        console.warn("Could not fetch promotional deals from API:", err?.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDeals();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && deals.length === 0) {
    return <TrendingDealsSectionSkeleton />;
  }

  if (!deals || deals.length === 0) {
    return null;
  }

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

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const isFav = !prev[id];
      if (isFav) {
        successToast("Added to wishlist!");
      }
      return { ...prev, [id]: isFav };
    });
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

  const handleAddToCart = async (deal, e) => {
    e.stopPropagation();
    const dealId = deal._id || deal.id;
    setIsAdding((prev) => ({ ...prev, [dealId]: true }));
    try {
      await addProductToCart({
        id: dealId,
        _id: dealId,
        name: deal.title,
        price: deal.dealPrice || deal.price,
        originalPrice: deal.originalPrice,
        image: resolveImageUrl(deal.image),
        slug: deal.url?.replace("/product/", "") || dealId,
      });
    } finally {
      setIsAdding((prev) => ({ ...prev, [dealId]: false }));
    }
  };

  return (
    <section className="w-full py-10 sm:py-16 bg-[#f8f6f4] border-t border-[#ebdcd7]/60 overflow-hidden font-modelica" aria-label="Trending Promotional Deals">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
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

        {/* Dynamic Grid of Promotional Deal Cards: 2 per row on mobile (2x2 grid), 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {deals.map((deal, idx) => {
            const dealId = deal._id || deal.id || `deal-${idx}`;
            const isLiked = wishlist[dealId];
            const addingThis = isAdding[dealId];
            const hasDiscount = deal.originalPrice && Number(deal.originalPrice) > Number(deal.dealPrice);
            const discountPercent = hasDiscount
              ? Math.round(((Number(deal.originalPrice) - Number(deal.dealPrice)) / Number(deal.originalPrice)) * 100)
              : null;
            const isCopied = copiedCode === deal.code;

            return (
              <div
                key={dealId}
                onClick={() => handleCardClick(deal.url)}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-[#5C3124]/40 hover:shadow-xl transition-all duration-200 p-2.5 sm:p-4 flex flex-col justify-between relative cursor-pointer group/card"
              >
                {/* Top Row: Trustified Badge & Wishlist Heart */}
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1 sm:px-1.5 py-0.5 rounded">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 flex-shrink-0" />
                    <span className="truncate">Trustified</span>
                  </div>

                  {deal.tag && (
                    <span className="text-[8px] sm:text-[9px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded bg-[#fdf6f4] text-[#5C3124] border border-[#ebdcd7] truncate max-w-[80px]">
                      {deal.tag}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(dealId, e)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer ml-auto"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-150 ${
                        isLiked
                          ? "fill-red-500 text-red-500 scale-110"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Image */}
                <div className="h-32 sm:h-44 w-full flex items-center justify-center p-1 sm:p-2 mb-2 sm:mb-3 bg-white relative">
                  <img
                    src={resolveImageUrl(deal.image)}
                    alt={deal.title}
                    className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/product-category/whey-protein.webp";
                    }}
                  />
                  {discountPercent && (
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-[#b42318] text-white text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded shadow-xs">
                      {discountPercent}% OFF
                    </div>
                  )}
                </div>

                {/* Rating Pill (Gomzi Signature Theme #5C3124 + Gold Star) */}
                <div className="flex items-center gap-1 bg-[#5C3124] text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded w-fit mb-1.5 shadow-2xs">
                  <span>{(4.4 + (idx % 3) * 0.1).toFixed(1)}</span>
                  <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                </div>

                {/* Deal Title (2-Line Clamp) */}
                <h3 className="text-[11px] sm:text-[13px] font-bold text-[#1c1c28] group-hover/card:text-[#5C3124] transition-colors line-clamp-2 min-h-[30px] sm:min-h-[34px] leading-snug mb-1.5">
                  {deal.title}
                </h3>

                {/* Pricing Box */}
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-sm sm:text-base lg:text-lg font-black text-[#1c1c28]">
                    ₹{deal.dealPrice?.toLocaleString("en-IN")}
                  </span>
                  {hasDiscount && (
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                      ₹{deal.originalPrice?.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Coupon Code Pill */}
                {deal.code ? (
                  <div
                    onClick={(e) => handleCopyCode(deal.code, e)}
                    className={`mb-2 sm:mb-3 w-full flex items-center justify-between px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-dashed transition-all duration-200 ${
                      isCopied
                        ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                        : "bg-[#fdf6f4] border-[#5C3124]/40 hover:bg-[#fbf4ee] hover:border-[#5C3124] text-gray-800"
                    }`}
                    title="Click to copy coupon code"
                  >
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-[11px]">
                      <FiTag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#5C3124]" />
                      <span className="font-semibold text-gray-600 hidden xs:inline">CODE:</span>
                      <span className="font-extrabold text-[#5C3124] tracking-wider uppercase truncate max-w-[65px] sm:max-w-none">
                        {deal.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] font-bold text-[#5C3124]">
                      {isCopied ? (
                        <>
                          <FiCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
                          <span className="text-emerald-700">COPIED</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>COPY</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] sm:text-xs font-bold text-[#5C3124] truncate mb-2 sm:mb-3">
                    Extra 5% Off | Code: ZYMX
                  </p>
                )}

                {/* Double Action CTA Buttons (Gomzi Signature Brown Theme) */}
                <div className="space-y-1.5 sm:space-y-2 mt-auto">
                  {/* Outline Add to Cart */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(deal, e)}
                    disabled={addingThis}
                    className="w-full py-1.5 sm:py-2 px-1 border-2 border-[#5C3124] bg-white hover:bg-[#fdf6f4] text-[#5C3124] text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{addingThis ? "Adding..." : "Add to Cart"}</span>
                  </button>

                  {/* Solid Claim Deal / Buy Now */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(deal.url);
                    }}
                    className="w-full py-2 sm:py-2.5 px-1 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border border-amber-400/25 shadow-sm shadow-[#5C3124]/20 hover:shadow-md hover:shadow-[#5C3124]/35 active:scale-[0.98]"
                  >
                    Claim Deal
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
