export const getGuestCart = () => {
  return JSON.parse(localStorage.getItem("guest_cart") || "[]");
};

export const addGuestCartItem = ({
  product,
  quantity = 1,
  selectedVariation,
}) => {
  const cart = getGuestCart();

  const variationId = selectedVariation?._id || null;

  const existingItem = cart.find(
    (item) =>
      item.item_id === product._id &&
      (item.notes?.variation_id || null) === variationId,
  );

  if (existingItem) {
    existingItem.quantity += quantity;

    saveGuestCart(cart);

    return cart;
  }

  cart.push({
    _id: crypto.randomUUID(),

    item_id: product._id,

    item_type: "FG_MEAL_PRODUCT",

    quantity,

    notes: variationId
      ? {
          variation_id: variationId,
        }
      : {},

    item_details: {
      _id: product._id,
      name: product.name,
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
