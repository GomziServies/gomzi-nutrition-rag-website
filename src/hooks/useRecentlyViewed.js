// hooks/useRecentlyViewed.js
import { useEffect, useState } from "react";

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 12;

// Call this on the product detail page once `product` has loaded.
// Stores a lightweight snapshot of the product, not just its id,
// so the "Recently Viewed" section can render without a second fetch.
export function trackRecentlyViewed(product) {
  if (!product?._id) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let items = raw ? JSON.parse(raw) : [];

    // dedupe - remove existing entry for this product if present
    items = items.filter((p) => p._id !== product._id);

    const snapshot = {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      displayImages: product.displayImages,
      price: product.price,
      discountPrice: product.discountPrice,
      rating: product.rating,
      categories: product.categories,
      stock: product.stock,
      viewedAt: Date.now(),
    };

    items.unshift(snapshot); // most recent first
    items = items.slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save recently viewed:", err);
  }
}

// Returns stored snapshots, excluding the product currently being viewed.
// No arguments needed beyond the id to exclude - nothing to fetch.
export function useRecentlyViewed(excludeId) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : [];
      setItems(excludeId ? stored.filter((p) => p._id !== excludeId) : stored);
    } catch {
      setItems([]);
    }
  }, [excludeId]);

  return items;
}
