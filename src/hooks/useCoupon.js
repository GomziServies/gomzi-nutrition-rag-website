import { useEffect, useState } from "react";

const STORAGE_KEY = "checkout_coupon";

export default function useCoupon() {
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    try {
      const storedCoupon = localStorage.getItem(STORAGE_KEY);

      if (storedCoupon) {
        setCoupon(JSON.parse(storedCoupon));
      }
    } catch (error) {
      console.error("Failed to load coupon:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveCoupon = (couponData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(couponData));
      setCoupon(couponData);
    } catch (error) {
      console.error("Failed to save coupon:", error);
    }
  };

  const clearCoupon = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCoupon(null);
  };

  return {
    coupon,
    saveCoupon,
    clearCoupon,
  };
}
