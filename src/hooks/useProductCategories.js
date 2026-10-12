import { useState, useEffect } from "react";
import { fetchProductCategories } from "../services/product.service";

const useProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    setLoading(true);

    try {
      const result = await fetchProductCategories();

      if (result.success) {
        // New API response:
        // {
        //   categories: [...],
        //   totalProducts: 9
        // }

        setCategories(result.data?.categories || []);
        setTotalProducts(result.data?.totalProducts || 0);
      } else {
        setCategories([]);
        setTotalProducts(0);
      }
    } catch (error) {
      console.error("Failed to fetch product categories:", error);

      setCategories([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
    totalProducts,
    loading,
    refreshCategories: getCategories,
  };
};

export default useProductCategories;
