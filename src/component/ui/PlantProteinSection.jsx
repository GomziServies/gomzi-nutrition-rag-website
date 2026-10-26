import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiHeart, FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";
import { getProductsApi } from "../../api/product.api";
import { normalizeProduct, isRealProduct } from "../../utils/productAdapter";

// Authentic Gomzi Nutrition Plant Protein Products
const PLANT_PROTEIN_PRODUCTS = [];

export default function PlantProteinSection() {
  const [wishlist, setWishlist] = useState({});
  const [apiProducts, setApiProducts] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const loadPlantProtein = async () => {
      try {
        // Query category directly from backend RAG API (returns all 17 plant protein items)
        const res = await getProductsApi({ category: "Plant Protein", limit: 50, page: 1 });
        if (isMounted && res.data?.data && Array.isArray(res.data.data)) {
          const plantItems = res.data.data
            .filter((p) => p && p.name && isRealProduct(p))
            .map((p) => normalizeProduct(p, "plant-protein"));

          if (plantItems.length > 0) {
            setApiProducts(plantItems);
          }
        }
      } catch (err) {
        console.error("Error fetching plant protein products from RAG app:", err);
      }
    };
    loadPlantProtein();
    return () => {
      isMounted = false;
    };
  }, []);

  const productsToRender = apiProducts;

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
    <section className="w-full py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary-light border border-primary-border px-3 py-1 rounded-full mb-2">
              100% Vegan & Dairy-Free
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text tracking-tight">
              Plant Protein
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">
              Clean plant-powered nutrition with complete amino acid profiles to fuel lean muscle growth and easy digestion.
            </p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-primary hover:text-white hover:border-primary text-primary flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
              aria-label="Previous Slide"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-primary hover:text-white hover:border-primary text-primary flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
              aria-label="Next Slide"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 18 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 22 },
            }}
            className="pb-4"
          >
            {productsToRender.map((item) => {
              const discountPct = Math.round(
                ((item.originalPrice - item.price) / item.originalPrice) * 100
              );

              return (
                <SwiperSlide key={item.id} className="h-auto">
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 hover:border-amber-400/40 p-4 h-full flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden">
                    {/* Subtle moving card sheen sweep on hover */}

                    {/* Top Tag & Wishlist */}
                    <div className="relative z-10 flex items-center justify-between w-full mb-2">
                      <span className="text-[10px] font-bold tracking-wider text-primary bg-primary-light border border-primary-border group-hover:border-amber-400/40 px-2.5 py-0.5 rounded-full uppercase transition-colors">
                        {item.tag}
                      </span>
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

                      {/* Rating Badge */}
                      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs text-gray-900 text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-gray-100">
                        <FaStar className="w-3 h-3 text-amber-500 fill-current" />
                        <span>{item.rating}</span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          ({item.totalReviews})
                        </span>
                      </div>
                    </div>

                    {/* Highlight Subtext */}
                    <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mt-2.5">
                      {item.highlight}
                    </p>

                    {/* Product Title */}
                    <h3
                      onClick={() => navigate(`/gomzi-supplement/${item.slug}`)}
                      className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-2 mt-1 leading-snug hover:text-primary transition-colors cursor-pointer min-h-[36px]"
                    >
                      {item.name}
                    </h3>

                    {/* Pricing */}
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

                    {/* Action Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="group/btn relative overflow-hidden mt-4 w-full py-2.5 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer"
                    >
                      <FiShoppingCart className="w-4 h-4 text-amber-200 transition-transform duration-300 group-hover/btn:scale-110" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/gomzi-supplement/plant-protein")}
            className="group relative overflow-hidden btn-gradient border border-amber-400/30 text-white rounded-full px-8 py-2.5 font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10">View All Plant Protein</span>
            <FiChevronRight className="relative z-10 w-4 h-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
