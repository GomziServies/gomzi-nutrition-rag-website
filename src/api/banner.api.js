import api from "./axios";

export const getHeroBannersApi = (signal) =>
  api.get("/public/v1/hero-banner", { signal });

export const getAdBannersApi = signal =>
  api.get("/public/v1/ads-banner", { signal });

export const getPromoBannersApi = signal =>
  api.get("/public/v1/promo-banners", { signal });

export const getNutritionPromoBannersApi = signal =>
  api.get("/public/v1/nutrition-promo-banners", { signal });
