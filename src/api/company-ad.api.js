import api from "./axios";

/**
 * Public Company Advertisements & Banners API
 * Fetches dynamic brand partner ads and campaign banners from MongoDB
 */
export const getCompanyAdsApi = (params) => {
  return api.get("/public/v1/company-ads", { params });
};
