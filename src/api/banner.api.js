import api from "./axios";

/**
 * Fetch dynamic hero banner from RAG API
 */
export const getHeroBannerApi = () => api.get("/public/v1/hero-banner");
