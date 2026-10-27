import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsApi } from "../../api/product.api";
import { getProductImageUrl } from "../../utils/productAdapter";
import { addProductToCart } from "../../services/cartStorage.service";
import { successToast } from "../../utils/toast";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/ProductCard";
import { ProductCardSkeleton } from "../common/SkeletonLoaders";

const TABS = [
  { id: "creatine", label: "Creatine", search: "creatine" },
  { id: "pre-workouts", label: "Pre Workouts", search: "pre workout" },
  { id: "bcaa-eaa", label: "BCAA/EAA", search: "bcaa" },
  { id: "electrolyte", label: "Electrolyte", search: "electrolyte" },
  { id: "carbs-blend", label: "Carbs Blend", search: "carb" },
  { id: "l-arginine", label: "L-Arginine", search: "arginine" },
];

/**
 * Best in Pre/Intra Workout Section.
 * Completely dynamic: Fetches live products from /public/v1/products catalog API.
 * Static mock products and IDs have been completely removed.
 */
export default function PreIntraWorkoutSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(true);

  const activeTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];

  useEffect(() => {
    let isMounted = true;

    // Use tab cache if already loaded
    if (productsCache[activeTab] && productsCache[activeTab].length > 0) {
      setLoading(false);
      return;
    }

    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await getProductsApi({
          search: activeTabConfig.search,
          limit: 8,
          page: 1,
        });

        if (!isMounted) return;

        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];

        const normalized = list
          .filter((p) => p && p.name && (p.is_deleted !== true))
          .map((p) => {
            const selling = Number(p.sellingPrice || p.discountPrice || p.price || 0);
            const original = Number(p.price || 0);
            return {
              id: p._id || p.id,
              slug: p.slug || p._id,
              name: p.name,
              image: getProductImageUrl(p),
              price: selling,
              originalPrice: original > selling ? original : selling * 1.25,
              premiumPrice: Math.round(selling * 0.96),
              rating: Number(p.rating?.average) || 4.5,
              reviews: Number(p.rating?.totalReviews) || 0,
              badge: p.badges?.[0] || (p.flavour ? p.flavour : undefined),
              badgeTone: p.badges?.[0] ? "success" : undefined,
              raw: p,
            };
          })
          .filter((p) => p.price > 0 && Boolean(p.image))
          .slice(0, 4);

        // If specific search had fewer than 4 items, fallback query to general supplements
        if (normalized.length === 0) {
          const fallbackRes = await getProductsApi({ limit: 4, page: 1 });
          if (isMounted) {
            const fbList = (fallbackRes?.data?.data || []).slice(0, 4).map((p) => {
              const selling = Number(p.sellingPrice || p.discountPrice || p.price || 0);
              return {
                id: p._id || p.id,
                slug: p.slug || p._id,
                name: p.name,
                image: getProductImageUrl(p),
                price: selling,
                originalPrice: Number(p.price || 0) || selling * 1.25,
                premiumPrice: Math.round(selling * 0.96),
                rating: Number(p.rating?.average) || 4.5,
                reviews: Number(p.rating?.totalReviews) || 0,
                badge: p.badges?.[0] || undefined,
                raw: p,
              };
            });
            setProductsCache((prev) => ({ ...prev, [activeTab]: fbList }));
          }
        } else {
          setProductsCache((prev) => ({ ...prev, [activeTab]: normalized }));
        }
      } catch (err) {
        console.warn(`[PreIntraWorkout] Error loading products for tab ${activeTab}:`, err?.message);
        if (isMounted) {
          setProductsCache((prev) => ({ ...prev, [activeTab]: [] }));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [activeTab, activeTabConfig.search]);

  const displayedProducts = productsCache[activeTab] || [];



  return (
    <section className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Best in Pre/Intra Workout"
          tabs={TABS.map((t) => ({ id: t.id, label: t.label }))}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewAll={() =>
            navigate(
              `/gomzi-supplement?search=${encodeURIComponent(
                activeTabConfig.search
              )}`
            )
          }
        />

        {loading && displayedProducts.length === 0 ? (
          <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 py-12 text-center text-sm text-gray-500">
            No products found for {activeTabConfig.label}.{" "}
            <button
              onClick={() => navigate("/gomzi-supplement")}
              className="font-semibold text-primary underline ml-1"
            >
              Browse all supplements
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
