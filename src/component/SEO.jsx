import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useWebsiteContent } from "../content/WebsiteContent";

const SITE_NAME = "Gomzi Supplement by RAG";
const DEFAULT_TITLE =
  "Gomzi Supplement by RAG | FSSAI-Certified Whey Protein, Creatine & Supplements India";
const DEFAULT_DESCRIPTION =
  "Lab-tested whey protein, creatine and sports supplements. FSSAI certified with free shipping across India.";
const DEFAULT_IMAGE = "/images/banner-web-view.webp";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://ragnutrition.in"
).replace(/\/$/, "");

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = "",
  noIndex = false,
}) {
  const { pathname } = useLocation();
  const { get } = useWebsiteContent();
  const siteName = get("website.branding", { name: SITE_NAME }).name;
  const defaults = get("website.seo", { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, image: DEFAULT_IMAGE });
  const titleAlreadyBranded = title.includes(siteName) || /gomzi/i.test(title);
  const pageTitle = title === DEFAULT_TITLE ? defaults.title : titleAlreadyBranded ? title : `${title} | ${siteName}`;
  if (description === DEFAULT_DESCRIPTION) description = defaults.description;
  if (image === DEFAULT_IMAGE) image = defaults.image;

  const pageUrl = `${SITE_URL}${url || pathname}`;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}${DEFAULT_IMAGE}`;

  return (
    <Helmet>
      {/* SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />

      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
