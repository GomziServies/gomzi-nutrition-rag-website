import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  CreditCard,
  Sparkles,
  Send,
  Lock,
  Award,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { successToast, errorToast } from "../../utils/toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      errorToast("Please enter a valid email address");
      return;
    }
    successToast("Welcome to Gomzi VIP Club! Check your inbox for your 10% discount code.");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Authentic Gomzi 7 Categories matching catalog
  const shopLinks = [
    { label: "All Products", path: "/gomzi-supplement" },
    { label: "Whey Protein", path: "/gomzi-supplement/whey-protein" },
    { label: "Mass Gainer", path: "/gomzi-supplement/mass-gainer" },
    { label: "Plant Protein", path: "/gomzi-supplement/plant-protein" },
    { label: "Pre Workout", path: "/gomzi-supplement/pre-workout" },
    { label: "BCAA", path: "/gomzi-supplement/bcaa" },
    { label: "Creatine", path: "/gomzi-supplement/creatine" },
    { label: "Wellness & Health", path: "/gomzi-supplement/wellness-health" },
  ];

  const brandLinks = [
    { label: "About Gomzi & RAG", path: "/about" },
    { label: "Quality & Testing Lab", path: "/about" },
    { label: "Certifications & FSSAI", path: "/about" },
    { label: "Athletes & Ambassadors", path: "/about" },
    { label: "Nutrition & Science Blogs", path: "/blog" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  const customerCareLinks = [
    { label: "Track Your Order", path: "/shipping-policy" },
    { label: "Shipping Policy", path: "/shipping-policy" },
    { label: "Returns & Refund Guarantee", path: "/refund-policy" },
    { label: "Frequently Asked Questions", path: "/faq" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
  ];

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "100% Authentic & Direct",
      sub: "Zero middlemen. Direct from RAG certified facility.",
    },
    {
      icon: Truck,
      title: "Express Pan-India Shipping",
      sub: "Priority dispatch to 19,000+ pin codes across India.",
    },
    {
      icon: CreditCard,
      title: "256-Bit Encrypted Payments",
      sub: "100% secure checkout via UPI, Cards & NetBanking.",
    },
    {
      icon: Award,
      title: "Lab-Tested Purity",
      sub: "FSSAI, ISO 22000 & GMP compliant manufacturing.",
    },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#0e0a09] text-gray-300 font-inter border-t border-white/5"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5C3124]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5C3124]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ── 1. TOP VALUE / TRUST PILLARS BAR ── */}
      <div className="relative z-10 border-b border-white/[0.08] bg-[#140e0c]/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden flex items-start gap-4 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-gradient-to-r hover:from-[#5C3124]/40 hover:via-[#6d3a2b]/35 hover:to-[#48261c]/30 border border-white/[0.06] hover:border-amber-400/40 hover:shadow-lg hover:shadow-[#5C3124]/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-[#5C3124] via-[#6d3a2b] to-[#3a1e16] border border-amber-400/30 flex items-center justify-center shrink-0 shadow-md shadow-[#5C3124]/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#5C3124]/40 transition-all duration-300">
                    <Icon className="w-6 h-6 text-amber-200 group-hover:text-amber-100 transition-colors" />
                  </div>
                  <div className="relative z-10 min-w-0 flex-1">
                    <h4 className="text-white text-sm font-bold tracking-tight group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {item.sub}
                    </p>
                  </div>
                  {/* Sheen sweep highlight on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. VIP CLUB & NEWSLETTER SECTION ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14">
        <div className="group/newsletter relative rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12 border border-[#5C3124]/40 bg-gradient-to-r from-[#1c120e] via-[#261712] to-[#1c120e] hover:border-amber-400/40 shadow-2xl transition-all duration-500">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#5C3124]/30 to-transparent rounded-full blur-2xl pointer-events-none" />
          {/* Subtle sheen highlight across banner on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover/newsletter:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#5C3124]/30 border border-[#ebdcd7]/30 text-amber-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gomzi Athlete Circle</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get 10% Off Your First Order
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mt-2 leading-relaxed">
                Join 50,000+ athletes. Receive science-backed training protocols, secret restock alerts, and member-only pricing.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md mx-auto lg:mx-0 w-full"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#5C3124] focus:ring-2 focus:ring-[#5C3124]/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="group/btn relative overflow-hidden h-12 px-7 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] border border-amber-400/30 text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#5C3124]/30 hover:shadow-xl hover:shadow-[#5C3124]/50 shrink-0"
                >
                  <span>Claim 10% Off</span>
                  <Send className="w-4 h-4 text-amber-300 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                </button>
              </form>
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Instant Coupon Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No Spam Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN NAVIGATION GRID ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Authority & Contact (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div
                onClick={() => navigate("/")}
                className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white shadow-md border border-white/20 mb-4 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <img
                  src="/images/gomzi-supplements-dark.webp"
                  alt="Gomzi Supplement by RAG"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-6">
                Premium Sports Nutrition Supplements engineered with laboratory-certified purity. FSSAI & GMP certified formulations trusted by elite athletes across India.
              </p>

              {/* Verified Trust Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-300 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  FSSAI Certified
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-300 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ISO 22000:2018
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-300 bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  100% Dope-Free
                </span>
              </div>
            </div>

            {/* Quick Contact & WhatsApp Support */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <a
                href="https://wa.me/919875270200?text=Hi%20Gomzi%20Nutrition%20Team,%20I%20have%20an%20inquiry%20regarding%20supplements."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-xs group"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp (+91 98752 70200)</span>
              </a>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#5C3124]" />
                <a href="mailto:info@ragnutrition.com" className="hover:text-white transition-colors">
                  info@ragnutrition.com
                </a>
              </p>
              <p className="text-xs text-gray-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5C3124] shrink-0 mt-0.5" />
                <span>
                  G-23 Time Square, Gaurav Path Road, Surat, Gujarat 394510
                </span>
              </p>
            </div>
          </div>

          {/* Column 2: Shop Categories (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#5C3124]" />
              <span>Shop Products</span>
            </h4>
            <ul className="space-y-3">
              {shopLinks.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-[#5C3124] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Brand & Science (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#5C3124]" />
              <span>Our Story</span>
            </h4>
            <ul className="space-y-3">
              {brandLinks.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-[#5C3124] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help & Policies (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-[#5C3124]" />
                <span>Help & Policies</span>
              </h4>
              <ul className="space-y-3 mb-6">
                {customerCareLinks.map(({ label, path }) => (
                  <li key={label}>
                    <button
                      onClick={() => navigate(path)}
                      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <ArrowRight className="w-3 h-3 text-[#5C3124] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links & Payment Security */}
            <div className="pt-4 border-t border-white/[0.08]">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Follow The Tribe
              </h5>
              <div className="flex items-center gap-2.5 mb-5">
                <a
                  href="https://www.instagram.com/gomzi.supplement__rag"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-[#5C3124] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                  aria-label="Instagram"
                >
                  <FaInstagram size={17} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61590460356446"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-[#5C3124] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={15} />
                </a>
                <a
                  href="https://wa.me/919875270200"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-[#5C3124] text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={16} />
                </a>
              </div>

              {/* Secure Payment Badges */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-300 mb-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Encrypted & Safe Checkout</span>
                </div>
                <img
                  src="/images/Payment_icons.avif"
                  alt="Accepted payment methods: UPI, Visa, Mastercard, NetBanking"
                  className="w-full max-w-[220px] h-auto object-contain brightness-95"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM COPYRIGHT & LEGAL BAR ── */}
      <div className="relative z-10 border-t border-white/[0.08] bg-black/40 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-gray-300 transition-colors text-center md:text-left"
          >
            © 2026 <span className="text-white font-semibold">Gomzi Supplement</span> by RAG. All Rights Reserved.
          </p>

          <p className="text-center text-gray-400 font-medium hidden sm:block">
            Manufactured with international quality standards • Third-party lab tested
          </p>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-[#5C3124] text-gray-300 hover:text-white transition-all duration-200 cursor-pointer shadow-xs border border-white/5"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
