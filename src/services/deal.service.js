import { getDealsApi } from "../api/deal.api";
import { resolveBannerAssetUrl, resolveShopLink } from "./banner.service";

const DEFAULT_BACKGROUND = "linear-gradient(180deg, #fff2dc 0%, #f8d396 100%)";

function price(value) {
  return value !== "" && value != null && Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : null;
}

export function normalizeDeals(data) {
  const list = Array.isArray(data?.deals) ? data.deals : [];
  return list
    .filter(deal => deal && deal.status !== false && typeof deal.title === "string" && deal.title.trim())
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map((deal, index) => ({
      id: deal._id || deal.id || `deal-${index}`,
      title: deal.title.trim(),
      subtitle: deal.subtitle || "",
      tag: deal.tag || "",
      originalPrice: price(deal.originalPrice),
      dealPrice: price(deal.dealPrice),
      code: typeof deal.code === "string" ? deal.code.trim() : "",
      image: resolveBannerAssetUrl(deal.image) || "/images/product-placeholder.webp",
      link: resolveShopLink(deal.url),
      background: typeof deal.bgGradient === "string" && !/url\s*\(/i.test(deal.bgGradient) ? deal.bgGradient : DEFAULT_BACKGROUND,
    }));
}

export async function fetchDeals({ signal } = {}) {
  const response = await getDealsApi(signal);
  return normalizeDeals(response.data.data);
}
