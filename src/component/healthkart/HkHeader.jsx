// src/component/healthkart/HkHeader.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  FileCheck,
  ShieldCheck,
  PhoneCall,
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
import { getGuestCart } from "../../services/cartStorage.service";
import { fetchProducts } from "../../services/product.service";
import {
  HOME_CATEGORIES,
  FLASH_DEAL_PRODUCTS,
  BEST_SELLER_PRODUCTS,
  getProductImageUrl,
  handleQuickAddToCart,
} from "../../data/homeProducts";

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
    slug: "sports-nutrition",
    subgroups: [
      {
        title: "Proteins",
        items: [
          { name: "Whey Protein Concentrate (86)", slug: "whey-protein" },
          { name: "Whey Protein Isolate (46)", slug: "whey-protein-isolate" },
          { name: "100% Vegan Plant Protein (17)", slug: "plant-protein" },
          { name: "Casein & Night Protein (3)", slug: "casein-protein" },
        ],
      },
      {
        title: "Workout Boosters",
        items: [
          { name: "Micronized Creatine (53)", slug: "creatine" },
          { name: "Ignition Pre-Workout (36)", slug: "pre-workout" },
          { name: "Instantized BCAA 2:1:1 (5)", slug: "bcaa" },
          { name: "EAA Essential Aminos (4)", slug: "eaa" },
        ],
      },
    ],
    featured: {
      title: "Gomzi 100% Whey Isolate",
      image: "/images/protein-removebg.png",
      tag: "86 Products",
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
          { name: "Heavyweight Mass Gainer (23)", slug: "mass-gainer" },
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
          { name: "High-Stim Pre-Workout (36)", slug: "pre-workout" },
          { name: "Explosive Pump Formulas", slug: "pre-workout" },
          { name: "Beta-Alanine & Citrulline", slug: "pre-workout" },
        ],
      },
      {
        title: "Recovery & Hydration",
        items: [
          { name: "Pure Creapure Creatine (53)", slug: "creatine" },
          { name: "Intra-Workout BCAA & EAA", slug: "bcaa" },
          { name: "Electrolytes & Hydration", slug: "electrolytes-hydration" },
        ],
      },
    ],
    featured: {
      title: "Creapure Micronized Creatine",
      image: "/images/product-category/creatine.webp",
      tag: "53 Products",
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
          { name: "High Protein Peanut Butter (20)", slug: "protein-bars-snacks" },
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
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { items: authCartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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

  // Sync cart count & items across auth and guest
  const updateCartState = () => {
    if (isAuthenticated && authCartItems?.length > 0) {
      setCartCount(authCartItems.reduce((acc, item) => acc + item.quantity, 0));
      setDisplayedCartItems(authCartItems);
    } else {
      const guestItems = getGuestCart();
      const count = guestItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(count);
      setDisplayedCartItems(
        guestItems.map((g) => ({
          _id: g._id,
          name: g.item_details?.name || "Gomzi Product",
          flavour: g.item_details?.flavour || "Standard",
          price: g.item_details?.price || 1999,
          discountPrice: g.item_details?.discountPrice || 1499,
          quantity: g.quantity || 1,
          image: g.item_details?.displayImages?.[0] || "product-category/whey-protein.webp",
        }))
      );
    }
  };

  useEffect(() => {
    updateCartState();
  }, [authCartItems, isAuthenticated]);

  useEffect(() => {
    const handleCartUpdate = () => updateCartState();
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
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

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetchProducts({
          search: q,
          limit: 6,
        });

        if (res.success && res.data && res.data.length > 0) {
          setLiveResults(res.data);
        } else {
          // Fallback to local filtering
          const localList = [...FLASH_DEAL_PRODUCTS, ...BEST_SELLER_PRODUCTS];
          const filtered = localList.filter(
            (p) =>
              p.name.toLowerCase().includes(q.toLowerCase()) ||
              p.category?.toLowerCase().includes(q.toLowerCase())
          );
          setLiveResults(filtered);
        }
      } catch (err) {
        console.error("Live search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
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
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 font-sans border-b border-[#ebdcd2]/60">
      {/* ── Middle Header Row (HealthKart style) ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 text-stone-700 hover:text-[#95442c] rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img
              src="/images/rag-icon-logo.png"
              alt="Gomzi Nutrition"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#1c1917] font-toma leading-none">
                GOMZI
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#95442c] uppercase">
                Nutrition
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Search Field with Real Supplement Dropdown */}
        <div className="flex-1 max-w-2xl mx-2 relative" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div
              className={`flex items-center bg-[#fbf9f6] border rounded-xl h-11 px-3.5 transition-all shadow-inner ${
                isSearchFocused
                  ? "border-[#95442c] bg-white ring-2 ring-[#95442c]/20 shadow-md"
                  : "border-[#ebdcd2] hover:border-[#95442c]/60"
              }`}
            >
              <Search
                size={18}
                className={`mr-2.5 flex-shrink-0 transition-colors ${
                  isSearchFocused ? "text-[#95442c]" : "text-stone-400"
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search for Whey Protein, Creatine, Mass Gainer, Peanut Butter..."
                className="w-full bg-transparent text-sm text-[#1c1917] placeholder:text-stone-400 focus:outline-none"
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
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ebdcd2] rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-stone-100 animate-in fade-in slide-in-from-top-1 duration-150">
              {/* STATE 1: Empty Query -> Popular Categories with REAL IMAGES & Trending Tags */}
              {!searchQuery.trim() ? (
                <div className="p-4 sm:p-5">
                  {/* Popular Categories with Real Product Images */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={13} className="text-[#95442c]" /> Popular Categories
                      </span>
                      <Link
                        to="/gomzi-supplement"
                        onClick={() => setIsSearchFocused(false)}
                        className="text-[11px] font-bold text-[#95442c] hover:underline"
                      >
                        All 419+ Products &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                      {HOME_CATEGORIES.slice(0, 6).map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            navigate(`/gomzi-supplement/${cat.slug}`);
                            setIsSearchFocused(false);
                          }}
                          className="group flex flex-col items-center p-2 rounded-xl bg-[#faf7f4] hover:bg-[#fcf2ee] border border-[#ebdcd2]/70 hover:border-[#95442c] transition-all text-center cursor-pointer"
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 mb-1.5 flex items-center justify-center p-1">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-sm"
                              onError={(e) => {
                                e.currentTarget.src = cat.fallbackImage || "/images/product-placeholder.webp";
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-stone-800 group-hover:text-[#95442c] truncate w-full">
                            {cat.name}
                          </span>
                          <span className="text-[9px] text-stone-400 font-semibold">
                            {cat.badge}
                          </span>
                        </button>
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
                          className="px-3 py-1.5 rounded-lg bg-[#f5ede6] hover:bg-[#95442c] text-stone-800 hover:text-white text-xs font-semibold transition-all border border-[#ebdcd2] cursor-pointer"
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
                      <FileCheck size={14} className="text-[#95442c]" /> NABL Certified Reports
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
                      <span className="flex items-center gap-1 text-xs text-[#95442c] font-medium">
                        <Loader2 size={13} className="animate-spin" /> Searching 419+ items...
                      </span>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {liveResults.length > 0 ? (
                      liveResults.map((product) => {
                        const price = product.price || product.discountPrice || 1999;
                        const discountPrice = product.discountPrice || product.price || 1499;
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
                                <span className="text-[10px] font-bold text-[#95442c] bg-[#fcf2ee] px-2 py-0.5 rounded border border-[#ebdcd2]">
                                  {product.categories?.[0] || product.category || "Authentic"}
                                </span>
                                {discountPct > 0 && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                    {discountPct}% OFF
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-bold text-[#1c1917] group-hover:text-[#95442c] truncate">
                                {product.name}
                              </h4>
                              <p className="text-[11px] text-stone-500 truncate">
                                {product.flavour || "100% Genuine Formula"}
                              </p>
                            </div>

                            {/* Price & Add */}
                            <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-black text-[#95442c]">
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
                                className="px-2.5 py-1 bg-[#95442c] hover:bg-[#7a3522] text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-sm transition-colors"
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
                      className="text-xs font-bold text-[#95442c] hover:underline flex items-center justify-center gap-1.5 mx-auto"
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#95442c] hover:bg-[#7a3522] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
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
              className="relative p-2 text-[#1c1917] hover:text-[#95442c] transition-colors flex items-center cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#95442c] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* HealthKart-style Mini Cart Popover */}
            {isCartPopOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 sm:w-96 bg-white border border-[#ebdcd2] rounded-xl shadow-2xl z-50 overflow-hidden font-sans">
                <div className="p-3 bg-[#fbf8f5] border-b border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1c1917] uppercase tracking-wide">
                    My Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
                  </span>
                  <Link
                    to="/cart"
                    className="text-xs font-semibold text-[#95442c] hover:underline"
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
                          <p className="text-xs font-bold text-[#1c1917] truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-stone-500">
                            Qty: {item.quantity} • ₹{item.discountPrice}
                          </p>
                        </div>
                        <span className="text-xs font-black text-[#95442c]">
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
                      <span className="text-sm font-extrabold text-[#1c1917]">
                        ₹{cartSubtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full py-2.5 bg-[#95442c] hover:bg-[#7a3522] text-white text-xs font-bold rounded-lg transition-colors tracking-wide text-center uppercase cursor-pointer"
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

      {/* ── Visual Category & Sub-Menu Strip (HealthKart Architecture) ── */}
      <div className="border-t border-[#ebdcd2]/70 bg-[#faf7f3] text-stone-800 text-xs font-medium relative">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between relative">
          {/* Shop By Category Mega-Menu Trigger */}
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              className="flex items-center gap-2 py-2.5 px-3.5 bg-white border-x border-[#ebdcd2] text-[#95442c] font-bold hover:bg-[#fbf4f0] transition-colors cursor-pointer shadow-sm"
            >
              <Menu size={16} />
              <span>Shop By Category</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCategoryMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* HealthKart-style Visual Mega Dropdown with REAL PRODUCT IMAGES */}
            {isCategoryMenuOpen && (
              <div
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
                className="absolute left-0 top-full w-[820px] lg:w-[920px] bg-white border border-[#ebdcd2] shadow-2xl z-50 flex rounded-b-2xl overflow-hidden font-sans animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {/* Column 1: Main Category Vertical Tabs */}
                <div className="w-56 bg-[#fbf8f5] border-r border-[#ebdcd2] p-2 space-y-1">
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
                            ? "bg-white text-[#95442c] shadow-sm font-bold border border-[#ebdcd2]"
                            : "text-stone-700 hover:bg-white/60"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <IconComp
                            size={15}
                            className={isActive ? "text-[#95442c]" : "text-stone-400"}
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
                      <h4 className="font-bold text-[#1c1917] uppercase tracking-wider mb-2.5 border-b border-stone-100 pb-1.5 text-[11px] text-[#95442c] flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-[#95442c] rounded-full inline-block" />
                        {group.title}
                      </h4>
                      <ul className="space-y-2 text-stone-600">
                        {group.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              to={`/gomzi-supplement/${item.slug}`}
                              onClick={() => setIsCategoryMenuOpen(false)}
                              className="hover:text-[#95442c] hover:font-bold transition-colors block py-0.5"
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
                <div className="w-64 bg-[#faf7f4] border-l border-[#ebdcd2] p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#95442c] bg-[#fcf2ee] px-2 py-0.5 rounded border border-[#ebdcd2] inline-block mb-2">
                      Featured In {activeMega.name}
                    </span>

                    {/* Featured Product Card */}
                    <div className="mt-2 bg-white rounded-xl border border-[#ebdcd2] p-3 text-center shadow-sm">
                      <div className="w-28 h-28 mx-auto mb-2 flex items-center justify-center p-1">
                        <img
                          src={activeMega.featured.image}
                          alt={activeMega.featured.title}
                          className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform"
                        />
                      </div>
                      <h5 className="text-xs font-bold text-[#1c1917] line-clamp-2 leading-tight">
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
                    className="mt-3 w-full py-2 bg-[#95442c] hover:bg-[#7a3522] text-white text-xs font-bold rounded-lg text-center transition-colors block shadow-sm"
                  >
                    Shop {activeMega.name} &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quick Category Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 py-2">
            <Link
              to="/gomzi-supplement?sort=bestseller"
              className="flex items-center gap-1.5 font-bold text-[#95442c] bg-[#fcf2ee] hover:bg-[#f6e4dc] px-2.5 py-1 rounded-full border border-[#ebdcd2] transition-colors"
            >
              <Flame size={13} className="text-[#95442c] fill-current" />
              <span>Best Sellers</span>
            </Link>

            <Link
              to="/gomzi-supplement/whey-protein"
              className="text-stone-700 hover:text-[#95442c] transition-colors hover:font-semibold"
            >
              Whey Proteins
            </Link>

            <Link
              to="/gomzi-supplement/mass-gainer"
              className="text-stone-700 hover:text-[#95442c] transition-colors hover:font-semibold"
            >
              Mass Gainers
            </Link>

            <Link
              to="/gomzi-supplement/creatine"
              className="text-stone-700 hover:text-[#95442c] transition-colors hover:font-semibold"
            >
              Creatine &amp; Pre-Workout
            </Link>

            <Link
              to="/gomzi-supplement/protein-bars-snacks"
              className="text-stone-700 hover:text-[#95442c] transition-colors hover:font-semibold"
            >
              Peanut Butter
            </Link>

            <Link
              to="/gomzi-supplement/wellness-health"
              className="text-stone-700 hover:text-[#95442c] transition-colors hover:font-semibold"
            >
              Daily Wellness
            </Link>

            <a
              href="/pdf/product-report.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-800 font-bold hover:text-emerald-950 transition-colors bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
            >
              <FileCheck size={13} className="text-emerald-700" />
              <span>NABL Reports</span>
            </a>
          </nav>

          {/* Customer Care Hotline */}
          <div className="hidden md:flex items-center gap-2 text-stone-600 py-2">
            <PhoneCall size={13} className="text-[#95442c]" />
            <span className="text-[11px]">Need Help?</span>
            <a
              href="tel:+919875270200"
              className="text-xs font-bold text-[#1c1917] hover:text-[#95442c]"
            >
              +91 98752 70200
            </a>
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
          <div className="relative w-80 max-w-[80%] bg-white h-full shadow-2xl flex flex-col z-10 font-sans">
            <div className="p-4 bg-[#fbf8f5] border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/images/rag-icon-logo.png"
                  alt="Gomzi"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-extrabold text-[#95442c] tracking-wider text-sm">
                  GOMZI NUTRITION
                </span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              <div className="pb-3 border-b border-stone-100">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Top Categories
                </p>
                <div className="space-y-1.5 font-semibold text-stone-700">
                  <Link
                    to="/gomzi-supplement/whey-protein"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-[#95442c]"
                  >
                    Whey Protein (86)
                  </Link>
                  <Link
                    to="/gomzi-supplement/mass-gainer"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-[#95442c]"
                  >
                    Mass Gainer (23)
                  </Link>
                  <Link
                    to="/gomzi-supplement/creatine"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-[#95442c]"
                  >
                    Creatine Monohydrate (53)
                  </Link>
                  <Link
                    to="/gomzi-supplement/pre-workout"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-[#95442c]"
                  >
                    Pre-Workout Explosive (36)
                  </Link>
                  <Link
                    to="/gomzi-supplement/protein-bars-snacks"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-[#95442c]"
                  >
                    High Protein Peanut Butter (20)
                  </Link>
                  <Link
                    to="/gomzi-supplement/wellness-health"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="block py-1 hover:text-[#95442c]"
                  >
                    Apex Multivitamins &amp; Wellness
                  </Link>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  to="/gomzi-supplement"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block font-bold text-[#1c1917] hover:text-[#95442c]"
                >
                  All 419+ Products
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block text-stone-600 hover:text-[#95442c]"
                >
                  About Gomzi
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block text-stone-600 hover:text-[#95442c]"
                >
                  FAQs
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block text-stone-600 hover:text-[#95442c]"
                >
                  Contact Support
                </Link>
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
                className="w-full py-2.5 bg-[#95442c] text-white text-xs font-bold rounded-lg uppercase tracking-wider cursor-pointer"
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
