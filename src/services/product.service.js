// product.service.js

import {
  addToCartApi,
  getCartApi,
  getProductsApi,
  removeCartItemApi,
  getProductCategoriesApi,
} from "../api/product.api";
import { successToast, errorToast } from "../utils/toast";

export const fetchProducts = async ({
  page = 1,
  limit = 20,
  search = "",
  category = "",
  company = "",
  tag = "",
  sort = "",
  sortOrder = "",
  slug,
} = {}) => {
  try {
    const response = await getProductsApi({
      page,
      limit,
      search,
      category,
      company,
      tag,
      sort,
      sortOrder,
      slug,
    });

    return {
      success: true,
      data: response.data.data,
      pagination: response.data.metadata?.pagination,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const addToCart = async (data) => {
  try {
    const response = await addToCartApi(data);

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getCart = async () => {
  try {
    const response = await getCartApi();

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const removeCartItem = async (cart_id, item_id) => {
  try {
    const response = await removeCartItemApi(cart_id, item_id);

    successToast("Product removed successfully from cart");

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    errorToast("Something went wrong");

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateCartQuantity = async ({
  item_id,
  quantity,
  variation_id,
}) => {
  try {
    const response = await addToCartApi({
      item_id,
      item_type: "FG_MEAL_PRODUCT",
      quantity,
      notes: variation_id
        ? {
            variation_id,
          }
        : {},
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const fetchProductCategories = async () => {
  try {
    const response = await getProductCategoriesApi();

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
