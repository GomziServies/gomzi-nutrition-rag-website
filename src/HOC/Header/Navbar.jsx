import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fetchProducts } from "../../services/product.service";
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
  const [navTop, setNavTop] = useState(0);
  const [navHeight, setNavHeight] = useState(64);
  const { isAuthenticated } = useAuth();
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
    setSearchOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
    }
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
      {/* ── MAIN NAV BAR ── */}
      <nav
        ref={navRef}
        className="w-full bg-bg border-b border-border sticky top-0 z-50 shadow-sm font-modelica"
      >
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-18 py-1.5">
          <div className="relative flex items-center justify-between h-16">
            {/* LEFT */}
            <div className="flex items-center gap-8">
              {/* Hamburger */}
              <button
                onClick={() => {
                  setDrawerOpen((p) => !p);
                  setSearchOpen(false);
                }}
                className="lg:hidden text-text hover:text-hover transition-colors p-1 bg-transparent border-none cursor-pointer"
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

              {/* Logo - desktop */}
              <button
                onClick={() => handleNavigation("/")}
                className="hidden lg:flex flex-shrink-0 bg-transparent border-none cursor-pointer p-0"
              >
                <img
                  src="/images/rag-logo.webp"
                  alt="Gomzi Supplement by RAG"
                  className="h-12 w-auto object-contain"
                />
              </button>
            </div>

            {/* CENTER: Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <li key={link.label} className="relative">
                    <DropdownButton
                      label={link.label}
                      isOpen={aboutOpen}
                      onClick={() => setAboutOpen((p) => !p)}
                    />
                    {aboutOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-bg border border-border shadow-md rounded-md py-2 min-w-[160px] z-50">
                        {link.dropdown.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleNavigation(item.href)}
                            className={`block w-full text-left px-4 py-2.5 text-sm font-bold transition-colors duration-150 font-modelica bg-transparent border-none cursor-pointer ${
                              isActive(item.href)
                                ? "bg-secondary text-white"
                                : "text-text-light hover:bg-bg-light hover:text-text"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.label}>
                    <NavLink
                      href={link.href}
                      label={link.label}
                      onClick={handleNavigation}
                      isActive={isActive(link.href)}
                    />
                  </li>
                ),
              )}
            </ul>

            {/* CENTER: Logo - mobile */}
            <button
              onClick={() => handleNavigation("/")}
              className="absolute left-1/2 -translate-x-1/2 lg:hidden bg-transparent border-none cursor-pointer p-0"
            >
              <img
                src="/images/rag-logo.webp"
                alt="Gomzi Supplement by RAG"
                className="h-12 w-auto object-contain"
              />
            </button>

            {/* RIGHT: Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              <IconBtn
                label="Search"
                onClick={() => {
                  setSearchOpen((p) => !p);
                  setDrawerOpen(false);
                  setSearchQuery("");
                }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
              </IconBtn>

              <IconBtn
                label="Account"
                className="hidden lg:flex"
                onClick={() =>
                  handleNavigation(isAuthenticated ? "/profile" : "/login")
                }
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path strokeLinecap="round" d="M5 20c0-4 3-6 7-6s7 2 7 6" />
                </svg>
              </IconBtn>

              <button
                onClick={() => handleNavigation("/cart")}
                aria-label="Cart"
                className="relative text-text-light hover:text-text transition-colors duration-200 p-1 flex items-center justify-center bg-transparent border-none cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8"
                  />
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="17" cy="21" r="1" />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full" />
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
