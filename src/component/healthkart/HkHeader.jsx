import useBranding from "../../content/useBranding";
import useContactDetails from "../../content/useContactDetails";
// src/component/healthkart/HkHeader.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  PhoneCall,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Star,
  TrendingUp,
  CheckCircle2,
  Dumbbell,
  Zap,
  Scale,
  HeartPulse,
  Utensils,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useCategories from "../../hooks/useCategories";
import { fetchProducts } from "../../services/product.service";
import {
  getProductImageUrl,
  handleQuickAddToCart,
} from "../../data/homeProducts";

const PRIMARY_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/gomzi-supplement" },
  { label: "Categories", to: "/category" },
  { label: "Wholesale & Gyms", to: "/wholesale" },
  { label: "FAQs", to: "/faq" },
  { label: "About Us", to: "/about" },
  { label: "Blogs", to: "/blog" },
  { label: "Contact Us", to: "/contact-us" },
];

function NavigationLink({ link, mobile = false, onClick }) {
  const linkClass = isActive => mobile
    ? `block rounded-lg px-3 py-2.5 font-medium transition-colors ${isActive ? "bg-[#faf2ed] text-primary" : "text-stone-800 hover:bg-stone-50"}`
    : `hover:text-primary transition-colors ${isActive ? "text-primary" : "text-stone-700"}`;

  return <NavLink to={link.to} end={link.to === "/"} onClick={onClick} className={({ isActive }) => linkClass(isActive)}>{link.label}</NavLink>;
}

const POPULAR_SEARCH_TAGS = [
  "Whey Protein Isolate",
  "Creatine Monohydrate",
  "Mass Gainer Heavyweight",
  "Ignition Pre-Workout",
  "Peanut Butter Dark Chocolate",
  "Plant Protein Vegan",
];

const MEGA_CATEGORIES = [
  {
    id: "sports-nutrition",
    name: "Sports Nutrition",
    icon: Dumbbell,
    slug: "",
    subgroups: [
      {
        title: "Proteins",
        items: [
          { name: "Whey Protein Concentrate", slug: "whey-protein" },
          { name: "Whey Protein Isolate", slug: "whey-protein-isolate" },
          { name: "100% Vegan Plant Protein", slug: "plant-protein" },
          { name: "Casein & Night Protein", slug: "casein-protein" },
        ],
      },
      {
        title: "Workout Boosters",
        items: [
          { name: "Micronized Creatine", slug: "creatine" },
          { name: "Ignition Pre-Workout", slug: "pre-workout" },
          { name: "Instantized BCAA 2:1:1", slug: "bcaa" },
          { name: "EAA Essential Aminos", slug: "eaa" },
        ],
      },
    ],
    featured: {
      title: "Gomzi 100% Whey Isolate",
      image: "/images/protein-removebg.png",
      tag: "Shop range",
      offer: "Flat 25% OFF",
      link: "/gomzi-supplement/whey-protein",
    },
  },
  {
    id: "gainers",
    name: "Mass & Weight Gainers",
    icon: Scale,
    slug: "mass-gainer",
    subgroups: [
      {
        title: "Gainers Range",
        items: [
          { name: "Heavyweight Mass Gainer", slug: "mass-gainer" },
          { name: "High Calorie Weight Gainer", slug: "mass-gainer" },
          { name: "Carb & Protein Blends", slug: "mass-gainer" },
          { name: "Bulk Up Muscle Combos", slug: "combos-stacks" },
        ],
      },
      {
        title: "Combos & Bundles",
        items: [
          { name: "Mass Gainer + Creatine Stack", slug: "combos-stacks" },
          { name: "Whey + Shaker Combo Pack", slug: "combos-stacks" },
          { name: "Ultimate Bulking Stack", slug: "combos-stacks" },
        ],
      },
    ],
    featured: {
      title: "Anabolic Mass Gainer Heavyweight",
      image: "/images/mass-gainer-removebg.png",
      tag: "1,250 Clean Cals",
      offer: "Free Shaker Bottle",
      link: "/gomzi-supplement/mass-gainer",
    },
  },
  {
    id: "pre-post",
    name: "Pre & Post Workout",
    icon: Zap,
    slug: "pre-workout",
    subgroups: [
      {
        title: "Pre-Workout Energy",
        items: [
          { name: "High-Stim Pre-Workout", slug: "pre-workout" },
          { name: "Explosive Pump Formulas", slug: "pre-workout" },
          { name: "Beta-Alanine & Citrulline", slug: "pre-workout" },
        ],
      },
      {
        title: "Recovery & Hydration",
        items: [
          { name: "Pure Creapure Creatine", slug: "creatine" },
          { name: "Intra-Workout BCAA & EAA", slug: "bcaa" },
          { name: "Electrolytes & Hydration", slug: "electrolytes-hydration" },
        ],
      },
    ],
    featured: {
      title: "Creapure Micronized Creatine",
      image: "/images/product-category/creatine.webp",
      tag: "Shop range",
      offer: "Pure Creapure",
      link: "/gomzi-supplement/creatine",
    },
  },
  {
    id: "healthy-foods",
    name: "Healthy Foods & Snacks",
    icon: Utensils,
    slug: "protein-bars-snacks",
    subgroups: [
      {
        title: "Clean Protein Foods",
        items: [
          { name: "High Protein Peanut Butter", slug: "protein-bars-snacks" },
          { name: "Dark Chocolate Crunchy Butter", slug: "protein-bars-snacks" },
          { name: "Clean Protein Snack Blocks", slug: "protein-bars-snacks" },
          { name: "Zero Palm Oil Spreads", slug: "protein-bars-snacks" },
        ],
      },
      {
        title: "Healthy Lifestyle",
        items: [
          { name: "Meal Replacement Shakes", slug: "meal-replacement" },
          { name: "Slow-Roasted Healthy Snacks", slug: "protein-bars-snacks" },
        ],
      },
    ],
    featured: {
      title: "All-Natural High Protein Peanut Butter",
      image: "/images/product-category/peanut-butter.webp",
      tag: "32g Protein / 100g",
      offer: "Zero Palm Oil",
      link: "/gomzi-supplement/protein-bars-snacks",
    },
  },
  {
    id: "wellness",
    name: "Daily Health & Wellness",
    icon: HeartPulse,
    slug: "wellness-health",
    subgroups: [
      {
        title: "Daily Essentials",
        items: [
          { name: "Apex Daily Multivitamins", slug: "wellness-health" },
          { name: "Joint & Bone Support", slug: "wellness-health" },
          { name: "Immunity Boosters", slug: "wellness-health" },
          { name: "Fish Oil & Omega 3", slug: "wellness-health" },
        ],
      },
      {
        title: "Authenticity & Reports",
        items: [
          { name: "NABL Batch Lab Certificates", slug: "reports" },
          { name: "Verify Your Batch Code", slug: "reports" },
        ],
      },
    ],
    featured: {
      title: "Apex Daily Multivitamins & Minerals",
      image: "/images/product-category/Multivitamins.webp",
      tag: "35 Micronutrients",
      offer: "100% Genuine",
      link: "/gomzi-supplement/wellness-health",
    },
  },
];

export default function HkHeader() {
  const branding = useBranding();
  const contact = useContactDetails();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { items: authCartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { categories: searchCategories, loading: searchCategoriesLoading, error: searchCategoriesError, retry: retrySearchCategories } = useCategories({ enabled: isSearchFocused });
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCartPopOpen, setIsCartPopOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState("sports-nutrition");

  // Live search state
  const [liveResults, setLiveResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addingId, setAddingId] = useState(null);

  // Cart state
  const [cartCount, setCartCount] = useState(0);
  const [displayedCartItems, setDisplayedCartItems] = useState([]);

  const searchContainerRef = useRef(null);
  const cartPopRef = useRef(null);
  const megaMenuRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    setCartCount(authCartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
    setDisplayedCartItems(authCartItems);
  }, [authCartItems]);

  useEffect(() => {
    if (!mobileDrawerOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = event => {
      if (event.key === "Escape") setMobileDrawerOpen(false);
      if (event.key === "Tab") {
        const controls = drawerRef.current?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])');
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      document.removeEventListener("keydown", onEscape);
    };
  }, [mobileDrawerOpen]);

  useEffect(() => {
    const onEscape = event => {
      if (event.key !== "Escape") return;
      setIsSearchFocused(false);
      setIsCategoryMenuOpen(false);
      setIsCartPopOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (cartPopRef.current && !cartPopRef.current.contains(e.target)) {
        setIsCartPopOpen(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live debounced search against MongoDB 419+ catalog
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q || q.length < 2) {
      setLiveResults([]);
      setIsSearching(false);
      return;
    }

    let active = true;
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetchProducts({
          search: q,
          limit: 6,
        });

        if (!active) return;
        if (res.success && res.data && res.data.length > 0) {
          setLiveResults(res.data);
        } else {
          setLiveResults([]);
        }
      } catch (err) {
        console.error("Live search error:", err);
      } finally {
        if (active) setIsSearching(false);
      }
    }, 250);

    return () => { active = false; clearTimeout(timer); };
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/gomzi-supplement?search=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchFocused(false);
    setSearchQuery("");
  };

  const handleQuickAdd = async (e, product) => {
    e.stopPropagation();
    setAddingId(product._id);
    await handleQuickAddToCart(product, isAuthenticated);
    setTimeout(() => setAddingId(null), 800);
  };

  const cartSubtotal = displayedCartItems.reduce(
    (sum, i) => sum + i.discountPrice * (i.quantity || 1),
    0
  );

  const activeMega = MEGA_CATEGORIES.find((m) => m.id === activeMegaCategory) || MEGA_CATEGORIES[0];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 font-sans border-b border-border/60">
      {/* ── Middle Header Row (HealthKart style) ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-4">
        {/* Left: Mobile hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 text-stone-700 hover:text-primary rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center flex-shrink-0 group">
            <img
              src={branding.logo}
              alt="Gomzi Nutrition"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center: Search Field with Real Supplement Dropdown */}
        <div className="order-3 md:order-none w-full md:w-auto md:flex-1 max-w-2xl md:mx-2 relative" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div
              className={`flex items-center bg-light border rounded-xl h-11 px-3.5 transition-all shadow-inner ${
                isSearchFocused
                  ? "border-primary bg-white ring-2 ring-primary/20 shadow-md"
                  : "border-border hover:border-primary/60"
              }`}
            >
              <Search
                size={18}
                className={`mr-2.5 flex-shrink-0 transition-colors ${
                  isSearchFocused ? "text-primary" : "text-stone-400"
                }`}
              />
              <input
                type="search"
                aria-label="Search supplements"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for Whey Protein, Creatine, Mass Gainer, Peanut Butter..."
                className="w-full bg-transparent text-sm text-text placeholder:text-stone-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-stone-400 hover:text-stone-600 text-xs p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* ── Search Dropdown (Real Supplement Website Experience) ── */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-stone-100 animate-in fade-in slide-in-from-top-1 duration-150">
              {/* STATE 1: Empty Query -> Popular Categories with REAL IMAGES & Trending Tags */}
              {!searchQuery.trim() ? (
                <div className="p-4 sm:p-5">
                  {/* Popular Categories with Real Product Images */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={13} className="text-primary" /> Popular Categories
                      </span>
                      <Link
                        to="/gomzi-supplement"
                        onClick={() => setIsSearchFocused(false)}
                        className="text-[11px] font-bold text-primary hover:underline"
                      >
                        Explore all products &rarr;
                      </Link>
                    </div>

                    {searchCategoriesLoading && <p role="status" className="text-xs text-stone-500 mb-2">Loading categories…</p>}
                    {searchCategoriesError && <button type="button" onClick={retrySearchCategories} className="text-xs text-primary underline mb-2">Retry categories</button>}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                      {searchCategories.slice(0, 6).map((cat) => (
                        <a
                          key={cat.id}
                          href={cat.url}
                          onClick={() => setIsSearchFocused(false)}
                          className="group flex flex-col items-center p-2 rounded-xl bg-[#faf7f4] hover:bg-[#fcf2ee] border border-border/70 hover:border-primary transition-all text-center cursor-pointer"
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 mb-1.5 flex items-center justify-center p-1">
                            <img
                              src={cat.image}
                              alt={cat.title}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-sm"
                              onError={(e) => {
                                if (!e.currentTarget.dataset.fallback) { e.currentTarget.dataset.fallback = "true"; e.currentTarget.src = "/images/product-placeholder.webp"; }
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-stone-800 group-hover:text-primary truncate w-full">
                            {cat.title}
                          </span>
                          {cat.productCount !== null && <span className="text-[9px] text-stone-400 font-semibold">
                            {cat.productCount.toLocaleString("en-IN")} {cat.productCount === 1 ? "Product" : "Products"}
                          </span>}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Trending Search Pills */}
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <TrendingUp size={13} className="text-amber-600" /> Trending Searches
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SEARCH_TAGS.map((tag, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            navigate(`/gomzi-supplement?search=${encodeURIComponent(tag)}`);
                            setIsSearchFocused(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#f5ede6] hover:bg-primary text-stone-800 hover:text-white text-xs font-semibold transition-all border border-border cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Authenticity Assurance Footer */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <ShieldCheck size={14} /> 100% Authentic Direct From Lab
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <FileCheck size={14} className="text-primary" /> NABL Certified Reports
                    </span>
                  </div>
                </div>
              ) : (
                /* STATE 2: Typing -> Live Results From Real MongoDB 419+ Products */
                <div>
                  <div className="p-3 bg-[#fbf8f5] flex items-center justify-between border-b border-stone-100">
                    <span className="text-xs font-bold text-stone-600">
                      Matching Products ({liveResults.length})
                    </span>
                    {isSearching && (
                      <span className="flex items-center gap-1 text-xs text-primary font-medium">
                        <Loader2 size={13} className="animate-spin" /> Searching catalog...
                      </span>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {liveResults.length > 0 ? (
                      liveResults.map((product) => {
                        const price = Number(product.price ?? product.discountPrice ?? 0);
                        const discountPrice = Number(product.discountPrice ?? product.price ?? 0);
                        const discountPct =
                          price > discountPrice
                            ? Math.round(((price - discountPrice) / price) * 100)
                            : 0;
                        const imgUrl = getProductImageUrl(product.displayImages);

                        return (
                          <div
                            key={product._id}
                            onClick={() => {
                              navigate(`/product/${product.slug}`);
                              setIsSearchFocused(false);
                              setSearchQuery("");
                            }}
                            className="p-3 flex items-center gap-3.5 hover:bg-[#fcf5f1] transition-colors cursor-pointer group"
                          >
                            {/* Product Thumbnail */}
                            <div className="w-14 h-14 bg-white rounded-lg border border-stone-200 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={imgUrl}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = "/images/product-placeholder.webp";
                                }}
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold text-primary bg-[#fcf2ee] px-2 py-0.5 rounded border border-border">
                                  {product.categories?.[0] || product.category || "Authentic"}
                                </span>
                                {discountPct > 0 && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    {discountPct}% OFF
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-bold text-text group-hover:text-primary truncate">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-stone-500 truncate">
                                {product.flavour || "100% Genuine Formula"}
                              </p>
                            </div>

                            {/* Price & Add */}
                            <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-black text-primary">
                                  ₹{discountPrice.toLocaleString("en-IN")}
                                </span>
                                {price > discountPrice && (
                                  <span className="text-[11px] text-stone-400 line-through">
                                    ₹{price.toLocaleString("en-IN")}
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={(e) => handleQuickAdd(e, product)}
                                disabled={addingId === product._id}
                                className="px-2.5 py-1 bg-primary hover:bg-hover text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm transition-colors"
                              >
                                {addingId === product._id ? (
                                  <>
                                    <CheckCircle2 size={12} className="text-emerald-300" /> Added
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart size={11} /> Add
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-6 text-center text-stone-500">
                        <Search size={28} className="mx-auto text-stone-300 mb-2" />
                        <p className="text-xs font-bold text-stone-700">
                          No supplements found for "{searchQuery}"
                        </p>
                        <p className="text-[11px] text-stone-400 mt-1">
                          Try searching for "Whey", "Creatine", "Gainer", or "Peanut Butter"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-[#fbf8f5] text-center border-t border-stone-100">
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1.5 mx-auto"
                    >
                      <span>View all results for "{searchQuery}"</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: User Login & Cart Popover (HealthKart style) */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Login / Profile Button */}
          <button
            onClick={() => navigate(isAuthenticated ? "/profile" : "/login")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary hover:bg-hover text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            <User size={16} />
            <span className="hidden sm:inline">
              {isAuthenticated ? user?.name?.split(" ")[0] || "Account" : "Login"}
            </span>
          </button>

          {/* Cart Icon with Counter Badge + Hover Popover */}
          <div
            className="relative"
            ref={cartPopRef}
            onMouseEnter={() => setIsCartPopOpen(true)}
            onMouseLeave={() => setIsCartPopOpen(false)}
          >
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-text hover:text-primary transition-colors flex items-center cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* HealthKart-style Mini Cart Popover */}
            {isCartPopOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 sm:w-96 bg-white border border-border rounded-xl shadow-2xl z-50 overflow-hidden font-sans">
                <div className="p-3 bg-[#fbf8f5] border-b border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-text uppercase tracking-wide">
                    My Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
                  </span>
                  <Link
                    to="/cart"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View Cart
                  </Link>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-stone-100 p-2">
                  {displayedCartItems.length > 0 ? (
                    displayedCartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2.5 px-1">
                        <img
                          src={getProductImageUrl(item.image)}
                          alt={item.name}
                          className="w-12 h-12 object-contain bg-stone-50 rounded border border-stone-200 p-1 flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/product-placeholder.webp";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-stone-500">
                            Qty: {item.quantity} • ₹{item.discountPrice}
                          </p>
                        </div>
                        <span className="text-xs font-black text-primary">
                          ₹{(item.discountPrice * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-stone-500">
                      <ShoppingCart size={36} className="mx-auto text-stone-300 mb-2" />
                      <p className="text-xs font-semibold">Your Cart is Empty!</p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        Explore our clean, lab-tested supplements.
                      </p>
                    </div>
                  )}
                </div>

                {displayedCartItems.length > 0 && (
                  <div className="p-3 bg-[#fbf8f5] border-t border-stone-200">
                    <div className="flex items-center justify-between text-xs font-bold mb-3">
                      <span className="text-stone-600">Subtotal:</span>
                      <span className="text-sm font-extrabold text-text">
                        ₹{cartSubtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full py-2.5 bg-primary hover:bg-hover text-white text-xs font-bold rounded-lg transition-colors tracking-wide text-center uppercase cursor-pointer"
                    >
                      Proceed to Cart & Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="hidden md:block border-t border-border/70 bg-[#faf7f3] text-stone-700 text-xs font-medium">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between gap-4 relative">
          <div ref={megaMenuRef}>
            <button
              onClick={() => { if (window.innerWidth < 1024) setMobileDrawerOpen(true); else setIsCategoryMenuOpen(prev => !prev); }}
              aria-expanded={isCategoryMenuOpen || mobileDrawerOpen}
              onMouseEnter={() => { if (window.innerWidth >= 1024) setIsCategoryMenuOpen(true); }}
              aria-controls="header-categories-menu"
              className="flex items-center gap-2 py-3 px-4 my-1 bg-white border border-border text-primary font-bold hover:bg-[#fbf4f0] transition-colors whitespace-nowrap shadow-sm"
            >
              <Menu size={16} />
              <span>Shop By Category</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCategoryMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* HealthKart-style Visual Mega Dropdown with REAL PRODUCT IMAGES */}
            {isCategoryMenuOpen && activeMega && (
              <div
                id="header-categories-menu"
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
                className="absolute left-0 right-0 top-full w-full bg-white border border-border shadow-2xl z-50 flex rounded-b-2xl overflow-hidden font-sans animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {/* Column 1: Main Category Vertical Tabs */}
                <div className="w-56 bg-[#fbf8f5] border-r border-border p-2 space-y-1">
                  {MEGA_CATEGORIES.map((cat) => {
                    const IconComp = cat.icon;
                    const isActive = activeMegaCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveMegaCategory(cat.id)}
                        onClick={() => {
                          navigate(`/gomzi-supplement/${cat.slug}`);
                          setIsCategoryMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? "bg-white text-primary shadow-sm font-bold border border-border"
                            : "text-stone-700 hover:bg-white/60"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <IconComp
                            size={15}
                            className={isActive ? "text-primary" : "text-stone-400"}
                          />
                          <span>{cat.name}</span>
                        </span>
                        <ArrowRight size={12} className={isActive ? "opacity-100" : "opacity-30"} />
                      </button>
                    );
                  })}
                </div>

                {/* Column 2: Sub-Category Links */}
                <div className="flex-1 p-5 grid grid-cols-2 gap-6 bg-white text-xs">
                  {activeMega.subgroups.map((group, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-text uppercase tracking-wider mb-2.5 border-b border-stone-100 pb-1.5 text-[11px] text-primary flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-primary rounded-full inline-block" />
                        {group.title}
                      </h4>
                      <ul className="space-y-2 text-stone-600">
                        {group.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              to={item.slug === "reports" ? "/pdf/product-report.pdf" : `/gomzi-supplement/${item.slug}`}
                              reloadDocument={item.slug === "reports"}
                              onClick={() => setIsCategoryMenuOpen(false)}
                              className="hover:text-primary hover:font-bold transition-colors block py-0.5"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Column 3: Featured Category Showcase with REAL PRODUCT IMAGE */}
                <div className="w-64 bg-[#faf7f4] border-l border-border p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#fcf2ee] px-2 py-0.5 rounded border border-border inline-block mb-2">
                      Featured In {activeMega.name}
                    </span>

                    {/* Featured Product Card */}
                    <div className="mt-2 bg-white rounded-xl border border-border p-3 text-center shadow-sm">
                      <div className="w-28 h-28 mx-auto mb-2 flex items-center justify-center p-1">
                        <img
                          src={activeMega.featured.image}
                          alt={activeMega.featured.title}
                          className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform"
                        />
                      </div>
                      <h5 className="text-xs font-bold text-text line-clamp-2 leading-tight">
                        {activeMega.featured.title}
                      </h5>
                      <span className="mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                        {activeMega.featured.offer}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={activeMega.featured.link}
                    onClick={() => setIsCategoryMenuOpen(false)}
                    className="mt-3 w-full py-2 bg-primary hover:bg-hover text-white text-xs font-bold rounded-lg text-center transition-colors block shadow-sm"
                  >
                    Shop {activeMega.name} &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          <nav aria-label="Shop navigation" className="hidden lg:flex items-center gap-4 xl:gap-6 py-2 whitespace-nowrap">
            <Link to="/gomzi-supplement?sort=bestseller" onClick={() => setIsCategoryMenuOpen(false)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[#fcf2ee] hover:bg-[#f6e4dc] px-3 py-1.5 text-primary font-bold transition-colors">
              Shop Now
            </Link>
            {PRIMARY_LINKS.filter(link => !["/", "/gomzi-supplement", "/category"].includes(link.to)).map(link => (
              <NavigationLink key={link.to} link={link} onClick={() => setIsCategoryMenuOpen(false)} />
            ))}
            <a href="/pdf/product-report.pdf" target="_blank" rel="noreferrer" className="text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors">
              Batch Lab Reports
            </a>
          </nav>
          <div className="hidden md:flex lg:hidden xl:flex items-center gap-2 whitespace-nowrap">
            <PhoneCall size={13} className="text-primary" />
            <span className="text-[11px]">Need Help?</span>
            <a href={contact.telephoneUrl} className="font-bold text-text hover:text-primary">{contact.phone}</a>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-[999] flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div ref={drawerRef} role="dialog" aria-modal="true" aria-label="Shop navigation" className="relative w-80 max-w-[85%] bg-white h-full shadow-2xl flex flex-col z-10 font-sans">
            <div className="p-4 bg-[#fbf8f5] border-b border-stone-200 flex items-center justify-between">
              <Link to="/" onClick={() => setMobileDrawerOpen(false)} className="flex items-center">
                <img
                  src={branding.logo}
                  alt="Gomzi Nutrition"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                autoFocus
                aria-label="Close navigation menu"
                className="p-1 text-stone-500 hover:text-stone-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              <nav aria-label="Mobile navigation" className="pb-3 border-b border-stone-100 space-y-1">
                {PRIMARY_LINKS.map(link => (
                  <NavigationLink key={link.to} link={link} mobile onClick={() => setMobileDrawerOpen(false)} />
                ))}
              </nav>
              <div className="pb-3 border-b border-stone-100">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Top Categories
                </p>
                <div className="space-y-1.5 font-semibold text-stone-700">
                  <Link
                    to="/gomzi-supplement/whey-protein"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    Whey Protein (86)
                  </Link>
                  <Link
                    to="/gomzi-supplement/mass-gainer"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    Mass Gainer (23)
                  </Link>
                  <Link
                    to="/gomzi-supplement/creatine"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    Creatine Monohydrate (53)
                  </Link>
                  <Link
                    to="/gomzi-supplement/pre-workout"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    Pre-Workout Explosive (36)
                  </Link>
                  <Link
                    to="/gomzi-supplement/protein-bars-snacks"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    High Protein Peanut Butter (20)
                  </Link>
                  <Link
                    to="/gomzi-supplement/wellness-health"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-primary"
                  >
                    Apex Multivitamins &amp; Wellness
                  </Link>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href="/pdf/product-report.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="block font-bold text-emerald-700"
                >
                  Batch Lab Reports
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 bg-[#fbf8f5]">
              <button
                onClick={() => {
                  navigate(isAuthenticated ? "/profile" : "/login");
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-wider cursor-pointer"
              >
                {isAuthenticated ? "My Account" : "Login / Register"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
