import { getHeroBannersApi, getAdBannersApi, getPromoBannersApi, getNutritionPromoBannersApi } from "../api/banner.api";

const FILE_BASE_URL = "https://files.fggroup.in/";

export const FALLBACK_HERO_BANNERS = [{
  id: "default-hero",
  title: "Science-backed nutrition for everyday performance",
  subtitle: "Explore sports nutrition and daily essentials from Gomzi Nutrition.",
  desktopImage: "/images/banner-(gls)-web-view.webp",
  mobileImage: "/images/banner-(gls)-mobile-view.webp",
  alt: "Science-backed sports nutrition products by Gomzi Supplement.",
  shopLink: "/gomzi-supplement",
  brochureUrl: "/pdf/gomzi-brochure.pdf",
}];

export function resolveBannerAssetUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  const path = value.trim();
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/") && !path.startsWith("//") && !path.includes("\\")) return path;
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("//") || path.includes("\\")) return "";
  if (path.startsWith("images/") || path.startsWith("pdf/")) return `/${path}`;
  return `${FILE_BASE_URL}${path}`;
}

export function resolveShopLink(value) {
  if (typeof value !== "string") return "/gomzi-supplement";
  const link = value.trim();
  if ((link.startsWith("/") && !link.startsWith("//") && !link.includes("\\")) || /^https?:\/\//i.test(link)) return link;
  return "/gomzi-supplement";
}

export function normalizeHeroBanners(data) {
  // The API returns { banners, ...primaryBanner }; older responses contain one banner.
  const list = Array.isArray(data?.banners) ? data.banners : data?.desktop_image ? [data] : [];
  return list
    .filter(banner => banner && banner.status !== false && resolveBannerAssetUrl(banner.desktop_image))
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map((banner, index) => {
      const desktopImage = resolveBannerAssetUrl(banner.desktop_image);
      return {
        id: banner._id || banner.id || `hero-${index}`,
        title: banner.title || "Gomzi Nutrition",
        subtitle: banner.subtitle || "",
        desktopImage,
        mobileImage: resolveBannerAssetUrl(banner.mobile_image) || desktopImage,
        alt: banner.alt_text || banner.title || "Gomzi Nutrition featured supplements",
        shopLink: resolveShopLink(banner.shop_link),
        brochureUrl: resolveBannerAssetUrl(banner.brochure_url),
      };
    });
}

export async function fetchHeroBanners({ signal } = {}) {
  const response = await getHeroBannersApi(signal);
  return normalizeHeroBanners(response.data.data);
}

export function normalizeAdBanners(data) {
  const list = Array.isArray(data?.banners) ? data.banners : data?.image ? [data] : [];
  return list
    // Only saved records belong to the admin. Ignore the API's generated fallback artwork.
    .filter(banner => banner && (banner._id || banner.id) && banner.status !== false && resolveBannerAssetUrl(banner.image))
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map(banner => ({
      id: banner._id || banner.id,
      image: resolveBannerAssetUrl(banner.image),
      alt: banner.alt_text?.trim() || banner.title?.trim() || "Featured supplement promotion",
      link: resolveShopLink(banner.url),
    }));
}

export async function fetchAdBanners({ signal } = {}) {
  const response = await getAdBannersApi(signal);
  const data = response.data?.data;
  if (!Array.isArray(data?.banners) && !data?.image) throw new Error("The promotional banner could not be loaded.");
  return normalizeAdBanners(data);
}

export async function fetchPromoBanners({ signal } = {}) {
  const response = await getPromoBannersApi(signal);
  const data = response.data?.data;
  if (!Array.isArray(data?.banners)) throw new Error("The promotional banner could not be loaded.");
  return normalizeAdBanners(data);
}

export async function fetchNutritionPromoBanners({ signal } = {}) {
  const response = await getNutritionPromoBannersApi(signal);
  const data = response.data?.data;
  if (!Array.isArray(data?.banners)) throw new Error("The nutrition banner could not be loaded.");
  return normalizeAdBanners(data);
}
