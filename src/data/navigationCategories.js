/**
 * Comprehensive Supplement Navigation Taxonomy
 * Extracted & curated from HealthKart's multi-tier hierarchy
 * for Gomzi Nutrition by RAG.
 */

export const NAVIGATION_DEPARTMENTS = [
  {
    id: "sports-nutrition",
    name: "Sports Nutrition",
    slug: "sports-nutrition",
    icon: "dumbbell",
    description: "Premium Proteins, Gainers, Creatine & Workout Formulations",
    groups: [
      {
        title: "Proteins",
        slug: "proteins",
        items: [
          { name: "Whey Proteins", query: "whey protein", badge: "Popular" },
          { name: "Whey Protein Isolate", query: "isolate" },
          { name: "Raw Whey Proteins", query: "raw whey" },
          { name: "Plant Proteins", query: "plant protein" },
          { name: "Beginners Whey Protein", query: "beginners protein" },
          { name: "Protein for Women", query: "women protein" },
          { name: "Casein & Blends", query: "casein" },
          { name: "Soy Proteins", query: "soy protein" },
        ],
      },
      {
        title: "Gainers",
        slug: "gainers",
        items: [
          { name: "Mass Gainers", query: "mass gainer", badge: "Trending" },
          { name: "Weight Gainers", query: "weight gainer" },
          { name: "High Calorie Blends", query: "gainer" },
        ],
      },
      {
        title: "Pre/Post Workout",
        slug: "pre-post-workout",
        items: [
          { name: "Pre-Workout Formulations", query: "pre workout", badge: "Hot" },
          { name: "Creatine Monohydrate", query: "creatine" },
          { name: "BCAAs & EAAs", query: "bcaa" },
          { name: "Beta Alanine", query: "beta alanine" },
          { name: "Electrolytes & Hydration", query: "electrolyte" },
          { name: "Citrulline Malate", query: "citrulline" },
          { name: "Nitric Oxide Boosters", query: "nitric oxide" },
        ],
      },
      {
        title: "Workout Essentials",
        slug: "workout-essentials",
        items: [
          { name: "L-Carnitine Liquid & Tabs", query: "carnitine" },
          { name: "Fat Burners & Thermogenics", query: "fat burner" },
          { name: "Testosterone Boosters", query: "testosterone" },
          { name: "ZMA (Zinc & Magnesium)", query: "zma" },
          { name: "Carb Blends & Energy", query: "carbs" },
        ],
      },
      {
        title: "Protein Foods",
        slug: "protein-foods",
        items: [
          { name: "High Protein Peanut Butter", query: "peanut butter" },
          { name: "Protein Bars & Snacks", query: "protein bar" },
          { name: "High Fiber Muesli & Oats", query: "oats" },
          { name: "Ready-to-Drink Protein Shakes", query: "shake" },
        ],
      },
    ],
  },
  {
    id: "vitamins-supplements",
    name: "Vitamins & Supplements",
    slug: "vitamins-and-supplements",
    icon: "pill",
    description: "Daily Wellness, Micronutrients, Fish Oils & Minerals",
    groups: [
      {
        title: "Omega & Healthy Fats",
        slug: "omega-fatty-acids",
        items: [
          { name: "Omega 3 Fish Oil (Triple Strength)", query: "omega 3", badge: "Best Seller" },
          { name: "Flaxseed Oil (Vegan)", query: "flaxseed" },
          { name: "Cod Liver Oil", query: "cod liver" },
          { name: "Krill Oil", query: "krill oil" },
        ],
      },
      {
        title: "Multivitamins",
        slug: "multivitamins",
        items: [
          { name: "Daily Multivitamins - Men", query: "multivitamin men" },
          { name: "Daily Multivitamins - Women", query: "multivitamin women" },
          { name: "Athletic Multivitamins", query: "multivitamin sports" },
          { name: "Daily Wellness Gummies", query: "gummies" },
        ],
      },
      {
        title: "Essential Vitamins",
        slug: "vitamins",
        items: [
          { name: "Vitamin C + Zinc", query: "vitamin c" },
          { name: "Vitamin D3 + K2", query: "vitamin d3" },
          { name: "Biotin (Hair & Nails)", query: "biotin" },
          { name: "Vitamin B-Complex & B12", query: "vitamin b12" },
          { name: "Vitamin E", query: "vitamin e" },
        ],
      },
      {
        title: "Minerals & Joint Care",
        slug: "minerals",
        items: [
          { name: "Calcium + Magnesium + Zinc", query: "calcium" },
          { name: "Glucosamine Joint Support", query: "glucosamine" },
          { name: "Magnesium Glycinate", query: "magnesium" },
          { name: "Chelated Iron Complex", query: "iron" },
        ],
      },
      {
        title: "Antioxidants & Skin",
        slug: "antioxidants",
        items: [
          { name: "Marine Collagen Peptides", query: "collagen", badge: "Popular" },
          { name: "L-Glutathione", query: "glutathione" },
          { name: "CoQ10 (Coenzyme Q10)", query: "coq10" },
          { name: "Alpha Lipoic Acid", query: "ala" },
        ],
      },
    ],
  },
  {
    id: "ayurveda-herbs",
    name: "Ayurveda & Herbs",
    slug: "ayurveda-and-herbs",
    icon: "leaf",
    description: "Pure Traditional Extracts, Adaptogens & Vitality Boosters",
    groups: [
      {
        title: "Vitality & Strength",
        slug: "vital-herbs",
        items: [
          { name: "Pure Himalayan Shilajit", query: "shilajit", badge: "Top Rated" },
          { name: "KSM-66 Ashwagandha", query: "ashwagandha" },
          { name: "Safed Musli & Maca", query: "musli" },
          { name: "Ginseng Complex", query: "ginseng" },
          { name: "Ginkgo Biloba", query: "ginkgo" },
        ],
      },
      {
        title: "Herbs for Immunity",
        slug: "immunity-herbs",
        items: [
          { name: "Giloy Ghanvati", query: "giloy" },
          { name: "Pure Amla Extract", query: "amla" },
          { name: "Curcumin Turmeric 95%", query: "turmeric" },
          { name: "Tulsi Holy Basil Drops", query: "tulsi" },
          { name: "Neem Detox", query: "neem" },
        ],
      },
      {
        title: "Metabolic & Weight Control",
        slug: "herbs-weight-loss",
        items: [
          { name: "Green Coffee Bean Extract", query: "green coffee" },
          { name: "Garcinia Cambogia", query: "garcinia" },
          { name: "Green Tea Extract (EGCG)", query: "green tea" },
          { name: "Guggul Lipid Support", query: "guggul" },
        ],
      },
      {
        title: "Digestive & Detox Care",
        slug: "digestive-herbs",
        items: [
          { name: "Triphala Pure Blend", query: "triphala" },
          { name: "Organic Wheatgrass", query: "wheatgrass" },
          { name: "Milk Thistle (Liver Care)", query: "milk thistle", badge: "Essential" },
          { name: "Boswellia Serrata", query: "boswellia" },
        ],
      },
    ],
  },
  {
    id: "health-food-drinks",
    name: "Health Food & Drinks",
    slug: "health-food-and-drinks",
    icon: "apple",
    description: "Functional Nutrition, Healthy Juices, Seeds & Superfoods",
    groups: [
      {
        title: "Nut Butters & Spreads",
        slug: "nut-butters",
        items: [
          { name: "All Natural Crunchy Peanut Butter", query: "peanut butter" },
          { name: "Chocolate Protein Peanut Butter", query: "chocolate peanut butter" },
          { name: "Almond & Cashew Butter", query: "almond butter" },
        ],
      },
      {
        title: "Breakfast & Cereals",
        slug: "breakfast-cereals",
        items: [
          { name: "Rolled & Instant Oats", query: "oats" },
          { name: "High Protein Dark Choco Muesli", query: "muesli" },
          { name: "Granola & Breakfast Clusters", query: "granola" },
        ],
      },
      {
        title: "Health Juices & Vinegar",
        slug: "health-juices",
        items: [
          { name: "Apple Cider Vinegar with Mother", query: "acv", badge: "Pure" },
          { name: "Organic Aloe Vera Juice", query: "aloe vera" },
          { name: "Amla Juice (Cold Pressed)", query: "amla juice" },
          { name: "Karela Jamun Herbal Juice", query: "karela jamun" },
        ],
      },
      {
        title: "Superfoods & Seeds",
        slug: "superfoods",
        items: [
          { name: "Organic Raw Chia Seeds", query: "chia seeds" },
          { name: "Roasted Flaxseeds", query: "flaxseed" },
          { name: "White Quinoa Grain", query: "quinoa" },
          { name: "Raw Himalayan Honey", query: "honey" },
        ],
      },
    ],
  },
];

export const HEADER_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/gomzi-supplement" },
  { label: "Categories", href: "/category", hasDropdown: true },
  { label: "Wholesale & Gyms", href: "/wholesale" },
  { label: "Faqs", href: "/faq" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

export const QUICK_NAV_LINKS = HEADER_NAV_LINKS;
