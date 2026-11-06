// src/component/healthkart/HkBestSellersTabbed.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProducts } from "../../services/product.service";
import {
  getProductImageUrl,
  diversifyProducts,
  getProductBrand,
} from "../../data/homeProducts";
import ProductCard from "../common/ProductCard";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";

const TABS = [
  { id: "all", label: "All Products", category: "" },
  { id: "whey", label: "Whey Protein", category: "Whey Protein" },
  { id: "combos", label: "Combos & Stacks", category: "Combos & Stacks" },
  { id: "creatine", label: "Creatine", category: "Creatine" },
  { id: "preworkout", label: "Pre-Workout", category: "Pre Workout" },
  { id: "gainer", label: "Mass Gainer", category: "Mass Gainer" },
  { id: "snacks", label: "Protein Snacks", category: "Protein Bars & Snacks" },
  { id: "plant", label: "Plant Protein", category: "Plant Protein" },
];

export default function HkBestSellersTabbed() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products dynamically based on active tab with brand diversification
  useEffect(() => {
    let isMounted = true;
    const loadTabProducts = async () => {
      setLoading(true);
      const currentTab = TABS.find((t) => t.id === activeTab);
      const catParam = currentTab?.category || "";

      try {
        const res = await fetchProducts({
          category: catParam,
          limit: 48, // Fetch larger pool to interleave varied brands
        });

        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mixed = diversifyProducts(res.data, 15);
          setProducts(mixed.length > 0 ? mixed : res.data.slice(0, 15));
        } else if (isMounted) {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error loading tab products:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTabProducts();
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const currentTabObj = TABS.find((t) => t.id === activeTab);
  const visibleSlides = (maximum) => Math.max(1, Math.min(products.length, maximum));

  return (
    <section className="w-full bg-light py-10 sm:py-14 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Title & Controls Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-3xl font-black text-text tracking-tight font-toma">
                Explore supplements by category
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Real supplements directly from our database with lab-tested certificates
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={
                currentTabObj?.category
                  ? `/gomzi-supplement?category=${encodeURIComponent(currentTabObj.category)}`
                  : "/gomzi-supplement"
              }
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>
                View All {currentTabObj?.category ? `${currentTabObj.category} Products` : "Products"}
              </span>
              &rarr;
            </Link>

            {/* Slider Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous products"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border border-stone-200 hover:bg-primary hover:text-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next products"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-stone-200 hover:bg-primary hover:text-white text-stone-700 shadow-2xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md border border-primary"
                    : "bg-white text-stone-700 hover:bg-[#fbf4f0] hover:text-primary border border-border"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Carousel (5 cards on desktop, autoplay like Popular Categories) */}
        <div className="mt-6 relative w-full overflow-hidden">
          {loading ? (
            <ProductGridSkeleton count={5} label="Loading supplements" className="mt-6" />
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-stone-500 bg-white rounded-xl border border-border">
              No products found in this category.
            </div>
          ) : (
            <Swiper
              key={`bestsellers-${activeTab}-${products.length}`}
              modules={[Autoplay, Navigation]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={products.length > 5}
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
              {products.map((product) => (
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
