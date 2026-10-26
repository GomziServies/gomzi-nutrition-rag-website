import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { fetchProducts } from "../../services/product.service";
import CartPopover from "./CartPopover";
import MegaMenu from "./MegaMenu";
import {
  HEADER_NAV_LINKS,
  QUICK_NAV_LINKS,
} from "../../data/navigationCategories";

  /**

 * HealthKart 2-Tier Master Navbar Component
 *
 * Tier 1: Brand logo, prominent center search bar with live auto-suggest,
 *         profile/login controls, and shopping cart popover.
 * Tier 2: 'Shop By Category' mega-menu trigger, horizontal quick-access categories,
 *         and customer support utilities.
 * Responsive: Collapsible mobile drawer with full category taxonomy accordion.
 */
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();
  const { items: cartItems, cartId, deleteItem } = useCart();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Menus & Drawers State
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Popover Timer ref for smooth hover transitions without flickering
  const cartTimerRef = useRef(null);
  const searchContainerRef = useRef(null);
  const megaMenuContainerRef = useRef(null);

  const cartCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  // Close menus on route change
  useEffect(() => {
    setMegaMenuOpen(false);
    setCartPopoverOpen(false);
    setProfileDropdownOpen(false);
    setDrawerOpen(false);
    setMobileSearchOpen(false);
    setSearchFocused(false);
  }, [location.pathname]);

  // Handle click outside for search, profile, and mega menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchFocused(false);
      }
      if (
        megaMenuContainerRef.current &&
        !megaMenuContainerRef.current.contains(event.target)
      ) {
        setMegaMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMegaMenuOpen(false);
        setSearchFocused(false);
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Debounced product suggestions (300ms)
  useEffect(() => {
    const query = searchQuery.trim();
    if (query.length < 2) {
      setProductSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const result = await fetchProducts({
          page: 1,
          limit: 6,
          search: query,
        });
        if (result.success && Array.isArray(result.data)) {
          setProductSuggestions(result.data);
        } else {
          setProductSuggestions([]);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
        setProductSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    navigate(`/gomzi-supplement?search=${encodeURIComponent(query)}`);
    setSearchFocused(false);
    setMobileSearchOpen(false);
  };

  const handleSuggestionSelect = (productName) => {
    setSearchQuery("");
    setProductSuggestions([]);
    setSearchFocused(false);
    navigate(`/gomzi-supplement?search=${encodeURIComponent(productName)}`);
  };

  // Hover handlers for Cart Popover
  const handleCartMouseEnter = () => {
    if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
    setCartPopoverOpen(true);
  };

  const handleCartMouseLeave = () => {
    cartTimerRef.current = setTimeout(() => {
      setCartPopoverOpen(false);
    }, 250);
  };

  const isLinkActive = (href) => {
    const currentPath = location.pathname;

    // Home: ONLY active on exact "/"
    if (href === "/") {
      return currentPath === "/";
    }

    // Shop: active on "/gomzi-supplement" or nested product view
    if (href === "/gomzi-supplement") {
      return (
        currentPath === "/gomzi-supplement" ||
        currentPath.startsWith("/gomzi-supplement/") ||
        currentPath.startsWith("/product/")
      );
    }

    // Categories: active on "/category"
    if (href === "/category") {
      return currentPath === "/category" || currentPath.startsWith("/category/");
    }

    // Faqs: active on "/faq"
    if (href === "/faq") {
      return currentPath === "/faq" || currentPath.startsWith("/faq/");
    }

    // About Us: active on "/about"
    if (href === "/about") {
      return currentPath === "/about" || currentPath.startsWith("/about/");
    }

    // Blogs: active on "/blog"
    if (href === "/blog") {
      return currentPath === "/blog" || currentPath.startsWith("/blog/");
    }

    // Contact Us: active on "/contact-us"
    if (href === "/contact-us") {
      return currentPath === "/contact-us" || currentPath.startsWith("/contact-us/");
    }

    if (href.includes("?")) {
      const [path, query] = href.split("?");
      return currentPath === path && location.search.includes(query);
    }

    return currentPath === href;
  };

  return (
    <header className="w-full bg-white relative z-50 shadow-header">
      {/* =========================================================================
          TIER 1: MIDDLE HEADER (Logo | Search | Login | Cart)
          ========================================================================= */}
      <div className="w-full bg-white">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 h-[64px] md:h-[87px] flex items-center justify-between gap-4 lg:gap-8">
          {/* LEFT: Mobile Hamburger & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 md:w-1/4">
            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 text-text bg-transparent border-none cursor-pointer rounded-md hover:bg-bg-light transition-colors"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo - Official Gomzi Supplements Logo */}
            <Link
              to="/"
              className="flex items-center text-decoration-none group"
              aria-label="Gomzi Nutrition Home"
            >
              <img
                src="/images/gomzi-supplements-dark.webp"
                alt="Gomzi Supplements"
                className="h-8 sm:h-10 md:h-11 w-auto max-w-[150px] md:max-w-[210px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/rag-icon-logo.png";
                }}
              />
            </Link>
          </div>

          {/* CENTER: Prominent HealthKart-Style Search Bar (Desktop) */}
          <div
            ref={searchContainerRef}
            className="hidden md:flex flex-1 max-w-[654px] relative"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="w-full relative flex items-center"
            >
              <div
                className={`w-full h-11 md:h-12 flex items-center rounded-sm bg-white border transition-colors duration-150 px-3 gap-2 ${
                  searchFocused ? "border-primary" : "border-border-2"
                }`}
              >
                {/* Search Magnifier Icon */}
                <span className="text-text-muted flex-shrink-0">
                  <Search className="w-4 h-4" />
                </span>

                {/* Search Input Field */}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search for products & brands..."
                  className="w-full bg-transparent border-none outline-none text-sm text-text placeholder:text-text-muted h-full appearance-none"
                  autoComplete="off"
                />

                {/* Clear Input Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setProductSuggestions([]);
                    }}
                    className="p-1 text-text-muted hover:text-text bg-transparent border-none cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Live Autocomplete Suggestions Dropdown */}
            {searchFocused && (productSuggestions.length > 0 || isSearching) && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-[#dbdee9] overflow-hidden z-[999999] animate-in fade-in duration-150">
                {isSearching && productSuggestions.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Searching supplements...
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        Suggested Products
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {productSuggestions.length} found
                      </span>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                      {productSuggestions.map((product) => {
                        const price =
                          product.variation?.[0]?.discountPrice ||
                          product.discountPrice ||
                          product.price;

                        return (
                          <button
                            key={product._id}
                            type="button"
                            onClick={() => handleSuggestionSelect(product.name)}
                            className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#fbf9f8] transition-colors border-none bg-transparent cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 min-w-0 pr-2">
                              <img
                                src={
                                  product.displayImages?.[0] ||
                                  "/images/product-placeholder.webp"
                                }
                                alt={product.name}
                                className="w-8 h-8 object-contain rounded bg-gray-50 flex-shrink-0"
                                onError={(e) => {
                                  e.target.src =
                                    "/images/product-placeholder.webp";
                                }}
                              />
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-text truncate group-hover:text-primary transition-colors">
                                  {product.name}
                                </p>
                                <span className="text-[10px] text-gray-400">
                                  {product.category || "Authentic Supplement"}
                                </span>
                              </div>
                            </div>
                            {price && (
                              <span className="text-xs font-bold text-primary flex-shrink-0">
                                ₹{Number(price).toLocaleString("en-IN")}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="text-xs font-bold text-primary hover:underline bg-transparent border-none cursor-pointer"
                      >
                        View all results for "{searchQuery}" →
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: User Account & Cart Section (HealthKart .hk-header-cart) */}
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 md:w-1/4 md:justify-end">
            {/* Mobile Search Icon Trigger */}
            <button
              onClick={() => setMobileSearchOpen((prev) => !prev)}
              className="md:hidden p-2 text-text bg-transparent border-none cursor-pointer"
              aria-label="Toggle search input"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Profile / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border-2 hover:border-primary text-xs font-medium text-text bg-transparent cursor-pointer transition-colors"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center text-primary">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
                </button>

                {/* Profile Flyout Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#dbdee9] py-1.5 z-[999999] animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-text truncate">
                        {user?.name || "Athlete"}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      My Profile & Orders
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors bg-transparent border-none cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary text-decoration-none"
              >
                Login
              </Link>
            )}

            {/* HealthKart Styled Cart Icon with Live Badge & Popover */}
            <div
              className="relative"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <Link
                to="/cart"
                onClick={() => setCartPopoverOpen(false)}
                className="relative p-1.5 flex items-center justify-center text-text hover:text-primary transition-colors text-decoration-none"
                aria-label={`Cart with ${cartCount} items`}
              >
                {/* HealthKart Authentic Cart SVG */}
                <svg
                  width="27"
                  height="25"
                  viewBox="0 0 29 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:scale-105"
                >
                  <path
                    d="M11 26C11.5523 26 12 25.3284 12 24.5C12 23.6716 11.5523 23 11 23C10.4477 23 10 23.6716 10 24.5C10 25.3284 10.4477 26 11 26Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 26C24.5523 26 25 25.3284 25 24.5C25 23.6716 24.5523 23 24 23C23.4477 23 23 23.6716 23 24.5C23 25.3284 23.4477 26 24 26Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1H5.90909L9.19818 17.9603C9.31041 18.5434 9.6178 19.0672 10.0665 19.4401C10.5153 19.8129 11.0768 20.0109 11.6527 19.9995H23.5818C24.1578 20.0109 24.7193 19.8129 25.168 19.4401C25.6168 19.0672 25.9241 18.5434 26.0364 17.9603L28 7.33318H7.13636"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Orange Circular Count Badge (HealthKart .total-count) */}
                <span className="absolute -top-1 -right-1 bg-sale text-white text-[12px] font-medium h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </Link>

              {/* Cart Popover Dropdown */}
              {cartPopoverOpen && (
                <CartPopover
                  items={cartItems}
                  cartCount={cartCount}
                  cartId={cartId}
                  deleteItem={deleteItem}
                  onClose={() => setCartPopoverOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 bg-[#f8fafb] animate-in slide-in-from-top-1 duration-150">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products & categories..."
                className="w-full h-10 px-4 pl-9 text-xs bg-white border border-[#dbdee9] rounded-lg outline-none focus:border-primary"
                autoFocus
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-1 text-gray-400 bg-transparent border-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* =========================================================================
          TIER 2: LOWER NAV BAR (Shop By Category | Home | Shop | Categories | ...)
          ========================================================================= */}
      <nav className="hidden lg:block w-full bg-white border-t-2 border-border relative">
        <div
          ref={megaMenuContainerRef}
          className="max-w-[1170px] mx-auto px-4 md:px-0 h-[70px] flex items-center justify-center relative"
        >
          <ul className="flex w-full items-center justify-center gap-6 lg:gap-8 list-none p-0 m-0 h-full">
            {HEADER_NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);

              if (link.hasDropdown) {
                const isDropdownActive = active || megaMenuOpen;
                return (
                  <li key={link.label} className="h-full flex items-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMegaMenuOpen((prev) => !prev);
                      }}
                      className={`flex items-center gap-1.5 px-0 py-5 text-sm font-medium transition-colors duration-150 text-decoration-none select-none cursor-pointer border-b-2 -mb-px ${
                        isDropdownActive
                          ? "border-primary text-primary"
                          : "border-transparent text-text hover:text-primary"
                      }`}
                      aria-expanded={megaMenuOpen}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownActive ? "rotate-180" : "text-text-muted"
                        }`}
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={link.label} className="h-full flex items-center">
                  <Link
                    to={link.href}
                    className={`flex items-center px-0 py-5 text-sm font-medium transition-colors duration-150 text-decoration-none select-none cursor-pointer border-b-2 -mb-px ${
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-text hover:text-primary"
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Category Dropdown MegaMenu (Opens on Click only) */}
          <MegaMenu
            isOpen={megaMenuOpen}
            onClose={() => setMegaMenuOpen(false)}
          />
        </div>
      </nav>

      {/* =========================================================================
          TIER 3: MOBILE ACCORDION DRAWER (Offcanvas Sidebar)
          ========================================================================= */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 z-[99998] transition-opacity duration-300 lg:hidden"
          />

          {/* Sliding Drawer */}
          <div className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-[99999] shadow-2xl flex flex-col lg:hidden animate-in slide-in-from-left duration-300 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#f8fafb]">
              <img
                src="/images/rag-icon-logo.png"
                alt="Gomzi Nutrition"
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 bg-transparent border-none cursor-pointer rounded-lg"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin">
              {/* Standard Page Links */}
              <div className="py-2">
                <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Menu
                </div>
                {HEADER_NAV_LINKS.map((link) => {
                  const active = isLinkActive(link.href);

                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-decoration-none transition-colors rounded-lg mx-2 my-0.5 ${
                        active
                          ? "text-white bg-primary font-bold shadow-xs"
                          : "text-[#2b2b36] hover:text-primary hover:bg-primary-light"
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                    </Link>
                  );
                })}
              </div>

              {/* Account Controls */}
              <div className="p-4 bg-gray-50 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setDrawerOpen(false)}
                      className="block w-full py-2.5 text-center text-xs font-bold text-text bg-white border border-[#dbdee9] rounded-lg text-decoration-none"
                    >
                      My Profile & Orders
                    </Link>
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        logout();
                      }}
                      className="block w-full py-2.5 text-center text-xs font-bold text-red-600 bg-red-50 rounded-lg border-none cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                    className="block w-full py-2.5 text-center text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg text-decoration-none"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
