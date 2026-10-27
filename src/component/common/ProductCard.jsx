import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, ShieldCheck, Gift } from "lucide-react";
import {
  getProductImageUrl,
  getFallbackProductImage,
} from "../../utils/productAdapter";
import { addProductToCart, addGuestCartItem } from "../../services/cartStorage.service";
import { successToast, errorToast } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";

/**
 * HealthKart-identical Product Card.
 *
 * Layout:
 * - Top Row: Optional Badge (e.g. Trending Now, Trustified) + Wishlist Heart
 * - Centered Product Image
 * - Rating Pill (brand primary with star) + Indian Vegetarian indicator
 * - 2-line clamped bold product title
 * - Current Price (bold) + Strikethrough MRP
 * - Premium Member box (★ ₹... for Premium Member)
 * - Stacked CTA Buttons:
 *     1. Add to Cart (White, Navy Primary border, Navy Primary text)
 *     2. Buy Now (Solid Navy Primary, White text, directs to /checkouts)
 */
export default function ProductCard({
  product,
  onAddToCart,
  onBadgeClick,
  badge: badgeProp,
  badgeTone,
  className = "",
  variant = "vertical",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!product) return null;

  const id = product.id || product._id;
  const slug = product.slug || id;
  const url = slug ? `/product/${slug}` : "/gomzi-supplement";

  const price = Number(product.price ?? product.discountPrice) || 0;
  const mrp =
    Number(product.originalPrice) ||
    (price > 0 ? Math.round(price * 1.35) : 0);

  const premiumPrice =
    Number(product.premiumPrice) ||
    (price > 0 ? Math.round(price * 0.97) : 0);

  const discountPercent =
    mrp > price
      ? Math.round(((mrp - price) / mrp) * 100)
      : null;

  const rawRating = Number(product.rating?.average ?? product.rating);
  const rating =
    !isNaN(rawRating) && rawRating > 0 ? rawRating.toFixed(1) : "4.5";

  const badge =
    badgeProp ||
    product.badge ||
    product.tag ||
    (product.isTrending ? "Trending Now" : null);

  const handleCardClick = () => {
    navigate(url);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    if (next) {
      successToast("Added to wishlist!");
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const isUserLoggedIn =
      isAuthenticated || Boolean(localStorage.getItem("authorization"));
    if (!isUserLoggedIn) {
      addGuestCartItem({ product, quantity: 1 });
      navigate(
        `/login?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
      return;
    }
    setBusy(true);
    try {
      if (onAddToCart) {
        await onAddToCart(product);
      } else {
        await addProductToCart(product);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setBusy(false);
    }
  };

  const handleBuyNow = async (e) => {
    e.stopPropagation();
    const isUserLoggedIn =
      isAuthenticated || Boolean(localStorage.getItem("authorization"));
    if (!isUserLoggedIn) {
      addGuestCartItem({ product, quantity: 1 });
      navigate(
        `/login?redirect=${encodeURIComponent("/cart")}&from=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
      return;
    }
    setBusy(true);
    try {
      if (onAddToCart) {
        await onAddToCart(product);
      } else {
        await addProductToCart(product);
      }
      navigate(url);
    } finally {
      setBusy(false);
    }
  };

  const renderHorizontalCard = () => (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-gray-200/90 bg-white p-3 sm:p-4 shadow-xs transition-all duration-300 hover:border-primary/50 hover:shadow-md cursor-pointer ${className}`}
    >
      {/* Top: Left Image + Right Details */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Left: Square Product Image */}
        <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-xl bg-gray-50/80 p-2 overflow-hidden border border-gray-100">
          {getProductImageUrl(product) ? (
            <img
              src={getProductImageUrl(product)}
              alt={product.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-1 text-center text-[10px] font-medium text-gray-400">
              {product.name}
            </div>
          )}
          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-text-muted transition-colors hover:text-red-500 cursor-pointer shadow-2xs"
          >
            <Heart
              className={`h-3.5 w-3.5 transition-transform ${
                liked ? "fill-red-500 text-red-500 scale-110" : "text-text-muted"
              }`}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* Right: Info */}
        <div className="flex flex-1 min-w-0 flex-col justify-center">
          {/* Product Title */}
          <h3 className="line-clamp-2 text-xs sm:text-[13px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-base font-extrabold text-gray-900">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {mrp > price && (
              <span className="text-xs font-normal text-gray-400 line-through">
                ₹{mrp.toLocaleString("en-IN")}
              </span>
            )}
            {discountPercent && (
              <span className="text-xs font-bold text-emerald-600">
                {discountPercent}% off
              </span>
            )}
          </div>

          {/* Premium Member Price */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] sm:text-xs text-text bg-primary-light/70 border border-primary-border/70 rounded-md px-2 py-1">
            <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary bg-white text-[9px] font-black text-primary shadow-2xs">
              ★
            </span>
            <span className="truncate">
              <span className="font-bold text-primary">₹{premiumPrice.toLocaleString("en-IN")}</span>{" "}
              <span className="text-text-secondary font-normal">for Premium Member</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: Side-by-side CTA Buttons */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 grid grid-cols-2 gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={busy}
          className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-primary bg-white hover:bg-primary-light py-2 px-2 text-center text-xs sm:text-sm font-bold text-primary transition-colors active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-2xs"
        >
          <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
          <span className="truncate">{added ? "Added!" : busy ? "Adding..." : "Add to Cart"}</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={busy}
          className="flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover py-2 px-2 text-center text-xs sm:text-sm font-bold text-white transition-colors active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-xs"
        >
          <span className="truncate">Buy Now</span>
        </button>
      </div>
    </article>
  );

  const renderVerticalCard = () => (
    <article
      onClick={handleCardClick}
      className={`group relative flex h-full cursor-pointer flex-col justify-between rounded-xl sm:rounded-2xl border border-gray-200/90 bg-white p-3 sm:p-3.5 transition-all duration-300 hover:border-primary hover:shadow-lg ${className}`}
    >
      <div className="relative">
        {/* Top Header: Badge + Wishlist */}
        <div className="flex items-center justify-between min-h-[26px]">
          <div>
            {badgeTone === "success" ? (
              <span className="inline-flex items-center gap-1 rounded-sm bg-success px-2 py-0.5 text-[11px] font-bold text-white">
                <Gift className="h-3 w-3" />
                {badge}
              </span>
            ) : badge === "Trending Now" ? (
              <span className="inline-block rounded-sm bg-primary-light px-2 py-0.5 text-[11px] font-bold tracking-tight text-primary">
                Trending Now
              </span>
            ) : badge === "Trustified" ? (
              <span className="inline-flex items-center gap-1 rounded-sm border border-success/25 bg-success-light px-1.5 py-0.5 text-[10px] font-bold text-success">
                <ShieldCheck className="h-3 w-3 text-success" />
                Trustified
              </span>
            ) : badge ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBadgeClick?.();
                }}
                title={onBadgeClick ? "Click to copy coupon code" : undefined}
                className={`inline-block rounded-sm border border-primary-border bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary ${
                  onBadgeClick ? "cursor-pointer hover:border-primary" : ""
                }`}
              >
                {badge}
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={toggleWishlist}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:text-red-500 transition-colors cursor-pointer ml-auto"
          >
            <Heart
              className={`h-4.5 w-4.5 transition-transform ${
                liked ? "fill-red-500 text-red-500 scale-110" : "text-gray-400"
              }`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Product Image */}
        <div className="mx-auto my-1 flex h-40 sm:h-48 w-full items-center justify-center p-2 bg-white overflow-hidden">
          {getProductImageUrl(product) ? (
            <img
              src={getProductImageUrl(product)}
              alt={product.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50 p-2 text-center text-xs font-medium text-gray-400">
              {product.name}
            </div>
          )}
        </div>

        {/* Product Title */}
        <h3 className="mt-2 line-clamp-2 min-h-[36px] sm:min-h-[40px] text-xs sm:text-[13px] font-medium sm:font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary">
          {product.name}
        </h3>

        {/* Pricing Row */}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm sm:text-base font-extrabold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {mrp > price && (
            <span className="text-xs sm:text-sm font-normal text-gray-400 line-through">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
          )}
          {discountPercent && (
            <span className="text-xs font-bold text-emerald-600">
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* Premium Member Price */}
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md bg-primary-light/70 border border-primary-border/70 px-2.5 py-1.5 text-[11px] font-medium text-text">
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-primary bg-white text-[9px] font-black text-primary shadow-2xs">
            ★
          </span>
          <span className="truncate">
            <span className="font-bold text-primary">₹{premiumPrice.toLocaleString("en-IN")}</span>{" "}
            <span className="text-text-secondary font-normal">for Premium Member</span>
          </span>
        </div>
      </div>

      {/* Stacked CTA Buttons */}
      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={busy}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 border-primary bg-white py-2 text-xs sm:text-sm font-bold text-primary transition-colors hover:bg-primary-light active:scale-[0.99] disabled:opacity-60 shadow-2xs"
        >
          <ShoppingCart className="h-4 w-4 text-primary shrink-0" />
          <span>{added ? "Added!" : busy ? "Adding..." : "Add to Cart"}</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={busy}
          className="w-full cursor-pointer rounded-lg bg-primary hover:bg-primary-hover py-2 text-center text-xs sm:text-sm font-bold text-white shadow-xs transition-colors active:scale-[0.99] disabled:opacity-60"
        >
          Buy Now
        </button>
      </div>
    </article>
  );

  if (variant === "horizontal") {
    return renderHorizontalCard();
  }

  if (variant === "vertical") {
    return renderVerticalCard();
  }

  // Responsive mode: Horizontal (Image 2) on mobile, Vertical (Image 1) on desktop
  return (
    <>
      <div className="sm:hidden w-full">
        {renderHorizontalCard()}
      </div>
      <div className="hidden sm:block h-full">
        {renderVerticalCard()}
      </div>
    </>
  );
}
