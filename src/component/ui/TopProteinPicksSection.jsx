import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";
import { ProductCardSkeleton } from "../common/SkeletonLoaders";
import { getProductsApi } from "../../api/product.api";
import { getProductImageUrl } from "../../utils/productAdapter";

/**
 * Tab definitions with corresponding query parameters for the /public/v1/products API
 * which powers the /gomzi-supplement store page.
 */
const TABS = [
  {
    id: "yeast-plant",
    label: "Yeast / Plant",
    query: { category: "Plant Protein", limit: 12 },
    targetUrl: "/gomzi-supplement?category=Plant+Protein",
  },
  {
    id: "whey",
    label: "Whey",
    query: { category: "Whey Protein", limit: 12 },
    targetUrl: "/gomzi-supplement?category=Whey+Protein",
  },
  {
    id: "whey-isolate",
    label: "Whey Isolate",
    query: { category: "Whey Protein", search: "isolate", limit: 12 },
    targetUrl: "/gomzi-supplement?category=Whey+Protein&search=isolate",
  },
  {
    id: "us-imported",
    label: "US Imported",
    query: { search: "optimum", limit: 12 },
    targetUrl: "/gomzi-supplement?search=Optimum+Nutrition",
  },
];

/**
 * Top Protein Picks Section.
 * Fetches dynamic live product data from the /gomzi-supplement catalog API.
 * All static mock product data has been removed.
 */
export default function TopProteinPicksSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("yeast-plant");
  const [productsCache, setProductsCache] = useState({});
  const [fetching, setFetching] = useState(true);

  const activeTabConfig = TABS.find((t) => t.id === activeTab) || TABS[0];
  const currentProducts = productsCache[activeTab] || [];
  const loading = currentProducts.length === 0 && fetching;

  useEffect(() => {
    let isMounted = true;

    // Skip API call if products are already cached for this tab
    if (productsCache[activeTab]?.length > 0) {
      return;
    }

    const fetchTabProducts = async () => {
      setFetching(true);
      try {
        const res = await getProductsApi(activeTabConfig.query);
        if (!isMounted) return;

        let list = Array.isArray(res?.data?.data) ? res.data.data : [];

        // Fallback: if query returned 0 items, fetch general protein products
        if (list.length === 0) {
          const fallbackRes = await getProductsApi({ category: "Whey Protein", limit: 12 });
          if (Array.isArray(fallbackRes?.data?.data) && fallbackRes.data.data.length > 0) {
            list = fallbackRes.data.data;
          }
        }

        const normalised = list
          .filter((p) => p && p.name && (p.is_deleted !== true) && (p.isAvailable !== false))
          .map((p) => {
            const rawSellingPrice = Number(p.sellingPrice || p.discountPrice || p.price || 0);
            const rawOriginalPrice = Number(p.price || 0);

            return {
              id: p._id || p.id,
              _id: p._id || p.id,
              slug: p.slug || p._id || p.id,
              name: p.name,
              image: getProductImageUrl(p),
              price: rawSellingPrice,
              originalPrice: rawOriginalPrice > rawSellingPrice ? rawOriginalPrice : Math.round(rawSellingPrice * 1.3),
              premiumPrice: Math.round(rawSellingPrice * 0.97),
              rating: Number(p.rating?.average) || 4.6,
              reviews: Number(p.rating?.totalReviews) || 15,
              badge: p.badges?.[0] || (p.discountPrice && p.price > p.discountPrice ? "Special Offer" : null),
              url: `/product/${p.slug || p._id || p.id}`,
              raw: p,
            };
          })
          .filter((p) => p.price > 0 && Boolean(p.image));

        if (isMounted) {
          setProductsCache((prev) => ({
            ...prev,
            [activeTab]: normalised,
          }));
        }
      } catch (err) {
        console.error(`Failed to fetch protein products for tab ${activeTab}:`, err);
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    };

    fetchTabProducts();

    return () => {
      isMounted = false;
    };
  }, [activeTab, activeTabConfig, productsCache]);

  const handleViewAll = () => {
    navigate(activeTabConfig.targetUrl || "/gomzi-supplement");
  };

  return (
    <section className="w-full bg-white" aria-label="Top Protein Picks">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Top Protein Picks"
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onViewAll={handleViewAll}
          showAllLabel="View All"
        />

        {loading ? (
          /* Loading Skeletons matching exact product grid structure */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ProductCardSkeleton key={`top-protein-skeleton-${idx}`} />
            ))}
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-xl">
            <p className="text-neutral-500 font-medium">
              No products found in this category currently.
            </p>
            <button
              type="button"
              onClick={() => navigate("/gomzi-supplement")}
              className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover"
            >
              Explore Full Shop
            </button>
          </div>
        ) : (
          <>
            {/* Mobile View: 2x2 Grid (4 products: 2 up and 2 down) */}
            <div className="grid grid-cols-2 items-stretch gap-3 sm:hidden">
              {currentProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Tablet & Desktop View: Swiper Carousel */}
            <div className="hidden sm:block">
              <Swiper
                spaceBetween={18}
                slidesPerView={2.2}
                breakpoints={{
                  640: { slidesPerView: 2.2, spaceBetween: 18 },
                  768: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className="pb-2"
              >
                {currentProducts.map((product) => (
                  <SwiperSlide key={product.id} className="h-auto">
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
