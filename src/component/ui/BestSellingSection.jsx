import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FiHeart, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { normalizeProduct, isRealProduct } from "../../utils/productAdapter";
import { BestSellingSectionSkeleton } from "../common/SkeletonLoaders";

// Authentic Gomzi Nutrition Best Selling Products
const BEST_SELLING_PRODUCTS = [];

export default function BestSellingSection() {
  const [wishlist, setWishlist] = useState({});
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadApiData = async () => {
      try {
        const res = await getProductsApi({ limit: 50, page: 1 });
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

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const isFav = !prev[id];
      if (isFav) {
        successToast("Added to wishlist!");
      }
      return { ...prev, [id]: isFav };
    });
  };

  const handleAddToCart = async (product) => {
    await addProductToCart(product);
  };

  return (
    <section className="w-full py-8 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-5 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full mb-1.5 sm:mb-2">
              Community Favorites
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c28] tracking-tight">
              Best Selling
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              Explore our most popular, scientifically formulated supplements trusted by athletes across India.
            </p>
          </div>

          {/* Slider Prev / Next Controls - visible on both mobile and desktop */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white hover:bg-[#5C3124] hover:text-white hover:border-[#5C3124] text-[#5C3124] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
              aria-label="Previous Slide"
            >
              <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white hover:bg-[#5C3124] hover:text-white hover:border-[#5C3124] text-[#5C3124] flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
              aria-label="Next Slide"
            >
              <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, FreeMode, Mousewheel]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            grabCursor={true}
            freeMode={{
              enabled: true,
              momentum: true,
              momentumBounce: true,
            }}
            mousewheel={{
              forceToAxis: true,
              releaseOnEdges: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={productsToRender.length > 4}
            speed={600}
            spaceBetween={12}
            slidesPerView={2.1}
            breakpoints={{
              480: { slidesPerView: 2.3, spaceBetween: 14 },
              640: { slidesPerView: 2.8, spaceBetween: 16 },
              768: { slidesPerView: 3.2, spaceBetween: 18 },
              1024: { slidesPerView: 4, spaceBetween: 22 },
            }}
            className="pb-4"
          >
            {productsToRender.map((item) => {
              const discountPct = Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              );

              const r = Number(item.rating);
              const validRating = !isNaN(r) && r > 0 ? r.toFixed(1) : "4.8";
              const reviews = Number(item.totalReviews) > 0 ? item.totalReviews : 420;

              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="bg-white rounded-2xl border border-gray-200/90 p-2.5 sm:p-4 h-full flex flex-col justify-between hover:shadow-xl hover:border-[#5C3124]/30 hover:-translate-y-1 transition-all duration-300 relative group">
                    {/* Top Tag & Wishlist */}
                    <div className="flex items-center justify-between w-full mb-1.5 sm:mb-2">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-2 sm:px-2.5 py-0.5 rounded-full uppercase truncate max-w-[70%]">
                        {item.tag}
                      </span>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 hover:bg-[#fdf6f4] flex items-center justify-center text-gray-400 hover:text-red-500 transition cursor-pointer shrink-0"
                        aria-label="Wishlist"
                      >
                        {wishlist[item.id] ? (
                          <FaHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                        ) : (
                          <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Product Image */}
                    <div
                      className="relative w-full aspect-square bg-[#fbf9f8] rounded-xl flex items-center justify-center p-2 sm:p-3 cursor-pointer overflow-hidden"
                      onClick={() => navigate(`/product/${item.slug || item.id || item._id}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/product-placeholder.webp";
                        }}
                      />

                      {/* Rating Badge */}
                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-white/95 backdrop-blur-xs text-gray-900 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-gray-100">
                        <FaStar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-500 fill-current" />
                        <span>{validRating}</span>
                        <span className="text-[8px] sm:text-[10px] text-gray-400 font-normal">
                          ({reviews})
                        </span>
                      </div>
                    </div>

                    {/* Highlight Subtext */}
                    <p className="text-[9px] sm:text-[11px] font-semibold text-[#5C3124] uppercase tracking-wider mt-2 sm:mt-2.5 truncate">
                      {item.highlight}
                    </p>

                    {/* Product Title */}
                    <h3
                      onClick={() => navigate(`/product/${item.slug || item.id || item._id}`)}
                      className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-2 mt-1 leading-snug hover:text-[#5C3124] transition-colors cursor-pointer min-h-[30px] sm:min-h-[36px]"
                    >
                      {item.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mt-2 sm:mt-2.5 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                      <span className="text-sm sm:text-lg font-black text-gray-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                      {discountPct > 0 && (
                        <span className="text-[9px] sm:text-xs font-bold text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-1 sm:px-1.5 py-0.5 rounded">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="group/btn relative overflow-hidden mt-3 sm:mt-4 w-full py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 cursor-pointer"
                    >
                      <FiShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 transition-transform duration-300 group-hover/btn:scale-110" />
                      <span>Add to Cart</span>
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={() => navigate("/gomzi-supplement")}
            className="group relative overflow-hidden bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white rounded-full px-6 sm:px-8 py-2 sm:py-2.5 font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10">View All Best Sellers</span>
            <FiChevronRight className="relative z-10 w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
