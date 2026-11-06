import api from "./axios";

/**
 * Public Bank Offers API
 * Fetches dynamic bank card discounts and payment tie-up offers from MongoDB
 */
export const getBankOffersApi = () => {
  return api.get("/public/v1/bank-offers");
};
