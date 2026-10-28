import { addToCart } from "../services/product.service";
import { getGuestCart, saveGuestCart } from "../services/cartStorage.service";

let inFlight = null;

export const syncGuestCart = () => {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    const snapshot = getGuestCart();
    if (!snapshot.length) return;
    const results = await Promise.all(snapshot.map(async item => {
      try {
        const result = await addToCart({ item_id: item.item_id, item_type: item.item_type, quantity: item.quantity, notes: item.notes || {} });
        return { id: item._id, success: result.success };
      } catch {
        return { id: item._id, success: false };
      }
    }));
    const synced = new Set(results.filter(result => result.success).map(result => result.id));
    // Preserve failures and anything added while the sync was in progress.
    saveGuestCart(getGuestCart().filter(item => !synced.has(item._id)));
  })().finally(() => { inFlight = null; });
  return inFlight;
};
