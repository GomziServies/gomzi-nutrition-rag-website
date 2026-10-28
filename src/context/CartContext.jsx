import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  getCart,
  removeCartItem,
  updateCartQuantity,
} from "../services/product.service";
import useAuth from "../hooks/useAuth";
import {
  getGuestCart,
  removeGuestCartItem,
  updateGuestCartQuantity,
} from "../services/cartStorage.service";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartId, setCartId] = useState("");

  const requestId = useRef(0);
  const fetchCart = useCallback(async (showLoading = true) => {
    const request = ++requestId.current;
    try {
      if (showLoading) setLoading(true);
      setError("");
      if (!isAuthenticated) {
        const guestItems = getGuestCart();

        const normalizedGuestItems = guestItems.map((cartItem) => {
          const variation = cartItem.item_details.variation;

          return {
            _id: cartItem._id,
            item_id: cartItem.item_id,
            variation_id: variation?._id || null,
            quantity: cartItem.quantity,
            name: cartItem.item_details.name,
            variationName: variation?.name || null,
            flavour:
              variation?.flavour ?? cartItem.item_details.flavour ?? null,
            price: variation?.price ?? cartItem.item_details.price,
            discountPrice:
              variation?.discountPrice ?? cartItem.item_details.discountPrice ?? cartItem.item_details.price ?? 0,
            image:
              variation?.displayImages?.[0] ??
              cartItem.item_details.displayImages?.[0],
          };
        });

        setItems(normalizedGuestItems);
        setCartId(null);
        return;
      }
      const result = await getCart();

      if (request !== requestId.current) return;
      if (!result.success) throw new Error(result.message || "Could not load your cart.");
      if (result.success && result.data?.length) {
        const cart = result.data[0];
        const cart_id = cart._id;

        const normalizedItems = cart.items.map((cartItem) => {
          const variationId = cartItem.notes?.variation_id;
          const detail = variationId
            ? cart.items_details.find((d) => d.variation?._id === variationId)
            : cart.items_details.find((d) => d._id === cartItem.item_id);

          const variation = detail?.variation;
          return {
            _id: cartItem._id,
            item_id: cartItem.item_id,
            variation_id: variationId || null,
            quantity: cartItem.quantity,
            // Product name always comes from parent
            name: detail?.name || "Product",
            // Variation information
            variationName: variation?.name || null,
            flavour: variation?.flavour ?? detail?.flavour ?? null,
            // Use variation values if variation exists
            price: variation ? variation.price : detail?.price,
            discountPrice: variation?.discountPrice ?? detail?.discountPrice ?? detail?.price ?? 0,
            image: variation
              ? variation.displayImages?.[0]
              : detail?.displayImages?.[0],
          };
        });

        setItems(normalizedItems);
        setCartId(cart_id);
      } else {
        setItems([]);
      }
    } catch (error) {
      if (request === requestId.current) setError(error.message || "Could not load your cart. Please try again.");
    } finally {
      if (request === requestId.current) setLoading(false);
    }
  }, [isAuthenticated]);

  const deleteItem = async (cart_id, item_id) => {
    if (!isAuthenticated) {
      removeGuestCartItem(item_id);
      fetchCart();
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
      fetchCart();
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
  }}>{children}</CartContext.Provider>;
};
