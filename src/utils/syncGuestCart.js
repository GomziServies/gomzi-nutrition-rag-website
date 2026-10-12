import { addToCart } from "../services/product.service";
import { getGuestCart } from "../services/cartStorage.service";

export const syncGuestCart = async () => {
  try {
    const guestCart = getGuestCart();

    if (!guestCart.length) return;

    const promises = guestCart.map(async (item) => {
      const payload = {
        item_id: item.item_id,
        item_type: item.item_type,
        quantity: item.quantity,
        notes: item.notes || {},
      };

      try {
        const result = await addToCart(payload);
        return { success: result.success, item };
      } catch (err) {
        return { success: false, item, error: err };
      }
    });

    const results = await Promise.all(promises);

    const failed = results.filter((r) => !r.success);

    if (failed.length) {
      console.error("Some items failed to sync:", failed);
    }

    // remove only after attempt
    localStorage.removeItem("guest_cart");
  } catch (error) {
    console.error("Guest cart sync failed:", error);
  }
};
