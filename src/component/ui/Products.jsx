import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../common/ProductCard";
import useProducts from "../../hooks/useProducts";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCardSkeleton from "../ProductCardSkeleton";
import useProductCategories from "../../hooks/useProductCategories";
import CategoryHero from "../category/CategoryHero";
import ComparisonSection from "../category/ComparisonSection";
import FAQSection from "../category/FAQSection";
import BottomContentSection from "../category/BottomContentSection";

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
    name: "Whey Protein Isolate",
    backendCategories: ["Whey Protein Isolate"],
  },
  {
    name: "Casein Protein",
    backendCategories: ["Casein Protein"],
  },
  {
    name: "Plant Protein",
    backendCategories: ["Plant Protein"],
  },
  {
    name: "Yeast Protein",
    backendCategories: ["Yeast Protein"],
  },
  {
    name: "Mass Gainer",
    backendCategories: ["Mass Gainer"],
  },
  {
    name: "Creatine",
    backendCategories: ["Creatine"],
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
    name: "EAA",
    backendCategories: ["EAA"],
  },
  {
    name: "Protein Bars & Snacks",
    backendCategories: ["Protein Bars & Snacks"],
  },
  {
    name: "Meal Replacement",
    backendCategories: ["Meal Replacement"],
  },
  {
    name: "Electrolytes & Hydration",
    backendCategories: ["Electrolytes & Hydration"],
  },
  {
    name: "Wellness & Health",
    backendCategories: ["Wellness & Health"],
  },
  {
    name: "Combos & Stacks",
    backendCategories: ["Combos & Stacks"],
  },
  {
    name: "Accessories",
    backendCategories: ["Accessories"],
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

  const categories = useMemo(() => {
    const listedBackendCategories = websiteCategories.flatMap(
      (websiteCategory) => websiteCategory.backendCategories,
    );

    // Any category that exists in the database but is not in the list above
    // still gets a menu entry, so a new category never needs a code change.
    const extraCategories = Object.keys(backendCategoryCounts)
      .filter(
        (backendCategory) =>
          !listedBackendCategories.includes(backendCategory) &&
          !hiddenBackendCategories.includes(backendCategory),
      )
      .sort((a, b) => a.localeCompare(b))
      .map((backendCategory) => ({
        name: backendCategory,
        backendCategories: [backendCategory],
        count: backendCategoryCounts[backendCategory],
      }));

    return [
      {
        name: "All Products",
        count: Number(totalProducts || 0),
        backendCategories: [],
      },

      ...websiteCategories.map((websiteCategory) => {
        const count = websiteCategory.backendCategories.reduce(
          (total, backendCategory) => {
            return total + Number(backendCategoryCounts[backendCategory] || 0);
          },
          0,
        );

        return {
          ...websiteCategory,
          count,
        };
      }),

      ...extraCategories,
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

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
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
      <div className="w-full bg-[#fbf9f6] py-12 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
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
    <div className="w-full bg-[#fbf9f6] py-6 sm:py-10 md:py-12 min-h-screen font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Category Hero Section */}
        <CategoryHero pageData={pageData} />

        {/* ================================================================
            QUICK CATEGORY HORIZONTAL FILTER BAR (Home Page Style)
        ================================================================ */}
        <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? "bg-[#95442c] text-white shadow-xs ring-2 ring-[#95442c]/20"
                      : "bg-white hover:bg-stone-50 text-stone-700 border border-[#ebdcd2] hover:border-[#95442c]/50 shadow-2xs"
                  }`}
                >
                  <span>{cat.name}</span>
                  {typeof cat.count === "number" && cat.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            DESKTOP TOOLBAR
        ================================================================ */}
        <div className="hidden lg:flex items-center justify-between border-b border-[#ebdcd2] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-white border border-[#ebdcd2] text-xs font-black text-[#95442c] font-mono shadow-2xs">
              {pagination.totalDocs ?? products.length}
            </span>
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Verified Supplements
            </span>
            {selectedCategory !== "All Products" && (
              <span className="text-xs text-stone-400">
                • Filtered by <strong className="text-[#95442c]">{selectedCategory}</strong>
              </span>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-10 px-4 border border-[#ebdcd2] rounded-xl bg-white flex items-center gap-2.5 hover:border-[#95442c] transition-all cursor-pointer shadow-2xs text-xs font-bold text-stone-700"
            >
              <span className="text-stone-400 font-normal">Sort:</span>
              <span className="text-[#1c1917]">{sortBy}</span>
              <svg
                className={`w-4 h-4 text-stone-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-[#95442c]" : ""
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
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-[#ebdcd2] shadow-xl overflow-hidden z-50 p-1.5">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setCurrentPage(1);
                      setSortBy(option);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                      sortBy === option
                        ? "bg-[#95442c] text-white"
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
            className="flex-1 h-11 px-3.5 rounded-xl border border-[#ebdcd2] bg-white
               shadow-2xs flex items-center justify-between
               transition-all duration-200 active:scale-[0.99]
               hover:border-[#95442c]/50 text-xs font-bold text-stone-700 cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-stone-400 font-normal">Category:</span>
              <span className="truncate text-[#1c1917]">{selectedCategory}</span>
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
              className="h-11 px-3.5 rounded-xl border border-[#ebdcd2] bg-white
                shadow-2xs flex items-center gap-2
                transition-all duration-200 text-xs font-bold text-stone-700 cursor-pointer"
            >
              <span className="text-stone-400 font-normal">Sort</span>
              <svg
                className={`w-4 h-4 text-stone-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-[#95442c]" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 10 5 5 5-5" />
              </svg>
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 p-1.5 bg-white rounded-xl shadow-2xl border border-[#ebdcd2] z-50 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setCurrentPage(1);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${
                      sortBy === option
                        ? "bg-[#95442c] text-white"
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
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#95442c]">
                      Gomzi Nutrition
                    </p>
                    <h3 className="text-xl font-black text-[#1c1917] mt-0.5">
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
                          ? "bg-[#95442c] text-white shadow-sm"
                          : "bg-stone-50 text-stone-800 hover:bg-stone-100"
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm">{item.name}</span>
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
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <div className="bg-white rounded-2xl border border-[#ebdcd2] p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ebdcd2]">
                  <h3 className="font-toma text-xs font-black text-[#1c1917] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-4 bg-[#95442c] rounded-full inline-block" />
                    Categories
                  </h3>
                  {selectedCategory !== "All Products" && (
                    <button
                      onClick={() => handleCategorySelect("All Products")}
                      className="text-[11px] font-bold text-[#95442c] hover:underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <ul className="space-y-1 max-h-[65vh] overflow-y-auto pr-1">
                  {categories.map((item) => {
                    const isSelected = selectedCategory === item.name;
                    return (
                      <li key={item.name}>
                        <button
                          onClick={() => handleCategorySelect(item.name)}
                          className={`w-full text-left px-3 py-2 rounded-xl cursor-pointer transition-all text-xs font-bold flex items-center justify-between ${
                            isSelected
                              ? "bg-[#95442c] text-white shadow-xs"
                              : "text-stone-700 hover:bg-[#faf6f2] hover:text-[#95442c]"
                          }`}
                        >
                          <span className="truncate">{item.name}</span>
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
              <h2 className="font-toma text-lg font-black text-[#1c1917]">
                {selectedCategory}
              </h2>
              <span className="text-xs text-stone-500 font-mono">
                {pagination.totalDocs ?? products.length} items
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
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-[#ebdcd2] p-8 text-center">
                <img
                  src="/images/coming-soon.webp"
                  alt="No Products"
                  className="w-32 h-32 object-contain mb-4 opacity-80"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <h3 className="text-lg font-black text-[#1c1917] font-toma">
                  No Supplements Found
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm">
                  We currently don't have items in this category. Explore other categories or check back soon!
                </p>
                <button
                  onClick={() => handleCategorySelect("All Products")}
                  className="mt-4 px-4 py-2 bg-[#95442c] text-white text-xs font-bold rounded-xl hover:bg-[#7a3522] cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* ============================================================
                PAGINATION
            ============================================================ */}
            {pagination.totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${
                    currentPage === 1
                      ? "border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50"
                      : "border-[#ebdcd2] text-stone-700 hover:bg-[#faf6f2] hover:text-[#95442c] cursor-pointer bg-white shadow-2xs"
                  }`}
                >
                  ← Previous
                </button>

                <div className="flex flex-wrap justify-center gap-1.5">
                  {[...Array(pagination.totalPages || 1)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrent = currentPage === pageNumber;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-9 h-9 rounded-xl cursor-pointer text-xs font-bold transition-colors ${
                          isCurrent
                            ? "bg-[#95442c] text-white shadow-xs"
                            : "border border-[#ebdcd2] text-stone-700 hover:bg-stone-50 bg-white"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${
                    currentPage === pagination.totalPages
                      ? "border-stone-200 text-stone-300 cursor-not-allowed bg-stone-50"
                      : "border-[#ebdcd2] text-stone-700 hover:bg-[#faf6f2] hover:text-[#95442c] cursor-pointer bg-white shadow-2xs"
                  }`}
                >
                  Next →
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
