import { createOrderApi } from "../api/order.api";

export const createOrder = async (payload) => {
  try {
    const response = await createOrderApi(payload);

    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
