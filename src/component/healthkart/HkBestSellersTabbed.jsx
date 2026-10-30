// src/component/healthkart/HkBestSellersTabbed.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import { fetchProducts } from "../../services/product.service";
import {
  BEST_SELLER_PRODUCTS,
  getProductImageUrl,
  diversifyProducts,
  getProductBrand,
} from "../../data/homeProducts";
import HkProductCardActions from "./HkProductCardActions";
import { ProductGridSkeleton } from "../common/LoadingSkeletons";

const TABS = [
  { id: "all", label: "🔥 All Products", category: "" },
  { id: "whey", label: "Whey Protein", category: "Whey Protein" },
  { id: "combos", label: "Combos & Stacks", category: "Combos & Stacks" },
  { id: "creatine", label: "Creatine", category: "Creatine" },
  { id: "preworkout", label: "Pre-Workout", category: "Pre Workout" },
  { id: "gainer", label: "Mass Gainer", category: "Mass Gainer" },
  { id: "snacks", label: "Protein Snacks", category: "Protein Bars & Snacks" },
  { id: "plant", label: "Plant Protein", category: "Plant Protein" },
];

export default function HkBestSellersTabbed() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products dynamically based on active tab with brand diversification
  useEffect(() => {
    let isMounted = true;
    const loadTabProducts = async () => {
      setLoading(true);
      const currentTab = TABS.find((t) => t.id === activeTab);
      const catParam = currentTab?.category || "";

      try {
        const res = await fetchProducts({
          category: catParam,
          limit: 48, // Fetch larger pool to interleave varied brands
        });

        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mixed = diversifyProducts(res.data, 12);
          setProducts(mixed.length > 0 ? mixed : res.data.slice(0, 12));
        } else if (isMounted) {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error loading tab products:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTabProducts();
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const currentTabObj = TABS.find((t) => t.id === activeTab);

  return (
    <section className="w-full bg-light py-10 sm:py-14 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-primary text-white">
                <Flame size={18} className="fill-current" />
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-text tracking-tight font-toma">
                Explore supplements by category
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 pl-4">
              Real supplements directly from our database with lab-tested certificates
            </p>
          </div>

          <Link
            to={
              currentTabObj?.category
                ? `/gomzi-supplement?category=${encodeURIComponent(currentTabObj.category)}`
                : "/gomzi-supplement"
            }
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>
              View All {currentTabObj?.category ? `${currentTabObj.category} Products` : "Products"}
            </span>
            &rarr;
          </Link>
        </div>

        {/* Tab Switcher (HealthKart .offers_discover_btns__DeEv7 style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md border border-primary"
                    : "bg-white text-stone-700 hover:bg-[#fbf4f0] hover:text-primary border border-border"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <ProductGridSkeleton count={8} label="Loading supplements" className="mt-6" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {products.map((product) => {
              const price = Number(product.price ?? product.discountPrice ?? 0);
              const discountPrice = Number(product.discountPrice ?? product.price ?? 0);
              const discountPct =
                price > discountPrice
                  ? Math.round(((price - discountPrice) / price) * 100)
                  : 0;
              const imgUrl = getProductImageUrl(product.displayImages);

              return (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product.slug}`)}
                  onKeyDown={(event) => {
                    if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      navigate(`/product/${product.slug}`);
                    }
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`View ${product.name}`}
                  className="group bg-white rounded-xl border border-border hover:border-primary hover:shadow-[0_8px_20px_rgba(149,68,44,0.12)] transition-all duration-300 flex flex-col w-full overflow-hidden cursor-pointer relative"
                >
                  {/* Badge top-left (Discount only) */}
                  {discountPct > 0 && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-primary text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                        -{discountPct}% OFF
                      </span>
                    </div>
                  )}

                  {/* Standardized Aspect-Square Image Box (Eliminates side white space) */}
                  <div className="w-full aspect-square bg-[#faf7f4] relative flex items-center justify-center overflow-hidden shrink-0 p-3 sm:p-4">
                    <img
                      src={imgUrl}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.06)]"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/product-placeholder.webp";
                      }}
                    />
                  </div>

                  {/* Content Section with Standardized Structured Heights */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Rating Pill - Fixed Height */}
                      <div className="h-5 flex items-center gap-1.5 mb-1.5">
                        <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold px-1.5 py-0.5 rounded">
                          <span>{product.rating?.average ?? 0}</span>
                          <Star size={11} className="fill-amber-500 text-amber-500" />
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          ({product.rating?.totalReviews ?? 0})
                        </span>
                      </div>

                      {/* Title - Fixed 2-Line Box */}
                      <h3 className="h-10 sm:h-11 text-xs sm:text-sm font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h3>

                      {/* Brand & Flavour / Weight - Fixed Height */}
                      <p className="h-4 text-[11px] text-stone-500 mt-1 truncate">
                        <span className="font-bold text-stone-700">{getProductBrand(product)}</span>
                        {product.flavour ? ` • ${product.flavour}` : ` • ${product.categories?.[0] || "100% Genuine"}`}
                      </p>
                    </div>

                    {/* Pricing & Add to Cart Section */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col justify-end">
                      <div className="h-6 flex items-baseline gap-2">
                        <span className="text-base sm:text-lg font-black text-text">
                          ₹{discountPrice.toLocaleString("en-IN")}
                        </span>
                        {price > discountPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      {/* Reserved Height for Savings */}
                      <div className="h-4 flex items-center">
                        {price > discountPrice ? (
                          <p className="text-[11px] font-bold text-primary">
                            Save ₹{(price - discountPrice).toLocaleString("en-IN")}
                          </p>
                        ) : (
                          <span className="invisible text-[11px]">&nbsp;</span>
                        )}
                      </div>

                      {/* Add to Cart & Buy Now Action Controls with Live Quantity Stepper */}
                      <HkProductCardActions product={product} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
