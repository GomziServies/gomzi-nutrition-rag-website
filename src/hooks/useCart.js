import { useEffect, useState } from "react";
import {
  getCart,
  removeCartItem,
  updateCartQuantity,
} from "../services/product.service";
import useAuth from "./useAuth";
import {
  getGuestCart,
  removeGuestCartItem,
  updateGuestCartQuantity,
  clearCart,
} from "../services/cartStorage.service";

const useCart = () => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      if (!isAuthenticated) {
        const guestItems = getGuestCart();

        const normalizedGuestItems = guestItems.map((cartItem) => {
          const details = cartItem.item_details || {};
          const variation = details.variation;

          return {
            _id: cartItem._id,
            item_id: cartItem.item_id,
            variation_id: variation?._id || null,
            quantity: cartItem.quantity || 1,
            name: details.name || "Product",
            variationName: variation?.name || null,
            flavour: variation?.flavour ?? details.flavour ?? null,
            price: variation?.price ?? details.price ?? 999,
            discountPrice:
              variation?.discountPrice ?? details.discountPrice ?? 999,
            image:
              variation?.displayImages?.[0] ??
              details.displayImages?.[0] ??
              "/images/product-placeholder.webp",
          };
        });

        setItems(normalizedGuestItems);
        setCartId(null);
        return;
      }
      const result = await getCart();

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
            discountPrice: variation
              ? variation.discountPrice
              : detail?.discountPrice,
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
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (cart_id, item_id) => {
    if (!isAuthenticated) {
      removeGuestCartItem(item_id);
      fetchCart();
      return;
    }
    await removeCartItem(cart_id, item_id);
    fetchCart();
  };

  const changeQuantity = async (item, delta) => {
    const newQuantity = Math.max(1, item.quantity + delta);

    if (!isAuthenticated) {
      updateGuestCartQuantity(item._id, newQuantity);
      fetchCart();
      return;
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
    }
  };

  useEffect(() => {
    fetchCart();

    const handleCartUpdated = () => {
      fetchCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleCartUpdated);
    };
  }, [isAuthenticated]);

  const clearAllCart = async () => {
    setItems([]);
    await clearCart();
    await fetchCart();
  };

  return {
    cartId,
    items,
    loading,
    fetchCart,
    deleteItem,
    changeQuantity,
    clearCart: clearAllCart,
  };
};

export default useCart;
