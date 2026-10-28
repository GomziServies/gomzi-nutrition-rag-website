// src/component/common/ProductCard.jsx
// Reusable, modern HealthKart-style product card with dynamic cart stepper and Buy Now outline button.

import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { getProductImageUrl, getProductBrand } from "../../data/homeProducts";
import HkProductCardActions from "../healthkart/HkProductCardActions";

export default function ProductCard({ product }) {
  if (!product) return null;

  const productUrl = `/product/${product.slug || product._id}`;
  const price = Number(product.price ?? product.discountPrice ?? 0);
  const discountPrice = Number(product.discountPrice ?? product.price ?? 0);
  const discountPct =
    price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;
  const imgUrl = getProductImageUrl(product.displayImages);
  const brand = getProductBrand(product);
  const ratingAvg = product.rating?.average ?? 0;
  const reviewsCount = product.rating?.totalReviews ?? 0;

  return (
    <article className="group bg-white rounded-2xl border border-border hover:border-primary hover:shadow-[0_8px_24px_rgba(149,68,44,0.12)] transition-all duration-300 flex flex-col w-full overflow-hidden relative">
      {/* Discount Badge top-left */}
      {discountPct > 0 && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-primary text-white text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            -{discountPct}% OFF
          </span>
        </div>
      )}

      {/* Standardized Aspect-Square Image Box */}
      <Link to={productUrl} aria-label={`View ${product.name}`} className="w-full aspect-square bg-[#faf7f4] relative flex items-center justify-center overflow-hidden shrink-0 p-3 sm:p-4 focus-visible:outline-offset-[-3px]">
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
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Rating Pill - Fixed Height */}
          <div className="h-5 flex items-center gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold px-1.5 py-0.5 rounded">
              <span>{reviewsCount ? ratingAvg : "New"}</span>
              <Star size={11} className="fill-amber-500 text-amber-500" />
            </span>
            <span className="text-[11px] text-stone-400 font-medium">
              {reviewsCount ? `(${reviewsCount.toLocaleString("en-IN")})` : "No reviews yet"}
            </span>
          </div>

          {/* Title - Fixed 2-Line Box */}
          <Link
            to={productUrl}
            className="block"
          >
            <h3 className="h-10 sm:h-11 text-xs sm:text-sm font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Brand & Flavour / Category - Fixed Height */}
          <p className="h-4 text-[11px] text-stone-500 mt-1 truncate">
            <span className="font-bold text-stone-700">{brand}</span>
            {product.flavour
              ? ` • ${product.flavour}`
              : ` • ${product.categories?.[0] || "100% Genuine"}`}
          </p>
        </div>

        {/* Pricing & Add to Cart Section */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col justify-end">
          <div className="h-6 flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-text">
              ₹{discountPrice.toLocaleString("en-IN")}
            </span>
            {price > discountPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₹{price.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Reserved Height for Savings */}
          <div className="h-4 flex items-center">
            {price > discountPrice ? (
              <p className="text-[11px] font-bold text-primary">
                Save ₹{(price - discountPrice).toLocaleString("en-IN")}
              </p>
            ) : (
              <p className="text-[11px] font-medium text-emerald-600">
                Guaranteed Best Price
              </p>
            )}
          </div>

          {/* Dual Action Buttons: [ Add / Stepper ] + [ Buy Now (brown border, transparent bg) ] */}
          <HkProductCardActions product={product} />
        </div>
      </div>
    </article>
  );
}
