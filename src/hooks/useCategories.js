import { useCallback, useEffect, useState } from "react";
import { fetchCategories } from "../services/category.service";

export default function useCategories({ enabled = true } = {}) {
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);

  useEffect(() => {
    if (!enabled) { setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetchCategories({ signal: controller.signal })
      .then(result => {
        if (!controller.signal.aborted) {
          setCategories(result.categories);
          setTotalProducts(result.totalProducts);
        }
      })
      .catch(failure => {
        if (!controller.signal.aborted) {
          setCategories([]);
          setError(failure.message || "We couldn't load the categories. Please try again.");
        }
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [enabled, attempt]);

  return { categories, totalProducts, loading, error, retry };
}
