import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "../common/ProductCard";
import useProducts from "../../hooks/useProducts";
import ProductCardSkeleton from "../ProductCardSkeleton";
import useProductCategories from "../../hooks/useProductCategories";
import useCategories from "../../hooks/useCategories";
import { buildShopCategorySections } from "../../utils/shopCategories";
import CategoryHero from "../category/CategoryHero";
import FAQSection from "../category/FAQSection";
import BottomContentSection from "../category/BottomContentSection";
import BrandFilter from "../category/BrandFilter";
import useCatalogBrands from "../../hooks/useCatalogBrands";
import useCouponLink from "../../hooks/useCouponLink";
import MobileCatalogFilters from "../category/MobileCatalogFilters";
import {
  CATALOG_SORT_VALUES,
  categoryUrlWithFilters,
  getCatalogSortLabel,
  updateCatalogFilters,
} from "../../utils/catalogFilters";

const sortConfig = {
  "Popularity": {
    sort: "rating",
    sortOrder: "desc",
  },
  "Bestseller": {
    sort: "rating",
    sortOrder: "desc",
  },
  "Customer Rating": {
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

const sortOptions = [
  "Featured",
  "Popularity",
  "Bestseller",
  "Customer Rating",
  "Price, low to high",
  "Price, high to low",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
];

const PRICE_RANGE_OPTIONS = [
  { id: "", label: "All Prices" },
  { id: "under-999", label: "Under ₹999", min: 0, max: 999 },
  { id: "1000-2499", label: "₹1,000 - ₹2,499", min: 1000, max: 2499 },
  { id: "2500-4999", label: "₹2,500 - ₹4,999", min: 2500, max: 4999 },
  { id: "5000-plus", label: "₹5,000+", min: 5000, max: Infinity },
];

const RATING_OPTIONS = [
  { id: "", label: "All Ratings" },
  { id: "4", label: "4★ & above", min: 4 },
  { id: "3", label: "3★ & above", min: 3 },
];

const ProductsGrid = ({ pageData }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and Filter Params
  const selectedBrand = (searchParams.get("brand") || searchParams.get("company") || "").trim();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const selectedPriceRange = searchParams.get("priceRange") || "";
  const selectedFlavour = searchParams.get("flavour") || "";
  const selectedRating = searchParams.get("rating") || "";

  // Shared referral link (?coupon_code=ABC): validate it and, when the coupon is limited to
  // specific products, show only those products.
  const couponLink = useCouponLink(searchParams.get("coupon_code") || "");
  const clearCouponLink = () =>
    setSearchParams(updateCatalogFilters(searchParams, { coupon_code: "" }));

  const selectedCategory = category || pageData?.category || "All Products";
  const activeCategory = category || pageData?.category || "";

  const sortParam = searchParams.get("sort") || "";
  const sortBy = getCatalogSortLabel(sortParam);
  const setSortBy = (label) =>
    setSearchParams(updateCatalogFilters(searchParams, { sort: CATALOG_SORT_VALUES[label] }));
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Local quick search input
  const [localSearch, setLocalSearch] = useState(search);
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Fetch full category list from MongoDB API
  const { products: rawProducts, loading: productsLoading, error, retry } = useProducts({
    page: 1,
    limit: 2000,
    search,
    category: activeCategory,
    company: selectedBrand,
    ...(sortConfig[sortBy] || {}),
  });
  const loading = productsLoading || couponLink.loading;

  const brandFilters = useCatalogBrands();
  const brandPanel = (
    <BrandFilter
      {...brandFilters}
      value={selectedBrand}
      onChange={(brand) => setSearchParams(updateCatalogFilters(searchParams, { brand }))}
    />
  );

  const { categories: categoryData, totalProducts } = useProductCategories();
  const { categories: managedCategories } = useCategories();

  const backendCategoryCounts = useMemo(() => {
    const map = {};
    if (!Array.isArray(categoryData)) return map;
    categoryData.forEach((item) => {
      if (!item?.category) return;
      map[item.category] = Number(item.count || 0);
    });
    return map;
  }, [categoryData]);

  const categories = useMemo(
    () => [
      { name: "All Products", label: "All Products", count: Number(totalProducts || 0) },
      ...buildShopCategorySections(managedCategories).map((item) => ({
        name: item.filterCategory,
        label: item.title,
        count: backendCategoryCounts[item.filterCategory] ?? item.productCount ?? 0,
        url: item.viewAllUrl,
      })),
    ],
    [managedCategories, backendCategoryCounts, totalProducts]
  );

  // Dynamic available flavours from currently loaded products
  const availableFlavours = useMemo(() => {
    const counts = {};
    (rawProducts || []).forEach((p) => {
      const f = p?.flavour?.trim();
      if (f && f.length < 30) {
        counts[f] = (counts[f] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([flavour, count]) => ({ flavour, count }))
      .sort((a, b) => b.count - a.count);
  }, [rawProducts]);

  // Filter and sort products client-side for immediate responsive experience
  const filteredProducts = useMemo(() => {
    let result = rawProducts || [];

    // Referral link limited to specific products: show only those products
    if (couponLink.applicableIds) {
      result = result.filter((p) => couponLink.applicableIds.has(String(p._id)));
    }

    // Filter by flavour
    if (selectedFlavour) {
      result = result.filter(
        (p) => p.flavour && p.flavour.toLowerCase() === selectedFlavour.toLowerCase()
      );
    }

    // Filter by price range
    if (selectedPriceRange) {
      const range = PRICE_RANGE_OPTIONS.find((opt) => opt.id === selectedPriceRange);
      if (range) {
        result = result.filter((p) => {
          const effPrice = Number(p.discountPrice ?? p.price ?? 0);
          return effPrice >= range.min && effPrice <= range.max;
        });
      }
    }

    // Filter by rating
    if (selectedRating) {
      const minRating = Number(selectedRating);
      result = result.filter((p) => (p.rating?.average || 0) >= minRating);
    }

    // Client-side sort enhancements
    if (sortBy === "Popularity" || sortBy === "Bestseller") {
      result = [...result].sort((a, b) => {
        const scoreA = (a.rating?.average || 0) * (a.rating?.totalReviews || 1);
        const scoreB = (b.rating?.average || 0) * (b.rating?.totalReviews || 1);
        return scoreB - scoreA;
      });
    } else if (sortBy === "Customer Rating") {
      result = [...result].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
    } else if (sortBy === "Price, low to high") {
      result = [...result].sort(
        (a, b) =>
          Number(a.discountPrice ?? a.price ?? 0) - Number(b.discountPrice ?? b.price ?? 0)
      );
    } else if (sortBy === "Price, high to low") {
      result = [...result].sort(
        (a, b) =>
          Number(b.discountPrice ?? b.price ?? 0) - Number(a.discountPrice ?? a.price ?? 0)
      );
    } else if (sortBy === "Alphabetically, A-Z") {
      result = [...result].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "Alphabetically, Z-A") {
      result = [...result].sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return result;
  }, [rawProducts, couponLink.applicableIds, selectedFlavour, selectedPriceRange, selectedRating, sortBy]);

  // Active filter chips
  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (search) {
      chips.push({
        key: "search",
        label: `Search: "${search}"`,
        onRemove: () => {
          setLocalSearch("");
          setSearchParams(updateCatalogFilters(searchParams, { search: "" }));
        },
      });
    }
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
    if (selectedPriceRange) {
      const range = PRICE_RANGE_OPTIONS.find((opt) => opt.id === selectedPriceRange);
      chips.push({
        key: "priceRange",
        label: `Price: ${range?.label || selectedPriceRange}`,
        onRemove: () => setSearchParams(updateCatalogFilters(searchParams, { priceRange: "" })),
      });
    }
    if (selectedFlavour) {
      chips.push({
        key: "flavour",
        label: `Flavour: ${selectedFlavour}`,
        onRemove: () => setSearchParams(updateCatalogFilters(searchParams, { flavour: "" })),
      });
    }
    if (selectedRating) {
      chips.push({
        key: "rating",
        label: `Rating: ${selectedRating}★ & above`,
        onRemove: () => setSearchParams(updateCatalogFilters(searchParams, { rating: "" })),
      });
    }
    return chips;
  }, [search, sortParam, sortBy, selectedBrand, category, selectedCategory, selectedPriceRange, selectedFlavour, selectedRating, searchParams]);

  const handleCategorySelect = (categoryName) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (categoryName === "All Products") {
      navigate(categoryUrlWithFilters("/gomzi-supplement", searchParams));
      return;
    }

    const destination = categories.find((item) => item.name === categoryName)?.url;
    navigate(
      categoryUrlWithFilters(
        destination || `/gomzi-supplement?category=${encodeURIComponent(categoryName)}`,
        searchParams
      )
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(updateCatalogFilters(searchParams, { search: localSearch.trim() }));
  };

  return (
    <div className="w-full min-w-0 bg-light py-3 sm:py-8 md:py-12 min-h-screen font-sans">
      <div className="site-container">
        {/* Category Hero Section */}
        <CategoryHero pageData={pageData} />

        {/* Shared referral coupon link banner */}
        {couponLink.code && !couponLink.loading && (
          couponLink.coupon ? (
            <div
              role="status"
              className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-2xs"
            >
              <div className="min-w-0">
                <p className="text-sm font-black text-text">
                  Coupon <span className="font-mono text-primary">{couponLink.coupon.coupon_code}</span> applied
                  {" — "}
                  {couponLink.coupon.discount_type === "percent"
                    ? `${couponLink.coupon.discount}% off`
                    : `₹${couponLink.coupon.discount} off`}
                </p>
                <p className="mt-0.5 text-xs text-stone-500">
                  {couponLink.applicableIds
                    ? `Valid on the ${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} below. It is applied automatically at checkout.`
                    : "Valid on all products. It is applied automatically at checkout."}
                </p>
              </div>
              {couponLink.applicableIds && (
                <button
                  type="button"
                  onClick={clearCouponLink}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Browse all products
                </button>
              )}
            </div>
          ) : (
            <div
              role="alert"
              className="mb-4 sm:mb-6 rounded-2xl border border-border bg-white px-4 py-3 text-xs text-stone-600 shadow-2xs"
            >
              {couponLink.error}
            </div>
          )
        )}

        {/* ================================================================
            DESKTOP TOOLBAR (Product count, Search by name, Sort)
        ================================================================ */}
        <div className="hidden lg:flex items-center justify-between border-b border-border pb-4 mb-6 gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="px-3 py-1 rounded-full bg-white border border-border text-xs font-black text-primary font-mono shadow-2xs">
              {loading ? "…" : filteredProducts.length}
            </span>
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Verified Supplements
            </span>
            {selectedCategory !== "All Products" && (
              <span className="text-xs text-stone-400">
                • <strong className="text-primary">{selectedCategory}</strong>
              </span>
            )}
          </div>

          {/* Search by Product Name Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-sm relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by product name..."
              className="w-full h-10 pl-9 pr-8 text-xs font-medium border border-border rounded-xl bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-2xs"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch("");
                  setSearchParams(updateCatalogFilters(searchParams, { search: "" }));
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                &times;
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="relative shrink-0">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                      sortBy === option ? "bg-primary text-white" : "text-stone-700 hover:bg-stone-50"
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
            selectedPriceRange={selectedPriceRange}
            priceOptions={PRICE_RANGE_OPTIONS}
            selectedFlavour={selectedFlavour}
            flavourOptions={availableFlavours}
            selectedRating={selectedRating}
            ratingOptions={RATING_OPTIONS}
            sortBy={sortBy}
            sortOptions={sortOptions}
            brandFilters={brandFilters}
            onCategoryChange={handleCategorySelect}
            onBrandChange={(brand) => setSearchParams(updateCatalogFilters(searchParams, { brand }))}
            onPriceChange={(priceRange) =>
              setSearchParams(updateCatalogFilters(searchParams, { priceRange }))
            }
            onFlavourChange={(flavour) =>
              setSearchParams(updateCatalogFilters(searchParams, { flavour }))
            }
            onRatingChange={(rating) =>
              setSearchParams(updateCatalogFilters(searchParams, { rating }))
            }
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
                      isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
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
                onClick={() => {
                  setLocalSearch("");
                  navigate("/gomzi-supplement");
                }}
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
              DESKTOP SIDEBAR: CATEGORIES, BRANDS, PRICE, RATING, FLAVOURS
          ================================================================ */}
          <aside
            className="shop-category-sidebar hidden lg:block w-64 shrink-0 space-y-5"
            aria-label="Shop filters"
          >
            {/* 1. CATEGORIES FILTER */}
            <div className="shop-category-panel bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-2xs">
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

              <ul aria-label="Product categories" className="shop-category-list space-y-1">
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
                            isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
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

            {/* 3. PRICE RANGE FILTER */}
            <section aria-label="Price filters" className="bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
                <h3 className="font-toma text-xs font-black text-text uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-4 bg-primary rounded-full inline-block" />
                  Price Range
                </h3>
                {selectedPriceRange && (
                  <button
                    type="button"
                    onClick={() => setSearchParams(updateCatalogFilters(searchParams, { priceRange: "" }))}
                    className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {PRICE_RANGE_OPTIONS.map((opt) => {
                  const active = selectedPriceRange === opt.id;
                  return (
                    <button
                      key={opt.id || "all"}
                      type="button"
                      onClick={() => setSearchParams(updateCatalogFilters(searchParams, { priceRange: opt.id }))}
                      className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                        active
                          ? "bg-primary text-white shadow-xs"
                          : "text-stone-700 hover:bg-[#faf6f2] hover:text-primary"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {active && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 4. CUSTOMER RATING FILTER */}
            <section aria-label="Customer rating filters" className="bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
                <h3 className="font-toma text-xs font-black text-text uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-4 bg-primary rounded-full inline-block" />
                  Customer Rating
                </h3>
                {selectedRating && (
                  <button
                    type="button"
                    onClick={() => setSearchParams(updateCatalogFilters(searchParams, { rating: "" }))}
                    className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {RATING_OPTIONS.map((opt) => {
                  const active = selectedRating === opt.id;
                  return (
                    <button
                      key={opt.id || "all"}
                      type="button"
                      onClick={() => setSearchParams(updateCatalogFilters(searchParams, { rating: opt.id }))}
                      className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                        active
                          ? "bg-primary text-white shadow-xs"
                          : "text-stone-700 hover:bg-[#faf6f2] hover:text-primary"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {active && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 5. FLAVOUR FILTER */}
            {availableFlavours.length > 0 && (
              <section aria-label="Flavour filters" className="bg-white rounded-2xl border border-border p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
                  <h3 className="font-toma text-xs font-black text-text uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-4 bg-primary rounded-full inline-block" />
                    Flavours
                  </h3>
                  {selectedFlavour && (
                    <button
                      type="button"
                      onClick={() => setSearchParams(updateCatalogFilters(searchParams, { flavour: "" }))}
                      className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSearchParams(updateCatalogFilters(searchParams, { flavour: "" }))}
                    className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                      !selectedFlavour
                        ? "bg-primary text-white shadow-xs"
                        : "text-stone-700 hover:bg-[#faf6f2] hover:text-primary"
                    }`}
                  >
                    <span>All Flavours</span>
                    {!selectedFlavour && <span>✓</span>}
                  </button>
                  {availableFlavours.map((item) => {
                    const active = selectedFlavour.toLowerCase() === item.flavour.toLowerCase();
                    return (
                      <button
                        key={item.flavour}
                        type="button"
                        onClick={() => setSearchParams(updateCatalogFilters(searchParams, { flavour: item.flavour }))}
                        className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                          active
                            ? "bg-primary text-white shadow-xs"
                            : "text-stone-700 hover:bg-[#faf6f2] hover:text-primary"
                        }`}
                      >
                        <span className="truncate">{item.flavour}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ml-2 shrink-0 ${
                            active ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
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
                {loading ? "…" : `${filteredProducts.length} products`}
              </span>
            </div>

            {/* Standardized 2-Col Mobile, 3-Col Desktop Product Grid */}
            <div
              aria-busy={loading}
              aria-label="Product results"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5"
            >
              {loading
                ? Array.from({ length: 12 }, (_, index) => (
                    <ProductCardSkeleton key={index} mobileStacked={false} />
                  ))
                : filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  ))}
            </div>

            {/* No Products Found */}
            {!loading && filteredProducts.length === 0 && (
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
                  {error
                    ? "Please check your connection and try again."
                    : search
                    ? `No matches for “${search}”. Try another search or explore the full range.`
                    : "We currently don't have items matching your selected filters. Explore the full range to find more options."}
                </p>
                <button
                  onClick={() => {
                    setLocalSearch("");
                    navigate("/gomzi-supplement");
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-hover cursor-pointer"
                >
                  {error ? "Try again" : "Clear all filters"}
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
