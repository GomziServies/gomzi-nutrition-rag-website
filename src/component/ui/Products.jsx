import React, { useState, useMemo } from "react";
import ProductCard from "../common/ProductCard";
import useProducts from "../../hooks/useProducts";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCardSkeleton from "../ProductCardSkeleton";
import useProductCategories from "../../hooks/useProductCategories";
import useCategories from "../../hooks/useCategories";
import { buildShopCategorySections } from "../../utils/shopCategories";
import CategoryHero from "../category/CategoryHero";
import ComparisonSection from "../category/ComparisonSection";
import FAQSection from "../category/FAQSection";
import BottomContentSection from "../category/BottomContentSection";

const sortConfig = {
  "Bestseller": {
    sort: "rating",
    sortOrder: "desc",
  },
  "Price, low to high": {
    sort: "price",
    sortOrder: "asc",
  },
  "Price, high to low": {
    sort: "price",
    sortOrder: "desc",
  },
  "Alphabetically, A-Z": {
    sort: "name",
    sortOrder: "asc",
  },
  "Alphabetically, Z-A": {
    sort: "name",
    sortOrder: "desc",
  },
};

const ProductsGrid = ({ pageData }) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const selectedCategory = category || pageData?.category || "All Products";

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const sortParam = searchParams.get("sort") || "";
  const initialSort = sortParam.toLowerCase() === "bestseller" ? "Bestseller" : "Featured";
  const [sortBy, setSortBy] = useState(initialSort);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Product API (Single-page catalog loading without pagination)
  |--------------------------------------------------------------------------
  */

  const activeCategory = category || pageData?.category || "";

  const { products, loading, error, retry } = useProducts({
    page: 1,
    limit: 2000,
    search,
    category: activeCategory,
    ...(sortConfig[sortBy] || {}),
  });

  const hasProducts = Boolean(products && products.length > 0);

  const {
    categories: categoryData,
    totalProducts,
  } = useProductCategories();

  const { categories: managedCategories } = useCategories();

  const backendCategoryCounts = useMemo(() => {
    const map = {};

    if (!Array.isArray(categoryData)) {
      return map;
    }

    categoryData.forEach((item) => {
      if (!item?.category) return;

      map[item.category] = Number(item.count || 0);
    });

    return map;
  }, [categoryData]);

  const categories = useMemo(() => [
    { name: 'All Products', label: 'All Products', count: Number(totalProducts || 0) },
    ...buildShopCategorySections(managedCategories).map(item => ({
      name: item.filterCategory, label: item.title,
      count: backendCategoryCounts[item.filterCategory] ?? item.productCount ?? 0,
      url: item.viewAllUrl,
    })),
  ], [managedCategories, backendCategoryCounts, totalProducts]);

  const handleCategorySelect = (categoryName) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (categoryName === "All Products") {
      navigate("/gomzi-supplement");
      return;
    }

    const destination = categories.find(item => item.name === categoryName)?.url;
    navigate(destination || `/gomzi-supplement?category=${encodeURIComponent(categoryName)}`);
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const sortOptions = [
    "Featured",
    "Bestseller",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
  ];

  if (loading) {
    return (
      <div role="status" aria-label="Loading products" aria-busy="true" className="w-full bg-light py-12 min-h-screen">
        <span className="sr-only">Loading products…</span>
        <div className="site-container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {[...Array(12)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-light py-6 sm:py-10 md:py-12 min-h-screen font-sans">
      <div className="site-container">
        {/* Category Hero Section */}
        <CategoryHero pageData={pageData} />



        {/* ================================================================
            DESKTOP TOOLBAR
        ================================================================ */}
        <div className="hidden lg:flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-white border border-border text-xs font-black text-primary font-mono shadow-2xs">
              {products.length}
            </span>
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Verified Supplements
            </span>
            {selectedCategory !== "All Products" && (
              <span className="text-xs text-stone-400">
                • Filtered by <strong className="text-primary">{selectedCategory}</strong>
              </span>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-10 px-4 border border-border rounded-xl bg-white flex items-center gap-2.5 hover:border-primary transition-all cursor-pointer shadow-2xs text-xs font-bold text-stone-700"
            >
              <span className="text-stone-400 font-normal">Sort:</span>
              <span className="text-text">{sortBy}</span>
              <svg
                className={`w-4 h-4 text-stone-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-xl overflow-hidden z-50 p-1.5">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                      sortBy === option
                        ? "bg-primary text-white"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <span>{option}</span>
                    {sortBy === option && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
            MOBILE TOOLBAR
        ================================================================ */}
        <div className="lg:hidden mb-6 flex gap-2">
          {/* Category Selector Button */}
          <button
            onClick={() => setIsCategoryDrawerOpen(true)}
            className="flex-1 h-11 px-3.5 rounded-xl border border-border bg-white
               shadow-2xs flex items-center justify-between
               transition-all duration-200 active:scale-[0.99]
               hover:border-primary/50 text-xs font-bold text-stone-700 cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-stone-400 font-normal">Category:</span>
              <span className="truncate text-text">{selectedCategory}</span>
            </div>
            <svg
              className="w-4 h-4 text-stone-400 shrink-0 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 10 5 5 5-5" />
            </svg>
          </button>

          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-11 px-3.5 rounded-xl border border-border bg-white
                shadow-2xs flex items-center gap-2
                transition-all duration-200 text-xs font-bold text-stone-700 cursor-pointer"
            >
              <span className="text-stone-400 font-normal">Sort</span>
              <svg
                className={`w-4 h-4 text-stone-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 10 5 5 5-5" />
              </svg>
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 p-1.5 bg-white rounded-xl shadow-2xl border border-border z-50 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${
                      sortBy === option
                        ? "bg-primary text-white"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <span>{option}</span>
                    {sortBy === option && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
            MOBILE CATEGORY DRAWER
        ================================================================ */}
        {isCategoryDrawerOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[60] animate-in fade-in duration-200"
              onClick={() => setIsCategoryDrawerOpen(false)}
            />

            <div
              className="fixed bottom-0 left-0 right-0 z-[70]
                 bg-white rounded-t-[28px] max-h-[82vh] overflow-hidden
                 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300"
            >
              <div className="bg-white px-5 pt-3 pb-4 border-b border-stone-100">
                <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                      Gomzi Nutrition
                    </p>
                    <h3 className="text-xl font-black text-text mt-0.5">
                      Filter Categories
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsCategoryDrawerOpen(false)}
                    className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 cursor-pointer"
                    aria-label="Close categories"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="px-4 py-3 overflow-y-auto overscroll-contain space-y-1.5"
                style={{
                  maxHeight: "calc(82vh - 120px)",
                  paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
                }}
              >
                {categories.map((item) => {
                  const isSelected = selectedCategory === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        handleCategorySelect(item.name);
                        setIsCategoryDrawerOpen(false);
                      }}
                      className={`w-full min-h-[48px] px-3.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white shadow-sm"
                          : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{item.label || item.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-white text-stone-500 border border-stone-200"
                        }`}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ================================================================
            MAIN CONTENT (Sidebar + Products Grid)
        ================================================================ */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ================================================================
              DESKTOP SIDEBAR
          ================================================================ */}
          {hasProducts && (
            <aside className="shop-category-sidebar hidden lg:block w-64 shrink-0 z-30" aria-label="Shop categories">
              <div className="shop-category-panel bg-white rounded-2xl border border-border p-5 shadow-2xs">
                <div className="flex shrink-0 items-center justify-between mb-4 pb-3 border-b border-border">
                  <h3 className="font-toma text-xs font-black text-text uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-4 bg-primary rounded-full inline-block" />
                    Categories
                  </h3>
                  {selectedCategory !== "All Products" && (
                    <button
                      onClick={() => handleCategorySelect("All Products")}
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <ul
                  aria-label="Product categories"
                  className="shop-category-list space-y-1"
                >
                  {categories.map((item) => {
                    const isSelected = selectedCategory === item.name;
                    return (
                      <li key={item.name}>
                        <button
                          onClick={() => handleCategorySelect(item.name)}
                          className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                            isSelected
                              ? "bg-primary text-white shadow-xs"
                              : "text-stone-700 hover:bg-[#faf6f2] hover:text-primary"
                          }`}
                        >
                          <span className="truncate">{item.label || item.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ml-2 shrink-0 ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {item.count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          )}

          {/* ================================================================
              PRODUCTS GRID
          ================================================================ */}
          <div className="flex-1 w-full min-w-0">
            {/* Mobile Category Active Heading */}
            <div className="lg:hidden mb-4 pb-3 border-b border-stone-200 flex items-center justify-between">
              <h2 className="font-toma text-lg font-black text-text">
                {selectedCategory}
              </h2>
              <span className="text-xs text-stone-500 font-mono">
                {products.length} items
              </span>
            </div>

            {/* Standardized 3-Col Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* No Products Found */}
            {products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-border p-8 text-center">
                <img
                  src="/images/coming-soon.webp"
                  alt="No Products"
                  className="w-32 h-32 object-contain mb-4 opacity-80"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <h3 className="text-lg font-black text-text font-toma">
                  {error ? "We couldn’t load the catalog" : "No supplements found"}
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm">
                  {error ? "Please check your connection and try again." : search ? `No matches for “${search}”. Try another search or explore the full range.` : "We currently don't have items in this category. Explore the full range to find more options."}
                </p>
                <button
                  onClick={() => error ? retry() : handleCategorySelect("All Products")}
                  className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-hover cursor-pointer"
                >
                  {error ? "Try again" : "View all products"}
                </button>
              </div>
            )}


          </div>
        </div>
      </div>

      {/* ================================================================
          CLICK OUTSIDE SORT
      ================================================================ */}

      {isSortDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsSortDropdownOpen(false)}
        />
      )}

      {/* ================================================================
          BOTTOM CONTENT
      ================================================================ */}

      {/* Comparison Section (Choose based on your goal / Which supplement is right for you) */}
      {/*
      <div className="site-container mt-10">
        <ComparisonSection data={pageData.sections?.comparisonSection} />
      </div>
      */}

      <FAQSection faq={pageData.sections?.faq || pageData.faq} />

      <BottomContentSection
        content={pageData.sections?.bottomContent || pageData.bottomContent}
      />
    </div>
  );
};

export default ProductsGrid;
