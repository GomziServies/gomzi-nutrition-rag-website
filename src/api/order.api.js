import api from "./axios";

export const getOrdersApi = (receipt_id) =>
  api.get("/user/v1/orders/get", {
    params: { receipt_id },
  });

export const getRazorpayOrderApi = (gateway_order_id) =>
  api.get("/user/v1/orders/get", {
    params: { search: gateway_order_id },
  });
export const createOrderApi = (data) =>
  api.post("/user/v1/meals/create-order", data);
export const getTrackingOrderApi = () =>
  api.post("/user/v1/meals/get-product-tracking");
