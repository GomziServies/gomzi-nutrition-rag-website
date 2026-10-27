import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FiHeart, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { successToast, errorToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { normalizeProduct, filterProductsByCategory, isRealProduct } from "../../utils/productAdapter";
import { ProductCardSkeleton } from "../common/SkeletonLoaders";
import useAuth from "../../hooks/useAuth";

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
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Load real products per active category from RAG API (http://localhost:3005)
  useEffect(() => {
    let isMounted = true;
    const loadCategoryProducts = async () => {
      if (productsByCategory[activeCategory]) return;
      try {
        setIsLoadingApi(true);
        const res = await getProductsApi({
          category: activeCategory,
          limit: 200,
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
    await addProductToCart(product);
  };

  const handleBuyNow = async (product) => {
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

  return (
    <section className="w-full py-12 sm:py-16 bg-bg-cream overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary-light border border-primary-border px-3 py-1 rounded-full mb-2">
              Gomzi Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight">
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
                    ? "bg-primary text-white border border-primary shadow-md shadow-primary/15"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary/40 hover:text-primary hover:bg-primary-light"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {[...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="py-14 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs">
              <p className="text-base font-semibold text-text">
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
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 hover:border-amber-400/40 p-4 h-full flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
                    {/* Subtle moving card sheen sweep on hover */}

                    {/* Top Row: TrusLified badge & Wishlist Heart */}
                    <div className="relative z-10 flex items-center justify-between w-full mb-2">
                      <div>
                        {item.trusLified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-primary bg-primary-light border border-primary-border px-2 py-0.5 rounded-full uppercase">
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
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-primary-light flex items-center justify-center text-gray-400 hover:text-red-500 transition cursor-pointer"
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
                      className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-2 mt-3 leading-snug hover:text-primary transition-colors cursor-pointer min-h-[36px]"
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
                        <span className="text-xs font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded">
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
                    <div className="mt-2.5 bg-primary-light border border-primary-border rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] text-primary">
                      <span className="font-semibold flex items-center gap-1">
                        <span className="text-amber-600 font-bold">✪</span>
                        <span>Member Price:</span>
                      </span>
                      <span className="font-extrabold">
                        ₹{item.memberPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Action Buttons with Hero Color Shade & Effect */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {/* Add to Cart button */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full py-2.5 rounded-xl border-2 border-primary/35 hover:border-primary bg-white hover:bg-primary-light text-primary-deep hover:text-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-2xs hover:shadow-xs cursor-pointer"
                      >
                        <FiShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        <span>Add</span>
                      </button>

                      {/* Buy Now button */}
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="group/buy relative overflow-hidden w-full py-2.5 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer"
                      >
                        <span className="tracking-tight">Buy Now</span>
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
            className="group relative overflow-hidden btn-gradient border border-amber-400/30 text-white rounded-full px-8 py-2.5 font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10">View All {activeCategory}</span>
            <FiChevronRight className="relative z-10 w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
