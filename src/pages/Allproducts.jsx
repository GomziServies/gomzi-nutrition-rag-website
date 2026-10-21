import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductsGrid from "../component/ui/Products";
import SEO from "../component/SEO";
import categoryConfig from "../config/categoryConfig";
import PageHeading from "../HOC/Header/PageHeading";
import BlackFeatureBar from "../component/common/Black-Feature-Bar";

const Allproducts = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";
  const selectedBrand = searchParams.get("brand") || searchParams.get("company") || "";

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

  const queryCategoryConfig = selectedCategory
    ? Object.values(categoryConfig).find(
        (item) =>
          item?.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    : null;

  /**
   * Priority:
   *
   * 1. Query category
   * 2. URL slug
   * 3. Default
   */
  const pageData =
    queryCategoryConfig ||
    (categorySlug ? categoryConfig[categorySlug] : null) ||
    categoryConfig.default;

  const pageTitle = isBestSeller
    ? "Best Sellers"
    : isDeal
      ? "Offer Zone"
      : selectedBrand
        ? `${selectedBrand} Collection`
        : categorySlug
          ? pageData.heading || "Gomzi Supplement"
          : selectedCategory
            ? selectedCategory
            : rawSearch
              ? `Search: "${rawSearch}"`
              : "Gomzi Supplement";

  const pageSubtitle = isBestSeller
    ? "Explore our most popular and highest rated supplements trusted by fitness enthusiasts."
    : isDeal
      ? "Grab exclusive discounts, limited-time bundle savings, and top supplement offers."
      : selectedBrand
        ? `Explore 100% authentic, verified products from ${selectedBrand}`
        : rawSearch
          ? `Showing authentic supplement results for "${rawSearch}"`
          : pageData.subHeading || "Science-Backed Nutrition For Everyday Performance";

  return (
    <>
      <SEO title={pageTitle} description={pageSubtitle} />
      <PageHeading
        head={pageTitle}
        subtitle={pageSubtitle}
        breadcrumb={false}
      />
      <BlackFeatureBar />
      <ProductsGrid categorySlug={categorySlug} pageData={pageData} />
    </>
  );
};

export default Allproducts;
