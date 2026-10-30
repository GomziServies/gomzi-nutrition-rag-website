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

import BrandFilter from "../category/BrandFilter";
import useCatalogBrands from "../../hooks/useCatalogBrands";
import MobileCatalogFilters from "../category/MobileCatalogFilters";
import { CATALOG_SORT_VALUES, categoryUrlWithFilters, getCatalogSortLabel, updateCatalogFilters } from "../../utils/catalogFilters";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBrand = (searchParams.get("brand") || searchParams.get("company") || "").trim();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const selectedCategory = category || pageData?.category || "All Products";

  const sortParam = searchParams.get("sort") || "";
  const sortBy = getCatalogSortLabel(sortParam);
  const setSortBy = label => setSearchParams(updateCatalogFilters(searchParams, { sort: CATALOG_SORT_VALUES[label] }));
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
    company: selectedBrand,
    ...(sortConfig[sortBy] || {}),
  });

  const brandFilters = useCatalogBrands();
  const brandPanel = <BrandFilter {...brandFilters} value={selectedBrand} onChange={brand => setSearchParams(updateCatalogFilters(searchParams, { brand }))} />;

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

  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (sortParam && sortBy !== "Featured") {
      chips.push({
        key: "sort",
        label: `Sort: ${sortBy}`,
        onRemove: () => setSearchParams(updateCatalogFilters(searchParams, { sort: "" })),
      });
    }
    if (selectedBrand) {
      chips.push({
        key: "brand",
        label: `Brand: ${selectedBrand}`,
        onRemove: () => setSearchParams(updateCatalogFilters(searchParams, { brand: "" })),
      });
    }
    if (category && category !== "All Products") {
      chips.push({
        key: "category",
        label: `Category: ${selectedCategory}`,
        onRemove: () => handleCategorySelect("All Products"),
      });
    }
    return chips;
  }, [sortParam, sortBy, selectedBrand, category, selectedCategory, searchParams]);

  const handleCategorySelect = (categoryName) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (categoryName === "All Products") {
      navigate(categoryUrlWithFilters("/gomzi-supplement", searchParams));
      return;
    }

    const destination = categories.find(item => item.name === categoryName)?.url;
    navigate(categoryUrlWithFilters(destination || `/gomzi-supplement?category=${encodeURIComponent(categoryName)}`, searchParams));
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

  return (
    <div className="w-full min-w-0 bg-light py-3 sm:py-8 md:py-12 min-h-screen font-sans">
      <div className="site-container">
        {/* Category Hero Section */}
        <CategoryHero pageData={pageData} />

        {/* ================================================================
            DESKTOP TOOLBAR
        ================================================================ */}
        <div className="hidden lg:flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-white border border-border text-xs font-black text-primary font-mono shadow-2xs">
              {loading ? '…' : products.length}
            </span>
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Verified Supplements
            </span>
            {selectedCategory !== "All Products" && (
              <span className="text-xs text-stone-400">
                • Filtered by <strong className="text-primary">{selectedCategory}</strong>
              </span>
            )}
            {sortBy !== "Featured" && (
              <span className="text-xs text-stone-400">
                • Sorted by <strong className="text-primary">{sortBy}</strong>
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
            MOBILE STICKY CONTROLS & FILTER BAR
        ================================================================ */}
        <div className="lg:hidden sticky top-[54px] sm:top-[64px] z-20 bg-light/95 backdrop-blur-md pt-1 pb-2.5 mb-2.5 -mx-4 px-4 sm:mx-0 sm:px-0">
          <MobileCatalogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            sortBy={sortBy}
            sortOptions={sortOptions}
            brandFilters={brandFilters}
            onCategoryChange={handleCategorySelect}
            onBrandChange={brand => setSearchParams(updateCatalogFilters(searchParams, { brand }))}
            onSortChange={setSortBy}
          />
        </div>

        {/* Quick Horizontal Category Pills for 1-Tap Category Switching on Mobile */}
        <div className="lg:hidden mb-3.5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar flex items-center gap-1.5 py-0.5">
          {categories.map((item) => {
            const isSelected = selectedCategory === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleCategorySelect(item.name)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white border border-border text-stone-700 hover:border-primary active:bg-stone-50"
                }`}
              >
                <span>{item.label || item.name}</span>
                {item.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Filter / Sort Chips */}
        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Active:
            </span>
            {activeFilterChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <span>{chip.label}</span>
                <span className="text-sm font-normal leading-none ml-0.5">&times;</span>
              </button>
            ))}
            {activeFilterChips.length > 1 && (
              <button
                onClick={() => navigate("/gomzi-supplement")}
                className="text-[11px] font-bold text-stone-400 hover:text-primary underline ml-1 cursor-pointer"
              >
                Reset all
              </button>
            )}
          </div>
        )}

        {/* ================================================================
            MAIN CONTENT (Sidebar + Products Grid)
        ================================================================ */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ================================================================
              DESKTOP SIDEBAR: CATEGORIES FIRST, THEN BRANDS
          ================================================================ */}
          <aside className="shop-category-sidebar hidden lg:block w-64 shrink-0 space-y-5 " aria-label="Shop filters">
            {/* 1. CATEGORIES FILTER */}
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

            {/* 2. BRANDS FILTER */}
            {brandPanel}
          </aside>

          {/* ================================================================
              PRODUCTS GRID
          ================================================================ */}
          <div className="flex-1 w-full min-w-0">
            {/* Mobile Category Active Heading */}
            <div className="lg:hidden mb-3 pb-2.5 border-b border-stone-200 flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="font-toma min-w-0 truncate text-sm sm:text-base font-black text-text">
                  {selectedCategory}
                </h2>
                {sortBy !== "Featured" && (
                  <p className="text-[11px] text-primary font-bold">
                    Sorted by {sortBy}
                  </p>
                )}
              </div>
              <span className="shrink-0 whitespace-nowrap text-[11px] sm:text-xs text-stone-500 font-mono bg-white px-2 py-0.5 rounded-full border border-border">
                {loading ? '…' : `${products.length} products`}
              </span>
            </div>

            {/* Standardized 2-Col Mobile, 3-Col Desktop Product Grid */}
            <div aria-busy={loading} aria-label="Product results" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
              {loading ? Array.from({ length: 12 }, (_, index) => <ProductCardSkeleton key={index} mobileStacked={false} />) : products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* No Products Found */}
            {!loading && products.length === 0 && (
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
                  onClick={() => error ? retry() : navigate(`/gomzi-supplement${sortParam ? `?sort=${encodeURIComponent(sortParam)}` : ""}`)}
                  className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-hover cursor-pointer"
                >
                  {error ? "Try again" : "Clear filters"}
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
          className="hidden lg:block fixed inset-0 z-0"
          onClick={() => setIsSortDropdownOpen(false)}
        />
      )}

      {/* ================================================================
          BOTTOM CONTENT
      ================================================================ */}
      <FAQSection faq={pageData.sections?.faq || pageData.faq} />

      <BottomContentSection
        content={pageData.sections?.bottomContent || pageData.bottomContent}
      />
    </div>
  );
};

export default ProductsGrid;
