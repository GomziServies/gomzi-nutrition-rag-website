import api from "./axios";

export const addToCartApi = (data) =>
  api.post("/user/v1/order-cart/add-item", data);

export const getCartApi = () => api.get("/user/v1/order-cart/get-carts");

export const removeCartItemApi = (data) =>
  api.delete("/user/v1/order-cart/remove-item", {
    data,
  });

export const markPurchasedApi = (data) =>
  api.patch("/user/v1/order-cart/mark-as-purchased", data);
