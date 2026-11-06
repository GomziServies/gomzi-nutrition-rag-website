// src/component/common/ProductCard.jsx
// Reusable, modern HealthKart-style product card with standardized heights, clean pricing, and dynamic cart actions.

import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { getProductImageUrl, getProductBrand } from "../../data/homeProducts";
import HkProductCardActions from "../healthkart/HkProductCardActions";

/**
 * Normalizes any spec property (flavour, weight, packageWeight, category)
 * to a clean, safe, human-readable string.
 * Prevents [object Object] and parses Mongoose objects like { amount: 2, unit: 'kg' }.
 */
export const formatSpecString = (val) => {
  if (!val) return "";
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "[object Object]" || trimmed === "undefined" || trimmed === "null") {
      return "";
    }
    return trimmed;
  }
  if (typeof val === "number") {
    return String(val);
  }
  if (typeof val === "object") {
    if (Array.isArray(val)) {
      return val.map(formatSpecString).filter(Boolean).join(", ");
    }
    // Mongoose weight schema: { amount: 2, unit: "kg" } or { value: 250, unit: "g" }
    if (val.amount !== undefined && val.unit) {
      return `${val.amount} ${val.unit}`.trim();
    }
    if (val.value !== undefined && val.unit) {
      return `${val.value} ${val.unit}`.trim();
    }
    if (val.amount !== undefined) {
      return String(val.amount).trim();
    }
    if (val.value !== undefined) {
      return String(val.value).trim();
    }
    if (typeof val.name === "string" && val.name.trim()) {
      return val.name.trim();
    }
    if (typeof val.label === "string" && val.label.trim()) {
      return val.label.trim();
    }
    if (typeof val.title === "string" && val.title.trim()) {
      return val.title.trim();
    }
    return "";
  }
  return "";
};

export default function ProductCard({ product }) {
  if (!product) return null;

  const productUrl = `/product/${product.slug || product._id}`;
  const price = Math.round(Number(product.price ?? product.discountPrice ?? 0));
  const discountPrice = Math.round(Number(product.discountPrice ?? product.price ?? 0));
  const discountPct =
    price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;
  const imgUrl = getProductImageUrl(product.displayImages);
  const brand = getProductBrand(product);
  const flavour = formatSpecString(product.flavour);
  const weight = formatSpecString(
    product.weight || product.packageWeight || product.size || product.netQuantity
  );

  // Build clean, deduplicated specs
  const extraSpecs = [];
  if (flavour && flavour.toLowerCase() !== brand.toLowerCase()) {
    extraSpecs.push(flavour);
  }
  if (
    weight &&
    weight.toLowerCase() !== brand.toLowerCase() &&
    !extraSpecs.some((s) => s.toLowerCase() === weight.toLowerCase())
  ) {
    extraSpecs.push(weight);
  }

  // Fallback to category if no flavour or weight
  if (extraSpecs.length === 0 && Array.isArray(product.categories) && product.categories.length > 0) {
    const cat = formatSpecString(product.categories[0]);
    if (cat && cat.toLowerCase() !== brand.toLowerCase()) {
      extraSpecs.push(cat);
    }
  }

  if (extraSpecs.length === 0) {
    extraSpecs.push("100% Authentic");
  }

  const specsText = [brand, ...extraSpecs].join(" • ");
  const ratingAvg = product.rating?.average ?? 0;
  const reviewsCount = product.rating?.totalReviews ?? 0;

  const handleCardClick = () => {
    if (typeof window === "undefined") return;
    try {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      sessionStorage.setItem("homepage_last_scroll", String(y));
      sessionStorage.setItem("last_clicked_product_slug", String(product.slug || ""));
      sessionStorage.setItem("last_clicked_product_id", String(product._id || ""));
      sessionStorage.setItem("navigated_from_home_to_product", "true");
      sessionStorage.setItem(`scroll_pos_${window.location.pathname}`, String(y));
      sessionStorage.setItem("last_browse_path", window.location.pathname);
    } catch {
      // ignore
    }
  };

  return (
    <article
      id={`product-card-${product._id || product.slug}`}
      data-product-id={product._id}
      data-product-slug={product.slug}
      className="group bg-white rounded-2xl border border-border hover:border-primary hover:shadow-[0_8px_24px_rgba(149,68,44,0.12)] transition-all duration-300 flex flex-col h-full min-w-0 w-full overflow-hidden relative"
    >
      {/* Discount Badge top-left */}
      {discountPct > 0 && (
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 pointer-events-none">
          <span className="bg-primary text-white text-[9px] sm:text-[11px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded shadow-xs">
            -{discountPct}% OFF
          </span>
        </div>
      )}

      {/* Standardized Aspect-Square Image Box - Centered & Balanced Spacing */}
      <Link
        to={productUrl}
        aria-label={`View ${product.name}`}
        title={product.name}
        onClick={handleCardClick}
        className="w-full aspect-square bg-[#faf7f4] relative flex items-center justify-center overflow-hidden shrink-0 p-2 sm:p-3 focus-visible:outline-offset-[-3px]"
      >
        <img
          src={imgUrl}
          alt={product.name || "Gomzi Product"}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.06)]"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
      </Link>

      {/* Content Section with Standardized Structured Heights */}
      <div className="p-2 sm:p-4 min-w-0 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Rating Pill - Fixed Height: Hides ratings when 0 reviews, shows authentic badge */}
          {reviewsCount > 0 && ratingAvg > 0 ? (
            <div className="min-h-5 min-w-0 flex items-center gap-1 mb-1">
              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded">
                <span>{ratingAvg}</span>
                <Star size={10} className="fill-amber-500 text-amber-500 shrink-0" />
              </span>
              <span className="min-w-0 truncate text-[9px] sm:text-[11px] text-stone-400 font-medium">
                ({reviewsCount.toLocaleString("en-IN")})
              </span>
            </div>
          ) : (
            <div className="min-h-5 min-w-0 flex items-center gap-1 mb-1">
              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[10px] sm:text-[11px] font-semibold px-1.5 py-0.5 rounded">
                100% Authentic
              </span>
            </div>
          )}

          {/* Title - Fixed 2-Line Box with Clean Ellipsis (...) after line 2 and ZERO 3rd line leak */}
          <Link
            to={productUrl}
            className="block"
            title={product.name}
            onClick={handleCardClick}
          >
            <h3
              className="text-xs sm:text-sm font-bold text-text group-hover:text-primary transition-colors leading-[1.35] line-clamp-2 overflow-hidden text-ellipsis break-words"
              title={product.name}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
                lineHeight: "1.35",
                height: "2.7em",
                maxHeight: "2.7em",
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Brand, Flavour & Weight - Clean Subtitle without [object Object] */}
          <p className="h-4 text-[10px] sm:text-[11px] text-stone-500 mt-1 truncate" title={specsText}>
            <span className="font-bold text-stone-700">{brand}</span>
            <span> • {extraSpecs.join(" • ")}</span>
          </p>
        </div>

        {/* Pricing & Add to Cart Section */}
        <div className="mt-2 sm:mt-3 pt-2 border-t border-stone-100 flex flex-col justify-end">
          <div className="min-h-5 sm:min-h-6 flex flex-wrap items-baseline content-start gap-x-1.5 gap-y-0.5">
            <span className="whitespace-nowrap text-xs min-[380px]:text-sm sm:text-lg font-black text-text">
              ₹{discountPrice.toLocaleString("en-IN")}
            </span>
            {price > discountPrice && (
              <span className="whitespace-nowrap text-[9px] sm:text-xs text-stone-400 line-through">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Reserved Height for Savings */}
          <div className="min-h-4 flex items-center">
            {price > discountPrice ? (
              <p className="text-[10px] sm:text-[11px] font-bold text-primary truncate">
                Save ₹{(price - discountPrice).toLocaleString("en-IN")}
              </p>
            ) : (
              <p className="text-[9px] sm:text-[11px] leading-snug font-medium text-emerald-600 truncate">
                Guaranteed Best Price
              </p>
            )}
          </div>

          {/* Dual Action Buttons: [ Add / Stepper ] + [ Buy Now ] */}
          <HkProductCardActions product={product} mobileStacked />
        </div>
      </div>
    </article>
  );
}
