import { markPurchasedApi } from "../api/cart.api";

// Keep the purchased cart out of future cart requests, including after a reload.
export async function clearPurchasedCart(cartId) {
  if (!cartId) throw new Error("The completed checkout has no cart ID.");
  await markPurchasedApi({ cart_id: cartId });
  localStorage.removeItem("guest_cart");
  localStorage.removeItem("checkout_coupon");
}
