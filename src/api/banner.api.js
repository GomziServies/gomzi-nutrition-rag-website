import api from "./axios";

/**
 * Fetch dynamic hero banner from RAG API
 */
export const getHeroBannerApi = () => api.get("/public/v1/hero-banner");

/**
 * Fetch dynamic promotional offer banners from RAG API
 */
export const getPromoBannersApi = () => api.get("/public/v1/promo-banners");

/**
 * Fetch dynamic flagship nutrition promo banners from RAG API
 */
export const getNutritionPromoBannersApi = () => api.get("/public/v1/nutrition-promo-banners");

/**
 * Fetch dynamic featured ad / static banners from RAG API
 */
export const getStaticBannerApi = () =>
  api
    .get("/public/v1/static-banner")
    .catch(() => api.get("/public/v1/ads-banner"));

export const getAdBannersApi = () =>
  api
    .get("/public/v1/ads-banner")
    .catch(() => api.get("/public/v1/static-banner"));

