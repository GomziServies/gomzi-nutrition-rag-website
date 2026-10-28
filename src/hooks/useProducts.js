import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../services/product.service";

export default function useProducts({ page = 1, limit = 9, category = "", search = "", sort = "", sortOrder = "", slug = "" } = {}) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setProduct(null);
    const load = async () => {
      try {
        const result = await fetchProducts({ page, limit, category, search, sort, sortOrder, slug });
        if (!active) return;
        if (!result.success) throw new Error(result.message);
        if (slug) setProduct(Array.isArray(result.data) ? result.data[0] || null : result.data || null);
        else {
          setProducts(Array.isArray(result.data) ? result.data : []);
          setPagination(result.pagination || {});
        }
      } catch (failure) {
        if (!active) return;
        setProducts([]);
        setPagination({});
        setError(failure.message || "We couldn't load the products. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, [page, limit, category, search, sort, sortOrder, slug, attempt]);
  return { products, product, pagination, loading, error, retry, hasProducts: products.length > 0 };
}
