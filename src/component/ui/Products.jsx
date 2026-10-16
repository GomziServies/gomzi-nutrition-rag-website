import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../common/ProductCard";
import useProducts from "../../hooks/useProducts";
import { addProductToCart } from "../../services/cartStorage.service";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCardSkeleton from "../ProductCardSkeleton";
import useProductCategories from "../../hooks/useProductCategories";
import CategoryHero from "../category/CategoryHero";
import ComparisonSection from "../category/ComparisonSection";
import FAQSection from "../category/FAQSection";
import BottomContentSection from "../category/BottomContentSection";
import {
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  Sparkles,
} from "lucide-react";

const sortConfig = {
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

const websiteCategories = [
  {
    name: "Whey Protein",
    backendCategories: ["Whey Protein"],
  },
  {
    name: "Mass Gainer",
    backendCategories: ["Mass Gainer"],
  },
  {
    name: "Plant Protein",
    backendCategories: ["Plant Protein"],
  },
  {
    name: "Pre Workout",
    backendCategories: ["Pre Workout"],
  },
  {
    name: "BCAA",
    backendCategories: ["BCAA"],
  },
  {
    name: "Creatine",
    backendCategories: ["Creatine"],
  },
  {
    name: "Wellness & Health",
    backendCategories: ["Wellness & Health"],
  },
];

// Secondary labels some products carry alongside their real category.
// They are not shopping categories, so they stay out of the menu.
const hiddenBackendCategories = [
  "Protein",
  "Protein Supplement",
  "Sports Nutrition",
  "Muscle Building",
  "Muscle Recovery",
  "Lean Muscle",
  "Weight Gain",
  "Fat Burner",
  "Strength Supplement",
  "Amino Acid Supplement",
  "Intra Workout",
];

const categorySlugMap = {
  "Whey Protein": "whey-protein",
  "Plant Protein": "plant-protein",
  "Mass Gainer": "mass-gainer",
  "Pre Workout": "pre-workout",
  BCAA: "bcaa",
  Creatine: "creatine",
  "Meal Replacement": "meal-replacement",
  "Wellness & Health": "wellness-health",
};

/**
 * Generates an array of page numbers and ellipsis indicators.
 * - When totalPages <= 7: returns [1, 2, 3, 4, 5, 6, 7]
 * - When currentPage <= 2: [1, 2, 3, '...', totalPages]
 * - When currentPage === 3: [1, 2, 3, 4, '...', totalPages]
 * - In middle: [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
 * - When currentPage === totalPages - 2: [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
 * - When currentPage >= totalPages - 1: [1, '...', totalPages - 2, totalPages - 1, totalPages]
 */
const getPaginationItems = (currentPage, totalPages) => {
  if (!totalPages || totalPages <= 1) return [];
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage === totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

const ProductsGrid = ({ categorySlug, pageData }) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(
    category || "All Products",
  );

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /*
  |--------------------------------------------------------------------------
  | Product API
  |--------------------------------------------------------------------------
  */

  const activeCategory = category || pageData?.category || "";

  const { products, loading, pagination, hasProducts } = useProducts({
    page: currentPage,
    limit: 12,
    search,
    category: activeCategory,
    ...(sortConfig[sortBy] || {}),
  });

  const {
    categories: categoryData,
    totalProducts,
    loading: categoriesLoading,
  } = useProductCategories();

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

  const DEFAULT_COUNTS = {
    "All Products": 419,
    "Whey Protein": 86,
    "Mass Gainer": 23,
    "Plant Protein": 17,
    "Pre Workout": 36,
    "BCAA": 5,
    "Creatine": 53,
    "Wellness & Health": 0,
  };

  const categories = useMemo(() => {
    return [
      {
        name: "All Products",
        count:
          Number(totalProducts) > 0
            ? Number(totalProducts)
            : DEFAULT_COUNTS["All Products"],
        backendCategories: [],
      },
      ...websiteCategories.map((websiteCategory) => {
        const liveCount = websiteCategory.backendCategories.reduce(
          (total, backendCategory) => {
            return total + Number(backendCategoryCounts[backendCategory] || 0);
          },
          0,
        );

        return {
          ...websiteCategory,
          count:
            liveCount > 0
              ? liveCount
              : (DEFAULT_COUNTS[websiteCategory.name] ?? 0),
        };
      }),
    ];
  }, [backendCategoryCounts, totalProducts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleCategorySelect = (categoryName) => {
    setCurrentPage(1);

    if (categoryName === "All Products") {
      navigate("/gomzi-supplement");
      setSelectedCategory("All Products");
      return;
    }

    const slug = categorySlugMap[categoryName];

    if (!slug) {
      const params = new URLSearchParams();
      params.set("category", categoryName);

      navigate(`/gomzi-supplement?${params.toString()}`);

      setSelectedCategory(categoryName);

      return;
    }

    navigate(`/gomzi-supplement/${slug}`);

    setSelectedCategory(categoryName);
  };
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else if (pageData?.category) {
      setSelectedCategory(pageData.category);
    } else {
      setSelectedCategory("All Products");
    }

    setCurrentPage(1);
  }, [category, pageData?.category]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pagination.totalPages) {
      return;
    }

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = async (product) => {
    await addProductToCart(product);
  };

  const sortOptions = [
    "Featured",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
  ];

  if (loading) {
    return (
      <div className="w-full bg-bg py-12">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(12)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-bg py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <CategoryHero pageData={pageData} />

        {/* ================================================================
            DESKTOP TOOLBAR
        ================================================================ */}

        <div className="hidden lg:flex items-center justify-between border-b border-[#ebdcd7] pb-4 mb-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#ebdcd7] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-900">
              {pagination.totalDocs ?? products.length}
            </span>
            <span className="text-xs font-medium text-gray-500">Products Available</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-10 px-4 border border-[#ebdcd7] rounded-xl bg-white flex items-center gap-2.5 hover:border-[#5C3124] transition-all shadow-2xs cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5C3124]" />
              <span className="text-xs font-medium text-gray-400">Sort by:</span>
              <span className="text-xs font-bold text-gray-900">{sortBy}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-[#5C3124]" : ""
                }`}
              />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-[#ebdcd7] shadow-xl p-1.5 z-50 overflow-hidden">
                {sortOptions.map((option) => {
                  const isSelected = sortBy === option;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setCurrentPage(1);
                        setSortBy(option);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white shadow-2xs"
                          : "text-gray-700 hover:bg-[#fdf6f4] hover:text-[#5C3124]"
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
    MOBILE TOOLBAR
================================================================ */}

        {/* ================================================================
            MOBILE TOOLBAR (COMPACT 2-COLUMN)
        ================================================================ */}

        <div className="lg:hidden mb-6 grid grid-cols-2 gap-2.5">
          {/* Category Selector */}
          <button
            onClick={() => setIsCategoryDrawerOpen(true)}
            className="h-11 px-3.5 rounded-xl border border-[#ebdcd7] bg-white shadow-2xs flex items-center justify-between transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 min-w-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#5C3124] shrink-0" />
              <span className="text-xs font-bold text-gray-900 truncate">
                {selectedCategory}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#ebdcd7] bg-white shadow-2xs flex items-center justify-between transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#5C3124] shrink-0" />
                <span className="text-xs font-bold text-gray-900 truncate">
                  {sortBy}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-[#5C3124]" : ""
                }`}
              />
            </button>

            {/* Sort Dropdown */}
            {isSortDropdownOpen && (
              <div className="absolute right-0 left-0 mt-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#ebdcd7] z-50 overflow-hidden">
                {sortOptions.map((option) => {
                  const isSelected = sortBy === option;

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setCurrentPage(1);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5
                          rounded-xl text-left text-xs font-semibold transition-colors
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white"
                              : "text-gray-700 hover:bg-[#fdf6f4] hover:text-[#5C3124]"
                          }`}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
    MOBILE CATEGORY DRAWER
================================================================ */}

        {isCategoryDrawerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[60]
                 animate-in fade-in duration-200"
              onClick={() => setIsCategoryDrawerOpen(false)}
            />

            {/* Bottom Sheet */}
            <div
              className="fixed bottom-0 left-0 right-0 z-[70]
                 bg-white rounded-t-[28px]
                 max-h-[82vh]
                 overflow-hidden
                 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]
                 animate-in slide-in-from-bottom duration-300"
            >
              {/* Handle + Header */}
              <div className="bg-white px-5 pt-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-[#5C3124]">
                      Browse
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      Categories
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsCategoryDrawerOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100
                       flex items-center justify-center
                       text-gray-500 hover:bg-gray-200
                       transition-colors"
                    aria-label="Close categories"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div
                className="px-5 py-4 overflow-y-auto overscroll-contain"
                style={{
                  maxHeight: "calc(82vh - 120px)",
                  paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
                }}
              >
                <div className="space-y-2">
                  {categories.map((item) => {
                    const isSelected = selectedCategory === item.name;

                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleCategorySelect(item.name);
                          setIsCategoryDrawerOpen(false);
                        }}
                        className={`w-full min-h-[60px] px-4 rounded-2xl
                            flex items-center justify-between
                            transition-all duration-200
                            ${
                              isSelected
                                ? "bg-[#5C3124] text-white shadow-lg shadow-[#5C3124]/20"
                                : "bg-gray-50 text-gray-800 hover:bg-gray-100 active:scale-[0.99]"
                            }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Category indicator */}
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center
                                ${
                                  isSelected
                                    ? "bg-white/15"
                                    : "bg-white border border-gray-200"
                                }`}
                          >
                            {isSelected ? (
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="m5 12 4 4L19 6"
                                />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-[#5C3124]/50" />
                            )}
                          </div>

                          <span className="font-semibold text-[15px]">
                            {item.name}
                          </span>
                        </div>

                        <span
                          className={`min-w-[34px] px-2.5 py-1 rounded-full
                              text-xs font-semibold text-center
                              ${
                                isSelected
                                  ? "bg-white/15 text-white"
                                  : "bg-white text-gray-400 border border-gray-200"
                              }`}
                        >
                          {item.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================================================================
            MAIN CONTENT
        ================================================================ */}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 mt-5">
          {/* ================================================================
              DESKTOP SIDEBAR
          ================================================================ */}

          {hasProducts && (
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sticky top-24 shadow-xs">
                {/* Header matching user design */}
                <h2 className="font-extrabold text-2xl text-black tracking-tight mb-4 font-toma">
                  Products
                </h2>

                {/* Divider Line */}
                <div className="border-b border-gray-200/90 mb-5" />

                {/* Categories List */}
                <div className="flex flex-col space-y-1.5">
                  {categories.map((item) => {
                    const isSelected = selectedCategory === item.name;

                    return isSelected ? (
                      <button
                        key={item.name}
                        onClick={() => handleCategorySelect(item.name)}
                        className="w-full text-left bg-black text-white rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-150 cursor-pointer shadow-xs"
                      >
                        {item.name} ({item.count})
                      </button>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => handleCategorySelect(item.name)}
                        className="w-full text-left text-[#344054] hover:text-black hover:bg-gray-50/80 rounded-lg px-4 py-2 font-normal text-sm transition-colors cursor-pointer"
                      >
                        {item.name} ({item.count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}

          {/* ================================================================
              PRODUCTS
          ================================================================ */}

          <div className="flex-1">
            {/* Mobile Header */}

            <div className="lg:hidden mb-6 pb-4 border-b border-gray-200">
              <h2 className="font-toma text-xl font-bold text-text mb-2">
                {selectedCategory}
              </h2>

              <span className="font-modelica text-sm text-text-light">
                {pagination.totalDocs ?? products.length} products
              </span>
            </div>

            {/* Product Grid */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* No Products */}

            {products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <img
                  src="/images/coming-soon.webp"
                  alt="Coming Soon"
                  className="img-fluid mb-6"
                />
              </div>
            )}

            {/* ============================================================
                PAGINATION
            ============================================================ */}

            {pagination.totalPages > 1 && (
              <div className="mt-14 mb-6 flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 select-none">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-5 sm:px-6 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed bg-transparent"
                      : "border-gray-200 text-gray-700 hover:border-[#5C3124] hover:text-[#5C3124] hover:bg-[#fdf6f4] cursor-pointer"
                  }`}
                >
                  Previous
                </button>

                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  {getPaginationItems(currentPage, pagination.totalPages).map((item, index) => {
                    if (item === "...") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 font-bold select-none text-sm tracking-wider"
                        >
                          ...
                        </span>
                      );
                    }

                    const isActive = currentPage === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePageChange(item)}
                        aria-current={isActive ? "page" : undefined}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#48261c] text-white shadow-xs"
                            : "border border-[#ebdcd7] text-gray-800 hover:border-[#5C3124] hover:text-[#5C3124] hover:bg-[#fdf6f4]"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className={`px-5 sm:px-6 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
                    currentPage === pagination.totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed bg-transparent"
                      : "border-gray-200 text-gray-700 hover:border-[#5C3124] hover:text-[#5C3124] hover:bg-[#fdf6f4] cursor-pointer"
                  }`}
                >
                  Next
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

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-10">
        <ComparisonSection data={pageData.sections?.comparisonSection} />
      </div>

      <FAQSection faq={pageData.sections?.faq || pageData.faq} />

      <BottomContentSection
        content={pageData.sections?.bottomContent || pageData.bottomContent}
      />
    </div>
  );
};

export default ProductsGrid;
