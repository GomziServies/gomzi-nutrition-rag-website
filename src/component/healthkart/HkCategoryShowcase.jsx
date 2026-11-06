// src/component/healthkart/HkCategoryShowcase.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts } from "../../services/product.service";
import { diversifyProducts } from "../../data/homeProducts";
import ProductCard from "../common/ProductCard";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";

const SHOWCASE_CATEGORY_QUERIES = {
  "Creatine": {
    categories: ["Creatine", "Creatine Monohydrate", "Pre Workout"],
    searches: ["Creatine", "Pre-Workout"],
  },
  "Whey Protein": {
    categories: ["Whey Protein"],
    searches: ["Whey"],
  },
  "Combos & Stacks": {
    categories: ["Combos & Stacks"],
    searches: ["Combo", "Stack"],
  },
};

export default function HkCategoryShowcase({
  title = "Whey Protein & Muscle Builders",
  category = "Whey Protein",
  categorySlug = "whey-protein",
  subtitle = "Direct from GMP certified lab. 100% Genuine with batch NABL reports.",
  fallbackProducts = [],
}) {
  const swiperRef = useRef(null);

  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadCategoryProducts = async () => {
      try {
        setLoading(true);
        const config = SHOWCASE_CATEGORY_QUERIES[category] || { categories: [category] };

        const allProducts = [];
        const seenIds = new Set();

        // 1. Fetch by configured category candidates
        for (const cat of config.categories || [category]) {
          try {
            const res = await fetchProducts({
              category: cat,
              limit: 30,
            });
            if (res.success && Array.isArray(res.data)) {
              for (const p of res.data) {
                if (p && p._id && !seenIds.has(p._id)) {
                  seenIds.add(p._id);
                  allProducts.push(p);
                }
              }
            }
          } catch {
            // continue to next candidate
          }
        }

        // 2. If fewer than 5 products found, supplement with keyword search
        if (allProducts.length < 5 && Array.isArray(config.searches)) {
          for (const query of config.searches) {
            try {
              const res = await fetchProducts({
                search: query,
                limit: 20,
              });
              if (res.success && Array.isArray(res.data)) {
                for (const p of res.data) {
                  if (p && p._id && !seenIds.has(p._id)) {
                    seenIds.add(p._id);
                    allProducts.push(p);
                  }
                }
              }
            } catch {
              // continue
            }
          }
        }

        if (isMounted) {
          if (allProducts.length > 0) {
            setProductCount(allProducts.length);
            const mixed = diversifyProducts(allProducts, 15);
            setProducts(mixed.length > 0 ? mixed : allProducts.slice(0, 15));
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        console.error(`Error loading ${category} products:`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategoryProducts();
    return () => {
      isMounted = false;
    };
  }, [category]);

  const displayedList = products.length > 0 ? products : fallbackProducts;
  if (!loading && displayedList.length === 0) return null;

  const isLoopable = displayedList.length > 5;

  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header (HealthKart style) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-primary rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-black text-text tracking-tight font-toma">
                {title}
              </h2>
              {productCount > 0 && (
                <span className="text-xs font-bold text-primary bg-[#fcf4f0] px-2.5 py-0.5 rounded-full border border-border">
                  {productCount} Products
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-1 pl-4.5">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/gomzi-supplement?category=${encodeURIComponent(category)}`}
              className="text-xs sm:text-sm font-bold text-primary hover:underline"
            >
              View All {category} &rarr;
            </Link>

            {/* Slider Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label={`Previous ${category}`}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-stone-200 hover:bg-primary hover:text-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label={`Next ${category}`}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-stone-200 hover:bg-primary hover:text-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel (5 cards on desktop, autoplay like Popular Categories) */}
        <div className="mt-6 relative w-full overflow-hidden">
          {loading ? (
            <ProductGridSkeleton label="Loading products" />
          ) : (
            <Swiper
              key={`cat-showcase-${categorySlug}-${displayedList.length}`}
              modules={[Autoplay, Navigation]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={
                isLoopable
                  ? {
                      delay: 2800,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              loop={isLoopable}
              speed={700}
              spaceBetween={14}
              slidesPerView={5}
              grabCursor={isLoopable}
              observer={true}
              observeParents={true}
              breakpoints={{
                0: { slidesPerView: 1.4, spaceBetween: 10 },
                380: { slidesPerView: 1.8, spaceBetween: 12 },
                480: { slidesPerView: 2.2, spaceBetween: 12 },
                640: { slidesPerView: 3, spaceBetween: 14 },
                768: { slidesPerView: 3.6, spaceBetween: 16 },
                1024: { slidesPerView: 4.2, spaceBetween: 16 },
                1200: { slidesPerView: 5, spaceBetween: 16 },
              }}
              className="w-full overflow-hidden py-2"
            >
              {displayedList.map((product) => (
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
