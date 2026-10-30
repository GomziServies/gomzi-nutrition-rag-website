// src/component/healthkart/HkFlashDeals.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { fetchProducts } from "../../services/product.service";
import {
  FLASH_DEAL_PRODUCTS,
  getProductImageUrl,
  diversifyProducts,
  getProductBrand,
} from "../../data/homeProducts";
import HkProductCardActions from "./HkProductCardActions";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";

export default function HkFlashDeals() {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [deals, setDeals] = useState(FLASH_DEAL_PRODUCTS);
  const [loading, setLoading] = useState(true);

  // Fetch live deals from backend with multi-brand diversification
  useEffect(() => {
    let isMounted = true;
    const loadDeals = async () => {
      try {
        const res = await fetchProducts({
          limit: 40, // Fetch broader sample to enable brand interleaving
          sort: "createdAt",
          sortOrder: "desc",
        });
        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mixed = diversifyProducts(res.data, 12);
          setDeals(mixed.length > 0 ? mixed : res.data.slice(0, 12));
        }
      } catch (err) {
        console.error("Error loading flash deals:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadDeals();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-light py-8 sm:py-10 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header (HealthKart style) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-text tracking-tight font-toma">
                Flash Deals &amp; Just Launched
              </h2>
            </div>

            {/* Honest promotional label; timing is managed by the catalog. */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-bold">
              <span>New launches and current offers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/gomzi-supplement"
              className="text-xs sm:text-sm font-bold text-primary hover:underline"
            >
              View all products &rarr;
            </Link>

            {/* Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                ref={prevRef}
                aria-label="Previous Products"
                className="w-8 h-8 rounded-full bg-white border border-border hover:bg-primary hover:text-white text-stone-700 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                ref={nextRef}
                aria-label="Next Products"
                className="w-8 h-8 rounded-full bg-white border border-border hover:bg-primary hover:text-white text-stone-700 shadow-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Swiper Slider (HealthKart card layout: 4 cards on desktop) */}
        <div className="mt-6 relative w-full">
          {loading ? <ProductGridSkeleton label="Loading products" /> : <Swiper
            key={`deals-swiper-${deals.length}`}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={20}
            observer={true}
            observeParents={true}
            navigation
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              0: { slidesPerView: 1.4, spaceBetween: 12 },
              480: { slidesPerView: 2, spaceBetween: 14 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="w-full overflow-hidden py-2"
          >
            {deals.map((product) => {
              const price = Number(product.price ?? product.discountPrice ?? 0);
              const discountPrice = Number(product.discountPrice ?? product.price ?? 0);
              const discountPct =
                price > discountPrice
                  ? Math.round(((price - discountPrice) / price) * 100)
                  : 0;
              const imgUrl = getProductImageUrl(product.displayImages);

              return (
                <SwiperSlide key={product._id} className="!h-auto flex">
                  <div
                    onClick={() => navigate(`/product/${product.slug}`)}
                    onKeyDown={(event) => {
                      if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                        event.preventDefault();
                        navigate(`/product/${product.slug}`);
                      }
                    }}
                    role="link"
                    tabIndex={0}
                    aria-label={`View ${product.name}`}
                    className="group bg-white rounded-xl border border-border hover:border-primary hover:shadow-[0_8px_20px_rgba(149,68,44,0.12)] transition-all duration-300 flex flex-col w-full overflow-hidden cursor-pointer relative"
                  >
                    {/* Badge top-left (Discount only) */}
                    {discountPct > 0 && (
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="bg-primary text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          -{discountPct}% OFF
                        </span>
                      </div>
                    )}

                    {/* Standardized Aspect-Square Image Box (Eliminates side white space) */}
                    <div className="w-full aspect-square bg-[#faf7f4] relative flex items-center justify-center overflow-hidden shrink-0 p-3 sm:p-4">
                      <img
                        src={imgUrl}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.06)]"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/images/product-placeholder.webp";
                        }}
                      />
                    </div>

                    {/* Content Section with Standardized Structured Heights */}
                    <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        {/* Rating Pill - Fixed Height */}
                        <div className="h-5 flex items-center gap-1.5 mb-1.5">
                          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold px-1.5 py-0.5 rounded">
                            <span>{product.rating?.average ?? 0}</span>
                            <Star size={11} className="fill-amber-500 text-amber-500" />
                          </span>
                          <span className="text-[11px] text-stone-400 font-medium">
                            ({product.rating?.totalReviews ?? 0})
                          </span>
                        </div>

                        {/* Title - Fixed 2-Line Box */}
                        <h3 className="h-10 sm:h-11 text-xs sm:text-sm font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {product.name}
                        </h3>

                        {/* Brand & Flavour / Weight - Fixed Height */}
                        <p className="h-4 text-[11px] text-stone-500 mt-1 truncate">
                          <span className="font-bold text-stone-700">{getProductBrand(product)}</span>
                          {product.flavour ? ` • ${product.flavour}` : ` • ${product.categories?.[0] || "Authentic"}`}
                        </p>
                      </div>

                      {/* Pricing & Add to Cart Section */}
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col justify-end">
                        <div className="h-6 flex items-baseline gap-2">
                          <span className="text-base sm:text-lg font-black text-text">
                            ₹{discountPrice.toLocaleString("en-IN")}
                          </span>
                          {price > discountPrice && (
                            <span className="text-xs text-stone-400 line-through">
                              ₹{price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {/* Reserved Height for Savings */}
                        <div className="h-4 flex items-center">
                          {price > discountPrice ? (
                            <p className="text-[11px] font-bold text-primary">
                              Save ₹{(price - discountPrice).toLocaleString("en-IN")}
                            </p>
                          ) : (
                            <span className="invisible text-[11px]">&nbsp;</span>
                          )}
                        </div>

                        {/* Add to Cart & Buy Now Action Controls with Live Quantity Stepper */}
                        <HkProductCardActions product={product} />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>}
        </div>
      </div>
    </section>
  );
}
