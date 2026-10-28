// src/component/healthkart/HkCategoryCircles.jsx
import { useId } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowRight } from "lucide-react";
import useCategories from "../../hooks/useCategories";

/**
 * Custom Cusped Ornamental Frame matching the reference design in Gomzi brand colors
 */
function ScallopedCrestFrame() {
  const gradientId = useId();
  return (
    <svg
      viewBox="0 0 160 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.03]"
    >
      <defs>
        {/* Soft Gomzi warm cream/peach background gradient */}
        <linearGradient id={gradientId} x1="80" y1="6" x2="80" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fdf7f4" />
          <stop offset="100%" stopColor="#f6e5dc" />
        </linearGradient>
      </defs>

      {/* Outer Contoured Stepped Arch (Mughal / Moroccan Cusped Arch) */}
      <path
        d="M 80,6
           C 88,12 98,16 108,16
           C 116,16 120,20 120,28
           C 120,34 124,38 132,38
           C 144,38 152,48 152,60
           L 152,116
           C 152,128 144,138 132,138
           C 124,138 120,142 120,148
           C 120,156 116,160 108,160
           C 98,160 88,164 80,170
           C 72,164 62,160 52,160
           C 44,160 40,156 40,148
           C 40,142 36,138 28,138
           C 16,138 8,128 8,116
           L 8,60
           C 8,48 16,38 28,38
           C 36,38 40,34 40,28
           C 40,20 44,16 52,16
           C 62,16 72,12 80,6 Z"
        fill={`url(#${gradientId})`}
        stroke="var(--color-primary)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Inner Accent Line Contour (Adds high-end depth matching reference) */}
      <path
        d="M 80,12
           C 87,17 96,20 106,20
           C 112,20 115,23 115,29
           C 115,34 119,38 126,38
           C 138,38 145,47 145,58
           L 145,118
           C 145,129 138,138 126,138
           C 119,138 115,142 115,147
           C 115,153 112,156 106,156
           C 96,156 87,159 80,164
           C 73,159 64,156 54,156
           C 48,156 45,153 45,147
           C 45,142 41,138 34,138
           C 22,138 15,129 15,118
           L 15,58
           C 15,47 22,38 34,38
           C 41,38 45,34 45,29
           C 45,23 48,20 54,20
           C 64,20 73,17 80,12 Z"
        fill="none"
        stroke="#dfb5a6"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.8"
      />
    </svg>
  );
}

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
        </div> : <div className="relative group">
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
                  {/* Cusped Ornamental Frame Container */}
                  <div className="relative w-[128px] h-[144px] sm:w-[140px] sm:h-[156px] mx-auto flex items-center justify-center">
                    {/* SVG Scalloped Arch Frame */}
                    <ScallopedCrestFrame />

                    {/* 3D Product Render Centered Inside Frame with Elegant Proportional Fit */}
                    <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        className="max-h-[56%] max-w-[58%] object-contain drop-shadow-[0_6px_8px_rgba(42,23,17,0.20)] group-hover:scale-108 transition-transform duration-300 pointer-events-none"
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
                  <span className="mt-2.5 text-xs sm:text-sm font-extrabold text-text group-hover:text-primary transition-colors leading-snug line-clamp-1 w-full px-1">
                    {cat.title}
                  </span>

                  {/* Category Count */}
                  {cat.productCount !== null && <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                    {cat.productCount.toLocaleString("en-IN")} {cat.productCount === 1 ? "Product" : "Products"}
                  </span>}
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
