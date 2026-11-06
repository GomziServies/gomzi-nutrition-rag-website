import assert from "node:assert/strict";
import { realpathSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), "..")).replace(/^d:/i, "D:");
const server = await createServer({ root, configFile: false, cacheDir: resolve(root, ".test-cache"), server: { middlewareMode: true, hmr: false }, appType: "custom", optimizeDeps: { noDiscovery: true } });
try {
  const { renderBanner } = await server.ssrLoadModule("/tests/offer-combo-render.jsx");
  const { normalizeAdBanners } = await server.ssrLoadModule("/src/services/banner.service.js");
  for (const url of ["/gym-offers", "/deals", "/product/whey-protein", "/gomzi-supplement?search=creatine", "https://example.com/particular-offer"]) {
    const [banner] = normalizeAdBanners({ banners: [{ _id: "offer", title: "Offer", image: "/offer.webp", url }] });
    assert.ok(renderBanner(banner).includes(`href="${url}"`));
  }
  console.log("Offer banners render working links to their own configured destinations.");

  const { normalizeComboStacks } = await server.ssrLoadModule("/src/services/comboStack.service.js");
  const [combo] = normalizeComboStacks({ comboStacks: [{ _id: "111111111111111111111111", name: "Bundle", comboPrice: 4699, products: [{ product: { _id: "222222222222222222222222", name: "Whey", price: 6099, discountPrice: 6000, displayImages: [] } }] }] });
  assert.equal(combo.isSavedCombo, true);
  const storage = new Map();
  globalThis.localStorage = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) };
  globalThis.window = { dispatchEvent() {} };
  const { addGuestCartItem, getGuestCart, updateGuestCartQuantity } = await server.ssrLoadModule("/src/services/cartStorage.service.js");
  const product = { _id: combo.id, name: combo.name, price: 6099, discountPrice: combo.comboPrice, displayImages: [] };
  addGuestCartItem({ product, notes: { combo_id: combo.id } });
  let [item] = getGuestCart();
  assert.equal(item.item_details.discountPrice * item.quantity, 4699);
  assert.equal(item.notes.combo_id, combo.id);
  addGuestCartItem({ product, notes: { combo_id: combo.id } });
  [item] = getGuestCart();
  assert.equal(item.quantity, 2);
  assert.equal(item.item_details.discountPrice * item.quantity, 9398);
  updateGuestCartQuantity(item._id, 3);
  [item] = getGuestCart();
  assert.equal(item.item_details.discountPrice * item.quantity, 14097);
  console.log("Guest combos retain their advertised price and combo identity across reloads and quantity changes.");

  const { getCartPricingLines } = await server.ssrLoadModule("/src/services/cartPricing.service.js");
  const lines = getCartPricingLines([{ item_id: combo.id, combo_id: combo.id, quantity: 2, combo_components: [{ product_id: "whey", unit_price: 4000 }, { product_id: "creatine", unit_price: 699 }] }]);
  assert.equal(lines.reduce((sum, line) => sum + line.unit_price * line.quantity, 0), 9398);
  assert.equal(lines.filter(line => line.product_id === "creatine").reduce((sum, line) => sum + line.unit_price * line.quantity, 0), 1398);
  console.log("Product-specific coupons use component prices without changing the combo subtotal.");
} finally {
  delete globalThis.localStorage;
  delete globalThis.window;
  await server.close();
}
