import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FiHeart, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { normalizeProduct, filterProductsByCategory, isRealProduct } from "../../utils/productAdapter";

// Authentic Gomzi Nutrition Products mapped by Category
const CATEGORY_TABS = [
  "Whey Protein",
  "Mass Gainer",
  "Plant Protein",
  "Pre Workout",
  "BCAA",
  "Creatine",
  "Wellness & Health",
];

const CATEGORY_SLUG_MAP = {
  "Whey Protein": "whey-protein",
  "Mass Gainer": "mass-gainer",
  "Plant Protein": "plant-protein",
  "Pre Workout": "pre-workout",
  BCAA: "bcaa",
  Creatine: "creatine",
  "Wellness & Health": "wellness-health",
};

export default function TopBrandsSection() {
  const [activeCategory, setActiveCategory] = useState("Whey Protein");
  const [wishlist, setWishlist] = useState({});
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  // Load real products per active category from RAG API (http://localhost:3005)
  useEffect(() => {
    let isMounted = true;
    const loadCategoryProducts = async () => {
      if (productsByCategory[activeCategory]) return;
      try {
        setIsLoadingApi(true);
        const res = await getProductsApi({
          category: activeCategory,
          limit: 50,
          page: 1,
        });
        if (isMounted && res.data?.data && Array.isArray(res.data.data)) {
          const normalized = res.data.data
            .filter((p) => p && p.name && isRealProduct(p))
            .map((p) => normalizeProduct(p));
          setProductsByCategory((prev) => ({
            ...prev,
            [activeCategory]: normalized,
          }));
        }
      } catch (err) {
        console.error(`Error fetching ${activeCategory} from RAG app:`, err);
      } finally {
        if (isMounted) setIsLoadingApi(false);
      }
    };

    loadCategoryProducts();
    return () => {
      isMounted = false;
    };
  }, [activeCategory, productsByCategory]);

  const currentProducts = productsByCategory[activeCategory] || [];
  const currentSlug = CATEGORY_SLUG_MAP[activeCategory] || "whey-protein";

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

  const handleBuyNow = async (product) => {
    await addProductToCart(product);
    navigate("/cart");
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#faf8f6] overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-3 py-1 rounded-full mb-2">
              Gomzi Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c28] tracking-tight">
              Top Products @ Best Prices
            </h2>
            <p className="text-sm text-gray-600 mt-1.5 max-w-2xl">
              Authentic, laboratory-tested formulas crafted with highest purity standards for peak performance and recovery.
            </p>
          </div>
        </div>

        {/* Product Category Tabs Pills */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORY_TABS.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  swiperRef.current?.slideTo(0);
                }}
                className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#5C3124] text-white border border-[#5C3124] shadow-md shadow-[#5C3124]/15"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-[#5C3124]/40 hover:text-[#5C3124] hover:bg-[#fdf6f4]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div className="relative mt-4">
          {isLoadingApi ? (
            <div className="py-16 text-center text-gray-400 font-modelica animate-pulse">
              Loading authentic products...
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="py-14 text-center text-gray-500 font-modelica bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
              <p className="text-base font-semibold text-[#1c1c28]">
                No products available in {activeCategory} right now.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Check back soon or explore other categories above.
              </p>
            </div>
          ) : (
            <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 18 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="pb-3"
          >
            {currentProducts.map((item) => {
              const discountPct = Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              );

              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="bg-white rounded-2xl border border-gray-200/80 p-4 h-full flex flex-col justify-between hover:shadow-xl hover:border-[#5C3124]/30 hover:-translate-y-1 transition-all duration-300 relative group">
                    {/* Top Row: TrusLified badge & Wishlist Heart */}
                    <div className="flex items-center justify-between w-full mb-2">
                      <div>
                        {item.trusLified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-[#5C3124] bg-[#fdf6f4] border border-[#ebdcd7] px-2 py-0.5 rounded-full uppercase">
                            TrusLified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                            Authentic
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-[#fdf6f4] flex items-center justify-center text-gray-400 hover:text-red-500 transition cursor-pointer"
                        aria-label="Wishlist"
                      >
                        {wishlist[item.id] ? (
                          <FaHeart className="w-4 h-4 text-red-500" />
                        ) : (
                          <FiHeart className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>

                    {/* Product Image Area */}
                    <div
                      className="relative w-full h-48 sm:h-52 bg-[#fbf9f8] rounded-xl flex items-center justify-center p-3 cursor-pointer overflow-hidden"
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

                      {/* Clean Rating Badge (bottom-left of image area) */}
                      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs text-gray-900 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-gray-100">
                        <FaStar className="w-3 h-3 text-amber-500 fill-current" />
                        <span>{item.rating}</span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          ({item.totalReviews})
                        </span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => navigate(`/product/${item.slug || item.id || item._id}`)}
                      className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-2 mt-3 leading-snug hover:text-[#5C3124] transition-colors cursor-pointer min-h-[36px]"
                    >
                      {item.name}
                    </h3>

                    {/* Pricing Row */}
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-lg font-black text-gray-900">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                      {discountPct > 0 && (
                        <span className="text-xs font-bold text-[#5C3124] bg-[#fdf6f4] px-1.5 py-0.5 rounded">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>

                    {/* Offer Text */}
                    <div className="mt-1 min-h-[18px]">
                      <p className="text-xs font-semibold text-[#027a48] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#027a48]" />
                        {item.offerText}
                      </p>
                    </div>

                    {/* Premium Member Price Tag */}
                    <div className="mt-2.5 bg-[#fdf6f4] border border-[#ebdcd7] rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] text-[#5C3124]">
                      <span className="font-semibold flex items-center gap-1">
                        <span className="text-amber-600 font-bold">✪</span>
                        <span>Member Price:</span>
                      </span>
                      <span className="font-extrabold">
                        ₹{item.memberPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Action Buttons in #5C3124 Theme */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {/* Add to Cart button */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full py-2.5 rounded-xl border border-[#5C3124] text-[#5C3124] hover:bg-[#5C3124] hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
                      >
                        <FiShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Add</span>
                      </button>

                      {/* Buy Now button */}
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="w-full py-2.5 rounded-xl bg-[#5C3124] hover:bg-[#48261c] text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate(`/gomzi-supplement/${currentSlug}`)}
            className="border-2 border-[#5C3124] text-[#5C3124] hover:bg-[#5C3124] hover:text-white rounded-full px-8 py-2.5 font-bold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:scale-105"
          >
            <span>View All {activeCategory}</span>
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
