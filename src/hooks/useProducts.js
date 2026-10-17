import { useEffect, useState } from "react";
import { fetchProducts } from "../services/product.service";

const useProducts = ({
  page = 1,
  limit = 9,
  category = "",
  brand = "",
  company = "",
  search = "",
  sort = "",
  sortOrder = "",
  slug = "",
  id = "",
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
        brand,
        company,
        search,
        sort,
        sortOrder,
        slug,
        id,
      });

      if (result.success) {
        if (slug || id) {
          setProduct(result.data || null);
        } else {
          setProducts(result.data || []);
          setPagination(result.pagination || {});
        }
      }

      setLoading(false);
    };

    loadProducts();
  }, [page, limit, category, brand, company, sort, search, sortOrder, slug, id]);

  return {
    products,
    product,
    pagination,
    loading,
    hasProducts,
  };
};

export default useProducts;
