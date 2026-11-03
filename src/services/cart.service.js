const imageUrl = (images) =>
  Array.isArray(images)
    ? images[0]
    : typeof images === "string"
    ? images
    : null;

export function normalizeCartItems(carts) {
  return (carts || []).flatMap((cart) => {
    const details = (cart.items_details || []).filter(Boolean);
    return (cart.items || []).map((row) => {
      const variationId = row.notes?.variation_id;
      const detail =
        details.find(
          (item) =>
            String(item._id) === String(row.item_id) &&
            (!variationId ||
              String(item.variation?._id) === String(variationId))
        ) || details.find((item) => String(item._id) === String(row.item_id));
      const variation = detail?.variation;
      return {
        _id: row._id,
        cart_id: cart._id,
        item_id: row.item_id,
        combo_id: row.notes?.combo_id || null,
        combo_components: detail?.combo_components || [],
        variation_id: variationId || null,
        quantity: Number(row.quantity) || 1,
        name: detail?.name || "Product",
        variationName: variation?.name || null,
        flavour: variation?.flavour ?? detail?.flavour ?? null,
        price: Number(variation?.price ?? detail?.price ?? 0),
        discountPrice: Number(
          variation?.discountPrice ??
            detail?.discountPrice ??
            detail?.price ??
            0
        ),
        image:
          imageUrl(variation?.displayImages) ||
          imageUrl(detail?.displayImages) ||
          "/images/product-placeholder.webp",
      };
    });
  });
}
