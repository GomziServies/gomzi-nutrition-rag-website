// ─────────────────────────────────────────────
//  Reusable ProductCard Component
//  Usage: import ProductCard from "@/components/ProductCard";
// ─────────────────────────────────────────────
import { Link, useNavigate } from "react-router-dom";
import { getProductImageUrl } from "../../utils/productAdapter";
import { addProductToCart } from "../../services/cartStorage.service";

// Star Rating Component
function StarRating({ stars, total = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(total)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${
            i < stars ? "text-[#f59e0b]" : "text-gray-200"
          } fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const productIdentifier = product?.slug || product?._id || product?.id;
  const productUrl = productIdentifier
    ? `/product/${productIdentifier}`
    : `/gomzi-supplement`;

  const displayPrice = Number(
    product?.sellingPrice || product?.discountPrice || product?.price || 999
  );
  const originalPrice = Number(
    product?.price && product.price > displayPrice
      ? product.price
      : product?.originalPrice || Math.round(displayPrice * 1.3)
  );

  const discountPct =
    originalPrice > displayPrice
      ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
      : 0;

  const imageUrl = getProductImageUrl(product);

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ebdcd7]/90 hover:border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col font-modelica">
      {/* Subtle moving card sheen sweep on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.035] to-transparent pointer-events-none z-20" />

      {/* ── Image Container ── */}
      <div
        className="relative bg-gradient-to-b from-[#faf8f6] to-white overflow-hidden cursor-pointer"
        onClick={() => navigate(productUrl)}
      >
        {discountPct > 0 && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-gradient-to-r from-[#5C3124] to-[#7d4332] text-white text-[10.5px] font-bold px-2 py-0.5 rounded-lg shadow-xs tracking-tight">
            {discountPct}% OFF
          </div>
        )}

        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="w-full h-52 sm:h-56 md:h-60 lg:h-56 xl:h-64 object-contain p-3 group-hover:scale-[1.04] transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
      </div>

      {/* ── Card Content ── */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        {/* Category */}
        {product?.categories?.[0] && (
          <p className="text-[11px] uppercase tracking-wider text-[#77777e] font-semibold">
            {product.categories[0]}
          </p>
        )}

        {/* Product Name */}
        <Link to={productUrl}>
          <h3 className="text-sm sm:text-base font-bold text-[#1c1c28] group-hover:text-[#5C3124] transition-colors leading-snug line-clamp-2 min-h-[42px]">
            {product.name}
          </h3>
        </Link>

        {/* Stars + Reviews */}
        <div className="flex items-center gap-1.5">
          <StarRating stars={product?.rating?.average || 5} />
          <span className="text-xs text-[#77777e]">
            ({product?.rating?.totalReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg sm:text-xl font-black text-[#1c1c28]">
            ₹{displayPrice.toLocaleString("en-IN")}
          </span>
          {discountPct > 0 && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {discountPct > 0 && (
            <span className="text-xs font-bold text-[#5C3124]">
              Save {discountPct}%
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Add to Cart Button */}
        <button
          type="button"
          className="mt-3 w-full bg-transparent border-none p-0 cursor-pointer"
          onClick={async (e) => {
            e.stopPropagation();
            if (onAddToCart) {
              await onAddToCart(product);
            } else {
              await addProductToCart(product);
            }
          }}
        >
          <span className="group/btn relative overflow-hidden w-full py-2.5 text-white bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 font-bold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 tracking-wide text-center flex items-center justify-center gap-2 shadow-md shadow-[#5C3124]/20 hover:shadow-lg hover:shadow-[#5C3124]/35 active:scale-[0.98]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-200 transition-transform duration-300 group-hover/btn:scale-110"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span>Add to Cart</span>
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          </span>
        </button>
      </div>
    </div>
  );
}
