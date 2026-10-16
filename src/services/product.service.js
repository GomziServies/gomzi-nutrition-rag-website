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
  tag = "",
  sort = "",
  sortOrder = "",
  slug,
  id,
} = {}) => {
  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug || id || "");
    const singleProductLookup = Boolean(slug || id);

    const params = {
      page,
      limit: singleProductLookup ? 1 : limit,
      search,
      category,
      tag,
      sort,
      sortOrder,
    };

    if (id) {
      params.id = id;
    } else if (slug) {
      if (isObjectId) {
        params.id = slug;
      } else {
        params.slug = slug;
      }
    }

    let response = await getProductsApi(params);

    // Fallback if ObjectId didn't match an _id, try as literal slug
    if (
      (!response?.data?.data ||
        (Array.isArray(response.data.data) && response.data.data.length === 0)) &&
      isObjectId &&
      slug
    ) {
      const fallbackResponse = await getProductsApi({
        ...params,
        id: undefined,
        slug,
      });
      if (fallbackResponse?.data?.data) {
        response = fallbackResponse;
      }
    }

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
