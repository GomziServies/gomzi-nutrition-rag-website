import api from "./axios";

/**
 * Public Companies / Brands API
 * Fetches active company catalog definitions with taglines, websites, and logos
 */
export const getCompaniesApi = () => {
  return api.get("/public/v1/companies");
};
