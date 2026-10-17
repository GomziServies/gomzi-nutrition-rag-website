import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  X,
  FlaskConical,
  BadgeCheck,
  Truck,
  Crown,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import SEO from "../component/SEO";
import { getCategoriesApi } from "../api/category.api";
import { CategoryGridSkeleton } from "../component/common/SkeletonLoaders";

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

const highlights = [
  {
    text: "LAB TESTED",
    sub: "100% Third-Party Verified",
    icon: FlaskConical,
  },
  {
    text: "FSSAI CERTIFIED",
    sub: "GMP Compliant Facility",
    icon: BadgeCheck,
  },
  {
    text: "FREE SHIPPING",
    sub: "Pan-India on Orders ₹999+",
    icon: Truck,
  },
  {
    text: "THE LEGACY OF RAG",
    sub: "Trusted by 500k+ Athletes",
    icon: Crown,
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
  const imageUrl = resolveImageUrl(category.image);
  const targetUrl = category.url || `/gomzi-supplement/${category.slug}`;

  return (
    <Link
      to={targetUrl}
      className="group relative overflow-hidden rounded-[22px] cursor-pointer bg-[#140e0c] border border-[#ebdcd7]/60 hover:border-[#5C3124]/60 hover:-translate-y-1 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[360px] sm:min-h-[390px]"
    >
      {/* Background Image with Zoom Effect */}
      <img
        src={imageUrl}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        decoding="async"
      />

      {/* Atmospheric Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Top Tag & Specification Pill */}
      <div className="relative z-10 p-5 flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-black/60 text-[#ffaa5a] border border-white/15 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914]" />
          {category.tag || "PREMIUM"}
        </span>
        {category.spec && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium text-white/90 bg-white/10 backdrop-blur-md border border-white/10">
            {category.spec}
          </span>
        )}
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-2 text-white">
        <div className="flex items-center gap-2">
          <h3 className="font-toma text-2xl sm:text-3xl font-extrabold tracking-tight group-hover:text-[#ffaa5a] transition-colors duration-200">
            {category.title}
          </h3>
          {category.productCount > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#ff8914]/20 text-[#ffaa5a] border border-[#ff8914]/30">
              {category.productCount} {category.productCount === 1 ? "Product" : "Products"}
            </span>
          )}
        </div>

        <p className="font-modelica text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 font-light">
          {category.subtitle}
        </p>

        {/* Action Link to Category Shop Collection */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#ffaa5a] transition-colors">
            <span>Explore Collection</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:border group-hover:border-amber-400/30 group-hover:translate-x-1.5 transition-all duration-300">
              <ArrowRight size={13} className="text-white" />
            </div>
          </span>

          <span className="text-[11px] text-gray-300 group-hover:text-white underline underline-offset-4 tracking-wide font-light">
            Shop Category →
          </span>
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-20" />
    </Link>
  );
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(153);
  const [activeFaq, setActiveFaq] = useState(0);

  // Fetch dynamic categories from the API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategoriesApi();
        if (isMounted && res.data?.data) {
          const data = res.data.data;
          if (Array.isArray(data.categories) && data.categories.length > 0) {
            setCategories(data.categories);
            if (data.totalProducts) setTotalProducts(data.totalProducts);
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

  return (
    <div className="bg-[#faf8f6] font-modelica text-[#1c1c28]">
      <SEO
        title="Shop by Category | Whey Protein, Mass Gainer & Supplements | Gomzi Nutrition"
        description="Explore Gomzi Nutrition categories: 100% Whey Protein Isolate, Mass Gainer, Plant Protein, Pre-Workout, BCAA and Essential Health Supplements."
      />

      {/* ── 1. LUXURY HERO SECTION (COMPACT & MODERN) ── */}
      <section
        className="relative overflow-hidden pt-8 pb-10 sm:pt-10 sm:pb-12 text-white select-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 15%, #3d1b12 0%, #170d09 45%, #0a0604 100%)",
        }}
      >
        {/* Ambient Atmospheric Lighting */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[220px] rounded-full pointer-events-none blur-[100px]"
          style={{ background: "rgba(92, 49, 36, 0.45)" }}
        />
        <div
          className="absolute top-1/4 right-10 w-64 h-64 rounded-full pointer-events-none blur-[90px]"
          style={{ background: "rgba(255, 137, 20, 0.12)" }}
        />
        <div
          className="absolute bottom-10 left-10 w-60 h-60 rounded-full pointer-events-none blur-[90px]"
          style={{ background: "rgba(92, 49, 36, 0.3)" }}
        />

        {/* Subtle Geometric Grid Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient Legacy Background Typographic Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-toma font-black uppercase leading-none text-white/[0.025] tracking-widest"
            style={{ fontSize: "clamp(80px, 16vw, 200px)" }}
          >
            LEGACY
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#ffaa5a]">
            <Sparkles size={12} className="text-[#ff8914]" />
            <span>
              {loading
                ? "Connecting to Live Catalog..."
                : `${totalProducts}+ Verified Formulations Across ${categories.length} Categories`}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914] animate-pulse ml-0.5" />
          </div>

          {/* Headline */}
          <h1 className="mt-3 sm:mt-4 font-toma text-white uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            FIND YOUR{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ffaa5a 0%, #ff8914 50%, #f3a055 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              PERFECT
            </span>{" "}
            NUTRITION
          </h1>

          {/* Subtext */}
          <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm leading-relaxed text-gray-300 font-light">
            Engineered for peak performance, muscle synthesis, and daily vitality. Explore clinical-grade sports supplements tailored to your athletic ambitions.
          </p>

          {/* High-Tech Trust Highlights Bar */}
          <div className="mt-6 sm:mt-8 w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-xl">
              {highlights.map((item) => {
                const HighlightIcon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="group relative overflow-hidden flex items-center gap-2.5 p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.07] hover:border-amber-400/40 hover:-translate-y-0.5 shadow-md transition-all duration-300 text-left cursor-default"
                  >
                    <div className="relative z-10 w-8 h-8 rounded-lg bg-gradient-to-br from-[#5C3124] via-[#6d3a2b] to-[#26130d] border border-amber-400/30 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300">
                      <HighlightIcon size={15} className="text-[#ffaa5a]" />
                    </div>
                    <div className="relative z-10 flex flex-col">
                      <span className="font-toma text-xs font-bold uppercase tracking-wider text-white group-hover:text-amber-100 transition-colors">
                        {item.text}
                      </span>
                      <span className="text-[10px] text-gray-400 font-modelica leading-tight">
                        {item.sub}
                      </span>
                    </div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DYNAMIC CATEGORY CARDS GRID ── */}
      <section className="py-8 sm:py-12 bg-[#faf8f6]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          {/* Section Header with 100% Dynamic Count */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-[#ebdcd7]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5C3124] mb-1">
                <Layers size={14} />
                <span>Explore Formulations</span>
              </div>
              <h2 className="font-toma text-2xl sm:text-3xl text-[#1c1c28] font-extrabold tracking-tight">
                Product Categories ({categories.length || 7})
              </h2>
            </div>
          </div>

          {/* Cards Grid or Skeletons */}
          {loading ? (
            <CategoryGridSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id || category.id}
                  category={category}
                />
              ))}
            </div>
          )}

          {!loading && categories.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">
                No product categories available at this moment.
              </p>
            </div>
          )}
        </div>
      </section>



      {/* ── 4. THE GOMZI STANDARD SECTION ── */}
      <section
        className="py-16 sm:py-24 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #120b08 0%, #1a0f0a 50%, #0d0705 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ffaa5a] mb-2">
              <Zap size={13} className="text-[#ff8914]" />
              <span>The Gomzi Quality Standard</span>
            </div>
            <h2 className="font-toma text-3xl sm:text-5xl lg:text-6xl uppercase leading-tight font-black tracking-tight text-white">
              Why Serious Athletes
              <br />
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Trust Gomzi Nutrition
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {standards.map((item) => (
              <div
                key={item.number}
                className="group relative overflow-hidden p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-400/40 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5C3124]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-toma text-4xl sm:text-5xl font-black text-[#5C3124] group-hover:text-[#ffaa5a] transition-colors">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:border group-hover:border-amber-400/30 flex items-center justify-center transition-all duration-300 shadow-xs">
                      <ShieldCheck size={16} className="text-gray-400 group-hover:text-amber-200 transition-colors" />
                    </div>
                  </div>

                  <div className="h-[2px] w-12 bg-[#ff8914] mb-4 group-hover:w-full transition-all duration-500" />

                  <h3 className="font-toma text-base sm:text-lg uppercase font-bold text-white group-hover:text-amber-100 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQS ACCORDION SECTION ── */}
      <section className="py-16 sm:py-24 bg-[#faf8f6]">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C3124]">
              Got Questions?
            </span>
            <h2 className="font-toma text-3xl sm:text-5xl uppercase font-black tracking-tight text-[#1c1c28] mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2">
              Everything you need to know about our sourcing, verification, and supplement recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const open = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-[#ebdcd7] overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(open ? null : index)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left cursor-pointer group"
                  >
                    <span className="font-modelica font-semibold text-sm sm:text-base text-gray-900 group-hover:text-[#5C3124] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`relative overflow-hidden w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        open
                          ? "bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] border border-amber-400/30 text-white rotate-180 shadow-md shadow-[#5C3124]/25"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:via-[#6d3a2b] group-hover:to-[#48261c] group-hover:border-amber-400/30 group-hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{open ? <X size={15} className="text-amber-100" /> : <Plus size={15} />}</span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    </div>
                  </button>

                  {open && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-light border-t border-gray-100 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. BOTTOM CATALOG CTA ── */}
      <section className="py-14 sm:py-20 bg-[#faf8f6]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1c120e] via-[#261712] to-[#140c09] text-white shadow-2xl relative overflow-hidden border border-[#5C3124]/30 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff8914]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffaa5a]">
                Direct From Laboratory To Athlete
              </span>
              <h2 className="font-toma text-2xl sm:text-4xl font-extrabold text-white mt-1 leading-snug">
                Ready to Experience Verified Purity?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light leading-relaxed">
                Explore our complete range of certified sports nutrition products with free shipping across India.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/gomzi-supplement"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#6d3a2b] via-[#854432] to-[#5C3124] hover:from-[#5C3124] hover:to-[#48261c] border-2 border-amber-400/50 text-white font-toma font-extrabold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-[#5C3124]/40 hover:shadow-2xl hover:shadow-[#5C3124]/60 cursor-pointer"
              >
                <span className="relative z-10 tracking-wider">Shop Full Catalog</span>
                <ArrowRight size={16} className="relative z-10 text-amber-200 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
