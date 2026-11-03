import { markPurchasedApi } from "../api/cart.api";

// Keep the purchased cart out of future cart requests, including after a reload.
export async function clearPurchasedCart(cartId) {
  const ids = Array.isArray(cartId) ? cartId : cartId ? [cartId] : [];
  if (!ids.length || ids.some((id) => !id)) throw new Error("The completed checkout has no cart ID.");
  await Promise.all(ids.map((id) => markPurchasedApi({ cart_id: id })));
  localStorage.removeItem("guest_cart");
  localStorage.removeItem("checkout_coupon");
}
