import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Star } from "lucide-react";

import { getProductsApi } from "../../api/product.api";
import { getProductImageUrl, getFallbackProductImage } from "../../utils/productAdapter";
import { successToast } from "../../utils/toast";
import SectionHeader from "../common/SectionHeader";

/**
 * Top Products — the highest rated products straight from the catalogue.
 */
export default function TopProductsSection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await getProductsApi({ limit: 40, page: 1 });
        if (!isMounted) return;

        const list = Array.isArray(res.data?.data) ? res.data.data : [];

        const normalised = list
          .filter((p) => p && p.name)
          .map((p) => ({
            id: p._id || p.id,
            slug: p.slug || p._id,
            name: p.name,
            image: getProductImageUrl(p),
            price: Number(p.sellingPrice || p.discountPrice || p.price || 0),
            originalPrice: Number(p.price || 0),
            rating: Number(p.rating?.average) || 4.5,
            reviews: Number(p.rating?.totalReviews) || 0,
            code: p.offerCode || p.couponCode || "",
            tag: p.badges?.[0] || "",
            raw: p,
          }))
          .filter((p) => p.price > 0)
          .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
          .slice(0, 4);

        setProducts(normalised);
      } catch {
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator?.clipboard?.writeText(code);
    setCopiedCode(code);
    successToast(`Coupon code ${code} copied`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (!loading && products.length === 0) return null;

  return (
    <section className="w-full bg-white" aria-label="Top Products">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6 md:py-8">
        <SectionHeader
          title="Top Products"
          onViewAll={() => navigate("/gomzi-supplement")}
        />

        <div className="grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4 lg:gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-shimmer h-[430px] rounded-xl" />
              ))
            : products.map((product) => {
                const url = product.slug
                  ? `/product/${product.slug}`
                  : "/gomzi-supplement";
                const discount =
                  product.originalPrice > product.price
                    ? Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )
                    : null;

                return (
                  <article
                    key={product.id}
                    onClick={() => navigate(url)}
                    className="hk-card group flex cursor-pointer flex-col overflow-hidden"
                  >
                    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-bg-light p-3 sm:h-48">
                      {product.code ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCode(product.code);
                          }}
                          title={
                            copiedCode === product.code
                              ? "Copied"
                              : "Click to copy coupon code"
                          }
                          className="badge badge-brand absolute left-3 top-3 z-10 cursor-pointer"
                        >
                          {copiedCode === product.code ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            product.code
                          )}
                        </button>
                      ) : product.tag ? (
                        <span className="badge badge-brand absolute left-3 top-3 z-10">
                          {product.tag}
                        </span>
                      ) : null}

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackProductImage(product.raw);
                        }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex h-5 items-center gap-3">
                        {product.rating > 0 && (
                          <span className="rating-chip">
                            {product.rating.toFixed(1)}
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="#fff">
                              <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2z" />
                            </svg>
                          </span>
                        )}
                        {product.reviews > 0 && (
                          <span className="text-xs text-text-secondary">
                            ({product.reviews})
                          </span>
                        )}
                        <span className="veg-mark">
                          <span className="veg-mark-dot" />
                        </span>
                      </div>

                      <h3 className="mt-2 line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-text group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-text">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {discount && (
                          <>
                            <span className="text-sm text-text-muted line-through">
                              ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs font-semibold text-success">
                              {discount}% off
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-2 text-xs text-text-light">
                        ₹{Math.round(product.price * 0.97).toLocaleString("en-IN")}{" "}
                        for Premium Member
                      </p>

                      <div className="mt-auto space-y-2 pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(url);
                          }}
                          className="flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-sale bg-white text-sm font-semibold text-sale transition-colors hover:bg-sale-light"
                        >
                          <Star className="h-4 w-4" />
                          View Product
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(url);
                          }}
                          className="btn btn-dark h-10 w-full text-sm"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
        </div>
      </div>
    </section>
  );
}
