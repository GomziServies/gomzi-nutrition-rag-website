import api from "./axios";

/**
 * Public Companies / Brands API
 * Fetches active company catalog definitions with taglines, websites, and logos
 */
export const getCompaniesApi = (signal, { includeCounts = false } = {}) => {
  return api.get("/public/v1/companies", { signal, ...(includeCounts && { params: { include_counts: true } }) });
};
