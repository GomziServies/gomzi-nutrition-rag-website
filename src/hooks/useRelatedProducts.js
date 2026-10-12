// hooks/useRelatedProducts.js
import { useEffect, useState } from "react";
import { getProductsApi } from "../services/product.service";

export function useRelatedProducts(category, excludeId, limit = 10) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    let cancelled = false;
    setLoading(true);

    getProductsApi({ category, limit })
      .then((res) => {
        if (cancelled) return;
        const list = res?.data?.data?.products || res?.data?.products || [];
        setProducts(list.filter((p) => p._id !== excludeId));
      })
      .catch((err) => {
        console.error("Failed to load related products:", err);
        if (!cancelled) setProducts([]);
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [category, excludeId, limit]);

  return { products, loading };
}
