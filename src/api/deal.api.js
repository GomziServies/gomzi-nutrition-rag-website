import api from "./axios";

export const getDealsApi = signal => api.get("/public/v1/deals", { signal });
