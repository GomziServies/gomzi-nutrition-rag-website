import api from "./axios";

export const getCategoriesApi = signal => api.get("/public/v1/categories", { signal });
