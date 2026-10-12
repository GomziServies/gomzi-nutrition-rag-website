import { useEffect, useState } from "react";
import { fetchProducts } from "../services/product.service";

const useProducts = ({
  page = 1,
  limit = 9,
  category = "",
  search = "",
  sort = "",
  sortOrder = "",
  slug = "",
}) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const hasProducts = products.length > 0;
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      const result = await fetchProducts({
        page,
        limit,
        category,
        search,
        sort,
        sortOrder,
        slug,
      });
      console.log("Offer products result:", result);

      if (result.success) {
        if (slug) {
          setProduct(result.data || null);
        } else {
          setProducts(result.data || []);
          setPagination(result.pagination || {});
        }
      }

      setLoading(false);
    };

    loadProducts();
  }, [page, limit, category, sort, search, sortOrder, slug]);

  return {
    products,
    product,
    pagination,
    loading,
    hasProducts,
  };
};

export default useProducts;
