import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

function storage() {
  const values = new Map([["guest_cart", "saved items"], ["checkout_coupon", "null"]]);
  return { getItem: key => values.get(key) ?? null, removeItem: key => values.delete(key) };
}

async function load(file, stubs, localStorage) {
  const context = vm.createContext({ localStorage, console });
  const source = await readFile(new URL(file, import.meta.url), "utf8");
  const module = new vm.SourceTextModule(source, { context });
  await module.link(name => {
    const exports = stubs[name];
    if (!exports) throw new Error(`Unexpected import: ${name}`);
    return new vm.SyntheticModule(Object.keys(exports), function () {
      for (const [key, value] of Object.entries(exports)) this.setExport(key, value);
    }, { context });
  });
  await module.evaluate();
  return module.namespace;
}

test("marks the original cart purchased before clearing saved cart and coupon", async () => {
  const localStorage = storage();
  let completeRequest;
  const requests = [];
  const { clearPurchasedCart } = await load("../src/services/checkoutCompletion.service.js", {
    "../api/cart.api": { markPurchasedApi: data => {
      requests.push(data.cart_id);
      return new Promise(resolve => { completeRequest = resolve; });
    } },
  }, localStorage);
  const completion = clearPurchasedCart("purchased-cart");
  assert.deepEqual(requests, ["purchased-cart"]);
  assert.equal(localStorage.getItem("guest_cart"), "saved items");
  completeRequest();
  await completion;
  assert.equal(localStorage.getItem("guest_cart"), null);
  assert.equal(localStorage.getItem("checkout_coupon"), null);
});

test("retains saved items when cart completion fails", async () => {
  const localStorage = storage();
  const { clearPurchasedCart } = await load("../src/services/checkoutCompletion.service.js", {
    "../api/cart.api": { markPurchasedApi: async () => { throw new Error("Offline"); } },
  }, localStorage);
  await assert.rejects(clearPurchasedCart("cart"), /Offline/);
  assert.equal(localStorage.getItem("guest_cart"), "saved items");
  assert.equal(localStorage.getItem("checkout_coupon"), "null");
});

test("does not call the API without a captured checkout cart ID", async () => {
  let calls = 0;
  const { clearPurchasedCart } = await load("../src/services/checkoutCompletion.service.js", {
    "../api/cart.api": { markPurchasedApi: async () => { calls++; } },
  }, storage());
  await assert.rejects(clearPurchasedCart(null), /no cart ID/);
  assert.equal(calls, 0);
});

async function checkout({ mode = "ONLINE", result = { success: true, data: { receipt_id: "receipt" } } } = {}) {
  const localStorage = storage();
  const items = [{ item_id: "product", quantity: 2, variation_id: "variation" }];
  let submitted;
  const { default: useCheckout } = await load("../src/hooks/useCheckout.js", {
    react: {
      useEffect() {},
      useState: initial => [typeof initial === "object" ? {
        ...initial, email: "test@example.com", first_name: "Test", last_name: "User", mobile: "9999999999",
        address_line_1: "Test address", city: "Surat", state: "Gujarat", pin_code: "395001", payment_mode: mode,
      } : initial, () => {}],
    },
    "./useAuth": { default: () => ({ user: {} }) },
    "./useCart": { default: () => ({ items, cartId: "original-cart" }) },
    "../services/order.service": { createOrder: async payload => { submitted = payload; return result; } },
    "../utils/toast": { successToast() {}, errorToast() {} },
  }, localStorage);
  return { result: await useCheckout().placeOrder(), submitted, localStorage, items };
}

test("opening online payment keeps the cart and coupon until payment succeeds", async () => {
  const { result, localStorage, items, submitted } = await checkout();
  assert.equal(result.cartId, "original-cart");
  assert.equal(submitted.payment_mode, "ONLINE");
  assert.equal(submitted.products[0].variation_id, "variation");
  assert.equal(items.length, 1);
  assert.equal(localStorage.getItem("guest_cart"), "saved items");
  assert.equal(localStorage.getItem("checkout_coupon"), "null");
});

test("successful COD checkout carries its cart ID to completion", async () => {
  const { result, submitted } = await checkout({ mode: "Cash On Delivery" });
  assert.equal(result.success, true);
  assert.equal(result.cartId, "original-cart");
  assert.equal(result.data.receipt_id, "receipt");
  assert.equal(submitted.payment_mode, "Cash On Delivery");
});

test("failed order creation leaves the cart and coupon saved", async () => {
  const { result, localStorage, items } = await checkout({ result: { success: false, message: "Order unavailable" } });
  assert.equal(result.success, false);
  assert.equal(items.length, 1);
  assert.equal(localStorage.getItem("guest_cart"), "saved items");
  assert.equal(localStorage.getItem("checkout_coupon"), "null");
});
