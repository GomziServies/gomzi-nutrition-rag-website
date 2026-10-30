export function getCartPricingLines(items) {
  return items.flatMap(item => item.combo_id && item.combo_components?.length
    ? item.combo_components.map(component => ({ product_id: component.product_id, quantity: item.quantity, unit_price: Number(component.unit_price) }))
    : [{ product_id: item.item_id, quantity: item.quantity, unit_price: Number(item.discountPrice ?? item.price ?? 0) }]);
}
