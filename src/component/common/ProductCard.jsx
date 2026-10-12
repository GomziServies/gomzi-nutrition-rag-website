// ─────────────────────────────────────────────
//  Reusable ProductCard Component
//  Usage: import ProductCard from "@/components/ProductCard";
// ─────────────────────────────────────────────
import { Link, useNavigate } from "react-router-dom";

// Star Rating Component
function StarRating({ stars, total = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(total)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            i < stars ? "text-yellow-400" : "text-gray-200"
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
  const productUrl = `/product/${product.slug}`;

  const discountPct =
    product.discountPrice && product.price
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* ── Image Container ── */}
      <div
        className="relative bg-[#F5F5F5] overflow-hidden cursor-pointer"
        onClick={() => navigate(productUrl)}
      >
        {discountPct > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-white text-text text-xs font-bold font-modelica px-2.5 py-1 rounded-full shadow-sm">
            -{discountPct}%
          </div>
        )}

        <img
          src={
            product?.displayImages?.[0]
              ? `https://files.fggroup.in/${product.displayImages[0]}`
              : "/images/product-placeholder.webp"
          }
          alt={product?.name || "Product"}
          className="w-full h-55 sm:h-60 md:h-64 lg:h-60 xl:h-80 object-cover group-hover:scale-[1.04] transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
      </div>

      {/* ── Card Content ── */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col gap-1.5 flex-1">
        {/* Category */}
        {product?.categories?.[0] && (
          <p className="text-[11px] sm:text-xs uppercase tracking-wide text-[var(--color-text-light,#8a8a8a)] font-modelica font-semibold">
            {product.categories[0]}
          </p>
        )}

        {/* Product Name */}
        <Link to={productUrl}>
          <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-text font-modelica leading-snug line-clamp-2 hover:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>

        {/* Stars + Reviews */}
        <div className="flex items-center gap-1.5">
          <StarRating stars={product?.rating?.average || 5} />
          <span className="text-xs sm:text-sm text-gray-500 font-modelica">
            ({product?.rating?.totalReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-text font-modelica">
            ₹{product?.discountPrice?.toLocaleString?.("en-IN") || 0}
          </span>
          {product.price && discountPct > 0 && (
            <span className="text-xs sm:text-sm text-gray-400 line-through font-modelica">
              ₹{product?.price?.toLocaleString?.("en-IN") || 0}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="mt-3" onClick={() => navigate(productUrl)}>
          <span className="block w-full py-2.5 text-white bg-[#af5438] hover:bg-[#95442c] cursor-pointer font-bold font-modelica text-sm sm:text-base rounded-lg transition-colors duration-200 tracking-wide text-center">
            Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
}
