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

  const pageTitle = selectedBrand
    ? `${selectedBrand} Collection`
    : categorySlug
      ? pageData.heading || "Gomzi Supplement"
      : selectedCategory
        ? selectedCategory
        : "Gomzi Supplement";

  const pageSubtitle = selectedBrand
    ? `Explore 100% authentic, verified products from ${selectedBrand}`
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
