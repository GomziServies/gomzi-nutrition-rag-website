import { Helmet } from "react-helmet-async";

const SITE_NAME = "Gomzi Supplement by RAG";
const DEFAULT_TITLE =
  "Gomzi Supplement by RAG | FSSAI-Certified Whey Protein, Creatine & Supplements India";
const DEFAULT_DESCRIPTION =
  "Lab-tested whey protein, creatine and sports supplements. FSSAI certified with free shipping across India.";
const DEFAULT_IMAGE = "/images/banner-web-view.jpg";

const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://ragnutrition.in"
).replace(/\/$/, "");

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE,
  url = "",
}) {
  const pageTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;

  const pageUrl = `${SITE_URL}${url}`;
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

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
