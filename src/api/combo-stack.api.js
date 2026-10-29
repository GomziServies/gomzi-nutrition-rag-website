import api from "./axios";

export const getComboStacksApi = signal => api.get("/public/v1/combo-stacks", { signal });

