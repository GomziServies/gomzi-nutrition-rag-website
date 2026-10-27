import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../common/ProductCard";
import useProducts from "../../hooks/useProducts";
import { addProductToCart } from "../../services/cartStorage.service";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductCardSkeleton from "../ProductCardSkeleton";
import useProductCategories from "../../hooks/useProductCategories";
import { getCompaniesApi } from "../../api/company.api";
import ComparisonSection from "../category/ComparisonSection";
import FAQSection from "../category/FAQSection";
import BottomContentSection from "../category/BottomContentSection";
import {
  ChevronDown,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  Building2,
  Search,
  X,
  Tag,
  Percent,
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

const ProductsGrid = ({ categorySlug, pageData }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const brandParam = searchParams.get("brand") || searchParams.get("company") || "";

  const selectedCategory =
    category ||
    pageData?.category ||
    (categorySlug ? categorySlug.replace(/-/g, " ") : "All Products");

  const selectedCompany = brandParam || "All Companies";
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [companiesList, setCompaniesList] = useState([]);

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isCompanyDrawerOpen, setIsCompanyDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Companies from API
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    let isMounted = true;
    const loadCompanies = async () => {
      try {
        const res = await getCompaniesApi();
        if (res?.data?.data?.companies && Array.isArray(res.data.data.companies)) {
          const names = res.data.data.companies
            .filter((c) => c && c.status !== false && c.name)
            .map((c) => c.name.trim());
          if (isMounted && names.length > 0) {
            setCompaniesList(Array.from(new Set(names)));
          }
        }
      } catch (err) {
        console.warn("Using default companies list:", err?.message);
      }
    };
    loadCompanies();
    return () => {
      isMounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Product API Query - All Products on a Single Page (No Pagination)
  |--------------------------------------------------------------------------
  */
  const activeCategory =
    category ||
    pageData?.category ||
    (categorySlug ? categorySlug.replace(/-/g, " ") : "");
  const activeBrand = selectedCompany !== "All Companies" ? selectedCompany : "";

  // Special nav modes (Best Sellers & Offer Zone) should not be sent as literal text searches to MongoDB
  const rawSearch = (searchParams.get("search") || "").trim();
  const filterParam = (searchParams.get("filter") || "").trim();
  const tabParam = (searchParams.get("tab") || "").trim();

  const isBestSeller =
    rawSearch === "best-seller" ||
    rawSearch === "bestseller" ||
    rawSearch === "best_seller" ||
    filterParam === "best-seller" ||
    tabParam === "best-seller";

  const isDeal =
    rawSearch === "deal" ||
    rawSearch === "deals" ||
    rawSearch === "offer" ||
    rawSearch === "offer-zone" ||
    filterParam === "deal" ||
    tabParam === "deal";

  const apiSearch = isBestSeller || isDeal ? "" : rawSearch;

  // For Best Sellers / Offer Zone, if user hasn't explicitly chosen a sort, pick optimal default
  let effectiveSortConfig = sortConfig[sortBy] || {};
  if (sortBy === "Featured") {
    if (isBestSeller) {
      effectiveSortConfig = { sort: "createdAt", sortOrder: "desc" };
    } else if (isDeal) {
      effectiveSortConfig = { sort: "price", sortOrder: "asc" };
    }
  }

  const { products, loading, pagination } = useProducts({
    page: 1,
    limit: 1000,
    search: apiSearch,
    category: activeCategory,
    brand: activeBrand,
    company: activeBrand,
    ...effectiveSortConfig,
  });

  const {
    categories: categoryData,
    totalProducts,
  } = useProductCategories();

  const backendCategoryCounts = useMemo(() => {
    const map = {};
    if (!Array.isArray(categoryData)) return map;
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
        count: Number(totalProducts) > 0 ? Number(totalProducts) : null,
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
          count: liveCount > 0 ? liveCount : null,
        };
      }),
    ];
  }, [backendCategoryCounts, totalProducts]);

  const allCompanies = useMemo(() => {
    return [
      {
        name: "All Companies",
        count: Number(totalProducts) > 0 ? Number(totalProducts) : null,
      },
      ...companiesList.map((cName) => {
        return {
          name: cName,
          count: null,
        };
      }),
    ];
  }, [companiesList, totalProducts]);

  const filteredCompanies = useMemo(() => {
    if (!companySearchQuery.trim()) return allCompanies;
    const q = companySearchQuery.toLowerCase().trim();
    return allCompanies.filter((c) => c.name.toLowerCase().includes(q));
  }, [allCompanies, companySearchQuery]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [category, brandParam, rawSearch]);

  const handleCategorySelect = (categoryName) => {
    const newParams = new URLSearchParams(searchParams);

    if (categoryName === "All Products") {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryName);
    }

    const queryStr = newParams.toString();
    navigate(queryStr ? `/gomzi-supplement?${queryStr}` : `/gomzi-supplement`);
  };

  const handleCompanySelect = (companyName) => {
    const newParams = new URLSearchParams(searchParams);

    if (!companyName || companyName === "All Companies") {
      newParams.delete("brand");
      newParams.delete("company");
    } else {
      newParams.set("brand", companyName);
      newParams.delete("company");
    }

    const queryStr = newParams.toString();
    navigate(queryStr ? `/gomzi-supplement?${queryStr}` : `/gomzi-supplement`);
  };

  const handleClearAllFilters = () => {
    navigate("/gomzi-supplement");
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



  return (
    <div className="w-full bg-bg py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* ================================================================
            DESKTOP TOOLBAR
        ================================================================ */}
        <div className="hidden lg:flex items-center justify-between border-b border-primary-border pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-primary-border shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-900">
                {pagination.totalDocs ?? products.length}
              </span>
              <span className="text-xs font-medium text-gray-500">Products Available</span>
            </div>

            {selectedCompany !== "All Companies" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                <Building2 className="w-3.5 h-3.5" />
                <span>{selectedCompany}</span>
              </span>
            )}

            {isBestSeller && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-800">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Best Sellers</span>
              </span>
            )}

            {isDeal && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-700">
                <Percent className="w-3.5 h-3.5 text-rose-600" />
                <span>Offer Zone</span>
              </span>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="h-10 px-4 border border-primary-border rounded-xl bg-white flex items-center gap-2.5 hover:border-primary transition-all shadow-2xs cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-gray-400">Sort by:</span>
              <span className="text-xs font-bold text-gray-900">{sortBy}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-primary-border shadow-xl p-1.5 z-50 overflow-hidden">
                {sortOptions.map((option) => {
                  const isSelected = sortBy === option;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-2xs"
                          : "text-gray-700 hover:bg-primary-light hover:text-primary"
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
            MOBILE TOOLBAR (COMPACT 3-BUTTON GRID)
        ================================================================ */}
        <div className="lg:hidden mb-4 grid grid-cols-3 gap-2">
          {/* Category Selector */}
          <button
            onClick={() => setIsCategoryDrawerOpen(true)}
            className="h-10 px-2.5 rounded-xl border border-primary-border bg-white shadow-2xs flex items-center justify-between min-w-0"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[11px] font-bold text-gray-900 truncate">
                {selectedCategory === "All Products" ? "Category" : selectedCategory}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {/* Company Selector */}
          <button
            onClick={() => setIsCompanyDrawerOpen(true)}
            className="h-10 px-2.5 rounded-xl border border-primary-border bg-white shadow-2xs flex items-center justify-between min-w-0"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[11px] font-bold text-gray-900 truncate">
                {selectedCompany === "All Companies" ? "Brand" : selectedCompany}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="w-full h-10 px-2.5 rounded-xl border border-primary-border bg-white shadow-2xs flex items-center justify-between min-w-0"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[11px] font-bold text-gray-900 truncate">
                  {sortBy === "Featured" ? "Sort" : sortBy}
                </span>
              </div>
              <ChevronDown
                className={`w-3 h-3 text-gray-400 shrink-0 transition-transform ${
                  isSortDropdownOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 left-0 mt-2 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-primary-border z-50 overflow-hidden">
                {sortOptions.map((option) => {
                  const isSelected = sortBy === option;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2
                          rounded-xl text-left text-xs font-semibold transition-colors
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-primary to-primary-hover text-white"
                              : "text-gray-700 hover:bg-primary-light hover:text-primary"
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
            ACTIVE FILTER CHIPS
        ================================================================ */}
        {(selectedCategory !== "All Products" ||
          selectedCompany !== "All Companies" ||
          isBestSeller ||
          isDeal ||
          Boolean(apiSearch)) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-2xl border border-primary-border shadow-2xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">
              Active Filters:
            </span>

            {isBestSeller && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800">
                <span>Best Sellers</span>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete("search");
                    newParams.delete("filter");
                    newParams.delete("tab");
                    const q = newParams.toString();
                    navigate(q ? `/gomzi-supplement?${q}` : `/gomzi-supplement`);
                  }}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-amber-200/60 transition-colors cursor-pointer"
                  aria-label="Remove best sellers filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {isDeal && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700">
                <span>Offer Zone</span>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete("search");
                    newParams.delete("filter");
                    newParams.delete("tab");
                    const q = newParams.toString();
                    navigate(q ? `/gomzi-supplement?${q}` : `/gomzi-supplement`);
                  }}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-rose-200/60 transition-colors cursor-pointer"
                  aria-label="Remove offer zone filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {Boolean(apiSearch) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fbf5f2] border border-[#f0ded8] text-primary">
                <span>Search: "{apiSearch}"</span>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete("search");
                    const q = newParams.toString();
                    navigate(q ? `/gomzi-supplement?${q}` : `/gomzi-supplement`);
                  }}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                  aria-label="Remove search filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== "All Products" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fbf5f2] border border-[#f0ded8] text-primary">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => handleCategorySelect("All Products")}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                  aria-label="Remove category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCompany !== "All Companies" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fbf5f2] border border-[#f0ded8] text-primary">
                <span>Company: {selectedCompany}</span>
                <button
                  onClick={() => handleCompanySelect("All Companies")}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                  aria-label="Remove company filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearAllFilters}
              className="text-xs font-semibold text-gray-500 hover:text-primary underline ml-auto cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

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
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[28px] max-h-[82vh] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300"
            >
              <div className="bg-white px-5 pt-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      Browse
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      Categories
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCategoryDrawerOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    aria-label="Close categories"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div
                className="px-5 py-4 overflow-y-auto overscroll-contain scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{
                  maxHeight: "calc(82vh - 120px)",
                  paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
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
                        className={`w-full min-h-[56px] px-4 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "btn-gradient text-white shadow-md shadow-primary/25 border border-amber-400/30"
                            : "bg-gray-50 text-gray-800 hover:bg-gray-100 active:scale-[0.99]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                              isSelected ? "bg-white/15" : "bg-white border border-gray-200"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-primary/50" />
                            )}
                          </div>
                          <span className="font-semibold text-[15px]">
                            {item.name}
                          </span>
                        </div>
                        <span
                          className={`min-w-[34px] px-2.5 py-1 rounded-full text-xs font-semibold text-center ${
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
            MOBILE COMPANY DRAWER
        ================================================================ */}
        {isCompanyDrawerOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[60] animate-in fade-in duration-200"
              onClick={() => setIsCompanyDrawerOpen(false)}
            />
            <div
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[28px] max-h-[82vh] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300"
            >
              <div className="bg-white px-5 pt-3 pb-3 border-b border-gray-100">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary">
                      Filter By
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                      Companies & Brands
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCompanyDrawerOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                    aria-label="Close companies"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={companySearchQuery}
                    onChange={(e) => setCompanySearchQuery(e.target.value)}
                    placeholder="Search company or brand..."
                    className="w-full h-10 pl-9 pr-8 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                  />
                  {companySearchQuery && (
                    <button
                      onClick={() => setCompanySearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div
                className="px-5 py-4 overflow-y-auto overscroll-contain scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                style={{
                  maxHeight: "calc(82vh - 160px)",
                  paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="space-y-2">
                  {filteredCompanies.map((item) => {
                    const isSelected = selectedCompany === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          handleCompanySelect(item.name);
                          setIsCompanyDrawerOpen(false);
                        }}
                        className={`w-full min-h-[56px] px-4 rounded-2xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "btn-gradient text-white shadow-md shadow-primary/25 border border-amber-400/30"
                            : "bg-gray-50 text-gray-800 hover:bg-gray-100 active:scale-[0.99]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected ? "bg-white/15" : "bg-white border border-gray-200"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <Building2 className="w-4 h-4 text-primary/60" />
                            )}
                          </div>
                          <span className="font-semibold text-sm truncate">
                            {item.name}
                          </span>
                        </div>
                        {item.count != null && (
                          <span
                            className={`min-w-[34px] px-2.5 py-1 rounded-full text-xs font-semibold text-center shrink-0 ml-2 ${
                              isSelected
                                ? "bg-white/15 text-white"
                                : "bg-white text-gray-400 border border-gray-200"
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {filteredCompanies.length === 0 && (
                    <p className="text-sm text-gray-400 py-8 text-center">
                      No companies found matching "{companySearchQuery}"
                    </p>
                  )}
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
              DESKTOP SIDEBAR (DUAL FILTERS: CATEGORIES + COMPANIES)
          ================================================================ */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            {/* 1. Categories Card */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-extrabold text-base text-black tracking-tight flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>Categories</span>
                </h2>
                <span className="text-[11px] font-semibold text-gray-400">
                  {categories.length}
                </span>
              </div>

              <div className="border-b border-gray-100 mb-3" />

              <div className="flex flex-col space-y-1">
                {categories.map((item) => {
                  const isSelected = selectedCategory === item.name;

                  return isSelected ? (
                    <button
                      key={item.name}
                      onClick={() => handleCategorySelect(item.name)}
                      className="w-full text-left btn-gradient text-white rounded-xl px-3.5 py-2 font-bold text-xs transition-all duration-300 cursor-pointer shadow-md shadow-primary/25 border border-amber-400/30 flex items-center justify-between"
                    >
                      <span className="truncate">{item.name}</span>
                      {item.count != null && (
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold ml-2">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => handleCategorySelect(item.name)}
                      className="w-full text-left text-[#344054] hover:text-black hover:bg-gray-50/80 rounded-lg px-3.5 py-1.5 font-normal text-xs transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                      {item.count != null && (
                        <span className="text-[10px] text-gray-400 ml-2">({item.count})</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Companies & Brands Card */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-extrabold text-base text-black tracking-tight flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Companies & Brands</span>
                </h2>
                <span className="text-[11px] font-semibold text-gray-400">
                  {allCompanies.length - 1} Brands
                </span>
              </div>

              {/* Company Search Input */}
              <div className="relative mb-3">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={companySearchQuery}
                  onChange={(e) => setCompanySearchQuery(e.target.value)}
                  placeholder="Search brand or company..."
                  className="w-full h-8 pl-8 pr-7 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-all text-gray-800 placeholder:text-gray-400"
                />
                {companySearchQuery && (
                  <button
                    onClick={() => setCompanySearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="border-b border-gray-100 mb-3" />

              {/* Companies List */}
              <div className="flex flex-col space-y-1">
                {filteredCompanies.map((item) => {
                  const isSelected = selectedCompany === item.name;

                  return isSelected ? (
                    <button
                      key={item.name}
                      onClick={() => handleCompanySelect(item.name)}
                      className="w-full text-left btn-gradient text-white rounded-xl px-3.5 py-2 font-bold text-xs transition-all duration-300 cursor-pointer shadow-md shadow-primary/25 border border-amber-400/30 flex items-center justify-between"
                    >
                      <span className="truncate">{item.name}</span>
                      {item.count != null && (
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold ml-2">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => handleCompanySelect(item.name)}
                      className="w-full text-left text-[#344054] hover:text-black hover:bg-gray-50/80 rounded-lg px-3.5 py-1.5 font-normal text-xs transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                      {item.count != null && (
                        <span className="text-[10px] text-gray-400 ml-2">({item.count})</span>
                      )}
                    </button>
                  );
                })}
                {filteredCompanies.length === 0 && (
                  <p className="text-xs text-gray-400 py-4 text-center">No companies found</p>
                )}
              </div>
            </div>
          </aside>

          {/* ================================================================
              PRODUCTS GRID
          ================================================================ */}
          <div className="flex-1">
            {/* Mobile Header */}
            <div className="lg:hidden mb-4 pb-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-text">
                  {selectedCompany !== "All Companies"
                    ? selectedCompany
                    : selectedCategory}
                </h2>
                <span className="text-xs text-text-light">
                  {pagination.totalDocs ?? products.length} products found
                </span>
              </div>
            </div>

            {/* Product Grid / Skeletons */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
                {[...Array(9)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* No Products Found State */}
            {products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-200/80 p-8 text-center my-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  No Products Found
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mb-5">
                  We couldn't find any products matching your current category and company filter combination.
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* No pagination needed: all products rendered on a single page */}
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
          BOTTOM CONTENT (Comparison Section commented out)
      ================================================================ */}
      {/* <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-10">
        <ComparisonSection data={pageData.sections?.comparisonSection} />
      </div> */}

      <FAQSection faq={pageData.sections?.faq || pageData.faq} />

      <BottomContentSection
        content={pageData.sections?.bottomContent || pageData.bottomContent}
      />
    </div>
  );
};

export default ProductsGrid;
