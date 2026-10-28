import categoryConfig from "../config/categoryConfig";

export function buildShopCategorySections(categories) {
  const seen = new Set();
  return categories.flatMap(category => {
    // Some admin display names differ from the product category stored in the API.
    const filterCategory = categoryConfig[category.slug]?.category || category.title;
    if (!filterCategory) return [];
    const key = filterCategory.trim().toLowerCase();
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      ...category,
      filterCategory,
      anchorId: `shop-category-${String(category.id || category.slug).replace(/[^a-z\d_-]/gi, "-")}`,
      viewAllUrl: `/gomzi-supplement?category=${encodeURIComponent(filterCategory)}`,
    }];
  });
}

export function shouldShowShopCategorySections(categorySlug, searchParams) {
  return !categorySlug
    && !searchParams.get("category")
    && !searchParams.get("search")?.trim()
    && !searchParams.get("sort")
    && searchParams.get("view") !== "all";
}
