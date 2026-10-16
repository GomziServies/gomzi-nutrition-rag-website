import api from "./axios";

/**
 * Public Promotional Trending Deals API
 * Fetches dynamic promotional cards configured for the homepage
 */
export const getDealsApi = () => {
  return api.get("/public/v1/deals");
};
