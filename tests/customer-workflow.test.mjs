import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { normalizeCartItems } from "../src/services/cart.service.js";

async function load(file, stubs = {}, globals = {}) {
  const context = vm.createContext({ console, ...globals });
  const source = await readFile(new URL(file, import.meta.url), "utf8");
  const module = new vm.SourceTextModule(source, { context });
  await module.link((name) => {
    const exports = stubs[name];
    if (!exports) throw new Error(`Unexpected import: ${name}`);
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await module.evaluate();
  return module.namespace;
}

test("all legacy active carts remain visible with their own cart and variation IDs", () => {
  const items = normalizeCartItems([
    { _id: "cart-a", items: [{ _id: "row-a", item_id: "product", quantity: 2, notes: { variation_id: "v-a" } }], items_details: [null, { _id: "product", name: "Whey", price: 100, variation: { _id: "v-a", name: "Chocolate", price: 50, discountPrice: 0, displayImages: "/chocolate.webp" } }] },
    { _id: "cart-b", items: [{ _id: "row-b", item_id: "product", quantity: 3, notes: { variation_id: "v-b" } }], items_details: [{ _id: "product", name: "Whey", variation: { _id: "v-b", price: 60 } }] },
  ]);
  assert.equal(items.length, 2);
  assert.deepEqual(items.map((item) => [item.cart_id, item.variation_id, item.quantity]), [["cart-a", "v-a", 2], ["cart-b", "v-b", 3]]);
  assert.equal(items[0].discountPrice, 0);
  assert.equal(items[0].image, "/chocolate.webp");
  assert.equal(items[1].image, "/images/product-placeholder.webp");
});

test("an auth response without a token cannot create a ghost session", async () => {
  const saved = new Map();
  const auth = await load("../src/utils/storage.js", {}, {
    localStorage: { setItem: (key, value) => saved.set(key, value), getItem: (key) => saved.get(key), removeItem: (key) => saved.delete(key) },
    window: { dispatchEvent() {} }, CustomEvent: class {},
  });
  assert.throws(() => auth.saveAuthSession(null, { first_name: "Ghost" }), /valid session/);
  assert.equal(saved.size, 0);
  auth.saveAuthSession("valid-token", { _id: "user", first_name: "Customer" });
  assert.equal(auth.getToken(), "valid-token");
  assert.equal(auth.getCachedUser().displayName, "Customer");
  auth.removeToken();
  assert.equal(saved.size, 0);
});

test("guest items sync sequentially, share one request and preserve failures and new additions", async () => {
  let cart = [{ _id: "a", item_id: "product-a", quantity: 1 }, { _id: "b", item_id: "product-b", quantity: 2 }];
  let finishFirst;
  const calls = [];
  const { syncGuestCart } = await load("../src/utils/syncGuestCart.js", {
    "./storage": { getToken: () => "session" },
    "../services/product.service": { addToCart: (data) => {
      calls.push(data.item_id);
      return data.item_id === "product-a" ? new Promise((resolve) => { finishFirst = resolve; }) : Promise.resolve({ success: false });
    } },
    "../services/cartStorage.service": { getGuestCart: () => cart, saveGuestCart: (next) => { cart = next; }, generateUUID: () => "remaining" },
  });
  const first = syncGuestCart();
  const second = syncGuestCart();
  assert.equal(first, second);
  assert.deepEqual(calls, ["product-a"]);
  cart = [...cart, { _id: "new", item_id: "new-product", quantity: 1 }];
  finishFirst({ success: true });
  await first;
  assert.deepEqual(calls, ["product-a", "product-b"]);
  assert.deepEqual(Array.from(cart, (item) => item._id), ["b", "new"]);
});

test("checkout SDK loads once, times out and supports retry", async () => {
  const scripts = [];
  let timeout;
  const window = {};
  const { loadRazorpay } = await load("../src/services/razorpayCheckout.js", {}, {
    window, document: { createElement: () => ({ remove() { this.removed = true; } }), body: { appendChild: (script) => scripts.push(script) } },
    setTimeout: (callback) => { timeout = callback; return 1; }, clearTimeout() {},
  });
  const first = loadRazorpay();
  assert.equal(first, loadRazorpay());
  assert.equal(scripts.length, 1);
  timeout();
  assert.equal(await first, false);
  assert.equal(scripts[0].removed, true);
  const retry = loadRazorpay();
  assert.equal(scripts.length, 2);
  window.Razorpay = function () {};
  scripts[1].onload();
  assert.equal(await retry, true);
});

test("completion clears every captured cart only after server acknowledgement", async () => {
  const marked = [];
  const removed = [];
  const { clearPurchasedCart } = await load("../src/services/checkoutCompletion.service.js", {
    "../api/cart.api": { markPurchasedApi: async ({ cart_id }) => marked.push(cart_id) },
  }, { localStorage: { removeItem: (key) => removed.push(key) } });
  await clearPurchasedCart(["cart-a", "cart-b"]);
  assert.deepEqual(marked, ["cart-a", "cart-b"]);
  assert.deepEqual(removed, ["guest_cart", "checkout_coupon"]);
});
