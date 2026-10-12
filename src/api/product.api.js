import api from "./axios";

export const getProductsApi = (params = {}) =>
  api.get("/public/v1/products", {
    params,
  });

export const checkCouponCode = (data) =>
  api.post("/public/v1/check-coupon-code", data);

export const likeProductApi = (data) =>
  api.post("/user/v1/product/feedback/like", data);

export const removeReviewApi = (data) =>
  api.post("/user/v1/product/feedback/remove", data);

export const getProductFeedbackApi = () =>
  api.get("/public/v1/feedback/products");

export const addToCartApi = (data) =>
  api.post("/user/v1/order-cart/add-item", data);

export const getCartApi = () =>
  api.get("/user/v1/order-cart/get-carts", {
    params: {
      item_type: "FG_MEAL_PRODUCT",
    },
  });

export const removeCartItemApi = (cart_id, item_id) =>
  api.delete("/user/v1/order-cart/remove-item", {
    params: {
      cart_id,
      item_id,
    },
  });

export const getProductCategoriesApi = () => {
  return api.get("/public/v1/product-categories");
};
