import api from "./axios";

/**
 * Public Science Journal / Blogs API
 * Fetches dynamic publications, live category counts, and single article by slug
 */
export const getBlogsApi = (params = {}) => {
  return api.get("/public/v1/blogs", { params });
};

export const getBlogBySlugApi = (slug) => {
  return api.get(`/public/v1/blogs/${slug}`);
};
