import { getCategoriesApi } from "../api/category.api";
import { resolveBannerAssetUrl, resolveShopLink } from "./banner.service";

export function normalizeCategories(data) {
  const list = Array.isArray(data?.categories) ? data.categories : [];
  const seen = new Set();
  return list
    .filter(category => category && category.status !== false && typeof category.title === "string" && category.title.trim())
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .filter(category => {
      const key = (category.slug || category._id || category.id || category.title).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(category => {
      const title = category.title.trim();
      const slug = typeof category.slug === "string" ? category.slug.trim() : "";
      const count = category.productCount ?? category.count;
      return {
        id: category._id || category.id || slug || title,
        title,
        slug,
        image: resolveBannerAssetUrl(category.image) || "/images/product-placeholder.webp",
        productCount: count != null && Number.isFinite(Number(count)) && Number(count) >= 0 ? Math.floor(Number(count)) : null,
        subtitle: category.subtitle || "",
        tag: category.tag || "",
        spec: category.spec || "",
        bg: /^#[a-f\d]{3,8}$/i.test(category.bg || "") ? category.bg : "#1c1917",
        accent: /^#[a-f\d]{3,8}$/i.test(category.accent || "") ? category.accent : "#95442c",
        url: resolveShopLink(category.url?.trim() || (slug ? `/gomzi-supplement/${encodeURIComponent(slug)}` : `/gomzi-supplement?category=${encodeURIComponent(title)}`)),
      };
    });
}

export async function fetchCategories({ signal } = {}) {
  const response = await getCategoriesApi(signal);
  if (!Array.isArray(response.data?.data?.categories)) throw new Error("The categories could not be loaded. Please try again.");
  return {
    categories: normalizeCategories(response.data.data),
    totalProducts: Number(response.data.data.totalProducts) || 0,
  };
}
