import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Minus,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  X,
} from "lucide-react";
import SEO from "../component/SEO";

// Comprehensive, authentic Gomzi Nutrition Knowledge Base
const faqData = [
  // ── CATEGORY: Protein & Supplements ──
  {
    id: "prot-1",
    category: "protein",
    categoryLabel: "Protein & Supplements",
    question: "What is the difference between Gomzi 100% Whey Isolate and Whey Concentrate?",
    answer:
      "Gomzi Whey Isolate undergoes micro-filtration to eliminate almost all carbohydrates, lactose, and fat, yielding 26–27g of pure protein per 30g scoop with rapid digestion—ideal for post-workout recovery or lactose-sensitive athletes. Whey Concentrate delivers 24g of protein with a rich, creamy milkshake texture and essential dairy immunoglobulins at exceptional everyday value.",
  },
  {
    id: "prot-2",
    category: "protein",
    categoryLabel: "Protein & Supplements",
    question: "How and when should I consume Gomzi Whey Protein for maximum results?",
    answer:
      "Mix 1 level scoop (33g) with 200–250ml of cold water or skimmed milk in a shaker. Shake vigorously for 20–30 seconds. For optimal muscle protein synthesis, consume within 30–45 minutes post-workout. On rest days, consume 1 scoop between breakfast and lunch to maintain an anabolic nitrogen balance.",
  },
  {
    id: "prot-3",
    category: "protein",
    categoryLabel: "Protein & Supplements",
    question: "Who should take Mass Gainer instead of Whey Protein?",
    answer:
      "Gomzi Mass Gainer is formulated specifically for 'hardgainers' and athletes with fast metabolisms who struggle to reach their daily caloric surplus. Each serving delivers dense complex carbohydrates, 27g protein, and essential micronutrients. If you are aiming for clean muscle gain without excess calories, stick with 100% Whey Protein.",
  },
  {
    id: "prot-4",
    category: "protein",
    categoryLabel: "Protein & Supplements",
    question: "Does Gomzi Micronized Creatine require a loading phase?",
    answer:
      "A loading phase is optional. You can load with 20g daily (divided into 4 servings of 5g) for 5–7 days to saturate muscle phosphocreatine stores rapidly, followed by 3–5g daily maintenance. Alternatively, taking 3–5g consistently every day will fully saturate your muscle stores within 3–4 weeks with zero digestive distress.",
  },
  {
    id: "prot-5",
    category: "protein",
    categoryLabel: "Protein & Supplements",
    question: "What makes Gomzi Plant Protein complete and vegan-friendly?",
    answer:
      "Our 100% Vegan Plant Protein combines premium Pea Protein Isolate, Brown Rice, Soya, and Peanut protein. By blending multiple plant sources, we deliver a 100% complete amino acid profile rich in BCAAs and EAAs that rivals dairy whey for muscle building without any dairy, lactose, or bloating.",
  },

  // ── CATEGORY: Ingredients & Purity ──
  {
    id: "pure-1",
    category: "purity",
    categoryLabel: "Ingredients & Purity",
    question: "Are Gomzi supplements tested for heavy metals and banned substances?",
    answer:
      "Yes. Every production batch is certified by independent NABL-accredited third-party laboratories. We screen rigorously for Lead, Arsenic, Cadmium, and Mercury, as well as over 250+ WADA-prohibited substances to guarantee 100% dope-free compliance for competitive sports.",
  },
  {
    id: "pure-2",
    category: "purity",
    categoryLabel: "Ingredients & Purity",
    question: "Is there any amino spiking or added sugar in your formulas?",
    answer:
      "Strictly zero amino spiking and zero added sugar. Every gram of protein listed on our label is derived exclusively from intact, high-biological-value protein sources. We maintain 100% label transparency with no proprietary blends hiding sub-clinical dosages.",
  },
  {
    id: "pure-3",
    category: "purity",
    categoryLabel: "Ingredients & Purity",
    question: "Are Gomzi facilities FSSAI and GMP certified?",
    answer:
      "Yes. All Gomzi products are formulated and manufactured in state-of-the-art facilities compliant with FSSAI regulations, GMP (Good Manufacturing Practices), and ISO 22000:2018 food safety standards in India.",
  },
  {
    id: "pure-4",
    category: "purity",
    categoryLabel: "Ingredients & Purity",
    question: "Are Gomzi protein powders suitable for people with lactose intolerance?",
    answer:
      "Our Whey Protein Isolate contains less than 0.5% lactose and is fortified with digestive enzymes (Protease, Papain), making it well-tolerated by most lactose-sensitive individuals. For complete zero-lactose tolerance, choose our 100% Vegan Plant Protein.",
  },

  // ── CATEGORY: Usage & Directions ──
  {
    id: "use-1",
    category: "usage",
    categoryLabel: "Usage & Directions",
    question: "Can I take Pre-Workout and Creatine together?",
    answer:
      "Yes. Creatine and Pre-Workout work synergistically. You can take your Pre-Workout 20–30 minutes prior to training for immediate energy and vasodilation, and consume your Creatine either pre-workout or post-workout with your protein shake for cellular replenishment.",
  },
  {
    id: "use-2",
    category: "usage",
    categoryLabel: "Usage & Directions",
    question: "Can beginners or women consume Gomzi supplements?",
    answer:
      "Absolutely. Protein and multivitamins are essential macronutrients and micronutrients for both men and women of any fitness level. Protein is required for cellular repair, immune health, and lean muscle tone, and does not cause unwanted bulkiness.",
  },
  {
    id: "use-3",
    category: "usage",
    categoryLabel: "Usage & Directions",
    question: "How should I store my supplements once opened?",
    answer:
      "Store your tubs and pouches in a cool, dry place away from direct sunlight, moisture, and extreme heat. Always ensure the tub lid is firmly tightened or the ziplock pouch is completely sealed to prevent clumping.",
  },

  // ── CATEGORY: Orders & Shipping ──
  {
    id: "order-1",
    category: "orders",
    categoryLabel: "Shipping & Orders",
    question: "How long does shipping take and what are the delivery charges?",
    answer:
      "We provide FREE shipping across India on all orders above ₹999. Orders are processed within 24 hours of payment. Metro deliveries arrive within 24–48 hours, while tier-2 and tier-3 locations across 19,000+ pin codes arrive in 3–5 business days.",
  },
  {
    id: "order-2",
    category: "orders",
    categoryLabel: "Shipping & Orders",
    question: "How can I track my shipment once dispatched?",
    answer:
      "Once your parcel is dispatched, you will receive an automated WhatsApp notification and email containing your live courier tracking link (BlueDart, Delhivery, or XpressBees). You can also track your orders directly from your user profile.",
  },
  {
    id: "order-3",
    category: "orders",
    categoryLabel: "Shipping & Orders",
    question: "What is your return or replacement policy?",
    answer:
      "We offer a 30-day hassle-free replacement guarantee if your product arrives damaged, with broken tamper seals, or defective in transit. Simply contact our support team via WhatsApp or email with your order ID and unboxing photo.",
  },
  {
    id: "order-4",
    category: "orders",
    categoryLabel: "Shipping & Orders",
    question: "Do you include a free shaker with purchases?",
    answer:
      "Yes! We regularly include a complimentary premium leakproof Gomzi shaker on selected protein bundles and promotional orders. Look out for the gift badge on qualifying product detail pages.",
  },
];

const categoryTabs = [
  { id: "all", label: "All Questions" },
  { id: "protein", label: "Protein & Supplements" },
  { id: "purity", label: "Ingredients & Purity" },
  { id: "usage", label: "Usage & Directions" },
  { id: "orders", label: "Shipping & Orders" },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState({ "prot-1": true, "pure-1": true });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter questions based on active category and live search query
  const filteredQuestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return faqData.filter((item) => {
      const matchesTab = activeTab === "all" || item.category === activeTab;
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="bg-[#faf8f6] font-modelica text-[#1c1c28]">
      <SEO
        title="Frequently Asked Questions (FAQ) | Gomzi Nutrition"
        description="Find verified answers regarding Gomzi Whey Protein, Creatine, Mass Gainer, dosages, 3rd-party lab certifications, and shipping."
      />

      {/* ── 1. LUXURY HERO BANNER & SEARCH (COMPACT & MODERN) ── */}
      <section
        className="relative overflow-hidden pt-8 pb-10 sm:pt-10 sm:pb-12 text-white select-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 15%, #3d1b12 0%, #170d09 45%, #0a0604 100%)",
        }}
      >
        {/* Ambient atmospheric glows */}
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

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient RAG Background Typographic Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-toma font-black uppercase leading-none text-white/[0.025] tracking-widest"
            style={{ fontSize: "clamp(90px, 18vw, 220px)" }}
          >
            RAG
          </span>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#ffaa5a]">
            <Sparkles size={12} className="text-[#ff8914]" />
            <span>Help Center & Knowledge Base</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914] animate-pulse ml-0.5" />
          </div>

          {/* Heading */}
          <h1 className="mt-3 sm:mt-4 font-toma text-white uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            ANSWERS TO YOUR{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ffaa5a 0%, #ff8914 50%, #f3a055 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              QUESTIONS.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-lg mx-auto mt-2 text-xs sm:text-sm leading-relaxed text-gray-300 font-light">
            Everything you need to know about our formulations, lab certifications, batch testing, and shipping.
          </p>

          {/* Live Reactive Search Bar */}
          <div className="mt-5 max-w-xl mx-auto relative">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg p-1 transition-all focus-within:border-[#ff8914] focus-within:bg-white/15">
              <div className="pl-3 text-gray-400">
                <Search size={16} className="text-[#ffaa5a]" />
              </div>
              <input
                type="text"
                placeholder="Search questions (e.g. whey isolate, creatine loading, shipping, FSSAI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none font-modelica text-xs sm:text-sm px-2.5 py-2 text-white placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="pr-2.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {searchQuery && (
              <p className="text-[11px] text-gray-400 mt-1.5 text-left pl-2">
                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY FILTER TABS & QUESTIONS ── */}
      <section className="py-8 sm:py-12 md:py-14">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-6 sm:mb-8">
            {categoryTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative overflow-hidden px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] text-white shadow-md shadow-[#5C3124]/25 border border-amber-400/30 scale-[1.02]"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-[#ebdcd7] hover:border-[#5C3124]/40 hover:bg-[#fffcf9]"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {active && (
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Questions Accordion List */}
          <div className="flex flex-col gap-3.5">
            {filteredQuestions.map((item) => {
              const isOpen = Boolean(openItems[item.id]);
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#5C3124]/50 shadow-md ring-1 ring-[#5C3124]/10"
                      : "border-[#eee4e0] hover:border-[#5C3124]/30 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group gap-4"
                  >
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C3124]">
                        {item.categoryLabel}
                      </span>
                      <h3 className="font-modelica font-semibold text-base sm:text-lg text-gray-900 group-hover:text-[#5C3124] transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden ${
                        isOpen
                          ? "bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white border border-amber-400/30 shadow-sm rotate-180"
                          : "bg-gray-100 text-gray-500 group-hover:bg-[#ebdcd7] group-hover:text-[#5C3124]"
                      }`}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed font-light border-t border-gray-100 animate-fadeIn">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#ebdcd7]">
                <HelpCircle size={40} className="mx-auto text-gray-300 mb-3" />
                <h4 className="text-base font-bold text-gray-800">No matching questions found</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  We couldn't find an answer for "{searchQuery}". Try searching with different keywords or reach out to our team directly.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTab("all");
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white text-xs font-bold border border-amber-400/30 shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 relative overflow-hidden group cursor-pointer inline-flex items-center justify-center"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                  <span className="relative z-10">Reset Search Filter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. TRUST ACCREDITATION STRIP ── */}
      <section className="py-12 sm:py-16 bg-white border-y border-[#ebdcd7]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "100% Authentic Guarantee",
                sub: "Zero middlemen. Direct from certified manufacturing facility.",
              },
              {
                icon: CheckCircle2,
                title: "NABL Lab Tested",
                sub: "Verified free of heavy metals and banned doping substances.",
              },
              {
                icon: Truck,
                title: "Free Express Shipping",
                sub: "Prompt dispatch across 19,000+ pin codes on orders ₹999+.",
              },
              {
                icon: RotateCcw,
                title: "30-Day Easy Returns",
                sub: "Hassle-free replacement for damaged or transit-defective items.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden flex items-start gap-3.5 p-5 rounded-2xl bg-[#faf8f6] border border-[#ebdcd7] shadow-sm hover:shadow-lg hover:border-[#5C3124]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#ebdcd7] flex items-center justify-center shrink-0 text-[#5C3124] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] group-hover:text-[#ffaa5a] group-hover:border-amber-400/30 transition-all duration-300 shadow-xs relative z-10">
                    <Icon size={18} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-toma text-sm font-bold text-gray-900 group-hover:text-[#5C3124] transition-colors tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-light">
                      {item.sub}
                    </p>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. STILL HAVE QUESTIONS? DIRECT CONTACT HERO ── */}
      <section className="py-16 sm:py-20 bg-[#faf8f6]">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6">
          <div className="group/cta relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#1c120e] via-[#261712] to-[#1c120e] hover:border-amber-400/40 border border-[#5C3124]/40 text-white shadow-2xl overflow-hidden transition-all duration-500">
            {/* Decorative Corner Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ff8914]/20 via-[#5C3124]/30 to-transparent rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover/cta:scale-110" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#5C3124]/20 rounded-full blur-2xl pointer-events-none transition-transform duration-700 group-hover/cta:scale-110" />

            {/* Subtle sheen highlight across banner on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-md">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ffaa5a]">
                  Need Personal Guidance?
                </span>
                <h3 className="font-toma text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug">
                  Still have questions about our supplements?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light leading-relaxed">
                  Our certified sports nutritionists are available 7 days a week to help tailor your personalized supplement stack.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href="https://wa.me/919875270200?text=Hi%20Gomzi%20Nutrition%20Team,%20I%20have%20a%20question%20regarding%20supplements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#6d3a2b] via-[#854432] to-[#5C3124] hover:from-[#5C3124] hover:to-[#48261c] border-2 border-amber-400/50 text-white font-toma font-extrabold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-[#5C3124]/40 hover:shadow-2xl hover:shadow-[#5C3124]/60 cursor-pointer"
                >
                  <MessageCircle size={16} className="relative z-10 text-amber-200" />
                  <span className="relative z-10 tracking-wider">WhatsApp Us</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                </a>

                <Link
                  to="/contact-us"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-amber-400/40 text-white font-toma font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-black/20 cursor-pointer"
                >
                  <Mail size={15} className="relative z-10 text-amber-200" />
                  <span className="relative z-10">Contact Support</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
