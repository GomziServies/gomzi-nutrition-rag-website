// ─────────────────────────────────────────────
//  Reusable ProductCard Component (HealthKart Architecture)
//  Usage: import ProductCard from "@/components/ProductCard";
// ─────────────────────────────────────────────
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Heart, ShoppingCart, Star } from "lucide-react";
import { getProductImageUrl } from "../../utils/productAdapter";
import { addProductToCart } from "../../services/cartStorage.service";
import { successToast } from "../../utils/toast";

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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
      : product?.originalPrice || Math.round(displayPrice * 1.25)
  );
  const premiumMemberPrice = Math.round(displayPrice * 0.97);

  const r = Number(product?.rating?.average || product?.rating);
  const validRating = !isNaN(r) && r > 0 ? r.toFixed(1) : "4.4";

  const imageUrl = getProductImageUrl(product);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      const next = !prev;
      if (next) successToast("Added to wishlist!");
      return next;
    });
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAdding(true);
    try {
      if (onAddToCart) {
        await onAddToCart(product);
      } else {
        await addProductToCart(product);
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      await onAddToCart(product);
    } else {
      await addProductToCart(product);
    }
    navigate("/cart");
  };

  return (
    <div
      onClick={() => navigate(productUrl)}
      className="bg-white rounded-xl sm:rounded-2xl border border-[#dbdee9] hover:border-[#5C3124]/40 hover:shadow-xl transition-all duration-200 p-3.5 sm:p-4 flex flex-col justify-between h-full relative cursor-pointer group/card font-modelica"
    >
      {/* Top Row: Trustified Badge & Wishlist Heart */}
      <div className="flex items-center justify-between mb-2">
        <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
          <CheckCircle2 className="w-3 h-3 text-amber-600" />
          <span>Trustified</span>
        </div>

        <button
          type="button"
          onClick={toggleWishlist}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer ml-auto"
          aria-label="Save to Wishlist"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-150 ${
              isLiked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="h-44 sm:h-48 w-full flex items-center justify-center p-2 mb-3 bg-white">
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="max-h-full max-w-full object-contain group-hover/card:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/protein-removebg.png";
          }}
        />
      </div>

      {/* Rating Pill (Gomzi Signature Theme #5C3124 + Gold Star) */}
      <div className="flex items-center gap-1 bg-[#5C3124] text-white text-[11px] font-bold px-1.5 py-0.5 rounded w-fit mb-2 shadow-2xs">
        <span>{validRating}</span>
        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      </div>

      {/* Product Title (2-Line Clamp) */}
      <Link
        to={productUrl}
        onClick={(e) => e.stopPropagation()}
        className="block"
      >
        <h3 className="text-xs sm:text-[13px] font-bold text-[#1c1c28] group-hover/card:text-[#5C3124] transition-colors line-clamp-2 min-h-[38px] leading-snug mb-2">
          {product?.name}
        </h3>
      </Link>

      {/* Pricing */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-base sm:text-lg font-extrabold text-[#1c1c28]">
          ₹{displayPrice.toLocaleString("en-IN")}
        </span>
        {originalPrice > displayPrice && (
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      {/* Promotional Coupon Line (Gomzi Signature Theme) */}
      <p className="text-[11px] sm:text-xs font-bold text-[#5C3124] truncate mb-2.5">
        Extra 5% Off | Code: ZYMX
      </p>

      {/* Premium Member Price Box (Gomzi Brown Warm Palette) */}
      <div className="bg-[#fdf6f4] border border-[#ebdcd7] rounded-md px-2.5 py-1.5 flex items-center gap-1.5 mb-4 mt-auto">
        <div className="w-3.5 h-3.5 rounded-full bg-[#5C3124] text-amber-200 flex items-center justify-center text-[9px] font-bold flex-shrink-0">
          ★
        </div>
        <span className="text-[11px] sm:text-xs font-bold text-[#5C3124] truncate">
          ₹{premiumMemberPrice.toLocaleString("en-IN")}{" "}
          <span className="font-normal text-gray-600">
            for Premium Member
          </span>
        </span>
      </div>

      {/* Double Action CTA Buttons (Gomzi Signature Brown Theme) */}
      <div className="space-y-2 mt-auto">
        {/* Outline Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-2 px-3 border-2 border-[#5C3124] bg-white hover:bg-[#fdf6f4] text-[#5C3124] text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer active:scale-[0.98]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
        </button>

        {/* Solid Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white text-xs sm:text-sm font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border border-amber-400/25 shadow-md shadow-[#5C3124]/20 hover:shadow-lg hover:shadow-[#5C3124]/35 active:scale-[0.98]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
