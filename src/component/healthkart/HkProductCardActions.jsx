// src/component/healthkart/HkProductCardActions.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Plus, Minus, Check } from "lucide-react";
import {
  getCartQuantityByProductId,
  changeCartProductQuantity,
} from "../../services/cartStorage.service";
import { successToast, infoToast } from "../../utils/toast";

export default function HkProductCardActions({ product, compact = false }) {
  const navigate = useNavigate();
  const productId = product?._id || product?.id;
  const [qty, setQty] = useState(() => getCartQuantityByProductId(productId));
  const [animating, setAnimating] = useState(false);

  // Sync with global cart events
  useEffect(() => {
    const handleCartSync = () => {
      setQty(getCartQuantityByProductId(productId));
    };

    window.addEventListener("cartUpdated", handleCartSync);
    window.addEventListener("storage", handleCartSync);

    return () => {
      window.removeEventListener("cartUpdated", handleCartSync);
      window.removeEventListener("storage", handleCartSync);
    };
  }, [productId]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnimating(true);
    const newQty = changeCartProductQuantity(product, 1);
    setQty(newQty);
    successToast(`${(product?.name || "Product").slice(0, 24)}... added to cart!`);
    setTimeout(() => setAnimating(false), 300);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnimating(true);
    const newQty = changeCartProductQuantity(product, 1);
    setQty(newQty);
    setTimeout(() => setAnimating(false), 200);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnimating(true);
    const newQty = changeCartProductQuantity(product, -1);
    setQty(newQty);
    if (newQty === 0) {
      infoToast("Removed from cart");
    }
    setTimeout(() => setAnimating(false), 200);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (qty === 0) {
      changeCartProductQuantity(product, 1);
    }
    navigate("/checkouts");
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-1.5 sm:gap-2 select-none"
    >
      {/* ── Cart Action: Either "Add to Cart" or "[- Qty +] Stepper" ── */}
      {qty > 0 ? (
        <div
          className={`flex-1 h-9 sm:h-10 bg-[#95442c] text-white rounded-lg px-1.5 sm:px-2 flex items-center justify-between shadow-xs transition-transform duration-200 ${
            animating ? "scale-98" : "scale-100"
          }`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            title="Decrease quantity"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer active:scale-90 text-white"
          >
            <Minus size={13} className="stroke-[3]" />
          </button>

          <span className="text-xs sm:text-sm font-black font-mono text-white px-1">
            {qty}
          </span>

          <button
            type="button"
            onClick={handleIncrement}
            title="Increase quantity"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded hover:bg-black/20 flex items-center justify-center transition-colors cursor-pointer active:scale-90 text-white"
          >
            <Plus size={13} className="stroke-[3]" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 h-9 sm:h-10 bg-[#95442c] hover:bg-[#7a3522] text-white text-[11px] sm:text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs active:scale-98 cursor-pointer whitespace-nowrap"
        >
          <ShoppingCart size={13} />
          <span>Add</span>
        </button>
      )}

      {/* ── Buy Now Button with Brown Border, No Color Fill ── */}
      <button
        type="button"
        onClick={handleBuyNow}
        className="flex-1 h-9 sm:h-10 bg-transparent hover:bg-[#95442c] text-[#95442c] hover:text-white border border-[#95442c] sm:border-[1.5px] text-[11px] sm:text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-1 shadow-xs active:scale-98 cursor-pointer whitespace-nowrap group"
      >
        <Zap size={13} className="stroke-[2.5] text-[#95442c] group-hover:text-white transition-colors" />
        <span>Buy Now</span>
      </button>
    </div>
  );
}
