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
    <div className="bg-bg-cream text-text">
      <SEO
        title="Frequently Asked Questions (FAQ) | Gomzi Nutrition"
        description="Find verified answers regarding Gomzi Whey Protein, Creatine, Mass Gainer, dosages, 3rd-party lab certifications, and shipping."
      />

      {/* ── 1. HERO BANNER & SEARCH ── */}
      <section className="w-full border-b border-border bg-white">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <Sparkles size={12} className="text-primary" />
            <span>Help Center &amp; Knowledge Base</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-[40px] leading-tight">
            Answers To Your Questions
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-light">
            Everything you need to know about our formulations, lab certifications, batch testing, and shipping.
          </p>

          {/* Live Reactive Search Bar */}
          <div className="mt-6 max-w-xl mx-auto relative">
            <div className="relative flex items-center rounded-lg border border-border bg-white p-1 transition-colors focus-within:border-primary">
              <div className="pl-3 text-text-muted">
                <Search size={16} className="text-text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search questions (e.g. whey isolate, creatine loading, shipping, FSSAI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm px-2.5 py-2 text-text placeholder:text-text-muted"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="pr-2.5 text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {searchQuery && (
              <p className="text-[11px] text-text-muted mt-1.5 text-left pl-2">
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
                      ? "btn-gradient text-white shadow-md shadow-primary/25 border border-amber-400/30 scale-[1.02]"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-primary-border hover:border-primary/40 hover:bg-[#fffcf9]"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
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
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isOpen
                      ? "border-amber-400/50 bg-gradient-to-br from-[#fdfbf9] to-white shadow-[0_8px_24px_rgba(92,49,36,0.08)] ring-1 ring-amber-400/20"
                      : "border-primary-border bg-white hover:border-amber-400/40 hover:bg-[#fdfbf9]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(92,49,36,0.08)] hover:-translate-y-0.5"
                  }`}
                >
                  {/* Subtle moving card sheen sweep on hover */}

                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4 relative z-10"
                  >
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary group-hover:text-amber-600 transition-colors">
                        {item.categoryLabel}
                      </span>
                      <h3
                        className={`font-semibold text-base sm:text-lg transition-colors leading-snug ${
                          isOpen ? "text-primary" : "text-gray-900 group-hover:text-primary"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`relative overflow-hidden w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "btn-gradient border border-amber-400/30 text-white rotate-180 shadow-md shadow-primary/25"
                          : "bg-primary-light text-primary border border-primary-border group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-primary group-hover:to-primary-hover group-hover:border-amber-400/30 group-hover:text-white group-hover:shadow-md group-hover:scale-105"
                      }`}
                    >
                      <span className="relative z-10">{isOpen ? <Minus size={15} className="text-amber-100" /> : <Plus size={15} />}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed font-light border-t border-gray-100 animate-fadeIn relative z-10">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-primary-border">
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
                  className="mt-4 px-5 py-2.5 rounded-xl btn-gradient text-white text-xs font-bold border border-amber-400/30 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 relative overflow-hidden group cursor-pointer inline-flex items-center justify-center"
                >
                  <span className="relative z-10">Reset Search Filter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. TRUST ACCREDITATION STRIP ── */}
      <section className="py-12 sm:py-16 bg-white border-y border-primary-border">
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
                  className="group relative overflow-hidden flex items-start gap-4 p-5 sm:p-5.5 rounded-2xl sm:rounded-3xl bg-bg-cream border border-primary-border/90 hover:border-amber-400/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white border border-primary-border/80 flex items-center justify-center shrink-0 text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-primary group-hover:to-primary-hover group-hover:text-amber-200 group-hover:border-amber-400/40 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs relative z-10">
                    <Icon size={19} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed font-light">
                      {item.sub}
                    </p>
                  </div>
                  {/* Subtle moving card sheen sweep on hover */}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. STILL HAVE QUESTIONS? DIRECT CONTACT HERO ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-border bg-gradient-to-r from-primary-light/60 via-white to-primary-light/40 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-primary-border shadow-xs mb-3">
                Need Personal Guidance?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight leading-tight">
                Still have questions about our supplements?
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-2 leading-relaxed font-normal">
                Our certified sports nutritionists are available 7 days a week to help tailor your personalized supplement stack.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://wa.me/919875270200?text=Hi%20Gomzi%20Nutrition%20Team,%20I%20have%20a%20question%20regarding%20supplements."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Us</span>
              </a>

              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-white text-text hover:bg-bg-light font-semibold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
              >
                <Mail size={15} className="text-text-secondary" />
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}