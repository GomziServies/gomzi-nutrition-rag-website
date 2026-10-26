import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCategoriesApi } from "../../api/category.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";
import SectionHeader from "../common/SectionHeader";
import Marquee from "../common/Marquee";
import CategoryRangeCard from "../common/CategoryRangeCard";

const CATEGORIES_CACHE_KEY = "gomzi_categories_cache";
const CATEGORIES_PAGE_CACHE_KEY = "gomzi_categories_page_cache";

const resolveImageUrl = (img) => {
  if (!img || typeof img !== "string" || !img.trim()) return "/images/product-placeholder.webp";
  const clean = img.trim();
  if (
    clean.startsWith("http://") ||
    clean.startsWith("https://") ||
    clean.startsWith("/")
  ) {
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

  return result;
};

export default function SeasonFavoritesSection() {
  const navigate = useNavigate();

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
          <Marquee duration={55} className="px-4 md:px-0">
            {categories.map((cat) => (
              <div key={cat.id} className="mx-2 flex items-stretch">
                <CategoryRangeCard
                  className="w-[260px] sm:w-[280px] shrink-0"
                  title={cat.title}
                  subtitle={cat.subtitle}
                  image={cat.image}
                  badge={cat.badge}
                  count={cat.productCount}
                  to={cat.url || "/category"}
                />
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
