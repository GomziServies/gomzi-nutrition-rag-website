import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Search,
} from "lucide-react";
import SEO from "../component/SEO";
import { getCategoriesApi } from "../api/category.api";
import { CategoryGridSkeleton } from "../component/common/SkeletonLoaders";
import CategoryRangeCard from "../component/common/CategoryRangeCard";
import { getLocalCache, setLocalCache } from "../utils/storage";

const CATEGORIES_PAGE_CACHE_KEY = "gomzi_categories_page_cache";

const resolveImageUrl = (img) => {
  if (!img) return "/images/product-placeholder.webp";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

const standards = [
  {
    number: "01",
    title: "LAB TESTED FORMULAS",
    description:
      "Every product is third-party tested for purity, potency, and label accuracy. What the label states is exactly what you consume—zero hidden spikes, zero fillers.",
  },
  {
    number: "02",
    title: "ZERO PROTEIN SPIKING",
    description:
      "No amino spiking, no cheap bulking agents, and no proprietary blend trickery. Genuine bioavailable protein verified by certified independent laboratory assays.",
  },
  {
    number: "03",
    title: "FSSAI & GMP APPROVED",
    description:
      "Fully compliant with FSSAI regulations and produced exclusively in GMP-certified, ISO 22000:2018 facilities to guarantee peak pharmaceutical-grade safety.",
  },
  {
    number: "04",
    title: "THE LEGACY OF RAG",
    description:
      "Forged from the athletic legacy of Gomzi Supplement by RAG. Built on 15+ years of athlete feedback, clinical formulation, and uncompromising quality standards.",
  },
];


const faqs = [
  {
    question: "Which Gomzi supplement should I begin with?",
    answer:
      "For lean muscle development and recovery, start with our 100% Whey Protein combined with Micronized Creatine. For individuals aiming to increase body weight and caloric intake, Mass Gainer is ideal. For overall vitality and immune support, daily Multivitamins pair seamlessly with any fitness regimen.",
  },
  {
    question: "Are Gomzi supplements tested and FSSAI certified?",
    answer:
      "Yes. Every Gomzi Supplement batch is manufactured strictly in FSSAI-licensed, GMP-certified, and ISO-compliant facilities in India. Every single batch undergoes third-party testing to guarantee zero heavy metal contamination and 100% label accuracy.",
  },
  {
    question: "Do Gomzi supplements contain any banned substances or dope agents?",
    answer:
      "No. All formulations are manufactured in compliance with international anti-doping standards, completely free from prohibited anabolic steroids, stimulants, or adulterants, making them fully safe for competitive national athletes.",
  },
  {
    question: "Whey Protein Isolate vs Whey Concentrate - which is right for me?",
    answer:
      "Choose Whey Isolate if you want ultra-fast absorption with near-zero carbs, lactose, and fat. Choose Whey Concentrate if you seek a rich, creamy everyday protein with balanced macronutrients at exceptional value.",
  },
  {
    question: "How long does shipping take across India?",
    answer:
      "We offer priority dispatch on all prepaid orders. Metro cities typically receive deliveries within 24 to 48 hours, while all other locations across 19,000+ pin codes are serviced in 3 to 4 business days.",
  },
];

function CategoryCard({ category }) {
  return (
    <CategoryRangeCard
      to={category.url || `/gomzi-supplement/${category.slug}`}
      title={category.title}
      subtitle={category.subtitle || category.spec || ""}
      image={resolveImageUrl(category.image)}
      badge={category.tag || "PREMIUM"}
      count={category.productCount || 0}
    />
  );
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return Array.isArray(cached?.categories) && cached.categories.length > 0
      ? cached.categories
      : [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return Array.isArray(cached?.categories) && cached.categories.length > 0
      ? false
      : true;
  });
  const [totalProducts, setTotalProducts] = useState(() => {
    const cached = getLocalCache(CATEGORIES_PAGE_CACHE_KEY);
    return cached?.totalProducts || 0;
  });
  const [activeFaq, setActiveFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch dynamic categories directly from the backend API managed by admin
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        if (categories.length === 0) {
          setLoading(true);
        }
        const res = await getCategoriesApi();
        if (isMounted && res.data?.data) {
          const data = res.data.data;
          if (Array.isArray(data.categories)) {
            // Sort by admin display order
            const activeCats = data.categories
              .filter((c) => c && c.status !== false)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

            setCategories(activeCats);
            const liveTotal =
              data.totalProducts ||
              activeCats.reduce((sum, c) => sum + (c.productCount || 0), 0);
            setTotalProducts(liveTotal);

            setLocalCache(CATEGORIES_PAGE_CACHE_KEY, {
              categories: activeCats,
              totalProducts: liveTotal,
            });
          }
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic categories:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    // Only show active categories
    const activeOnly = categories.filter((c) => c && c.status !== false);

    // Deduplicate by slug or title to ensure clean display
    const seen = new Set();
    const unique = [];
    for (const cat of activeOnly) {
      const key = (cat.slug || cat.title || "").toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(cat);
      }
    }

    // Preserve admin ordering
    unique.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (!searchQuery.trim()) return unique;
    const q = searchQuery.toLowerCase().trim();
    return unique.filter(
      (cat) =>
        cat.title?.toLowerCase().includes(q) ||
        cat.subtitle?.toLowerCase().includes(q) ||
        cat.tag?.toLowerCase().includes(q) ||
        cat.spec?.toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  return (
    <div className="bg-bg-cream text-text overflow-x-hidden">
      <SEO
        title="Shop by Category | Whey Protein, Mass Gainer & Supplements | Gomzi Nutrition"
        description="Explore Gomzi Nutrition categories: 100% Whey Protein Isolate, Mass Gainer, Plant Protein, Pre-Workout, BCAA and Essential Health Supplements."
      />

      {/* ── 1. HERO SECTION ── */}
      <section className="w-full border-b border-border bg-white">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
          {/* Top Live Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary mb-2.5 sm:mb-3 max-w-full">
            <Sparkles size={12} className="text-primary shrink-0" />
            <span className="truncate">
              {loading
                ? "Connecting to Live Catalog..."
                : `${totalProducts}+ Verified Formulations Across ${categories.length} Categories`}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-text leading-tight">
            Find Your Perfect Nutrition
          </h1>

          {/* Subtext */}
          <p className="mt-1.5 sm:mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-text-light font-normal">
            Engineered for peak performance, muscle synthesis, and daily vitality.
            Explore clinical-grade sports supplements tailored to your athletic
            ambitions.
          </p>


        </div>
      </section>

      {/* ── 2. DYNAMIC CATEGORY CARDS GRID ── */}
      <section className="py-6 sm:py-10 md:py-12 bg-bg-cream">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Dynamic Count & Instant Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-5 sm:mb-8 pb-3.5 sm:pb-4 border-b border-primary-border">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-1">
                <Layers size={13} className="shrink-0" />
                <span>Explore Formulations</span>
              </div>
              <h2 className="text-xl sm:text-3xl text-text font-extrabold tracking-tight">
                Product Categories ({filteredCategories.length})
              </h2>
            </div>

            {/* Quick Filter Search on Mobile & Desktop */}
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-8.5 pr-8 py-2 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid or Skeletons */}
          {loading ? (
            <CategoryGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 items-stretch">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category._id || category.id}
                  category={category}
                />
              ))}
            </div>
          )}

          {!loading && filteredCategories.length === 0 && (
            <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-text font-semibold text-sm">
                No categories matching &quot;{searchQuery}&quot;
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Try searching for another keyword or reset the filter.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-semibold text-primary underline cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. THE GOMZI STANDARD SECTION ── */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-[#f8fafc] via-[#f1f4f9] to-white border-y border-border select-none relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Standard Badge Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-primary-light border border-primary-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2.5 sm:mb-3.5 shadow-xs">
              <Zap size={12} className="text-primary sm:w-[13px] sm:h-[13px]" />
              <span>The Gomzi Quality Standard</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.15] font-black tracking-tight text-text">
              Why Serious Athletes <br className="hidden sm:inline" />
              <span className="text-primary">
                Trust Gomzi Nutrition
              </span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-text-light max-w-2xl font-normal leading-relaxed">
              Every formulation is backed by certified third-party laboratory verification, 100% genuine ingredients, and zero proprietary filler blends.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6 mt-7 sm:mt-10 md:mt-12">
            {standards.map((item) => (
              <div
                key={item.number}
                className="group relative overflow-hidden p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-primary/30 group-hover:text-primary transition-colors tracking-tight">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-primary-light border border-primary-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs">
                      <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                  </div>

                  <div className="h-[2px] w-8 sm:w-10 bg-primary mb-3 sm:mb-4 group-hover:w-full transition-all duration-500" />

                  <h3 className="text-xs sm:text-sm md:text-base uppercase font-bold text-text group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-text-light leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FAQS ACCORDION SECTION ── */}
      <section className="py-10 sm:py-16 md:py-20 bg-bg-cream">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light border border-primary-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2 sm:mb-3">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl uppercase font-black tracking-tight text-text mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2 leading-relaxed">
              Everything you need to know about our sourcing, verification, and supplement recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3.5">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 border ${
                    open
                      ? "border-primary/40 bg-white shadow-md ring-1 ring-primary/20"
                      : "border-border bg-white hover:border-primary/30 shadow-2xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(open ? null : index)}
                    className="w-full flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4.5 text-left cursor-pointer relative z-10 gap-3"
                  >
                    <span className="font-semibold text-xs sm:text-base text-gray-900 group-hover:text-primary transition-colors pr-2 leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`relative overflow-hidden w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        open
                          ? "bg-primary text-white rotate-180 shadow-xs"
                          : "bg-gray-100 text-gray-500 group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{open ? <X size={14} /> : <Plus size={14} />}</span>
                    </div>
                  </button>

                  {open && (
                    <div className="px-4 pb-4 pt-1 sm:px-6 sm:pb-5 sm:pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-light border-t border-gray-100 animate-fadeIn relative z-10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CATALOG CTA ── */}
      <section className="py-8 sm:py-14 md:py-16 bg-white border-t border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl sm:rounded-2xl border border-border bg-gradient-to-r from-primary-light/60 via-white to-primary-light/40 p-5 sm:p-8 md:p-12 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-primary-border shadow-2xs mb-2 sm:mb-3">
                Direct From Laboratory To Athlete
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text tracking-tight leading-tight">
                Ready to Experience Verified Purity?
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-1.5 sm:mt-2 leading-relaxed font-normal">
                Explore our complete range of certified sports nutrition products with free shipping across India.
              </p>
            </div>

            <div className="flex w-full sm:w-auto items-center justify-center shrink-0">
              <Link
                to="/gomzi-supplement"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <span>Shop Full Catalog</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}