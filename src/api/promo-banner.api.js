import api from "./axios";

/**
 * Public Promotional Banners API
 * Fetches dynamic mid-page promotional carousel slides
 */
export const getPromoBannersApi = () => {
  return api.get("/public/v1/promo-banners");
};
