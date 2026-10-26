import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { fetchProducts } from "../../services/product.service";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

const TABS = [
  { id: "peanut-butter", label: "Peanut Butter" },
  { id: "oats", label: "Oats" },
  { id: "muesli", label: "Muesli" },
  { id: "bars", label: "Bars" },
];

export default function FitFoodRangeSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const query =
          activeTab === "bars"
            ? "protein bar"
            : activeTab.replace("-", " ");
        const res = await fetchProducts({ page: 1, limit: 8, search: query });
        if (!isMounted) return;

        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(
          list.slice(0, 4).map((p, idx) => ({
            id: p._id || `fitfood-${idx}`,
            slug: p.slug || p._id,
            name: p.name,
            image:
              p.displayImages?.[0] ||
              p.image ||
              "/images/product-placeholder.webp",
            price: Number(p.sellingPrice || p.discountPrice || p.price || 0),
            originalPrice: Number(p.price || 0),
            rating: p.rating?.average || 4.4,
            totalReviews: p.rating?.totalReviews || 0,
            raw: p,
          }))
        );
      } catch {
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <section className="w-full bg-bg-page">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Fit Food Range"
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewAll={() => navigate("/gomzi-supplement?search=fit+food")}
        />

        <div className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-shimmer h-[430px] rounded-xl" />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-white py-16 text-center">
            <p className="text-sm text-text-light">
              No products found in this range right now.
            </p>
            <button
              onClick={() => navigate("/gomzi-supplement")}
              className="btn btn-secondary btn-sm"
            >
              Browse all products
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
