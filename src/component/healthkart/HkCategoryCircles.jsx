// src/component/healthkart/HkCategoryCircles.jsx
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowRight } from "lucide-react";
import useCategories from "../../hooks/useCategories";
import ScallopedCrestFrame from "../common/ScallopedCrestFrame";

export { ScallopedCrestFrame };

export function PopularCategories({ categories, loading = false, error = "", onRetry }) {
  if (!loading && !error && !categories.length) return null;
  const visibleSlides = maximum => Math.max(1, Math.min(categories.length, maximum));
  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-primary rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-black text-text tracking-tight font-toma">
                Popular Categories
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-1 pl-4.5">
              Explore supplements curated for your exact fitness and physique goals
            </p>
          </div>

          <Link
            to="/category"
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── Scalloped Crest Category Swiper (Exact Match to Reference in Gomzi Brand Colors) ── */}
        {loading ? <div role="status" aria-label="Loading popular categories" className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-4">
          {[0, 1, 2, 3, 4, 5, 6].map(index => <div key={index} className="flex flex-col items-center gap-3"><div className="h-36 w-full max-w-32 rounded-3xl bg-border/50 animate-pulse" /><div className="h-3 w-24 rounded bg-border/50 animate-pulse" /></div>)}
        </div> : error ? <div role="alert" className="rounded-2xl border border-border bg-light p-8 text-center">
          <p className="text-sm text-stone-500">We couldn't load the categories.</p><button type="button" onClick={onRetry} className="mt-3 text-sm font-bold text-primary underline underline-offset-4">Try again</button>
        </div> : <div className="relative">
          <Swiper
            spaceBetween={14}
            slidesPerView={visibleSlides(2.5)}
            grabCursor={true}
            breakpoints={{
              480: { slidesPerView: visibleSlides(3), spaceBetween: 14 },
              640: { slidesPerView: visibleSlides(4), spaceBetween: 16 },
              768: { slidesPerView: visibleSlides(5), spaceBetween: 16 },
              1024: { slidesPerView: visibleSlides(6), spaceBetween: 18 },
              1280: { slidesPerView: visibleSlides(8), spaceBetween: 16 },
            }}
            className="overflow-hidden py-2"
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id}>
                <CategoryLink
                  href={cat.url}
                  className="group flex flex-col items-center text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Cusped Ornamental Frame Container with Ambient & Interactive Halo */}
                  <div className="relative w-[128px] h-[144px] sm:w-[140px] sm:h-[156px] mx-auto flex items-center justify-center">
                    {/* SVG Scalloped Arch Frame with Warm Halo Effect */}
                    <ScallopedCrestFrame halo={true} />

                    {/* 3D Product Render Centered Inside Frame with Increased Size */}
                    <div className="absolute inset-0 flex items-center justify-center p-1.5 sm:p-2">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        className="w-auto h-auto max-h-[74%] max-w-[75%] object-contain drop-shadow-[0_6px_10px_rgba(42,23,17,0.22)] group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                        onError={(e) => {
                          if (!e.currentTarget.dataset.fallback) {
                            e.currentTarget.dataset.fallback = "true";
                            e.currentTarget.src = "/images/product-placeholder.webp";
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Centered Category Title */}
                  <span className="mt-2.5 text-xs sm:text-sm font-extrabold text-text group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-1 w-full px-1">
                    {cat.title}
                  </span>

                  {/* Category Count */}
                  {cat.productCount !== null && (
                    <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                      {cat.productCount.toLocaleString("en-IN")} {cat.productCount === 1 ? "Product" : "Products"}
                    </span>
                  )}
                </CategoryLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>}
      </div>
    </section>
  );
}

function CategoryLink({ href, children, ...props }) {
  return href.startsWith('/') ? <Link to={href} {...props}>{children}</Link> : <a href={href} {...props}>{children}</a>;
}

export default function HkCategoryCircles() {
  const { categories, loading, error, retry } = useCategories();
  return <PopularCategories categories={categories} loading={loading} error={error} onRetry={retry} />;
}
