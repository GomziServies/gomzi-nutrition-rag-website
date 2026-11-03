// src/component/healthkart/HkCategoryCircles.jsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useCategories from "../../hooks/useCategories";
import ScallopedCrestFrame from "../common/ScallopedCrestFrame";

export { ScallopedCrestFrame };

export function PopularCategories({ categories, loading = false, error = "", onRetry }) {
  const swiperRef = useRef(null);

  if (!loading && !error && !categories.length) return null;
  const visibleSlides = (maximum) => Math.max(1, Math.min(categories.length, maximum));

  return (
    <section className="w-full bg-[#FAFAFA] py-8 sm:py-12 border-b border-border/60 font-sans relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-6 bg-primary rounded-full inline-block shadow-xs" />
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-tomato">
                Popular Categories
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 pl-5 font-modelica">
              Explore supplements curated for your exact fitness and physique goals
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all shadow-xs hover:border-primary/40 active:scale-95 cursor-pointer"
                aria-label="Previous categories"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all shadow-xs hover:border-primary/40 active:scale-95 cursor-pointer"
                aria-label="Next categories"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <Link
              to="/category"
              className="group inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary hover:text-primary-dark transition-colors"
            >
              <span>View All Categories</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Categories Carousel */}
        {loading ? (
          <div
            role="status"
            aria-label="Loading popular categories"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={index}
                className="h-44 rounded-2xl bg-white border border-stone-200/60 p-4 animate-pulse flex flex-col items-center justify-center gap-3 shadow-xs"
              >
                <div className="w-20 h-20 rounded-xl bg-stone-100" />
                <div className="h-3 w-16 bg-stone-100 rounded" />
                <div className="h-2.5 w-12 bg-stone-100 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div role="alert" className="rounded-2xl border border-border bg-white p-8 text-center shadow-xs">
            <p className="text-sm text-stone-500">We couldn't load the categories.</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 text-sm font-bold text-primary underline underline-offset-4 cursor-pointer"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={14}
              slidesPerView={visibleSlides(2.4)}
              grabCursor={true}
              breakpoints={{
                480: { slidesPerView: visibleSlides(3.2), spaceBetween: 14 },
                640: { slidesPerView: visibleSlides(4.2), spaceBetween: 16 },
                768: { slidesPerView: visibleSlides(5.2), spaceBetween: 16 },
                1024: { slidesPerView: visibleSlides(6.5), spaceBetween: 18 },
                1280: { slidesPerView: visibleSlides(8), spaceBetween: 16 },
              }}
              className="py-2.5 !overflow-visible"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id}>
                  <CategoryLink
                    href={cat.url}
                    className="group flex flex-col items-center bg-white rounded-2xl p-3 sm:p-3.5 border border-stone-200/80 hover:border-primary/50 shadow-[0_2px_10px_rgba(42,23,17,0.03)] hover:shadow-[0_12px_28px_rgba(149,68,44,0.13)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-center h-full"
                  >
                    {/* Floating Spotlight Stage / Pedestal */}
                    <div className="relative w-full aspect-square max-w-[124px] sm:max-w-[136px] rounded-2xl bg-gradient-to-b from-[#FFF7F2] to-[#FAF1EB] flex items-center justify-center p-2.5 overflow-hidden border border-primary/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.8)]">
                      {/* Ambient Luminous Halo */}
                      <div className="absolute inset-1 rounded-full bg-white/70 blur-xs" />

                      {/* 3D Product Tub with Dynamic Depth Shadow */}
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_14px_rgba(42,23,17,0.16)] group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                        onError={(e) => {
                          if (!e.currentTarget.dataset.fallback) {
                            e.currentTarget.dataset.fallback = "true";
                            e.currentTarget.src = "/images/product-placeholder.webp";
                          }
                        }}
                      />
                    </div>

                    {/* Centered Category Title */}
                    <span className="mt-3 text-xs sm:text-sm font-black text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-1 w-full font-tomato">
                      {cat.title}
                    </span>

                    {/* Product Count Pill */}
                    {cat.productCount !== null && (
                      <span className="mt-1.5 inline-flex items-center text-[10px] sm:text-[11px] font-bold text-stone-500 bg-stone-100 group-hover:bg-[#FAF0EA] group-hover:text-primary px-2.5 py-0.5 rounded-full transition-colors font-modelica">
                        {cat.productCount.toLocaleString("en-IN")}{" "}
                        {cat.productCount === 1 ? "Product" : "Products"}
                      </span>
                    )}
                  </CategoryLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryLink({ href, children, ...props }) {
  return href && href.startsWith("/") ? (
    <Link to={href} {...props}>
      {children}
    </Link>
  ) : (
    <a href={href || "#"} {...props}>
      {children}
    </a>
  );
}

export default function HkCategoryCircles() {
  const { categories, loading, error, retry } = useCategories();
  return <PopularCategories categories={categories} loading={loading} error={error} onRetry={retry} />;
}
