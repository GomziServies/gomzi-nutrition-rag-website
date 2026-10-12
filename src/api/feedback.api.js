import api from "./axios";

export const getProductFeedbackApi = (productId) =>
  api.get(`/public/v1/feedback/products?product_id=${productId}`);

export const addProductFeedbackApi = (data) =>
  api.post("/user/v1/feedback/product", data);
