import api from "./axios";

/**
 * Public Nutrition Promo Banners API
 * Fetches dynamic green discount strip carousel banners from MongoDB
 */
export const getNutritionPromoBannersApi = () => {
  return api.get("/public/v1/nutrition-promo-banners");
};
