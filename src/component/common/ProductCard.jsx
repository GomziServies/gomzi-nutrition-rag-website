// src/component/common/ProductCard.jsx
// Reusable, modern HealthKart-style product card with dynamic cart stepper and Buy Now outline button.

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { getProductImageUrl, getProductBrand } from "../../data/homeProducts";
import HkProductCardActions from "../healthkart/HkProductCardActions";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  if (!product) return null;

  const productUrl = `/product/${product.slug || product._id}`;
  const price = product.price || product.discountPrice || 1999;
  const discountPrice = product.discountPrice || product.price || 1499;
  const discountPct =
    price > discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;
  const imgUrl = getProductImageUrl(product.displayImages);
  const brand = getProductBrand(product);
  const ratingAvg = product.rating?.average || 4.8;
  const reviewsCount = product.rating?.totalReviews || 120;

  return (
    <div
      onClick={() => navigate(productUrl)}
      className="group bg-white rounded-2xl border border-[#ebdcd2] hover:border-[#95442c] hover:shadow-[0_8px_24px_rgba(149,68,44,0.12)] transition-all duration-300 flex flex-col w-full overflow-hidden cursor-pointer relative"
    >
      {/* Discount Badge top-left */}
      {discountPct > 0 && (
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-[#95442c] text-white text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            -{discountPct}% OFF
          </span>
        </div>
      )}

      {/* Standardized Aspect-Square Image Box */}
      <div className="w-full aspect-square bg-[#faf7f4] relative flex items-center justify-center overflow-hidden shrink-0 p-3 sm:p-4">
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
      </div>

      {/* Content Section with Standardized Structured Heights */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Rating Pill - Fixed Height */}
          <div className="h-5 flex items-center gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold px-1.5 py-0.5 rounded">
              <span>{ratingAvg}</span>
              <Star size={11} className="fill-amber-500 text-amber-500" />
            </span>
            <span className="text-[11px] text-stone-400 font-medium">
              ({reviewsCount.toLocaleString("en-IN")})
            </span>
          </div>

          {/* Title - Fixed 2-Line Box */}
          <Link
            to={productUrl}
            onClick={(e) => e.stopPropagation()}
            className="block"
          >
            <h3 className="h-10 sm:h-11 text-xs sm:text-sm font-bold text-[#1c1917] group-hover:text-[#95442c] transition-colors line-clamp-2 leading-tight">
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
            <span className="text-base sm:text-lg font-black text-[#1c1917]">
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
              <p className="text-[11px] font-bold text-[#95442c]">
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
    </div>
  );
}
