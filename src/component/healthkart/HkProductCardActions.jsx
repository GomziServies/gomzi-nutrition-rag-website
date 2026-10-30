import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Zap, Plus, Minus, Loader2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { addToCart } from "../../services/product.service";
import { changeCartProductQuantity } from "../../services/cartStorage.service";
import { successToast, errorToast } from "../../utils/toast";

export default function HkProductCardActions({ product, mobileStacked = false }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, changeQuantity, deleteItem, cartId } = useCart();
  const [busy, setBusy] = useState(false);
  const productId = product?._id;
  const item = items.find(entry => entry.item_id === productId && !entry.variation_id);
  const quantity = item?.quantity || 0;
  const hasPrice = Number(product?.discountPrice ?? product?.price ?? 0) > 0;
  const unavailable = !hasPrice || product?.isAvailable === false || product?.stock === 0;
  const unavailableLabel = hasPrice ? "Sold out" : "Unavailable";

  const update = async (delta) => {
    if (busy || (delta > 0 && unavailable)) return false;
    // Curated preview cards cannot be submitted as real catalog items.
    if (!/^[a-f0-9]{24}$/i.test(productId || "")) {
      errorToast("This preview isn't available to purchase. Please browse the live catalog.");
      return false;
    }
    if (delta > 0 && product.stock != null && quantity >= Number(product.stock)) {
      errorToast("You've reached the available stock for this product.");
      return false;
    }
    setBusy(true);
    try {
      if (!isAuthenticated) {
        changeCartProductQuantity(product, delta);
      } else if (item) {
        if (quantity + delta <= 0) { if (!await deleteItem(cartId, item._id)) throw new Error("Couldn’t remove this item. Please try again."); }
        else if (!await changeQuantity(item, delta)) throw new Error("Couldn't update your cart. Please try again.");
      } else if (delta > 0) {
        const result = await addToCart({ item_id: productId, item_type: "FG_MEAL_PRODUCT", quantity: 1 });
        if (!result.success) throw new Error(result.message || "Couldn't add this product.");
        window.dispatchEvent(new Event("cartUpdated"));
      }
      if (delta > 0 && quantity === 0) successToast("Added to your cart");
      return true;
    } catch (error) {
      errorToast(error.message || "Couldn't update your cart. Please try again.");
      return false;
    } finally {
      setBusy(false);
    }
  };

  const act = (callback) => async (event) => {
    event.stopPropagation();
    event.preventDefault();
    await callback();
  };
  const baseBtn = "h-8 sm:h-9 min-w-0 rounded-full font-bold text-[10px] min-[380px]:text-[11px] sm:text-xs leading-none whitespace-nowrap flex items-center justify-center gap-1 tracking-tight disabled:opacity-50 transition-colors cursor-pointer";
  const actionSize = mobileStacked ? "h-9 sm:h-9 min-w-0 rounded-full font-bold text-xs leading-none whitespace-nowrap flex items-center justify-center gap-1 tracking-tight disabled:opacity-50 transition-colors cursor-pointer" : baseBtn;
  const primary = `${actionSize} bg-primary px-1.5 min-[380px]:px-2 text-white hover:bg-hover`;
  const outline = `${actionSize} border border-primary px-1.5 min-[380px]:px-2 text-primary hover:bg-[#fcf2ee]`;

  return (
    <div className={`mt-2.5 sm:mt-3 grid items-center ${mobileStacked ? "grid-cols-1 sm:grid-cols-2 gap-2" : "grid-cols-2 gap-1 min-[380px]:gap-1.5 sm:gap-2"}`} onClick={event => event.stopPropagation()} aria-busy={busy}>
      {quantity > 0 ? (
        <div className={`${primary} justify-between px-1`}>
          <button type="button" disabled={busy} aria-label={`Remove one ${product.name}`} onClick={act(() => update(-1))} className={`${mobileStacked ? "flex-1 min-w-0 sm:flex-none sm:w-6" : "w-5 sm:w-6"} h-full shrink-0 flex items-center justify-center hover:opacity-80`}><Minus size={11} /></button>
          <span className="shrink-0 font-black text-xs" aria-live="polite">{busy ? <Loader2 size={11} className="animate-spin" /> : quantity}</span>
          <button type="button" disabled={busy || unavailable} aria-label={`Add one ${product.name}`} onClick={act(() => update(1))} className={`${mobileStacked ? "flex-1 min-w-0 sm:flex-none sm:w-6" : "w-5 sm:w-6"} h-full shrink-0 flex items-center justify-center hover:opacity-80`}><Plus size={11} /></button>
        </div>
      ) : (
        <button type="button" disabled={busy || unavailable} onClick={act(() => update(1))} className={primary}>
          {busy ? <Loader2 size={11} className="animate-spin shrink-0" /> : unavailable ? null : <ShoppingCart size={11} className="shrink-0" />}
          <span className={mobileStacked ? "text-xs" : undefined}>{unavailable ? unavailableLabel : mobileStacked ? "Add to cart" : "Add"}</span>
        </button>
      )}
      <button type="button" disabled={busy || unavailable} onClick={act(async () => {
        if (quantity > 0 || await update(1)) navigate("/cart");
      })} className={outline}>
        <Zap size={11} className="shrink-0 text-primary" />
        <span className={mobileStacked ? "text-xs" : undefined}>Buy<span className={mobileStacked ? "" : "hidden min-[460px]:inline"}> now</span></span>
      </button>
    </div>
  );
}
