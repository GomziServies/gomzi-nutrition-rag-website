const generateUUID = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // fallback below
    }
  }
  return "cart_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 9);
};

export const getGuestCart = () => {
  try {
    const raw = localStorage.getItem("guest_cart");
    if (!raw) return [];
    const cart = JSON.parse(raw);
    if (!Array.isArray(cart)) return [];

    return cart
      .filter((item) => item?.item_id && Number(item.quantity) > 0)
      .map((item) => {
        if (!item.item_details) {
          item.item_details = {
            _id: item.item_id,
            name: item.name || "Product",
            price: item.price || 0,
            discountPrice: item.discountPrice || item.price || 0,
            flavour: item.flavour || null,
            displayImages: Array.isArray(item.displayImages)
              ? item.displayImages
              : item.image
                ? [item.image]
                : [],
            variation: item.notes?.variation_id
              ? {
                  _id: item.notes.variation_id,
                  name: item.variationName || null,
                  price: item.price || 0,
                  discountPrice: item.discountPrice || item.price || 0,
                  flavour: item.flavour || null,
                  displayImages: item.image ? [item.image] : [],
                }
              : null,
          };
        }
        return item;
      });
  } catch {
    return [];
  }
};

export const addGuestCartItem = ({
  product,
  quantity = 1,
  selectedVariation,
  notes = {},
}) => {
  const cart = getGuestCart();

  const variationId = selectedVariation?._id || null;

  const existingItem = cart.find(
    (item) =>
      item.item_id === product._id &&
      (item.notes?.combo_id || null) === (notes.combo_id || null) &&
      (item.notes?.variation_id || null) === variationId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;

    saveGuestCart(cart);

    return cart;
  }

  cart.push({
    _id: generateUUID(),

    item_id: product._id,

    item_type: "FG_MEAL_PRODUCT",

    quantity,

    notes: { ...notes, ...(variationId && { variation_id: variationId }) },

    item_details: {
      _id: product._id,
      name: product.name,
      company: product.company,
      price: product.price,
      discountPrice: product.discountPrice,
      flavour: product.flavour,
      displayImages: product.displayImages,

      variation: selectedVariation
        ? {
            _id: selectedVariation._id,
            name: selectedVariation.name,
            price: selectedVariation.price,
            discountPrice: selectedVariation.discountPrice,
            flavour: selectedVariation.flavour,
            displayImages: selectedVariation.displayImages,
          }
        : null,
    },
  });

  saveGuestCart(cart);

  return cart;
};

export const saveGuestCart = (items) => {
  localStorage.setItem("guest_cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
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

/**
 * Fast lookup helper for quantity of a product currently in the cart
 */
export const getCartQuantityByProductId = (productId) => {
  if (!productId) return 0;
  try {
    const cart = getGuestCart();
    const item = cart.find((i) => i.item_id === productId || i._id === productId);
    return item ? Number(item.quantity) || 1 : 0;
  } catch {
    return 0;
  }
};

/**
 * Increment or decrement product quantity directly with cartUpdated event dispatch
 */
export const changeCartProductQuantity = (product, delta = 1) => {
  if (!product) return 0;
  const productId = product._id || product.id;
  if (!productId) return 0;

  const cart = getGuestCart();
  const existing = cart.find(i => i.item_id === productId && !i.notes?.variation_id);

  if (!existing) {
    if (delta > 0) {
      addGuestCartItem({
        product: {
          _id: productId,
          name: product.name,
          price: product.price ?? product.discountPrice ?? 0,
          discountPrice: product.discountPrice ?? product.price ?? 0,
          flavour: product.flavour || "Standard",
          displayImages: Array.isArray(product.displayImages) ? product.displayImages : [product.displayImages || "/images/product-placeholder.webp"],
        },
        quantity: delta,
      });
      return delta;
    }
    return 0;
  }

  const newQty = (Number(existing.quantity) || 1) + delta;
  if (newQty <= 0) {
    removeGuestCartItem(existing._id);
    return 0;
  }

  updateGuestCartQuantity(existing._id, newQty);
  return newQty;
};

/**
 * Universal addProductToCart export required by homepage category showcase sections
 */
export const addProductToCart = async (product) => {
  return changeCartProductQuantity(product, 1);
};
