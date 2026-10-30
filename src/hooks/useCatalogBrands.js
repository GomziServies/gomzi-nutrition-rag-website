import { useEffect, useState } from "react";
import { getCompaniesApi } from "../api/company.api";
import { normalizeCatalogBrands } from "../utils/catalogFilters";

export default function useCatalogBrands() {
  const [brands, setBrands] = useState([]);
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    getCompaniesApi(controller.signal, { includeCounts: true })
      .then(response => {
        if (controller.signal.aborted) return;
        const companies = response.data?.data?.companies || [];
        setBrands(normalizeCatalogBrands(companies));
        setCounts(Object.fromEntries(companies.filter(company => company.name).map(company => [company.name.trim().toLowerCase(), company.productCount])));
        setTotal(response.data?.data?.totalProducts ?? null);
      })
      .catch(() => { if (!controller.signal.aborted) setError("Brands could not be loaded."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);
  return { brands, counts, total, loading, error, onRetry: () => setAttempt(value => value + 1) };
}
