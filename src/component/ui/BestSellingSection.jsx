import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import {
  Heart,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
} from "lucide-react";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { normalizeProduct, isRealProduct } from "../../utils/productAdapter";
import { BestSellingSectionSkeleton } from "../common/SkeletonLoaders";

export default function BestSellingSection() {
  const [wishlist, setWishlist] = useState({});
  const [apiProducts, setApiProducts] = useState([]);
  const [isAdding, setIsAdding] = useState({});
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadApiData = async () => {
      try {
        const res = await getProductsApi({ limit: 1000, page: 1 });
        if (isMounted && res.data?.data && Array.isArray(res.data.data)) {
          const normalized = res.data.data
            .filter((p) => p && p.name && isRealProduct(p))
            .map((p) => normalizeProduct(p));
          if (normalized.length > 0) {
            setApiProducts(normalized);
          }
        }
      } catch (err) {
        console.error("Error fetching best sellers from RAG app:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadApiData();
    return () => {
      isMounted = false;
    };
  }, []);

  const productsToRender = apiProducts;

  if (loading && productsToRender.length === 0) {
    return <BestSellingSectionSkeleton />;
  }

  if (productsToRender.length === 0) return null;

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

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    setIsAdding((prev) => ({ ...prev, [product.id || product._id]: true }));
    try {
      await addProductToCart(product);
    } finally {
      setIsAdding((prev) => ({ ...prev, [product.id || product._id]: false }));
    }
  };

  const handleBuyNow = async (product, e) => {
    e.stopPropagation();
    await addProductToCart(product);
    navigate("/cart");
  };

  return (
    <section className="w-full py-8 sm:py-14 bg-[#faf8f6] overflow-hidden font-modelica">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 gap-3 sm:gap-4">
          <div>
            <div className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-2">
              Community Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c28] tracking-tight">
              Best Selling
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Explore our most popular, scientifically formulated supplements trusted by athletes across India.
            </p>
          </div>

          <button
            onClick={() => navigate("/gomzi-supplement")}
            className="text-xs sm:text-sm font-bold text-[#5C3124] hover:text-[#3d1e15] flex items-center gap-1 group cursor-pointer self-end shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".best-seller-next-btn",
              prevEl: ".best-seller-prev-btn",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={productsToRender.length > 4}
            speed={600}
            spaceBetween={12}
            slidesPerView={2}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 14 },
              768: { slidesPerView: 4, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="w-full !py-2"
          >
            {productsToRender.map((item, idx) => {
              const productId = item.id || item._id || `best-${idx}`;
              const isLiked = wishlist[productId];
              const addingThis = isAdding[productId];

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
                <SwiperSlide key={productId} className="h-auto">
                  <div
                    onClick={() =>
                      navigate(
                        item.slug
                          ? `/product/${item.slug}`
                          : `/product/${productId}`
                      )
                    }
                    className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-[#5C3124]/40 hover:shadow-xl transition-all duration-200 p-2.5 sm:p-4 flex flex-col h-full relative cursor-pointer group/card"
                  >
                    {/* Top Row: Trustified Badge & Wishlist Heart */}
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1 sm:px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 flex-shrink-0" />
                        <span className="truncate">Trustified</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(productId, e)}
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
                    <div className="w-full h-32 sm:h-44 flex items-center justify-center p-1 sm:p-2 mb-2 sm:mb-3 bg-white">
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
                    <div className="flex items-center gap-1 bg-[#5C3124] text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded w-fit mb-1.5 shadow-2xs">
                      <span>{validRating}</span>
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                    </div>

                    {/* Product Title (2-Line Clamp) */}
                    <h3 className="text-[11px] sm:text-[13px] font-bold text-[#1c1c28] group-hover/card:text-[#5C3124] transition-colors line-clamp-2 min-h-[30px] sm:min-h-[34px] leading-snug mb-1.5">
                      {item.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-sm sm:text-base lg:text-lg font-black text-[#1c1c28]">
                        ₹{rawPrice.toLocaleString("en-IN")}
                      </span>
                      {originalPrice > rawPrice && (
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Promotional Coupon Line (Gomzi Signature Theme) */}
                    <div className="min-h-[18px] sm:min-h-[22px] mb-1.5">
                      <p className="text-[10px] sm:text-[11px] font-bold text-[#5C3124] truncate">
                        {promoText}
                      </p>
                    </div>

                    {/* Premium Member Price Box (Gomzi Brown Warm Palette) */}
                    <div className="bg-[#fdf6f4] border border-[#ebdcd7] rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 flex items-center gap-1.5 mb-2.5 sm:mb-3.5 mt-auto">
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#5C3124] text-amber-200 flex items-center justify-center text-[8px] sm:text-[9px] font-bold flex-shrink-0">
                        ★
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#5C3124] truncate">
                        ₹{premiumMemberPrice.toLocaleString("en-IN")}{" "}
                        <span className="font-normal text-gray-600">
                          for Member
                        </span>
                      </span>
                    </div>

                    {/* Double Action CTA Buttons (Gomzi Signature Brown Theme) */}
                    <div className="space-y-1.5 sm:space-y-2 mt-auto">
                      {/* Outline Add to Cart */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(item, e)}
                        disabled={addingThis}
                        className="w-full py-1.5 sm:py-2 px-1 border-2 border-[#5C3124] bg-white hover:bg-[#fdf6f4] text-[#5C3124] text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>{addingThis ? "Adding..." : "Add to Cart"}</span>
                      </button>

                      {/* Solid Buy Now */}
                      <button
                        type="button"
                        onClick={(e) => handleBuyNow(item, e)}
                        className="w-full py-2 sm:py-2.5 px-1 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border border-amber-400/25 shadow-sm shadow-[#5C3124]/20 hover:shadow-md hover:shadow-[#5C3124]/35 active:scale-[0.98]"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Floating Navigation Arrow (Next Button - Centered on Product Image) */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            type="button"
            className="best-seller-next-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5C3124] hover:bg-[#48261c] text-white flex items-center justify-center shadow-xl shadow-[#5C3124]/25 absolute -right-2 sm:-right-4 top-[125px] sm:top-[140px] -translate-y-1/2 cursor-pointer z-30 transition-transform hover:scale-110 active:scale-95 border border-white/20 select-none"
            aria-label="Next Products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Floating Navigation Arrow (Prev Button - Centered on Product Image) */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            type="button"
            className="best-seller-prev-btn w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5C3124] hover:bg-[#48261c] text-white flex items-center justify-center shadow-xl shadow-[#5C3124]/25 absolute -left-2 sm:-left-4 top-[125px] sm:top-[140px] -translate-y-1/2 cursor-pointer z-30 transition-transform hover:scale-110 active:scale-95 border border-white/20 select-none"
            aria-label="Previous Products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/gomzi-supplement")}
            className="group relative overflow-hidden bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white rounded-full px-7 py-2.5 font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10">View All Best Sellers</span>
            <ChevronRight className="relative z-10 w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
