export const CATALOG_SORT_VALUES = {
  Featured: "",
  Bestseller: "bestseller",
  "Alphabetically, A-Z": "name-asc",
  "Alphabetically, Z-A": "name-desc",
  "Price, low to high": "price-asc",
  "Price, high to low": "price-desc",
};

export function getCatalogSortLabel(value) {
  return Object.entries(CATALOG_SORT_VALUES).find(([, key]) => key === value?.toLowerCase())?.[0] || "Featured";
}

export function updateCatalogFilters(current, changes) {
  const next = new URLSearchParams(current);
  for (const [key, value] of Object.entries(changes)) {
    if (value) next.set(key, value);
    else next.delete(key);
  }
  if (Object.hasOwn(changes, "brand")) next.delete("company");
  next.delete("page");
  if (next.get("brand") || next.get("company")) next.delete("view");
  return next;
}

export function categoryUrlWithFilters(destination, current) {
  const url = new URL(destination, "https://storefront.example");
  for (const key of ["brand", "company", "sort", "search"]) {
    const value = current.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.pathname + url.search;
}

export function normalizeCatalogBrands(companies) {
  const seen = new Set();
  return (Array.isArray(companies) ? companies : []).flatMap(company => {
    const name = company?.name?.trim();
    const key = name?.toLowerCase();
    if (!name || company.status === false || seen.has(key)) return [];
    seen.add(key);
    return [name];
  }).sort((a, b) => a.localeCompare(b));
}
