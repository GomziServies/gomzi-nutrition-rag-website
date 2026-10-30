import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export default function useGymAccessOffer(items) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  const payload = JSON.stringify({ products: items.filter(item => item.item_id).map(item => ({
    product_id: item.item_id,
    quantity: Number(item.quantity),
    ...(item.variation_id && { variation_id: item.variation_id }),
  })) });

  useEffect(() => {
    window.addEventListener("focus", retry);
    return () => window.removeEventListener("focus", retry);
  }, [retry]);

  useEffect(() => {
    const body = JSON.parse(payload);
    const controller = new AbortController();
    setOffer(null);
    setError("");
    if (!body.products.length) { setLoading(false); return; }
    setLoading(true);
    const timer = setTimeout(() => {
      api.post("/public/v1/gym-access-offer/quote", body, { signal: controller.signal })
        .then(response => { if (!controller.signal.aborted) setOffer(response.data.data || null); })
        .catch(() => { if (!controller.signal.aborted) setError("Gym access offer could not be checked."); })
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 150);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [payload, attempt]);

  return { offer, loading, error, onRetry: retry };
}
