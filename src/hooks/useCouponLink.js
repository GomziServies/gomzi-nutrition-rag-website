import { useEffect, useMemo, useState } from "react";
import { checkCouponCode } from "../api/product.api";

const STORAGE_KEY = "checkout_coupon";

/**
 * Handles a shared referral link such as /gomzi-supplement?coupon_code=ABC10.
 * Validates the code, remembers it so checkout applies it automatically, and exposes the
 * product ids the coupon is limited to (null when it applies to every product).
 */
export default function useCouponLink(couponCode) {
  const code = (couponCode || "").trim();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(Boolean(code));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) {
      setCoupon(null);
      setError("");
      setLoading(false);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    checkCouponCode({ coupon_code: code })
      .then((res) => {
        if (cancelled) return;
        const data = res?.data?.data || null;
        setCoupon(data);
        if (data) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch (storageError) {
            console.error("Failed to remember coupon:", storageError);
          }
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setCoupon(null);
        setError(err?.response?.data?.message || "This coupon link is not valid or has expired.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [code]);

  const applicableIds = useMemo(() => {
    if (!coupon) return null;
    const list = Array.isArray(coupon.applicable_products) ? coupon.applicable_products : [];
    if (coupon.scope !== "SPECIFIC_PRODUCTS" || list.length === 0) return null;
    return new Set(list.map((item) => String(item?._id || item)));
  }, [coupon]);

  return { code, coupon, loading, error, applicableIds };
}
