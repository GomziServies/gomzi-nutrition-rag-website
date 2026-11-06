// src/data/homeProducts.js
// Curated authentic Gomzi Nutrition catalog, categories, banners, and trust assets.
// Provides resilient fallbacks and instant rendering even under offline API scenarios.

import { addGuestCartItem } from "../services/cartStorage.service";
import { addToCart } from "../services/product.service";
import { successToast, errorToast } from "../utils/toast";

/**
 * Universal Image URL resolver for local assets and CDN assets from files.fggroup.in
 */
export const getProductImageUrl = (displayImages) => {
  if (!displayImages) return "/images/product-placeholder.webp";
  const img = Array.isArray(displayImages) ? displayImages[0] : displayImages;
  if (!img || typeof img !== "string" || !img.trim()) {
    return "/images/product-placeholder.webp";
  }
  const clean = img.trim();
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  if (clean.startsWith("/images/")) {
    return clean;
  }
  if (clean.startsWith("images/")) {
    return `/${clean}`;
  }
  if (clean.startsWith("product-category/") || clean.startsWith("/product-category/")) {
    const stripped = clean.startsWith("/") ? clean.slice(1) : clean;
    return `/images/${stripped}`;
  }
  if (clean.startsWith("/")) {
    return clean;
  }
  return `https://files.fggroup.in/${clean}`;
};

/**
 * Top Supplement Brands recognized in the 419+ product database
 */
const KNOWN_BRANDS = [
  "MuscleBlaze",
  "Optimum Nutrition",
  "GNC",
  "Myprotein",
  "Isopure",
  "Dymatize",
  "Wellcore",
  "MuscleTech",
  "Avvatar",
  "Labrada",
  "Fast&Up",
  "Dynamite",
  "bGREEN",
  "Gomzi",
];

export const getProductBrand = (product) => {
  if (!product) return "Authentic Brand";
  if (product.brand && typeof product.brand === "string" && product.brand.trim()) {
    return product.brand.trim();
  }
  const name = product.name || "";
  const nameLower = name.toLowerCase();
  for (const b of KNOWN_BRANDS) {
    if (nameLower.includes(b.toLowerCase())) {
      return b;
    }
  }
  return name.split(" ")[0] || "Authentic Brand";
};

/**
 * Professional E-Commerce Multi-Brand Diversification & Interleaving Algorithm
 * Prevents consecutive duplicates of the same brand or identical images.
 * Interleaves distinct brands round-robin style matching HealthKart, Amazon, and Flipkart.
 */
export const diversifyProducts = (products = [], maxCount = 12) => {
  if (!Array.isArray(products) || products.length === 0) return [];

  const buckets = {};
  const seenImages = new Set();
  const seenPrefixes = new Set();

  for (const product of products) {
    if (!product || !product.name) continue;

    // 1. Deduplicate identical image URLs
    const rawImg = Array.isArray(product.displayImages)
      ? product.displayImages[0]
      : product.displayImages;
    if (rawImg && seenImages.has(rawImg)) continue;
    if (rawImg) seenImages.add(rawImg);

    // 2. Deduplicate near-identical product names (e.g. "Pack of 15" vs "Pack of 30")
    const cleanPrefix = product.name
      .split("-")[0]
      .split("(")[0]
      .trim()
      .toLowerCase();
    if (cleanPrefix.length > 5 && seenPrefixes.has(cleanPrefix)) continue;
    if (cleanPrefix.length > 5) seenPrefixes.add(cleanPrefix);

    // 3. Bucket by brand
    const brand = getProductBrand(product);
    if (!buckets[brand]) {
      buckets[brand] = [];
    }
    buckets[brand].push(product);
  }

  // Interleave round-robin across different brands
  const brandKeys = Object.keys(buckets);
  const result = [];
  let added = true;

  while (added && result.length < maxCount) {
    added = false;
    for (const b of brandKeys) {
      if (buckets[b] && buckets[b].length > 0) {
        result.push(buckets[b].shift());
        added = true;
        if (result.length >= maxCount) break;
      }
    }
  }

  // If we still need more products, backfill without strict title deduplication
  if (result.length < maxCount) {
    for (const p of products) {
      if (!result.some((r) => r._id === p._id)) {
        result.push(p);
        if (result.length >= maxCount) break;
      }
    }
  }

  return result;
};


export const FITNESS_GOALS = [
  {
    id: "goal-muscle",
    title: "Build Lean Muscle",
    desc: "100% Pure Whey Protein & Isolates for rapid muscle recovery & growth.",
    category: "Whey Protein",
    slug: "whey-protein",
    badge: "86 Products",
    image: "/images/protein-removebg.png",
    gradient: "from-[#3c1e14] to-[#1c100c]",
    btnText: "Shop Whey Protein",
  },
  {
    id: "goal-mass",
    title: "Fast Mass & Weight Gain",
    desc: "Heavyweight calorie-dense formulas packed with carbs, protein & BCAAs.",
    category: "Mass Gainer",
    slug: "mass-gainer",
    badge: "23 Products",
    image: "/images/mass-gainer-removebg.png",
    gradient: "from-[#452216] to-[#24110b]",
    btnText: "Shop Mass Gainers",
  },
  {
    id: "goal-power",
    title: "Explosive Strength & Power",
    desc: "Micronized Creatine Monohydrate & High-Stimulant Pre-Workouts.",
    category: "Creatine",
    slug: "creatine",
    badge: "89 Products",
    image: "/images/product-category/creatine.webp",
    gradient: "from-[#2e1911] to-[#160d09]",
    btnText: "Shop Creatine & Pre",
  },
  {
    id: "goal-wellness",
    title: "Clean Health & Daily Wellness",
    desc: "Natural Peanut Butter, Multivitamins & Vegan Plant Proteins.",
    category: "Protein Bars & Snacks",
    slug: "protein-bars-snacks",
    badge: "40+ Products",
    image: "/images/product-category/peanut-butter.webp",
    gradient: "from-[#382017] to-[#1a0f0a]",
    btnText: "Shop Clean Nutrition",
  },
];

export const HERO_BANNERS = [
  {
    id: "hero-banner-flat20",
    title: "Gomzi Nutrition Flat 20% Off On All Supplements",
    image: "/images/banners/hero-whey-flat20.png",
    ctaLink: "/gomzi-supplement/whey-protein",
    alt: "Gomzi Nutrition Flat 20% Off On All Supplements - Use Code GOMZI20",
  },
  {
    id: "hero-banner-bogo",
    title: "Gomzi Nutrition Buy 1 Get 1 Free - Peanut Butter",
    image: "/images/banners/hero-peanut-trio.png",
    ctaLink: "/gomzi-supplement/protein-bars-snacks",
    alt: "Gomzi Nutrition Buy 1 Get 1 Free - Oreo Cookie, Classic Creamy, Chocolate Peanut Butter",
  },
  {
    id: "hero-banner-save10",
    title: "Gomzi Nutrition Save 10% Extra On All Supplements",
    image: "/images/banners/hero-supplements-sale.png",
    ctaLink: "/gomzi-supplement/creatine",
    alt: "Gomzi Nutrition Save 10% Extra On All Supplements - BCAA, Creatine, Pre-Workout",
  },
];


export const FLASH_DEAL_PRODUCTS = [
  {
    _id: "prod-whey-1",
    name: "Gomzi 100% Pure Whey Protein Concentrate",
    slug: "gomzi-100-whey-protein-concentrate-chocolate",
    category: "Whey Protein",
    categories: ["Whey Protein", "Sports Nutrition"],
    price: 2699,
    discountPrice: 1999,
    flavour: "Rich Chocolate Fudge (1kg)",
    displayImages: ["product-category/whey-protein.webp"],
    rating: { average: 4.8, totalReviews: 1420 },
    badge: "🔥 BESTSELLER",
    isFlashDeal: true,
    highlight: "24g Protein • 5.5g BCAA • 0g Sugar",
  },
  {
    _id: "prod-creatine-1",
    name: "Gomzi Micronized Creatine Monohydrate",
    slug: "gomzi-micronized-creatine-monohydrate-unflavored",
    category: "Creatine",
    categories: ["Creatine", "Pre & Post Workout"],
    price: 1299,
    discountPrice: 899,
    flavour: "100% Unflavored Pure (250g)",
    displayImages: ["product-category/creatine.webp"],
    rating: { average: 4.9, totalReviews: 2150 },
    badge: "⚡ TOP RATED",
    isFlashDeal: true,
    highlight: "100% Creapure Grade • Rapid ATP Reload",
  },
  {
    _id: "prod-pre-1",
    name: "Gomzi Ignition Explosive Pre-Workout",
    slug: "gomzi-ignition-pre-workout-powder",
    category: "Pre Workout",
    categories: ["Pre Workout", "Sports Nutrition"],
    price: 1899,
    discountPrice: 1299,
    flavour: "Tangy Orange Blast (300g)",
    displayImages: ["product-category/pre-workout.webp"],
    rating: { average: 4.8, totalReviews: 1120 },
    badge: "NEW LAUNCH",
    isFlashDeal: true,
    highlight: "3.2g Beta-Alanine • 4g Citrulline • Crazy Pump",
  },
  {
    _id: "prod-peanut-1",
    name: "Gomzi High Protein All-Natural Peanut Butter",
    slug: "gomzi-high-protein-natural-peanut-butter",
    category: "Protein Foods",
    categories: ["Protein Foods", "Healthy Snacks"],
    price: 699,
    discountPrice: 499,
    flavour: "Crunchy Dark Chocolate (1kg)",
    displayImages: ["product-category/peanut-butter.webp"],
    rating: { average: 4.8, totalReviews: 1840 },
    badge: "HEALTHY CHOICE",
    isFlashDeal: true,
    highlight: "32g Protein • Zero Palm Oil • 100% Roasted",
  },
  {
    _id: "prod-gainer-1",
    name: "Gomzi Anabolic Mass Gainer Heavyweight",
    slug: "gomzi-anabolic-mass-gainer-chocolate",
    category: "Mass Gainer",
    categories: ["Mass Gainer", "Sports Nutrition"],
    price: 3199,
    discountPrice: 2299,
    flavour: "Double Rich Chocolate (3kg)",
    displayImages: ["product-category/mass-gainer.webp"],
    rating: { average: 4.7, totalReviews: 830 },
    badge: "MASSIVE GAINS",
    isFlashDeal: true,
    highlight: "1,250 Clean Cals • 54g Protein • Added Glutamine",
  },
  {
    _id: "prod-bcaa-1",
    name: "Gomzi Pro BCAA 2:1:1 Muscle Recovery",
    slug: "gomzi-pro-bcaa-instantized-amino-recovery",
    category: "BCAA",
    categories: ["BCAA", "Sports Nutrition"],
    price: 1699,
    discountPrice: 1199,
    flavour: "Watermelon Splash (300g)",
    displayImages: ["product-category/Bcaa-tangy-orange.webp"],
    rating: { average: 4.7, totalReviews: 640 },
    badge: "INTRA-WORKOUT",
    isFlashDeal: true,
    highlight: "7g Instantized BCAA • Hydration Electrolytes",
  },
];

export const BEST_SELLER_PRODUCTS = [
  {
    _id: "prod-whey-2",
    name: "Gomzi Pure Whey Protein Isolate 90%",
    slug: "gomzi-pure-whey-protein-isolate",
    category: "Whey Protein",
    categories: ["Whey Protein", "Sports Nutrition"],
    price: 3499,
    discountPrice: 2699,
    flavour: "Cafe Mocha Latte (1kg)",
    displayImages: ["product-category/protein-1.jpg"],
    rating: { average: 4.9, totalReviews: 980 },
    badge: "90% ISOLATE",
    highlight: "28g Protein • Ultra Fast Absorption",
  },
  {
    _id: "prod-whey-1",
    name: "Gomzi 100% Pure Whey Protein Concentrate",
    slug: "gomzi-100-whey-protein-concentrate-chocolate",
    category: "Whey Protein",
    categories: ["Whey Protein", "Sports Nutrition"],
    price: 2699,
    discountPrice: 1999,
    flavour: "Rich Chocolate Fudge (1kg)",
    displayImages: ["product-category/whey-protein.webp"],
    rating: { average: 4.8, totalReviews: 1420 },
    badge: "POPULAR",
    highlight: "24g Protein • Digestive Enzymes Added",
  },
  {
    _id: "prod-gainer-1",
    name: "Gomzi Anabolic Mass Gainer Heavyweight",
    slug: "gomzi-anabolic-mass-gainer-chocolate",
    category: "Mass Gainer",
    categories: ["Mass Gainer", "Sports Nutrition"],
    price: 3199,
    discountPrice: 2299,
    flavour: "Double Rich Chocolate (3kg)",
    displayImages: ["product-category/mass-gainer.webp"],
    rating: { average: 4.7, totalReviews: 830 },
    badge: "BULK STACK",
    highlight: "1,250 Clean Cals • 54g Protein",
  },
  {
    _id: "prod-creatine-1",
    name: "Gomzi Micronized Creatine Monohydrate",
    slug: "gomzi-micronized-creatine-monohydrate-unflavored",
    category: "Creatine",
    categories: ["Creatine", "Pre & Post Workout"],
    price: 1299,
    discountPrice: 899,
    flavour: "100% Unflavored Pure (250g)",
    displayImages: ["product-category/creatine.webp"],
    rating: { average: 4.9, totalReviews: 2150 },
    badge: "PURE CREAPURE",
    highlight: "0 Sugars • Pure Muscle Cell Hydration",
  },
  {
    _id: "prod-pre-1",
    name: "Gomzi Ignition Explosive Pre-Workout",
    slug: "gomzi-ignition-pre-workout-powder",
    category: "Pre Workout",
    categories: ["Pre Workout", "Sports Nutrition"],
    price: 1899,
    discountPrice: 1299,
    flavour: "Tangy Orange Blast (300g)",
    displayImages: ["product-category/pre-workout.webp"],
    rating: { average: 4.8, totalReviews: 1120 },
    badge: "HIGH STIM",
    highlight: "300mg Caffeine • 3.2g Beta-Alanine",
  },
  {
    _id: "prod-peanut-1",
    name: "Gomzi High Protein All-Natural Peanut Butter",
    slug: "gomzi-high-protein-natural-peanut-butter",
    category: "Protein Foods",
    categories: ["Protein Foods", "Healthy Snacks"],
    price: 699,
    discountPrice: 499,
    flavour: "Crunchy Dark Chocolate (1kg)",
    displayImages: ["product-category/peanut-butter.webp"],
    rating: { average: 4.8, totalReviews: 1840 },
    badge: "ZERO PALM OIL",
    highlight: "32g Protein • Slow Roasted Peanuts",
  },
  {
    _id: "prod-multi-1",
    name: "Gomzi Apex Daily Multivitamin & Minerals",
    slug: "gomzi-apex-daily-multivitamin-minerals",
    category: "Wellness & Health",
    categories: ["Wellness & Health", "Daily Nutrition"],
    price: 899,
    discountPrice: 599,
    flavour: "60 High Potency Tablets",
    displayImages: ["product-category/Multivitamins.webp"],
    rating: { average: 4.9, totalReviews: 1560 },
    badge: "ESSENTIAL",
    highlight: "35 Micronutrients • Joint & Immunity Blend",
  },
  {
    _id: "prod-plant-1",
    name: "Gomzi 100% Vegan Plant Protein Blend",
    slug: "gomzi-100-vegan-plant-protein-mocha",
    category: "Plant Protein",
    categories: ["Plant Protein", "Sports Nutrition"],
    price: 2799,
    discountPrice: 2099,
    flavour: "Mocha Hazelnut (1kg)",
    displayImages: ["product-category/plant-protein.webp"],
    rating: { average: 4.7, totalReviews: 510 },
    badge: "100% VEGAN",
    highlight: "25g Pea & Brown Rice Protein • Dairy-Free",
  },
];

export const WHY_GOMZI_FEATURES = [
  {
    id: 1,
    title: "100% Authentic & Direct From Lab",
    desc: "Manufactured in our own FSSAI & GMP certified facility. Zero counterfeit, no grey market distributors, no middleman markups.",
    icon: "ShieldCheck",
    badge: "Verified Genuine",
  },
  {
    id: 2,
    title: "Third-Party NABL Certified Reports",
    desc: "Every single production batch undergoes rigorous third-party testing for protein content, heavy metals, and zero banned substances.",
    icon: "FlaskConical",
    badge: "NABL Accredited",
  },
  {
    id: 3,
    title: "Express Pan-India Fast Delivery",
    desc: "Dispatched within 24 hours in tamper-evident security cartons. Free shipping on all prepaid orders with real-time SMS & WhatsApp tracking.",
    icon: "Truck",
    badge: "2-4 Days Shipping",
  },
  {
    id: 4,
    title: "Free Certified Nutritionist Guidance",
    desc: "Speak directly with certified sports dietitians to personalize your protein, creatine, and calorie intake based on your exact fitness targets.",
    icon: "Headphones",
    badge: "Expert Support",
  },
];

export const SEO_ACCORDION_ITEMS = [
  {
    id: "seo-1",
    title: "Gomzi Nutrition — India's Authentic Sports Nutrition & Supplement Store",
    content: `Gomzi Nutrition is dedicated to delivering pure, unadulterated sports nutrition directly from certified laboratory production to your doorstep. We recognize that athletes and fitness enthusiasts face a market flooded with counterfeit products and spiked protein powders. Gomzi Nutrition eliminates every middleman and provides complete batch transparency, ensuring you receive 100% genuine supplements backed by third-party NABL test certificates.`,
  },
  {
    id: "seo-2",
    title: "How to Choose the Right Whey Protein for Your Fitness Goals",
    content: `When selecting a protein powder, your choice depends on your daily caloric targets and digestion preferences:
- Whey Protein Concentrate: Ideal for everyday gym-goers, bodybuilders, and fitness enthusiasts wanting rich flavor, cost efficiency, and 24g of high-quality protein per scoop.
- Whey Protein Isolate: Cross-flow microfiltered to remove nearly all lactose, carbs, and fats. Delivers 28g+ of pure protein, perfect for cutting cycles and lactose-sensitive individuals.
- Plant Protein: A 100% vegan formula combining pea and brown rice protein, naturally gentle on digestion with a complete amino acid profile.`,
  },
  {
    id: "seo-3",
    title: "Why Batch Lab Reports Matter Before Buying Supplements",
    content: `Protein amino-spiking and heavy metal contamination are serious concerns in the supplement industry. At Gomzi Nutrition, every production batch is assigned a unique batch number verifiable directly against our public NABL laboratory report. You can review protein percentage, nitrogen validation, and microbiological safety reports before you even place your order.`,
  },
  {
    id: "seo-4",
    title: "Optimal Supplement Timing: Pre-Workout, Creatine, and Protein",
    content: `For optimal results:
1. Pre-Workout: Consume 20-30 minutes prior to training for explosive pumps, focus, and delayed fatigue.
2. Creatine Monohydrate: Take 3-5g daily consistently, either pre or post-workout with carbohydrates or water to saturate muscle phosphocreatine stores.
3. Whey Protein: Consume within 45 minutes post-workout or between meals to stimulate Muscle Protein Synthesis (MPS) and accelerate recovery.`,
  },
];

/**
 * Universal Add-To-Cart helper that works seamlessly offline (guest cart)
 * and online (authenticated API), updating local state and toast notifications.
 */
export const handleQuickAddToCart = async (product, isAuthenticated = false) => {
  if (!/^[a-f0-9]{24}$/i.test(product?._id || "")) {
    errorToast("This preview isn't available to purchase. Please browse the live catalog.");
    return false;
  }
  try {
    if (isAuthenticated) {
      const result = await addToCart({ item_id: product._id, item_type: "FG_MEAL_PRODUCT", quantity: 1 });
      if (!result.success) throw new Error(result.message || "Couldn't add this item.");
    } else addGuestCartItem({ product, quantity: 1 });
    window.dispatchEvent(new Event("cartUpdated"));
    successToast("Added to your cart");
    return true;
  } catch (error) {
    errorToast(error.message || "Couldn't add this item. Please try again.");
    return false;
  }
};
