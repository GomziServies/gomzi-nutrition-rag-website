import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../services/product.service";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

const TABS = [
  { id: "omegas", label: "Omegas" },
  { id: "magnesium", label: "Magnesium" },
  { id: "vitamins", label: "Vitamins" },
  { id: "antioxidants", label: "Anti-Oxidants" },
];

export default function DailyWellnessSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetchProducts({
          page: 1,
          limit: 8,
          search: activeTab === "omegas" ? "fish oil" : activeTab,
        });
        if (!isMounted) return;

        const list = Array.isArray(res.data) ? res.data : [];
        setProducts(
          list
            .map((p, idx) => {
              const selling = Number(p.sellingPrice || p.discountPrice || p.price || 0);
              const original = Number(p.price || 0);
              return {
                id: p._id || `wellness-${idx}`,
                slug: p.slug || p._id,
                name: p.name,
                image:
                  p.displayImages?.[0] ||
                  p.image ||
                  "",
                price: selling,
                originalPrice: original > selling ? original : selling * 1.25,
                premiumPrice: Math.round(selling * 0.95),
                rating: Number(p.rating?.average) || 4.5,
                totalReviews: Number(p.rating?.totalReviews) || 0,
                badge: p.badges?.[0] || undefined,
                raw: p,
              };
            })
            .filter((p) => Boolean(p.image))
            .slice(0, 4)
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
          title="Daily Wellness"
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewAll={() => navigate(`/gomzi-supplement?search=${activeTab === "omegas" ? "fish oil" : activeTab}`)}
          showAllLabel="View All"
        />

        <div className="grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4 lg:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-shimmer h-[430px] rounded-lg" />
              ))
            : products.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badge={idx === 0 ? "Trending Now" : undefined}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
