import { addToCart } from "../services/product.service";
import { getGuestCart } from "../services/cartStorage.service";
import { successToast } from "./toast";

/**
 * Synchronizes pending guest cart items into the authenticated user's backend database cart.
 * Invoked immediately upon successful login/registration and on app authentication hydration.
 */
export const syncGuestCart = async () => {
  try {
    const guestCart = getGuestCart();

    if (!Array.isArray(guestCart) || guestCart.length === 0) return;

    const promises = guestCart.map(async (item) => {
      const payload = {
        item_id: item.item_id,
        item_type: item.item_type || "FG_MEAL_PRODUCT",
        quantity: item.quantity || 1,
        notes: item.notes || {},
      };

      try {
        const result = await addToCart(payload);
        return { success: result?.success, item };
      } catch (err) {
        return { success: false, item, error: err };
      }
    });

    const results = await Promise.all(promises);

    const successful = results.filter((r) => r.success);
    if (successful.length > 0) {
      const firstItemName = successful[0]?.item?.item_details?.name;
      if (firstItemName) {
        successToast(`${firstItemName} added to your cart!`);
      } else {
        successToast("Product added to your cart!");
      }
    }

    const failed = results.filter((r) => !r.success);
    if (failed.length > 0) {
      console.warn("Some guest items failed to sync to server cart:", failed);
    }

    // Clear guest cart once synced to prevent duplicate submissions
    localStorage.removeItem("guest_cart");

    // Trigger reactive cart listeners across the app
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("storage"));
    }
  } catch (error) {
    console.error("Guest cart sync failed:", error);
  }
};
