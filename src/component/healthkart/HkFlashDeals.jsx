// src/component/healthkart/HkFlashDeals.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { fetchProducts } from "../../services/product.service";
import {
  FLASH_DEAL_PRODUCTS,
  getProductImageUrl,
  diversifyProducts,
  getProductBrand,
} from "../../data/homeProducts";
import ProductCard from "../common/ProductCard";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";

export default function HkFlashDeals() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
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
          const mixed = diversifyProducts(res.data, 15);
          setDeals(mixed.length > 0 ? mixed : res.data.slice(0, 15));
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

  const visibleSlides = (maximum) => Math.max(1, Math.min(deals.length, maximum));

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
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous Products"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-stone-200 hover:bg-primary hover:text-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next Products"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-stone-200 hover:bg-primary hover:text-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Swiper Slider (HealthKart card layout: 5 cards on desktop, autoplay like Popular Categories) */}
        <div className="mt-6 relative w-full overflow-hidden">
          {loading ? (
            <ProductGridSkeleton label="Loading products" />
          ) : (
            <Swiper
              key={`deals-swiper-${deals.length}`}
              modules={[Autoplay, Navigation]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={deals.length > 5}
              speed={700}
              spaceBetween={14}
              slidesPerView={visibleSlides(5)}
              grabCursor={true}
              observer={true}
              observeParents={true}
              breakpoints={{
                0: { slidesPerView: visibleSlides(1.4), spaceBetween: 10 },
                380: { slidesPerView: visibleSlides(1.8), spaceBetween: 12 },
                480: { slidesPerView: visibleSlides(2.2), spaceBetween: 12 },
                640: { slidesPerView: visibleSlides(3), spaceBetween: 14 },
                768: { slidesPerView: visibleSlides(3.6), spaceBetween: 16 },
                1024: { slidesPerView: visibleSlides(4.2), spaceBetween: 16 },
                1200: { slidesPerView: visibleSlides(5), spaceBetween: 16 },
              }}
              className="w-full overflow-hidden py-2"
            >
              {deals.map((product) => (
                <SwiperSlide key={product._id} className="!h-auto flex justify-center">
                  <div className="w-full max-w-[280px] h-full flex flex-col">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
