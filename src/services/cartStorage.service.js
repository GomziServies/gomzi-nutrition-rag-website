import { addToCartApi, getCartApi, removeCartItemApi } from "../api/product.api";
import { successToast, errorToast } from "../utils/toast";
import { getToken } from "../utils/storage";

export const getGuestCart = () => {
  try {
    return JSON.parse(localStorage.getItem("guest_cart") || "[]");
  } catch {
    return [];
  }
};

export const saveGuestCart = (items) => {
  localStorage.setItem("guest_cart", JSON.stringify(items));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

export const addGuestCartItem = ({
  product,
  quantity = 1,
  selectedVariation,
}) => {
  const cart = getGuestCart();
  const rawProduct = product?.raw || product || {};
  const productId = rawProduct._id || product?._id || product?.id;
  const variationId = selectedVariation?._id || (rawProduct.variations?.[0]?._id) || null;

  const existingItem = cart.find(
    (item) =>
      item.item_id === productId &&
      (item.notes?.variation_id || null) === variationId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    saveGuestCart(cart);
    return cart;
  }

  const primaryImage =
    rawProduct.displayImages?.[0] ||
    rawProduct.display_image?.[0] ||
    product?.image ||
    (Array.isArray(product?.displayImages) ? product.displayImages[0] : null) ||
    "/images/product-placeholder.webp";

  const price = Number(product?.originalPrice || rawProduct.price || product?.price || 999);
  const discountPrice = Number(product?.price || rawProduct.sellingPrice || rawProduct.discountPrice || product?.discountPrice || price);

  cart.push({
    _id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    item_id: productId,
    item_type: "FG_MEAL_PRODUCT",
    quantity,
    notes: variationId
      ? {
          variation_id: variationId,
        }
      : {},
    item_details: {
      _id: productId,
      name: product?.name || rawProduct.name || "Product",
      price,
      discountPrice,
      flavour: product?.flavour || rawProduct.flavour || "Standard",
      displayImages: [primaryImage],
      variation: selectedVariation
        ? {
            _id: selectedVariation._id,
            name: selectedVariation.name,
            price: selectedVariation.price,
            discountPrice: selectedVariation.discountPrice,
            flavour: selectedVariation.flavour,
            displayImages: selectedVariation.displayImages || [primaryImage],
          }
        : null,
    },
  });

  saveGuestCart(cart);
  return cart;
};

export const addProductToCart = async (product, quantity = 1, selectedVariation = null) => {
  try {
    const token = getToken() || localStorage.getItem("authorization") || localStorage.getItem("auth_token") || localStorage.getItem("token");
    const rawProduct = product?.raw || product || {};
    const productId = rawProduct._id || product?._id || product?.id;
    const variationId = selectedVariation?._id || (rawProduct.variations?.[0]?._id) || null;
    const productName = product?.name || rawProduct?.name || "Product";

    if (token) {
      const payload = {
        item_id: productId,
        item_type: "FG_MEAL_PRODUCT",
        quantity,
        notes: variationId ? { variation_id: variationId } : {},
      };
      try {
        const response = await addToCartApi(payload);
        if (response && (response.status === 200 || response.status === 201 || response.data?.status === 200)) {
          successToast(`Added ${productName} to cart!`);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("cartUpdated"));
          }
          return true;
        }
      } catch (apiErr) {
        console.warn("API addToCart failed, saving to guest cart:", apiErr);
      }
    }

    addGuestCartItem({
      product,
      quantity,
      selectedVariation,
    });
    successToast(`Added ${productName} to cart!`);
    return true;
  } catch (err) {
    console.error("Failed to add to cart:", err);
    try {
      addGuestCartItem({ product, quantity, selectedVariation });
      const fallbackName = product?.name || "Product";
      successToast(`Added ${fallbackName} to cart!`);
      return true;
    } catch {
      errorToast("Failed to add to cart");
      return false;
    }
  }
};

export const removeGuestCartItem = (id) => {
  const items = getGuestCart().filter((item) => item._id !== id);
  saveGuestCart(items);
  return items;
};

export const updateGuestCartQuantity = (id, quantity) => {
  const items = getGuestCart().map((item) =>
    item._id === id
      ? {
          ...item,
          quantity,
        }
      : item,
  );
  saveGuestCart(items);
  return items;
};

export const clearCart = async () => {
  // 1. Immediately and synchronously wipe local guest cart and coupon
  try {
    localStorage.removeItem("guest_cart");
    localStorage.setItem("guest_cart", "[]");
    localStorage.removeItem("checkout_coupon");
  } catch (e) {
    console.error("Failed to clear local cart storage:", e);
  }

  // Synchronously dispatch cartUpdated so React state drops to 0 immediately
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("storage"));
  }

  // 2. Clear backend database cart for authenticated users
  try {
    const token =
      getToken() ||
      localStorage.getItem("authorization") ||
      localStorage.getItem("auth_token") ||
      localStorage.getItem("token");

    if (token) {
      const res = await getCartApi();
      const cartData = res?.data?.data;
      if (Array.isArray(cartData) && cartData.length > 0) {
        const cart = cartData[0];
        const cart_id = cart?._id;
        if (cart_id && Array.isArray(cart.items) && cart.items.length > 0) {
          await Promise.allSettled(
            cart.items.map(async (item) => {
              if (item._id) {
                await removeCartItemApi(cart_id, item._id);
              }
              if (item.item_id && item.item_id !== item._id) {
                await removeCartItemApi(cart_id, item.item_id);
              }
            })
          );
        }
      }
    }
  } catch (err) {
    console.warn("Backend cart clear warning:", err);
  }

  // Dispatch again after backend sync
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("storage"));
  }
};

