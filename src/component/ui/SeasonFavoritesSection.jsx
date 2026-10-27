import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getCategoriesApi } from "../../api/category.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";
import SectionHeader from "../common/SectionHeader";
import CategoryRangeCard from "../common/CategoryRangeCard";

const CATEGORIES_CACHE_KEY = "gomzi_categories_cache";
const CATEGORIES_PAGE_CACHE_KEY = "gomzi_categories_page_cache";

const resolveImageUrl = (img) => {
  if (!img || typeof img !== "string" || !img.trim()) return "";
  const clean = img.trim();
  if (clean.includes("/images/product-placeholder")) return "";
  if (
    clean.startsWith("http://") ||
    clean.startsWith("https://")
  ) {
    return clean;
  }
  if (clean.startsWith("/")) {
    return clean;
  }
  return `https://files.fggroup.in/${clean}`;
};

/**
 * Deduplicate and normalize raw category items from the API
 */
const normalizeCategories = (rawList = []) => {
  if (!Array.isArray(rawList)) return [];
  const seen = new Set();
  const result = [];

  for (const cat of rawList) {
    if (!cat) continue;
    const key = (cat.slug || cat.title || cat.name || "").toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);

    result.push({
      id: cat._id || cat.slug || key,
      title: cat.title || cat.name || "Category",
      subtitle: cat.subtitle || cat.description || cat.spec || "",
      badge: cat.tag || cat.badge || "Featured",
      image: resolveImageUrl(cat.image),
      productCount: Number(cat.productCount ?? cat.products?.length ?? 0),
      url: cat.url || (cat.slug ? `/gomzi-supplement/${cat.slug}` : "/category"),
    });
  }

  return result.filter((cat) => Boolean(cat.image));
};

export default function SeasonFavoritesSection() {
  const navigate = useNavigate();
  const [swiperRef, setSwiperRef] = useState(null);

  // Initialize from cache if available from /category page or previous load
  const [categories, setCategories] = useState(() => {
    const cachedPage = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    const cachedList = getLocalCache(CATEGORIES_CACHE_KEY);
    const candidate = Array.isArray(cachedList) && cachedList.length > 0
      ? cachedList
      : Array.isArray(cachedPage?.categories) && cachedPage.categories.length > 0
      ? cachedPage.categories
      : [];
    return normalizeCategories(candidate);
  });

  const [loading, setLoading] = useState(categories.length === 0);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        const raw = res?.data?.data?.categories || [];
        if (!isMounted || !Array.isArray(raw) || raw.length === 0) return;

        const normalized = normalizeCategories(raw);

        if (normalized.length > 0) {
          setCategories(normalized);
          setLocalCache(CATEGORIES_CACHE_KEY, normalized);
        }
      } catch (err) {
        console.warn("Failed to fetch live categories for home section:", err?.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Browse by Category"
          onViewAll={() => navigate("/category")}
        />

        {loading && categories.length === 0 ? (
          <div className="flex gap-4 overflow-hidden py-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[260px] sm:w-[280px] shrink-0 h-[340px] rounded-xl sm:rounded-2xl border border-border bg-gray-50/80 animate-pulse flex flex-col p-4"
              >
                <div className="w-full h-[180px] rounded-lg bg-gray-200/80 mb-4" />
                <div className="h-5 bg-gray-200/80 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200/60 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200/40 rounded w-1/2 mt-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative group">
            <Swiper
              modules={[Autoplay, FreeMode, Mousewheel]}
              onSwiper={setSwiperRef}
              grabCursor={true}
              freeMode={{ enabled: true, momentum: true }}
              mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
              loop={categories.length > 4}
              speed={650}
              autoplay={{
                delay: 2200,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                480: { slidesPerView: 1.6, spaceBetween: 16 },
                640: { slidesPerView: 2.3, spaceBetween: 18 },
                768: { slidesPerView: 3.1, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="w-full select-none cursor-grab active:cursor-grabbing pb-2"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id} className="h-auto !flex items-stretch">
                  <CategoryRangeCard
                    className="w-full h-full"
                    title={cat.title}
                    subtitle={cat.subtitle}
                    image={cat.image}
                    badge={cat.badge}
                    count={cat.productCount}
                    to={cat.url || "/category"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Edge navigation arrows for desktop */}
            {categories.length > 4 && (
              <>
                <button
                  type="button"
                  onClick={() => swiperRef?.slidePrev()}
                  aria-label="Previous Category"
                  className="absolute -left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md border border-border/80 transition-all hover:bg-primary hover:text-white sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => swiperRef?.slideNext()}
                  aria-label="Next Category"
                  className="absolute -right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md border border-border/80 transition-all hover:bg-primary hover:text-white sm:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
