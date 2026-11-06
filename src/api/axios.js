import axios from "axios";
import { getApiBaseUrl } from "../config/api-url";
import { getToken } from "../utils/storage";

const api = axios.create({
  timeout: 15000,
  baseURL: getApiBaseUrl(import.meta.env.VITE_API_URL),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.authorization = token;
  }

  return config;
});

export default api;
