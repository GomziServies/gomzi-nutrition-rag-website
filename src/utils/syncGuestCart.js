import {
  generateUUID,
  getGuestCart,
  saveGuestCart,
} from "../services/cartStorage.service";
import { addToCart } from "../services/product.service";
import { getToken } from "./storage";

let inFlight = null;
let syncingToken = null;

export const syncGuestCart = () => {
  const token = getToken();
  if (!token) return Promise.resolve();
  if (inFlight)
    return syncingToken === token
      ? inFlight
      : inFlight.then(syncGuestCart, syncGuestCart);
  syncingToken = token;
  inFlight = (async () => {
    const snapshot = getGuestCart();
    if (!snapshot.length) return;
    const results = [];
    // The API creates an active cart on first add; serialize to avoid split carts.
    for (const item of snapshot) {
      if (getToken() !== token) break;
      try {
        const result = await addToCart({
          item_id: item.item_id,
          item_type: item.item_type,
          quantity: item.quantity,
          notes: item.notes || {},
          merge_key: item._id,
        });
        results.push({ id: item._id, success: result.success });
      } catch {
        results.push({ id: item._id, success: false });
      }
    }
    const synced = new Map(
      results
        .filter((result) => result.success)
        .map((result) => [
          result.id,
          snapshot.find((item) => item._id === result.id).quantity,
        ])
    );
    // Preserve failures and anything added while the sync was in progress.
    saveGuestCart(
      getGuestCart().flatMap((item) => {
        if (!synced.has(item._id)) return [item];
        const remaining = Number(item.quantity) - Number(synced.get(item._id));
        return remaining > 0
          ? [{ ...item, _id: generateUUID(), quantity: remaining }]
          : [];
      })
    );
  })().finally(() => {
    inFlight = null;
    syncingToken = null;
  });
  return inFlight;
};
