/**
 * productAdapter.js
 * Normalizes products returned by the RAG backend API (http://localhost:3005)
 * into a consistent, robust schema for frontend carousels and cards.
 */

export const getProductImageUrl = (product) => {
  if (!product) return "/images/product-placeholder.webp";

  // Check direct resolved image
  if (typeof product.resolvedImage === "string" && product.resolvedImage.trim()) {
    if (product.resolvedImage.startsWith("http") || product.resolvedImage.startsWith("/")) {
      return product.resolvedImage;
    }
    return `https://files.fggroup.in/${product.resolvedImage}`;
  }

  // Check displayImages array
  if (Array.isArray(product.displayImages) && product.displayImages.length > 0) {
    const img = product.displayImages[0];
    if (img && typeof img === "string" && img.trim()) {
      if (img.startsWith("http") || img.startsWith("/")) return img;
      return `https://files.fggroup.in/${img}`;
    }
  }

  // Check display_image array or string
  if (Array.isArray(product.display_image) && product.display_image.length > 0) {
    const img = product.display_image[0];
    if (img && typeof img === "string" && img.trim()) {
      if (img.startsWith("http") || img.startsWith("/")) return img;
      return `https://files.fggroup.in/${img}`;
    }
  } else if (typeof product.display_image === "string" && product.display_image.trim()) {
    if (product.display_image.startsWith("http") || product.display_image.startsWith("/")) {
      return product.display_image;
    }
    return `https://files.fggroup.in/${product.display_image}`;
  }

  // Check variation images (both variations array and single variation object)
  const firstVariation = Array.isArray(product.variations) ? product.variations[0] : product.variation;
  if (firstVariation) {
    const varImg =
      (Array.isArray(firstVariation.displayImages) && firstVariation.displayImages[0]) ||
      firstVariation.image;
    if (typeof varImg === "string" && varImg.trim()) {
      if (varImg.startsWith("http") || varImg.startsWith("/")) return varImg;
      return `https://files.fggroup.in/${varImg}`;
    }
  }

  // Check single image string
  if (typeof product.image === "string" && product.image.trim()) {
    if (product.image.startsWith("http") || product.image.startsWith("/")) {
      return product.image;
    }
    return `https://files.fggroup.in/${product.image}`;
  }

  // Check images array (e.g. [{ image_url: "..." }] or ["..."])
  if (Array.isArray(product.images) && product.images.length > 0) {
    const img = product.images[0]?.image_url || product.images[0];
    if (typeof img === "string" && img.trim()) {
      if (img.startsWith("http") || img.startsWith("/")) return img;
      return `https://files.fggroup.in/${img}`;
    }
  }

  return "/images/product-placeholder.webp";
};

export const isRealProduct = (p) => {
  if (!p || !p.name) return false;
  const name = p.name.trim().toLowerCase();
  if (name.length < 3) return false;

  const dummyPatterns = [
    /^abc$/i,
    /^xyz$/i,
    /^demo/i,
    /^test/i,
    /^dsfdss/i,
    /^jask/i,
    /brenden clarke/i,
    /phyllis crane/i,
    /kylan galloway/i,
    /sample/i,
    /^(whey protein|plant protein)(\s+[0-9]+kg)?$/i,
  ];

  for (const pattern of dummyPatterns) {
    if (pattern.test(name)) return false;
  }

  return true;
};

export const normalizeProduct = (p, defaultCategorySlug = "whey-protein") => {
  if (!p) return null;

  const price = Number(p.sellingPrice || p.discountPrice || p.price || 999);
  const rawPrice = Number(p.price || price);
  const originalPrice = rawPrice > price ? rawPrice : Math.round(price * 1.35);
  const memberPrice = Math.round(price * 0.92);

  const name = p.name || "Gomzi Nutrition Product";
  const nameLower = name.toLowerCase();

  let categorySlug = defaultCategorySlug;
  let categoryName = "Whey Protein";

  if (nameLower.includes("creatine")) {
    categorySlug = "creatine";
    categoryName = "Creatine";
  } else if (nameLower.includes("mass") || nameLower.includes("gainer")) {
    categorySlug = "mass-gainer";
    categoryName = "Mass Gainer";
  } else if (nameLower.includes("plant") || nameLower.includes("vegan")) {
    categorySlug = "plant-protein";
    categoryName = "Plant Protein";
  } else if (
    nameLower.includes("bcaa") ||
    nameLower.includes("eaa") ||
    nameLower.includes("recovery")
  ) {
    categorySlug = "bcaa";
    categoryName = "BCAA & Recovery";
  } else if (
    nameLower.includes("pre-workout") ||
    nameLower.includes("pre workout") ||
    nameLower.includes("spark")
  ) {
    categorySlug = "pre-workout";
    categoryName = "Pre Workout";
  } else if (
    nameLower.includes("peanut") ||
    nameLower.includes("butter") ||
    nameLower.includes("vitamin") ||
    nameLower.includes("multivitamin") ||
    nameLower.includes("wellness") ||
    nameLower.includes("omega") ||
    nameLower.includes("bar") ||
    nameLower.includes("drink")
  ) {
    categorySlug = "wellness-health";
    categoryName = "Daily Wellness";
  }

  return {
    id: p._id || p.id || String(Math.random()),
    _id: p._id || p.id,
    slug: p.slug || p._id || p.id || categorySlug,
    name,
    category: categoryName,
    image: getProductImageUrl(p),
    rating: Number(p.rating?.average || p.rating || 4.8),
    totalReviews: Number(p.rating?.totalReviews || p.totalReviews || 420),
    price,
    originalPrice,
    memberPrice,
    offerText: p.offerText || "Lab Tested Pure Formula",
    trusLified: Boolean(p.trusLified !== undefined ? p.trusLified : true),
    highlight: p.highlights?.[0]
      ? `${p.highlights[0].title}: ${p.highlights[0].value}`
      : "100% Authentic • Zero Adulteration",
    tag: p.badges?.[0] || (price > 1200 ? "Best Seller" : "Top Value"),
    inStock: p.inStock !== undefined ? p.inStock : 10,
    raw: p,
  };
};

export const filterProductsByCategory = (products, categoryTab) => {
  if (!Array.isArray(products) || products.length === 0) return [];

  const tab = categoryTab.toLowerCase();

  return products.filter((p) => {
    const name = (p.name || "").toLowerCase();
    const categories = (
      Array.isArray(p.categories)
        ? p.categories.join(" ")
        : String(p.categories || "")
    ).toLowerCase();

    if (tab.includes("creatine")) {
      return name.includes("creatine") || categories.includes("creatine");
    }
    if (tab.includes("mass") || tab.includes("gainer")) {
      return (
        name.includes("mass") ||
        name.includes("gainer") ||
        categories.includes("mass")
      );
    }
    if (tab.includes("plant") || tab.includes("vegan")) {
      return (
        name.includes("plant") ||
        name.includes("vegan") ||
        categories.includes("plant")
      );
    }
    if (tab.includes("bcaa") || tab.includes("recovery")) {
      return (
        name.includes("bcaa") ||
        name.includes("eaa") ||
        categories.includes("bcaa")
      );
    }
    if (tab.includes("pre workout") || tab.includes("pre-workout")) {
      return (
        name.includes("pre") ||
        name.includes("spark") ||
        categories.includes("pre")
      );
    }
    if (tab.includes("wellness") || tab.includes("daily")) {
      return (
        name.includes("peanut") ||
        name.includes("butter") ||
        name.includes("vitamin") ||
        name.includes("multivitamin") ||
        name.includes("wellness") ||
        name.includes("omega") ||
        name.includes("drink") ||
        name.includes("bar") ||
        categories.includes("wellness")
      );
    }
    if (tab.includes("whey")) {
      return (
        name.includes("whey") ||
        name.includes("isolate") ||
        name.includes("blend") ||
        name.includes("concentrate") ||
        categories.includes("whey")
      );
    }

    return true;
  });
};

