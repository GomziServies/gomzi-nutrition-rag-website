import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductsGrid from "../component/ui/Products";
import SEO from "../component/SEO";
import categoryConfig from "../config/categoryConfig";
import useCategories from "../hooks/useCategories";
import PageLoading from "../component/PageLoading";
import NotFound from "./NotFound";
import ShopCategorySections from "../component/category/ShopCategorySections";
import { shouldShowShopCategorySections } from "../utils/shopCategories";

const extraCategories = {
  "whey-protein-isolate": "Whey Protein Isolate",
  "casein-protein": "Casein Protein",
  "yeast-protein": "Yeast Protein",
  "eaa": "EAA",
  "electrolytes-hydration": "Electrolytes & Hydration",
  "accessories": "Accessories",
  "peanut-butter": "Protein Bars & Snacks",
  "protein-bars-snacks": "Protein Bars & Snacks",
  "combos-stacks": "Combos & Stacks",
};

function getCategoryPage(slug, queryCategory, categories, categoryConfig) {
  const backendCategory = categories.find(item => item.slug === slug);
  const category = queryCategory || extraCategories[slug] || backendCategory?.title;
  const configured = categoryConfig[slug] || Object.values(categoryConfig).find(item => category && item.category?.toLowerCase() === category.toLowerCase());
  if (configured) return configured;
  if (!category) return categoryConfig.default;
  return {
    ...categoryConfig.default,
    category,
    heading: category,
    tag: backendCategory?.tag || "FIND YOUR EVERYDAY ESSENTIALS",
    description: backendCategory?.subtitle || `Explore ${category.toLowerCase()} from the Gomzi Nutrition store. Compare products, flavours and prices to find what fits your routine.`,
    seo: { title: `${category} | Gomzi Nutrition`, description: `Shop ${category.toLowerCase()} at Gomzi Nutrition. Explore the range and find your next favourite.` },
    sections: {},
  };
}

const Allproducts = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "";

  const needsCategory = Boolean(categorySlug && !selectedCategory && !categoryConfig[categorySlug] && !extraCategories[categorySlug]);
  const { categories, loading, error, retry } = useCategories({ enabled: needsCategory });
  if (shouldShowShopCategorySections(categorySlug, searchParams) && searchParams.get("view") === "sections") return <>
    <SEO title={categoryConfig.default.seo.title} description={categoryConfig.default.seo.description} />
    <ShopCategorySections pageData={categoryConfig.default} />
  </>;
  if (needsCategory && loading) return <PageLoading />;
  if (needsCategory && error) return <div className="max-w-xl mx-auto text-center px-5 py-20"><h1 className="text-2xl font-bold">We couldn't load this category</h1><button onClick={retry} className="mt-5 rounded-xl bg-primary text-white px-6 py-3">Try again</button></div>;
  if (needsCategory && !categories.some(item => item.slug === categorySlug)) return <NotFound />;
  const pageData = getCategoryPage(categorySlug, selectedCategory, categories, categoryConfig);

  return (
    <>
      <SEO title={pageData.seo.title} description={pageData.seo.description} />

      <ProductsGrid categorySlug={categorySlug} pageData={pageData} />
    </>
  );
};

export default Allproducts;
