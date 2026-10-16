import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fetchProducts } from "../../services/product.service";
import useCart from "../../hooks/useCart";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/gomzi-supplement" },
  { label: "Categories", href: "/category" },
  { label: "Faqs", href: "/faq" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
];

function NavLink({ href, label, onClick, isActive }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick(href);
      }}
      className={`relative inline-block text-sm font-bold whitespace-nowrap transition-colors duration-200 font-modelica bg-transparent border-none cursor-pointer ${
        isActive ? "text-secondary" : "text-text hover:text-hover"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <span
        className="absolute -bottom-0.5 left-0 w-full h-px bg-secondary transition-transform duration-300 origin-left"
        style={{ transform: hovered || isActive ? "scaleX(1)" : "scaleX(0)" }}
      />
    </button>
  );
}

function DropdownButton({ label, isOpen, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center gap-1 text-text text-sm font-bold whitespace-nowrap transition-colors duration-200 hover:text-hover font-modelica bg-transparent border-none cursor-pointer p-0"
    >
      {label}
      <svg
        className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200"
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <span
        className="absolute -bottom-0.5 left-0 w-full h-px bg-secondary transition-transform duration-300 origin-left"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />
    </button>
  );
}

function IconBtn({ label, children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`text-text-light hover:text-text transition-colors duration-200 p-1 flex items-center justify-center rounded-sm cursor-pointer bg-transparent border-none ${className}`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [navTop, setNavTop] = useState(0);
  const [navHeight, setNavHeight] = useState(64);
  const { isAuthenticated, user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const cartCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;
  const [productSuggestions, setProductSuggestions] = useState([]);

  // ── Track navbar top + height dynamically (scroll + resize) ──
  useEffect(() => {
    const updateNavRect = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setNavTop(rect.top);
        setNavHeight(rect.height);
      }
    };
    updateNavRect();
    window.addEventListener("scroll", updateNavRect);
    window.addEventListener("resize", updateNavRect);
    return () => {
      window.removeEventListener("scroll", updateNavRect);
      window.removeEventListener("resize", updateNavRect);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigation = (href) => {
    navigate(href);
    setDrawerOpen(false);
    setAboutOpen(false);
  };

  const isActive = (href) => location.pathname === href;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    const value = searchQuery.trim();

    if (!value) return;

    navigate(`/gomzi-supplement?search=${encodeURIComponent(value)}`);

    setSearchQuery("");
    setSuggestions([]);
    setSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (value) => {
    navigate(`/gomzi-supplement?search=${encodeURIComponent(value)}`);

    setSearchQuery("");
    setSuggestions([]);
    setSearchOpen(false);
  };

  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setProductSuggestions([]);
        return;
      }

      const result = await fetchProducts({
        page: 1,
        limit: 5,
        search: searchQuery,
      });

      if (result.success) {
        setProductSuggestions(result.data || []);
      }
    };

    const timeout = setTimeout(searchProducts, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <>
      {/* ── HEALTHKART STYLE MAIN NAV BAR ── */}
      <nav
        ref={navRef}
        className="w-full bg-white border-b border-[#dbdee9] sticky top-0 z-50 shadow-[0_2px_6px_rgba(0,0,0,0.06)] font-modelica"
      >
        {/* Unified Single-Tier Main Navigation Bar */}
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px] gap-4 lg:gap-6">
            {/* LEFT: Logo & Mobile Hamburger */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => {
                  setDrawerOpen((p) => !p);
                  setSearchOpen(false);
                }}
                className="lg:hidden text-[#1c1c28] hover:text-[#5C3124] transition-colors p-1 bg-transparent border-none cursor-pointer"
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
              >
                {drawerOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center bg-transparent border-none cursor-pointer p-0"
              >
                <img
                  src="/images/rag-icon-logo.png"
                  alt="Gomzi Supplement by RAG"
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </button>
            </div>

            {/* CENTER: Primary Navigation Links */}
            <ul className="hidden lg:flex items-center gap-5 xl:gap-7 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className={`text-sm font-bold transition-colors duration-150 py-1 bg-transparent border-none cursor-pointer ${
                      isActive(link.href)
                        ? "text-[#5C3124] border-b-2 border-[#5C3124]"
                        : "text-[#2b2b36] hover:text-[#5C3124]"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* RIGHT: Compact Search, Login, & Cart */}
            <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
              {/* Compact Search Input */}
              <div className="hidden md:flex relative w-44 lg:w-52 xl:w-60">
                <div className="w-full relative flex items-center bg-[#f7f7f7] border border-[#dbdee9] focus-within:border-[#5C3124] focus-within:bg-white rounded-full h-9 lg:h-10 transition-all duration-200">
                  <span className="pl-3 pr-1.5 text-[#8b8b8b] flex items-center pointer-events-none">
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 19L15 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className="w-full bg-transparent border-none outline-none text-xs text-[#1c1c28] placeholder:text-[#8b8b8b] pr-2.5 h-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setProductSuggestions([]);
                      }}
                      className="pr-2.5 text-xs text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {productSuggestions.length > 0 && (
                  <div className="absolute top-full right-0 w-72 mt-1.5 bg-white border border-[#dbdee9] rounded-xl shadow-lg overflow-hidden z-50">
                    {productSuggestions.map((product) => (
                      <button
                        key={product._id}
                        onClick={() => handleSuggestionClick(product.name)}
                        className="w-full text-left px-4 py-2 hover:bg-[#fdf6f4] text-xs text-gray-800 flex items-center justify-between border-b border-gray-100 last:border-none cursor-pointer bg-transparent"
                      >
                        <span className="font-medium line-clamp-1">{product.name}</span>
                        <span className="text-[10px] text-[#5C3124] font-bold">View</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle Button */}
              <button
                onClick={() => {
                  setSearchOpen((p) => !p);
                  setDrawerOpen(false);
                }}
                className="md:hidden text-gray-700 hover:text-[#5C3124] p-1.5 cursor-pointer bg-transparent border-none"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
              </button>

              {/* Login / Profile Button */}
              {isAuthenticated ? (
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#dbdee9] hover:border-[#5C3124] rounded-lg text-xs font-bold text-[#1c1c28] hover:text-[#5C3124] transition-colors cursor-pointer bg-transparent"
                >
                  <svg
                    className="w-4 h-4 text-[#5C3124]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path strokeLinecap="round" d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                  </svg>
                  <span className="hidden sm:inline">{user?.name || "Account"}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavigation("/login")}
                  className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#5C3124] hover:bg-[#48261c] text-white font-bold text-xs sm:text-sm rounded-lg transition-all shadow-sm cursor-pointer border-none"
                >
                  Login
                </button>
              )}

              {/* Cart Button with Orange Badge */}
              <button
                onClick={() => handleNavigation("/cart")}
                aria-label="Cart"
                className="relative p-1.5 sm:p-2 text-[#1c1c28] hover:text-[#5C3124] transition-colors flex items-center justify-center bg-transparent border-none cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 29 27"
                  fill="none"
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
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#ff8914] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── SEARCH BAR  ── */}
      <div
        className="fixed left-0 right-0 bg-bg shadow-lg z-[102]"
        style={{
          top: navTop,
          height: searchOpen ? navHeight : 0,
          overflow: searchOpen ? "visible" : "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center">
          <div className="relative w-full max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search pages... (e.g. FAQ, Cart, About)"
              autoFocus={searchOpen}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="w-full h-14 px-6 pr-14 text-base bg-bg-light border-2 border-border rounded-full focus:outline-none focus:border-secondary transition-colors font-modelica text-text placeholder:text-text-light"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-light hover:text-text transition-colors bg-transparent border-none cursor-pointer"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Suggestions Dropdown */}
            {productSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-2xl shadow-lg overflow-hidden">
                {productSuggestions.map((product) => (
                  <button
                    key={product._id}
                    onClick={() =>
                      navigate(
                        `/gomzi-supplement?search=${encodeURIComponent(product.name)}`,
                      )
                    }
                    className="w-full text-left px-5 py-3 hover:bg-gray-50"
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
              setSuggestions([]);
            }}
            className="ml-4 p-2 text-text-light hover:text-text transition-colors bg-transparent border-none cursor-pointer"
            aria-label="Close search"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ── BACKDROP ── */}
      <div
        onClick={() => {
          setDrawerOpen(false);
          setSearchOpen(false);
          setSearchQuery("");
          setSuggestions([]);
        }}
        className="fixed left-0 right-0 bottom-0 bg-black/30 z-[100] transition-opacity duration-300 lg:hidden"
        style={{
          top: `${navTop + navHeight}px`,
          opacity: drawerOpen || searchOpen ? 1 : 0,
          pointerEvents: drawerOpen || searchOpen ? "auto" : "none",
        }}
      />

      {/* ── LEFT DRAWER ── */}
      <div
        className="fixed left-0 bottom-0 w-full sm:w-80 bg-bg z-[101] shadow-lg border-r border-border font-modelica overflow-y-auto flex flex-col lg:hidden"
        style={{
          top: `${navTop + navHeight}px`,
          transform: drawerOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <nav className="flex-1 py-2">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setAboutOpen((p) => !p)}
                  className="flex items-center justify-between w-full px-5 py-4 text-base font-bold text-text border-b border-section bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer font-modelica hover:bg-bg-light transition-colors"
                >
                  {link.label}
                  <svg
                    className="w-4 h-4 transition-transform duration-200"
                    style={{
                      transform: aboutOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {aboutOpen && (
                  <div className="bg-bg-light">
                    {link.dropdown.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavigation(item.href)}
                        className={`block w-full text-left px-5 py-3.5 pl-9 text-[15px] font-semibold border-b border-border font-modelica transition-colors bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                          isActive(item.href)
                            ? "text-secondary bg-section"
                            : "text-text-light hover:text-text hover:bg-section"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.label}
                onClick={() => handleNavigation(link.href)}
                className={`block w-full text-left px-5 py-4 text-base font-bold border-b border-section font-modelica transition-colors bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                  isActive(link.href)
                    ? "text-secondary bg-bg-light"
                    : "text-text hover:bg-bg-light hover:text-hover"
                }`}
              >
                {link.label}
              </button>
            ),
          )}
        </nav>
      </div>
    </>
  );
}
