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
    <div className="bg-bg-cream text-text min-h-screen">
      <SEO
        title="Fitness & Nutrition Science Journal | Gomzi Supplement by RAG"
        description="Evidence-based sports nutrition articles, ICMR protein RDA guidelines, whey isolate vs concentrate comparisons, and formulation insights by registered dietitians."
      />

      {/* ── 1. HERO BANNER ── */}
      <section className="w-full border-b border-border bg-white">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-8 text-center">
          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-[40px] leading-tight">
            The Gomzi Science Journal. Zero Fluff. Pure Protocols.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-light">
            Clear, peer-reviewed sports nutrition science, official ICMR-NIN dietary guidelines, and formulation breakdowns written by practicing dietitians.
          </p>

          {/* Metric Highlights */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-text-light">
            <div className="inline-flex items-center gap-2">
              <FlaskConical size={13} className="text-primary" />
              <span>Peer-Reviewed Formulations</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <ShieldCheck size={13} className="text-primary" />
              <span>ICMR-NIN RDA Citing</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Award size={13} className="text-primary" />
              <span>Reviewed by Registered Dietitians</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEARCH & FILTER COMMAND BAR ── */}
      <section className="sticky top-0 z-30 bg-bg-cream/95 backdrop-blur-md border-b border-primary-border py-4 transition-all shadow-sm">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            {/* Category Pills (centered horizontally, wraps into 2 lines on smaller screens) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full">
              {filterCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = getCategoryCount(cat.id);

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group relative overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                      isActive
                        ? "btn-gradient text-white shadow-md shadow-primary/25 border border-amber-400/30"
                        : "bg-white text-gray-700 border border-primary-border hover:border-primary/40 hover:bg-[#fdfbf9]"
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
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, whey, ICMR..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-primary-border text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
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
        <section className="py-10 sm:py-14 bg-bg-cream">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <BookOpen size={14} className="text-primary" />
                Featured Editorial Publication
              </span>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
                Editor's Recommended Reading
              </span>
            </div>

            <Link
              to={`/blog/${featuredBlog.slug}`}
              className="group relative overflow-hidden block rounded-3xl border border-primary-border bg-white shadow-xl hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-500"
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
                        <Calendar size={13} className="text-primary" />
                        {featuredBlog.date}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        <Clock size={13} />
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text leading-[1.12] tracking-tight group-hover:text-primary transition-colors">
                      {featuredBlog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-light line-clamp-3 sm:line-clamp-4">
                      {featuredBlog.desc}
                    </p>

                    {/* Reviewer Capsule */}
                    <div className="mt-6 flex items-center gap-2.5 p-3 rounded-xl bg-primary-light border border-primary-border">
                      <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
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
                  <div className="mt-8 pt-6 border-t border-primary-border flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Read Landmark Analysis
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-hover text-white flex items-center justify-center group-hover:translate-x-1.5 transition-all shadow-md shadow-primary/30 border border-amber-400/30">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── 4. PUBLICATION ARTICLE GRID ── */}
      <section className="py-12 sm:py-16 bg-bg-cream">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Research Library
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight mt-0.5">
                All Publications ({filteredBlogs.length})
              </h2>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-primary hover:underline"
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
                  className="group relative overflow-hidden flex flex-col h-full rounded-2xl bg-white border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300"
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
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {blog.category}
                      </span>
                    </div>

                    {/* Read Time Tag */}
                    <div className="absolute bottom-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-medium">
                        <Clock size={11} className="text-[#ff8914]" />
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
                          <Calendar size={12} className="text-primary" />
                          {blog.date}
                        </span>
                        <span className="text-[10px] font-semibold text-[#ff8914] bg-primary-light px-2 py-0.5 rounded-md border border-primary-border">
                          Evidence-Based
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-text leading-[1.25] tracking-tight group-hover:text-primary transition-colors line-clamp-2 mb-2.5">
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
                        <FileText size={13} className="text-primary" />
                        <span className="font-medium truncate max-w-[160px]">
                          {blog.reviewer}
                        </span>
                      </div>

                      <span className="w-8 h-8 rounded-full bg-primary-light group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover text-primary group-hover:text-white flex items-center justify-center transition-all shrink-0 border border-primary-border group-hover:border-amber-400/30 shadow-xs">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-primary-border max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-primary-light text-primary mx-auto flex items-center justify-center mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
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
                className="px-5 py-2.5 rounded-xl btn-gradient text-white text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 border border-amber-400/30 relative overflow-hidden group inline-flex items-center justify-center cursor-pointer"
              >
                <span className="relative z-10">Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. SCIENCE ADVISORY INTEGRITY GUARANTEE ── */}
      <section className="py-14 sm:py-20 bg-white border-y border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full border border-primary-border mb-3">
              Editorial Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
              Our Publication Integrity Rules
            </h2>
            <p className="text-xs sm:text-sm text-text-light max-w-lg mx-auto mt-2 leading-relaxed font-normal">
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
                  className="group relative p-6 sm:p-7 rounded-2xl bg-bg-light/60 border border-border hover:bg-white hover:border-primary/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-light border border-primary-border text-primary flex items-center justify-center mb-5 shadow-2xs group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-105 transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors mb-2 tracking-tight">
                      {rule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. WEEKLY RESEARCH DIGEST NEWSLETTER ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-border bg-gradient-to-r from-primary-light/60 via-white to-primary-light/40 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-primary-border shadow-xs mb-3">
                <Mail size={13} className="text-primary" />
                <span>Weekly Science Briefing</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight leading-tight">
                Evidence-Based Nutrition In Your Inbox
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-2 leading-relaxed font-normal">
                Join 25,000+ athletes receiving weekly clinical breakdowns, macro timing guides, and supplement formulation analyses. Zero spam.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              {newsletterSubscribed ? (
                <div className="p-3.5 sm:p-4 rounded-xl bg-success-light border border-success/30 text-success text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-success" />
                  <span>You&apos;re subscribed! Check your inbox for the welcome guide.</span>
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
                    className="px-4 py-3 rounded-lg bg-white border border-border text-xs sm:text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all sm:w-72 shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send size={14} className="text-white" />
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