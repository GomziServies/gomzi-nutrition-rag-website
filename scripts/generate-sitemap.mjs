// gomzi-nutrition-rag-website/scripts/generate-sitemap.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.resolve(projectRoot, "public", "sitemap.xml");

const SITE_URL = (process.env.VITE_SITE_URL || "https://ragnutrition.in").replace(/\/$/, "");
const today = new Date().toISOString().split("T")[0];

// Fallback catalog in case database / API is unreachable during offline build
const STATIC_CATEGORIES = [
  "whey-protein",
  "creatine",
  "pre-workout",
  "mass-gainer",
  "plant-protein",
  "bcaa",
  "wellness-health",
];

const STATIC_PRODUCTS = [
  "whey-protein-1",
  "whey-protein-2",
  "whey-protein-3",
  "whey-protein-4",
  "whey-protein-5",
  "whey-protein-6",
  "whey-protein-7",
  "ignite-fat-burner",
  "bcaa",
  "performance-whey",
  "pre-workout-1",
  "creatine",
  "creatine-1",
  "icon-isolate",
  "qnt-delicious-whey-protein-isolate-and-hydrolysate",
  "avvatar-100percent-performance-whey-protein-caramel-creme",
];

const STATIC_BLOGS = [
  "how-much-protein-do-you-need-per-day-india",
  "gomzi-supplement-legacy-of-rag",
  "protein-for-glp1-weight-loss-muscle-preservation",
  "whey-protein-isolate-vs-concentrate",
  "what-is-plant-protein-benefits-uses-and-side-effects",
  "what-is-plant-protein-benefits-types-uses-side-effects",
];

async function fetchFromApi(endpoint) {
  const apiUrl = process.env.VITE_API_URL || "http://localhost:3005";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${apiUrl}/public/v1/${endpoint}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

function formatDate(date) {
  if (!date) return today;
  try {
    return new Date(date).toISOString().split("T")[0];
  } catch {
    return today;
  }
}

export async function generateSitemap() {
  console.log("Generating sitemap.xml for:", SITE_URL);

  // 1. Fetch live data with graceful static fallback
  const apiProducts = await fetchFromApi("products");
  const apiCategories = await fetchFromApi("categories");
  const apiBlogs = await fetchFromApi("blogs");

  const productList = Array.isArray(apiProducts?.products) && apiProducts.products.length > 0
    ? apiProducts.products.map(p => ({ slug: p.slug, lastmod: formatDate(p.updatedAt) }))
    : Array.isArray(apiProducts) && apiProducts.length > 0
      ? apiProducts.map(p => ({ slug: p.slug, lastmod: formatDate(p.updatedAt) }))
      : STATIC_PRODUCTS.map(slug => ({ slug, lastmod: today }));

  const categoryList = Array.isArray(apiCategories?.categories) && apiCategories.categories.length > 0
    ? apiCategories.categories.map(c => ({ slug: c.slug, lastmod: formatDate(c.updatedAt) }))
    : Array.isArray(apiCategories) && apiCategories.length > 0
      ? apiCategories.map(c => ({ slug: c.slug, lastmod: formatDate(c.updatedAt) }))
      : STATIC_CATEGORIES.map(slug => ({ slug, lastmod: today }));

  const blogList = Array.isArray(apiBlogs?.blogs) && apiBlogs.blogs.length > 0
    ? apiBlogs.blogs.map(b => ({ slug: b.slug, lastmod: formatDate(b.updatedAt) }))
    : Array.isArray(apiBlogs) && apiBlogs.length > 0
      ? apiBlogs.map(b => ({ slug: b.slug, lastmod: formatDate(b.updatedAt) }))
      : STATIC_BLOGS.map(slug => ({ slug, lastmod: today }));

  // 2. Define URL entries
  const urls = [
    // Core Homepage & Discovery
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: "daily", priority: "1.0" },
    { loc: `${SITE_URL}/gomzi-supplement`, lastmod: today, changefreq: "daily", priority: "0.9" },
    { loc: `${SITE_URL}/category`, lastmod: today, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/deals`, lastmod: today, changefreq: "daily", priority: "0.8" },
    { loc: `${SITE_URL}/gym-offers`, lastmod: today, changefreq: "weekly", priority: "0.8" },
    { loc: `${SITE_URL}/wholesale`, lastmod: today, changefreq: "monthly", priority: "0.7" },

    // Categories
    ...categoryList.map(cat => ({
      loc: `${SITE_URL}/gomzi-supplement/${cat.slug}`,
      lastmod: cat.lastmod,
      changefreq: "weekly",
      priority: "0.8",
    })),

    // Active Products
    ...productList.map(prod => ({
      loc: `${SITE_URL}/product/${prod.slug}`,
      lastmod: prod.lastmod,
      changefreq: "weekly",
      priority: "0.8",
    })),

    // Blog Listing & Articles
    { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: "weekly", priority: "0.8" },
    ...blogList.map(blog => ({
      loc: `${SITE_URL}/blog/${blog.slug}`,
      lastmod: blog.lastmod,
      changefreq: "monthly",
      priority: "0.7",
    })),

    // Brand & Education
    { loc: `${SITE_URL}/about`, lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: `${SITE_URL}/about/ambassador`, lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: `${SITE_URL}/ingredients`, lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: `${SITE_URL}/faq`, lastmod: today, changefreq: "monthly", priority: "0.6" },
    { loc: `${SITE_URL}/contact-us`, lastmod: today, changefreq: "monthly", priority: "0.6" },

    // Legal Policies
    { loc: `${SITE_URL}/privacy-policy`, lastmod: today, changefreq: "monthly", priority: "0.4" },
    { loc: `${SITE_URL}/terms-and-conditions`, lastmod: today, changefreq: "monthly", priority: "0.4" },
    { loc: `${SITE_URL}/refund-policy`, lastmod: today, changefreq: "monthly", priority: "0.4" },
    { loc: `${SITE_URL}/shipping-policy`, lastmod: today, changefreq: "monthly", priority: "0.4" },
  ];

  // 3. Assemble standard XML tree
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
  ];

  for (const entry of urls) {
    xmlLines.push("  <url>");
    xmlLines.push(`    <loc>${entry.loc}</loc>`);
    if (entry.lastmod) xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    if (entry.changefreq) xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    if (entry.priority) xmlLines.push(`    <priority>${entry.priority}</priority>`);
    xmlLines.push("  </url>");
  }

  xmlLines.push("</urlset>");
  xmlLines.push("");

  const sitemapXml = xmlLines.join("\n");
  fs.writeFileSync(outputPath, sitemapXml, "utf8");

  console.log(`Successfully generated sitemap.xml with ${urls.length} verified URLs at:`);
  console.log(outputPath);
  return { count: urls.length, outputPath };
}

// Run directly when called from command line
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap().catch(err => {
    console.error("Failed to generate sitemap:", err);
    process.exit(1);
  });
}
