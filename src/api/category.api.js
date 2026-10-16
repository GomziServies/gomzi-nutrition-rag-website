import api from "./axios";

/**
 * Public Categories API
 * Fetches dynamic categories with product counts and metadata from MongoDB
 */
export const getCategoriesApi = () => {
  return api.get("/public/v1/categories");
};
