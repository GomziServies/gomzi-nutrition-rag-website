import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Search,
  X,
  Clock,
  Calendar,
  ChevronRight,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  FileText,
  Mail,
  Send,
  FlaskConical,
  Award,
} from "lucide-react";
import SEO from "../component/SEO";
import { blogs as fallbackBlogs } from "../data/blogs";
import { getBlogsApi } from "../api/blog.api";

const resolveImageUrl = (img) => {
  if (!img) return "/images/blog-1.webp";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

// Enriched fallback metadata for initial load
const defaultEnrichedBlogs = fallbackBlogs.map((b) => {
  let readTime = "6 min read";
  let reviewer = "Dt. Chirag Pandey, RD";
  let tags = ["nutrition"];

  if (b.id === 1) {
    readTime = "6 min read";
    reviewer = "Dt. Chirag Pandey, RD";
    tags = ["nutrition", "protein", "guide"];
  } else if (b.id === 3) {
    readTime = "8 min read";
    reviewer = "Dt. Chirag Pandey, RD";
    tags = ["nutrition", "protein", "clinical"];
  } else if (b.id === 4) {
    readTime = "7 min read";
    reviewer = "Dt. Chirag Pandey, RD";
    tags = ["nutrition", "clinical"];
  } else if (b.id === 5) {
    readTime = "5 min read";
    reviewer = "Gomzi Scientific Team";
    tags = ["brand", "manufacturing"];
  }

  return {
    ...b,
    readTime: b.readTime || readTime,
    reviewer: b.reviewer || reviewer,
    tags: b.tags || tags,
  };
});

const filterCategories = [
  { id: "all", label: "All Publications" },
  { id: "protein", label: "Whey & Protein Guides" },
  { id: "clinical", label: "Clinical & ICMR RDA" },
  { id: "brand", label: "Brand & Philosophy" },
];

export default function BlogPage() {
  const [articles, setArticles] = useState(defaultEnrichedBlogs);
  const [loading, setLoading] = useState(true);
  const [apiCategoryCounts, setApiCategoryCounts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Fetch live dynamic publications from API
  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getBlogsApi();
        if (isMounted && res.data?.data) {
          const { blogs: liveBlogs, categoryCounts } = res.data.data;
          if (Array.isArray(liveBlogs) && liveBlogs.length > 0) {
            setArticles(liveBlogs);
          }
          if (categoryCounts) {
            setApiCategoryCounts(categoryCounts);
          }
        }
      } catch (err) {
        console.warn("Using fallback blogs, API fetch failed:", err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic Category Count Resolver
  const getCategoryCount = (catId) => {
    if (apiCategoryCounts && apiCategoryCounts[catId] !== undefined) {
      return apiCategoryCounts[catId];
    }
    if (catId === "all") return articles.length;
    return articles.filter((b) => {
      const tags = Array.isArray(b.tags) ? b.tags : [];
      const cat = (b.category || "").toLowerCase();
      if (catId === "protein") return tags.includes("protein") || /protein|whey/i.test(cat);
      if (catId === "clinical") return tags.includes("clinical") || /clinical|icmr/i.test(cat);
      if (catId === "brand") return tags.includes("brand") || /brand|rag|legacy/i.test(cat);
      return tags.includes(catId) || cat === catId;
    }).length;
  };

  // Filtered publications
  const filteredBlogs = useMemo(() => {
    return articles.filter((blog) => {
      const tags = Array.isArray(blog.tags) ? blog.tags : [];
      const cat = (blog.category || "").toLowerCase();

      // Category filter
      let matchesCategory = selectedCategory === "all";
      if (!matchesCategory) {
        if (selectedCategory === "protein") {
          matchesCategory = tags.includes("protein") || /protein|whey/i.test(cat);
        } else if (selectedCategory === "clinical") {
          matchesCategory = tags.includes("clinical") || /clinical|icmr/i.test(cat);
        } else if (selectedCategory === "brand") {
          matchesCategory = tags.includes("brand") || /brand|rag|legacy/i.test(cat);
        } else {
          matchesCategory = tags.includes(selectedCategory) || cat === selectedCategory;
        }
      }

      // Search query filter (matches title, desc, category, keywords)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (blog.title || "").toLowerCase().includes(q) ||
        (blog.desc || "").toLowerCase().includes(q) ||
        (blog.category || "").toLowerCase().includes(q) ||
        tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, selectedCategory]);

  // Featured publication (flagged in DB or fallback first article)
  const featuredBlog = useMemo(() => {
    return articles.find((b) => b.featured) || articles[0] || defaultEnrichedBlogs[0];
  }, [articles]);

  const isFeaturedInFiltered = useMemo(() => {
    if (!featuredBlog) return false;
    const targetKey = featuredBlog._id || featuredBlog.id || featuredBlog.slug;
    return filteredBlogs.some((b) => (b._id || b.id || b.slug) === targetKey);
  }, [featuredBlog, filteredBlogs]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="bg-[#faf8f6] font-modelica text-[#1c1c28] min-h-screen">
      <SEO
        title="Fitness & Nutrition Science Journal | Gomzi Supplement by RAG"
        description="Evidence-based sports nutrition articles, ICMR protein RDA guidelines, whey isolate vs concentrate comparisons, and formulation insights by registered dietitians."
      />

      {/* ── 1. LUXURY EDITORIAL HERO BANNER (COMPACT & MODERN) ── */}
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

        {/* Typographic Ambient Watermark */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-toma font-black uppercase leading-none text-white/[0.025] tracking-widest"
            style={{ fontSize: "clamp(80px, 16vw, 180px)" }}
          >
            JOURNAL
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-[11px] text-white/80 mb-3 sm:mb-4"
          >
            <Link to="/" className="hover:text-[#ffaa5a] transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-white/40" />
            <span className="font-semibold text-white">The Gomzi Journal</span>
          </nav>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff8914]/10 border border-[#ff8914]/25 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-[#ffaa5a]">
              <Sparkles size={12} className="text-[#ff8914]" />
              <span>Evidence-Based Nutrition & Science</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914] animate-pulse ml-0.5" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-3 sm:mt-4 font-toma text-white uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            <span>THE GOMZI SCIENCE JOURNAL. </span>
            <span
              style={{
                background: "linear-gradient(90deg, #ffaa5a 0%, #ff8914 50%, #f3a055 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ZERO FLUFF. PURE PROTOCOLS.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl mx-auto mt-2 text-xs sm:text-sm leading-relaxed text-gray-300 font-light">
            Clear, peer-reviewed sports nutrition science, official ICMR-NIN dietary guidelines, and formulation breakdowns written by practicing dietitians.
          </p>

          {/* Metric Highlights */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 text-[11px] sm:text-xs text-gray-300">
            <div className="inline-flex items-center gap-2">
              <FlaskConical size={13} className="text-[#ffaa5a]" />
              <span>Peer-Reviewed Formulations</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <ShieldCheck size={13} className="text-[#ffaa5a]" />
              <span>ICMR-NIN RDA Citing</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Award size={13} className="text-[#ffaa5a]" />
              <span>Reviewed by Registered Dietitians</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEARCH & FILTER COMMAND BAR ── */}
      <section className="sticky top-0 z-30 bg-[#faf8f6]/95 backdrop-blur-md border-b border-[#ebdcd7] py-4 transition-all shadow-sm">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {filterCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = getCategoryCount(cat.id);

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap active:scale-[0.98] cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] text-white shadow-md shadow-[#5C3124]/25 border border-amber-400/30"
                        : "bg-white text-gray-700 border border-[#ebdcd7] hover:border-[#5C3124]/40 hover:bg-[#fdfbf9]"
                    }`}
                  >
                    <span className="relative z-10">{cat.label}</span>
                    <span
                      className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, whey, ICMR..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#ebdcd7] text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5C3124] focus:ring-2 focus:ring-[#5C3124]/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED EDITORIAL SPOTLIGHT ── */}
      {selectedCategory === "all" && !searchQuery && isFeaturedInFiltered && (
        <section className="py-10 sm:py-14 bg-[#faf8f6]">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5C3124] flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#5C3124]" />
                Featured Editorial Publication
              </span>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
                Editor's Recommended Reading
              </span>
            </div>

            <Link
              to={`/blog/${featuredBlog.slug}`}
              className="group relative overflow-hidden block rounded-3xl border border-[#ebdcd7] bg-white shadow-xl hover:shadow-2xl hover:border-[#5C3124]/50 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Image Half */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-[#1c120e]">
                  <img
                    src={resolveImageUrl(featuredBlog.image)}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
                  
                  {/* Category overlay badge */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-[#ff8914] animate-pulse" />
                      {featuredBlog.category} • Landmark Guide
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    {/* Meta details */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={13} className="text-[#5C3124]" />
                        {featuredBlog.date}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#5C3124]">
                        <Clock size={13} />
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-toma text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c28] leading-[1.12] tracking-tight group-hover:text-[#5C3124] transition-colors">
                      {featuredBlog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light line-clamp-3 sm:line-clamp-4">
                      {featuredBlog.desc}
                    </p>

                    {/* Reviewer Capsule */}
                    <div className="mt-6 flex items-center gap-2.5 p-3 rounded-xl bg-[#fdf6f4] border border-[#ebdcd7]">
                      <div className="w-7 h-7 rounded-full bg-[#5C3124] text-white flex items-center justify-center shrink-0">
                        <UserCheck size={14} />
                      </div>
                      <div className="text-[11px] leading-tight">
                        <span className="font-bold text-gray-900 block">
                          Clinically Verified
                        </span>
                        <span className="text-gray-500 font-light">
                          {featuredBlog.reviewer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Read Article CTA */}
                  <div className="mt-8 pt-6 border-t border-[#ebdcd7] flex items-center justify-between">
                    <span className="font-toma text-xs font-bold uppercase tracking-wider text-[#5C3124]">
                      Read Landmark Analysis
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5C3124] to-[#48261c] text-white flex items-center justify-center group-hover:translate-x-1.5 transition-all shadow-md shadow-[#5C3124]/30 border border-amber-400/30">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
            </Link>
          </div>
        </section>
      )}

      {/* ── 4. PUBLICATION ARTICLE GRID ── */}
      <section className="py-12 sm:py-16 bg-[#faf8f6]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ebdcd7]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5C3124]">
                Research Library
              </span>
              <h2 className="font-toma text-2xl sm:text-3xl font-black text-[#1c1c28] tracking-tight mt-0.5">
                All Publications ({filteredBlogs.length})
              </h2>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-[#5C3124] hover:underline"
              >
                Reset Search
              </button>
            )}
          </div>

          {/* Grid View */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog._id || blog.id || blog.slug}
                  to={`/blog/${blog.slug}`}
                  className="group relative overflow-hidden flex flex-col h-full rounded-2xl bg-white border border-[#ebdcd7] shadow-sm hover:shadow-xl hover:border-[#5C3124]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Article Thumbnail */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-[#1c120e]">
                    <img
                      src={resolveImageUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#5C3124] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C3124]" />
                        {blog.category}
                      </span>
                    </div>

                    {/* Read Time Tag */}
                    <div className="absolute bottom-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-medium">
                        <Clock size={11} className="text-[#ffaa5a]" />
                        {blog.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Date & Reviewer */}
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={12} className="text-[#5C3124]" />
                          {blog.date}
                        </span>
                        <span className="text-[10px] font-semibold text-[#ff8914] bg-[#fdf6f4] px-2 py-0.5 rounded-md border border-[#ebdcd7]">
                          Evidence-Based
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-toma text-lg sm:text-xl font-bold text-[#1c1c28] leading-[1.25] tracking-tight group-hover:text-[#5C3124] transition-colors line-clamp-2 mb-2.5">
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-3 mb-4">
                        {blog.desc}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        <FileText size={13} className="text-[#5C3124]" />
                        <span className="font-medium truncate max-w-[160px]">
                          {blog.reviewer}
                        </span>
                      </div>

                      <span className="w-8 h-8 rounded-full bg-[#fdf6f4] group-hover:bg-gradient-to-r group-hover:from-[#5C3124] group-hover:to-[#48261c] text-[#5C3124] group-hover:text-white flex items-center justify-center transition-all shrink-0 border border-[#ebdcd7] group-hover:border-amber-400/30 shadow-xs">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#ebdcd7] max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#fdf6f4] text-[#5C3124] mx-auto flex items-center justify-center mb-4">
                <Search size={24} />
              </div>
              <h3 className="font-toma text-xl font-bold text-gray-900 mb-1">
                No Publications Found
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
                We couldn't find any articles matching "{searchQuery}". Try searching for terms like "Whey", "ICMR", "Protein", or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white font-toma text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-[#5C3124]/25 hover:shadow-lg hover:shadow-[#5C3124]/40 border border-amber-400/30 relative overflow-hidden group inline-flex items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                <span className="relative z-10">Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. SCIENCE ADVISORY INTEGRITY GUARANTEE ── */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#ebdcd7]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C3124]">
              Editorial Standards
            </span>
            <h2 className="font-toma text-2xl sm:text-4xl text-[#1c1c28] mt-1 font-extrabold tracking-tight uppercase">
              Our Publication Integrity Rules
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto mt-2">
              Sports nutrition content is flooded with sponsored misinformation. Here is how we protect editorial truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: FlaskConical,
                title: "Clinical Dietetics Oversight",
                desc: "Every article is written or reviewed by registered dietitians who understand clinical bio-availability and real human digestion.",
              },
              {
                icon: ShieldCheck,
                title: "ICMR & NABL Grounded",
                desc: "All protein and macro calculations cite the Indian Council of Medical Research (ICMR-NIN) 2020 RDA guidelines for Indian physiology.",
              },
              {
                icon: CheckCircle2,
                title: "Zero Sponsored Brand Bias",
                desc: "No proprietary blend obfuscation, no paid influencer endorsements, and no hidden affiliate commissions on our publications.",
              },
            ].map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-[#faf8f6] border border-[#ebdcd7] shadow-sm hover:shadow-xl hover:border-[#5C3124]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] text-[#ffaa5a] flex items-center justify-center mb-5 shadow-md border border-amber-400/30 group-hover:scale-105 group-hover:border-amber-400/50 group-hover:shadow-lg group-hover:shadow-[#5C3124]/30 transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-toma text-lg font-bold text-gray-900 group-hover:text-[#5C3124] transition-colors mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {rule.desc}
                    </p>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. WEEKLY RESEARCH DIGEST NEWSLETTER ── */}
      <section className="py-16 sm:py-20 bg-[#faf8f6]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#1c120e] via-[#261712] to-[#140c09] text-white shadow-2xl relative overflow-hidden border border-[#5C3124]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff8914]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#ffaa5a] mb-2">
                <Mail size={14} className="text-[#ff8914]" />
                Weekly Science Briefing
              </span>
              <h2 className="font-toma text-2xl sm:text-4xl font-extrabold text-white mt-1 leading-snug">
                Evidence-Based Nutrition In Your Inbox.
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 font-light leading-relaxed">
                Join 25,000+ athletes receiving weekly clinical breakdowns, macro timing guides, and supplement formulation analyses. Zero spam.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto shrink-0">
              {newsletterSubscribed ? (
                <div className="p-4 rounded-xl bg-white/10 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#ffaa5a]" />
                  <span>You're subscribed! Check your inbox for the welcome guide.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-[#ff8914] focus:ring-2 focus:ring-[#ff8914]/20 transition-all sm:w-72"
                  />
                  <button
                    type="submit"
                    className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6d3a2b] via-[#854432] to-[#5C3124] hover:from-[#5C3124] hover:to-[#48261c] border-2 border-amber-400/50 text-white font-toma font-extrabold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-[#5C3124]/40 hover:shadow-2xl hover:shadow-[#5C3124]/60 shrink-0 cursor-pointer"
                  >
                    <span className="relative z-10 tracking-wider">Subscribe</span>
                    <Send size={14} className="relative z-10 text-amber-200 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
