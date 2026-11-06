import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { getCategoriesApi } from "../../api/category.api";
import { getLocalCache, setLocalCache } from "../../utils/storage";

const CATEGORIES_PAGE_CACHE_KEY = "gomzi_categories_page_cache";

const resolveImageUrl = (img) => {
  if (!img) return "/images/product-placeholder.webp";
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("/") ||
    img.startsWith("blob:")
  ) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

/**
 * Dynamic Category MegaMenu
 * Completely replaces legacy static mock taxonomy with live verified categories from MongoDB.
 */
export default function MegaMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return Array.isArray(cached?.categories) ? cached.categories : [];
  });
  const [totalProducts, setTotalProducts] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return cached?.totalProducts || 0;
  });

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    getCategoriesApi()
      .then((res) => {
        if (isMounted && res.data?.data) {
          const data = res.data.data;
          if (Array.isArray(data.categories)) {
            const activeCats = data.categories
              .filter((c) => c && c.status !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            setCategories(activeCats);
            const liveTotal =
              data.totalProducts ||
              activeCats.reduce((sum, c) => sum + (c.productCount || 0), 0);
            setTotalProducts(liveTotal);

            setLocalCache(CATEGORIES_PAGE_CACHE_KEY, {
              categories: activeCats,
              totalProducts: liveTotal,
            });
          }
        }
      })
      .catch((err) => {
        console.warn("MegaMenu category fetch error:", err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCategoryClick = (cat) => {
    onClose();
    navigate(cat.url || `/gomzi-supplement/${cat.slug}`);
  };

  const handleViewAll = () => {
    onClose();
    navigate("/category");
  };

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[9999] w-[920px] max-w-[95vw] shadow-[0_20px_60px_rgba(0,0,0,0.18)] rounded-2xl border border-primary-border bg-white animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden"
      role="menu"
      aria-label="Shop By Category Menu"
    >
      {/* Header bar */}
      <div className="px-6 py-3.5 bg-gradient-to-r from-bg-light via-white to-bg-light border-b border-primary-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center text-primary">
            <Layers size={14} />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-text flex items-center gap-2">
              <span>Product Categories</span>
              <span className="text-[10px] font-semibold text-primary bg-primary-light px-2 py-0.5 rounded-full border border-primary-border">
                {categories.length} Categories Live
              </span>
            </h3>
            <p className="text-[11px] text-text-light">
              100% verified formulations directly backed by laboratory assays
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View All Categories</span>
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="p-5 max-h-[460px] overflow-y-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat._id || cat.slug}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="group flex items-center gap-3.5 p-3 rounded-xl border border-border bg-white hover:border-primary hover:bg-primary-light/30 hover:shadow-xs transition-all text-left cursor-pointer"
            >
              <div className="w-14 h-14 rounded-lg bg-bg-light flex items-center justify-center shrink-0 p-1 border border-border/40 group-hover:bg-white transition-colors">
                <img
                  src={resolveImageUrl(cat.image)}
                  alt={cat.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  style={{ mixBlendMode: "multiply" }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/product-placeholder.webp";
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-bold text-text group-hover:text-primary transition-colors truncate">
                    {cat.title}
                  </h4>
                  {cat.tag && (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-primary-light text-primary border border-primary-border shrink-0">
                      {cat.tag}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-text-light line-clamp-1">
                  {cat.spec || cat.subtitle || "Performance Formulation"}
                </p>

                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-gray-500">
                    {cat.productCount
                      ? `${cat.productCount} Products`
                      : "Explore Range"}
                  </span>
                  <span className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop ›
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Strip */}
      <div className="px-6 py-3 bg-[#fdfbf9] border-t border-primary-border flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-text-light text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-primary" />
            <span>Third-Party Lab Tested</span>
          </span>
          <span className="inline-flex items-center gap-1.5 hidden sm:inline-flex">
            <Sparkles size={13} className="text-primary" />
            <span>Zero Protein Spiking</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="text-xs font-bold text-primary hover:underline cursor-pointer"
        >
          Explore Full Catalog ({totalProducts}+ Formulations) →
        </button>
      </div>
    </div>
  );
}
