import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  getCart,
  removeCartItem,
  updateCartQuantity,
} from "../services/product.service";
import useAuth from "../hooks/useAuth";
import { clearPurchasedCart } from "../services/checkoutCompletion.service";
import {
  getGuestCart,
  removeGuestCartItem,
  updateGuestCartQuantity,
} from "../services/cartStorage.service";

import useGymAccessOffer from "../hooks/useGymAccessOffer";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartId, setCartId] = useState("");

  const gymAccess = useGymAccessOffer(items);
  const requestId = useRef(0);
  const fetchCart = useCallback(async (showLoading = true) => {
    const request = ++requestId.current;
    try {
      if (showLoading) setLoading(true);
      setError("");

      if (!isAuthenticated) {
        const guestItems = getGuestCart();

        const normalizedGuestItems = (guestItems || [])
          .filter(Boolean)
          .map((cartItem) => {
            const details = cartItem.item_details || {};
            const variation = details.variation;

            return {
              _id: cartItem._id,
              item_id: cartItem.item_id,
              variation_id: variation?._id || cartItem.notes?.variation_id || null,
              quantity: Number(cartItem.quantity) || 1,
              name: details.name || "Product",
              variationName: variation?.name || null,
              flavour:
                variation?.flavour ?? details.flavour ?? null,
              price: Number(variation?.price ?? details.price ?? 0),
              discountPrice:
                Number(variation?.discountPrice ?? details.discountPrice ?? details.price ?? 0),
              image:
                variation?.displayImages?.[0] ??
                details.displayImages?.[0] ??
                (typeof details.displayImages === "string" ? details.displayImages : "/images/product-placeholder.webp"),
            };
          });

        setItems(normalizedGuestItems);
        setCartId(null);
        return;
      }

      const result = await getCart();

      if (request !== requestId.current) return;
      if (!result.success) throw new Error(result.message || "Could not load your cart.");

      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        const cart = result.data[0];
        const cart_id = cart._id;
        const detailsList = Array.isArray(cart.items_details) ? cart.items_details.filter(Boolean) : [];

        const normalizedItems = (cart.items || []).map((cartItem) => {
          const variationId = cartItem.notes?.variation_id;
          const detail = variationId
            ? detailsList.find((d) => String(d?.variation?._id) === String(variationId)) || detailsList.find((d) => String(d?._id) === String(cartItem.item_id))
            : detailsList.find((d) => String(d?._id) === String(cartItem.item_id));

          const variation = detail?.variation;
          return {
            _id: cartItem._id,
            item_id: cartItem.item_id,
            variation_id: variationId || null,
            quantity: Number(cartItem.quantity) || 1,
            // Product name always comes from parent
            name: detail?.name || "Product",
            // Variation information
            variationName: variation?.name || null,
            flavour: variation?.flavour ?? detail?.flavour ?? null,
            // Use variation values if variation exists
            price: Number(variation?.price ?? detail?.price ?? 0),
            discountPrice: Number(variation?.discountPrice ?? detail?.discountPrice ?? detail?.price ?? 0),
            image: variation
              ? variation.displayImages?.[0]
              : detail?.displayImages?.[0] ?? (typeof detail?.displayImages === "string" ? detail.displayImages : "/images/product-placeholder.webp"),
          };
        });

        setItems(normalizedItems);
        setCartId(cart_id);
      } else {
        setItems([]);
      }
    } catch (error) {
      if (request === requestId.current) {
        console.error("CartContext fetchCart error:", error);
        setError(error.message || "Could not load your cart. Please try again.");
      }
    } finally {
      if (request === requestId.current) setLoading(false);
    }
  }, [isAuthenticated]);

  const clearCart = useCallback(async (purchasedCartId = cartId) => {
    await clearPurchasedCart(purchasedCartId);
    // An older cart request must not restore the purchased items.
    requestId.current += 1;
    setItems([]);
    setCartId(null);
    setError("");
    setLoading(false);
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cartId]);

  const deleteItem = async (cart_id, item_id) => {
    if (!isAuthenticated) {
      removeGuestCartItem(item_id);
      fetchCart(false);
      return true;
    }
    const result = await removeCartItem(cart_id, item_id);
    if (result.success) await fetchCart(false);
    return result.success;
  };

  const changeQuantity = async (item, delta) => {
    const newQuantity = Math.max(1, item.quantity + delta);

    if (!isAuthenticated) {
      updateGuestCartQuantity(item._id, newQuantity);
      fetchCart(false);
      return true;
    }

    const result = await updateCartQuantity({
      item_id: item.item_id,
      quantity: newQuantity,
      variation_id: item.variation_id,
    });

    if (result.success) {
      setItems((prev) =>
        prev.map((i) =>
          i._id === item._id
            ? {
                ...i,
                quantity: newQuantity,
              }
            : i,
        ),
      );
      window.dispatchEvent(new Event("cartUpdated"));
    }
    return result.success;
  };

  useEffect(() => {
    const initialRequestId = requestId.current;
    fetchCart();
    const refresh = () => fetchCart(false);
    window.addEventListener("cartUpdated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      requestId.current = initialRequestId + 1;
      window.removeEventListener("cartUpdated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [fetchCart]);

  return <CartContext.Provider value={{
    cartId,
    error,
    items,
    loading,
    fetchCart,
    deleteItem,
    changeQuantity,
    clearCart,
    gymAccess,
  }}>{children}</CartContext.Provider>;
};
