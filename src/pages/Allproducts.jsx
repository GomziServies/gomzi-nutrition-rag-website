import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductsGrid from "../component/ui/Products";
import SEO from "../component/SEO";
import categoryConfig from "../config/categoryConfig";

const Allproducts = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

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

  return (
    <>
      <SEO title={pageData.seo.title} description={pageData.seo.description} />

      <ProductsGrid categorySlug={categorySlug} pageData={pageData} />
    </>
  );
};

export default Allproducts;
