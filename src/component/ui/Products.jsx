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
    backendCategories: [
      // Add backend categories here if they belong
      // to Wellness & Health.
      //
      // Example:
      // "Fat Burner",
    ],
  },
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
    <div className="w-full bg-bg py-12 sm:py-16 md:py-20 lg:py-15">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <CategoryHero pageData={pageData} />

        {/* ================================================================
            DESKTOP TOOLBAR
        ================================================================ */}

        <div className="hidden lg:flex items-center justify-between border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {pagination.totalDocs ?? products.length}
            </span>

            <span className="text-sm text-gray-500">products</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-11 px-5 border border-gray-300 rounded-xl bg-white flex items-center gap-3 hover:border-gray-400 transition-all"
            >
              <span className="text-sm text-gray-500">Sort</span>

              <span className="font-medium">{sortBy}</span>

              <svg
                className={`w-4 h-4 transition-transform ${
                  isSortDropdownOpen ? "rotate-180" : ""
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
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setCurrentPage(1);
                      setSortBy(option);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors ${
                      sortBy === option
                        ? "bg-[#5c3024] text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================================================================
    MOBILE TOOLBAR
================================================================ */}

        <div className="lg:hidden mb-8">
          {/* Category Selector */}
          <button
            onClick={() => setIsCategoryDrawerOpen(true)}
            className="group w-full h-14 px-4 rounded-2xl border border-gray-200 bg-white
               shadow-sm flex items-center justify-between
               transition-all duration-200 active:scale-[0.99]
               hover:border-[#5c3024]/30 hover:shadow-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#5c3024]/10 flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-[#5c3024]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4 6h16M4 12h16M4 18h10"
                  />
                </svg>
              </div>

              <div className="text-left min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  Category
                </p>
                <p className="font-semibold text-gray-900 truncate">
                  {selectedCategory}
                </p>
              </div>
            </div>

            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-[#5c3024] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m7 10 5 5 5-5"
              />
            </svg>
          </button>

          {/* Sort */}
          <div className="relative mt-3">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className={`w-full h-14 px-4 rounded-2xl border bg-white
                  flex items-center justify-between shadow-sm
                  transition-all duration-200
                  ${
                    isSortDropdownOpen
                      ? "border-[#5c3024]/40 ring-4 ring-[#5c3024]/10"
                      : "border-gray-200 hover:border-[#5c3024]/30 hover:shadow-md"
                  }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M8 6h13M8 12h9M8 18h6M3 6h.01M3 12h.01M3 18h.01"
                    />
                  </svg>
                </div>

                <div className="text-left">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                    Sort by
                  </p>
                  <p className="font-semibold text-gray-900">{sortBy}</p>
                </div>
              </div>

              <svg
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isSortDropdownOpen ? "rotate-180 text-[#5c3024]" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>

            {/* Sort Dropdown */}
            {isSortDropdownOpen && (
              <div className="absolute left-0 right-0 mt-2 p-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
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
                      className={`w-full flex items-center justify-between px-4 py-3.5
                          rounded-xl text-left transition-colors
                          ${
                            isSelected
                              ? "bg-[#5c3024] text-white"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                    >
                      <span className="font-medium">{option}</span>

                      {isSelected && (
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
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      )}
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
                    <p className="text-xs font-medium uppercase tracking-widest text-[#5c3024]">
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
                                ? "bg-[#5c3024] text-white shadow-lg shadow-[#5c3024]/20"
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
                              <div className="w-2 h-2 rounded-full bg-[#5c3024]/40" />
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
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h3 className="font-toma text-lg font-semibold text-text mb-4 pb-3 border-b border-gray-200">
                  Products
                </h3>

                <ul className="space-y-2">
                  {categories.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => handleCategorySelect(item.name)}
                        className={`w-full text-left px-3 py-2 rounded cursor-pointer transition-colors font-modelica text-sm ${
                          selectedCategory === item.name
                            ? "bg-primary text-white"
                            : "text-text-light hover:bg-gray-50"
                        }`}
                      >
                        {item.name} ({item.count})
                      </button>
                    </li>
                  ))}
                </ul>
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
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-full sm:w-auto px-6 py-2 rounded border font-modelica text-sm transition-colors ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-text hover:bg-gray-50 cursor-pointer"
                  }`}
                >
                  Previous
                </button>

                <div className="flex flex-wrap justify-center gap-2">
                  {[...Array(pagination.totalPages || 1)].map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded cursor-pointer font-modelica text-sm transition-colors ${
                          currentPage === pageNumber
                            ? "bg-primary text-white"
                            : "border border-gray-300 text-text hover:bg-gray-50"
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
                  className={`w-full sm:w-auto px-6 py-2 rounded border font-modelica text-sm transition-colors ${
                    currentPage === pagination.totalPages
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-text hover:bg-gray-50 cursor-pointer"
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
