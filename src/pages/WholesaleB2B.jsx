import useContactDetails from "../content/useContactDetails";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPercent,
  FiTruck,
  FiShield,
  FiPackage,
  FiCheckCircle,
  FiPhoneCall,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiFileText,
  FiPlus,
  FiX,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../component/SEO";
import { submitWholesaleInquiry } from "../services/wholesale.service";
import { successToast, errorToast } from "../utils/toast";
import CustomSelect from "../component/common/CustomSelect";

const BUSINESS_TYPE_OPTIONS = [
  { value: "Gym / Fitness Studio", label: "Gym / Fitness Studio" },
  { value: "Nutrition & Supplement Store", label: "Nutrition & Supplement Store" },
  { value: "CrossFit Box / MMA Academy", label: "CrossFit Box / MMA Academy" },
  { value: "Personal Trainer / Fitness Coach", label: "Personal Trainer / Fitness Coach" },
  { value: "Regional Distributor / Wholesaler", label: "Regional Distributor / Wholesaler" },
];

const ESTIMATED_VOLUME_OPTIONS = [
  { value: "₹25,000 - ₹50,000", label: "₹25,000 - ₹50,000", subtitle: "Starter Tier" },
  { value: "₹50,000 - ₹1,50,000", label: "₹50,000 - ₹1,50,000", subtitle: "Pro Fitness Center" },
  { value: "₹1,50,000 - ₹5,00,000", label: "₹1,50,000 - ₹5,00,000", subtitle: "Multi-Branch Chain" },
  { value: "₹5,00,000+", label: "₹5,00,000+", subtitle: "Master Regional Distributor" },
];

const B2B_BENEFITS = [
  {
    icon: <FiPercent className="w-5 h-5 text-primary" />,
    title: "Direct Factory Margins",
    desc: "Maximized profit margins with zero intermediary markups or broker fees.",
  },
  {
    icon: <FiTruck className="w-5 h-5 text-primary" />,
    title: "Pan-India Bulk Logistics",
    desc: "Insured, temperature-stable priority freight dispatched within 24-48 hours.",
  },
  {
    icon: <FiShield className="w-5 h-5 text-primary" />,
    title: "100% Certified Stock",
    desc: "FSSAI & NABL lab-tested batches with anti-counterfeit QR codes on every tub.",
  },
  {
    icon: <FiPackage className="w-5 h-5 text-primary" />,
    title: "Flexible Low MOQs",
    desc: "Custom starter tiers tailored specifically for gyms, trainers, and retailers.",
  },
];

const WHOLESALE_TIERS = [
  {
    name: "Gym Starter Tier",
    tag: "Ideal for Local Gyms & Studios",
    moq: "Min. Order ₹25,000",
    margin: "35% - 40% Margin",
    benefits: [
      "Fast-moving Whey Protein & Creatine essentials",
      "Complimentary tabletop acrylic display stand",
      "5x Free Gomzi athlete shaker bottles",
      "Dedicated WhatsApp dispatch coordinator",
      "Pan-India doorstep delivery in 2-4 days",
    ],
    recommended: false,
  },
  {
    name: "Fitness Center Pro",
    tag: "Most Popular for Multi-Branch Centers",
    moq: "Min. Order ₹75,000",
    margin: "42% - 48% Margin",
    benefits: [
      "Complete sports nutrition & wellness catalog",
      "Free branded floor display rack & banner kit",
      "25x Free premium athlete shakers & gym towels",
      "Priority dispatch within 24 hours from hub",
      "Dedicated senior corporate account manager",
      "Certified batch CoA lab verification reports",
    ],
    recommended: true,
  },
  {
    name: "Master Distributor & Retailer",
    tag: "For Supplement Stores & Chains",
    moq: "Min. Order ₹2,50,000",
    margin: "50%+ Direct Margin",
    benefits: [
      "Lowest factory-direct tier pricing in India",
      "Territorial distribution exclusivity options",
      "Custom bulk pallet dispatch via insured freight",
      "Flexible commercial billing terms",
      "Direct laboratory escalation & formulation hotline",
      "Co-marketing fund & promotional athlete support",
    ],
    recommended: false,
  },
];

const WHOLESALE_FAQS = [
  {
    q: "What is the minimum initial order value (MOQ) for gym partners?",
    a: "Our starter gym tier begins at just ₹25,000, allowing gym owners and personal trainers to test high-demand formulations like 100% Whey Protein and Micronized Creatine with minimal working capital lockup.",
  },
  {
    q: "How does Gomzi ensure authentic, non-counterfeited supplements?",
    a: "Every single tub manufactured by Gomzi Supplement by RAG features a tamper-evident holographic seal and an individualized anti-counterfeit QR code that gym members can scan to verify authenticity and download the specific batch lab report.",
  },
  {
    q: "How fast is bulk wholesale dispatch across India?",
    a: "Orders confirmed before 2:00 PM are dispatched within 24 to 48 hours from our central warehousing hub in Surat, Gujarat. Delivery takes 1–3 business days for tier-1 metro hubs and 3–5 days across 19,000+ pin codes pan-India.",
  },
  {
    q: "Do you supply marketing materials and display racks for gyms?",
    a: "Yes. Pro and Master wholesale orders receive complimentary high-grade metal display racks, counter acrylic stands, promotional banners, and athlete merchandising kits to drive on-premise sales.",
  },
  {
    q: "Can personal trainers and coaches earn affiliate wholesale commissions?",
    a: "Yes. We offer trainer wholesale accounts allowing coaches to either purchase inventory for direct client handoff or provide digital referral codes that generate monthly payouts.",
  },
];

export default function WholesaleB2B() {
  const contact = useContactDetails();
  const [activeFaq, setActiveFaq] = useState(0);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    businessType: "Gym / Fitness Studio",
    estimatedVolume: "₹50,000 - ₹1,50,000",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formSubmitting) return;
    setFormSubmitting(true);
    setFormError("");
    try {
      await submitWholesaleInquiry(formData, window.location.href);
      successToast("Wholesale application submitted successfully.");
      setFormSuccess(true);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "We couldn't submit your application. Please try again.";
      setFormError(message);
      errorToast(message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const scrollToApply = () => {
    const el = document.getElementById("apply-wholesale");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-light text-text overflow-x-hidden min-h-screen">
      <SEO
        title="B2B Wholesale & Gym Supply | Gomzi Nutrition by RAG"
        description="Equip your gym or retail store with certified Gomzi Nutrition sports supplements. Direct factory margins, pan-India bulk logistics, 100% certified stock, and flexible low MOQs."
      />



      {/* ── 1. MAIN ENTERPRISE SHOWCASE SECTION ── */}
      <section className="w-full py-8 sm:py-12 md:py-16 bg-white border-b border-border">
        <div className="site-container">
          {/* Main Card Enclosure */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#fdfbf9] border border-border/90 p-5 sm:p-8 lg:p-12 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Content & Advantage Grid (7 cols) */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Eyebrow Badge Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5ede6] border border-border mb-3.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                    B2B Wholesale & Gym Supply
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-text tracking-tight leading-tight">
                  Equip Your Gym or Retail Store with{" "}
                  <span className="text-primary font-bold">Certified Nutrition</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-3 text-xs sm:text-sm md:text-base text-text-light leading-relaxed max-w-xl font-normal">
                  Partner directly with Gomzi Nutrition for wholesale distribution, franchise supply, and bulk inventory. Get factory-direct pricing, guaranteed batch authenticity, and dedicated priority account management.
                </p>

                {/* 4 Benefits 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-6 w-full max-w-xl">
                  {B2B_BENEFITS.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative p-4 rounded-xl sm:rounded-2xl bg-white border border-border shadow-2xs hover:shadow-md hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                      {/* Decorative Background Watermark Icon */}
                      <div className="absolute top-2.5 right-3 text-primary/5 group-hover:text-primary/10 transition-colors select-none pointer-events-none">
                        {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                      </div>

                      <div className="relative z-10">
                        <div className="w-9 h-9 rounded-lg bg-[#f5ede6] border border-border/60 flex items-center justify-center mb-2.5 shadow-2xs">
                          {item.icon}
                        </div>
                        <h3 className="text-sm font-bold text-text leading-snug group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-text-light mt-1 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={scrollToApply}
                    className="h-12 px-7 rounded-xl bg-primary hover:bg-hover active:scale-[0.98] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Apply for Wholesale Account</span>
                    <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <a
                    href={`${contact.whatsappUrl}?text=Hi%20Gomzi%20Nutrition%20Team%2C%20I%20am%20interested%20in%20becoming%20a%20B2B%20Wholesale%20%2F%20Gym%20Supply%20Partner.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 px-6 rounded-xl border border-border hover:border-primary bg-white text-text hover:text-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-center cursor-pointer shadow-2xs"
                  >
                    <FiPhoneCall className="w-4 h-4 text-primary" />
                    <span>Contact Corporate Sales</span>
                  </a>
                </div>

                {/* Bottom Micro Trust Indicators */}
                <div className="mt-3.5 flex items-center gap-2 text-[11px] sm:text-xs text-text-light font-medium">
                  <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dedicated wholesale representative assigned within 2 business hours.</span>
                </div>
              </div>

              {/* RIGHT COLUMN: Professional Warehouse & Pallet Order Graphic (5 cols) */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-lg transition-all duration-300 group bg-white">
                  <img
                    src="/images/product-export.webp"
                    alt="Gomzi Nutrition Wholesale Logistics & Pallet Orders"
                    className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/product-placeholder.webp";
                    }}
                  />

                  {/* Ambient Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Partner Credibility Chip */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md border border-white/80 rounded-xl p-3 sm:p-3.5 shadow-lg flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-xs shadow-xs">
                        <span>500+</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-extrabold text-text leading-tight">
                          Active B2B Partners
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-text-light leading-tight mt-0.5">
                          Gyms & Stores Pan-India
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] sm:text-[10px] font-extrabold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHOLESALE TIERS MATRIX ── */}
      <section className="py-10 sm:py-14 md:py-16 bg-light border-b border-border">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5ede6] border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
              Wholesale Pricing Tiers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text tracking-tight">
              Direct-From-Manufacturer Margins
            </h2>
            <p className="text-xs sm:text-sm text-text-light mt-2 leading-relaxed">
              Transparent, volume-tiered margins engineered to grow gym revenues with genuine lab-tested supplements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {WHOLESALE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 bg-white border transition-all duration-300 ${
                  tier.recommended
                    ? "border-primary shadow-lg ring-1 ring-primary/20 md:-translate-y-2"
                    : "border-border shadow-xs hover:border-primary/40 hover:shadow-md"
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-text">{tier.name}</h3>
                  <p className="text-xs text-text-light mt-0.5">{tier.tag}</p>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-2xl sm:text-3xl font-black text-primary">
                      {tier.margin}
                    </div>
                    <div className="text-xs font-semibold text-text-light mt-1">
                      {tier.moq}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-text leading-snug">
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(previous => ({ ...previous, estimatedVolume: ESTIMATED_VOLUME_OPTIONS[idx].value }));
                      scrollToApply();
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      tier.recommended
                        ? "bg-primary hover:bg-hover text-white shadow-xs"
                        : "bg-[#f5ede6] hover:bg-primary hover:text-white text-primary border border-border"
                    }`}
                  >
                    Select {tier.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DIRECT APPLICATION FORM SECTION ── */}
      <section id="apply-wholesale" className="py-10 sm:py-16 bg-white border-b border-border scroll-mt-48">
        <div className="site-container">
          <div className="max-w-3xl mx-auto rounded-2xl sm:rounded-3xl border border-border bg-[#fdfbf9] p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5ede6] border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2">
                Fast Approval Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Apply for Wholesale & Gym Supply
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-1.5">
                Fill out the quick form below. Our corporate sales manager will review and contact you with our product catalog & price sheet.
              </p>
            </div>

            {formSuccess ? (
              <div className="text-center py-10 px-4 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                  <FiCheckCircle size={28} />
                </div>
                <h3 className="text-lg font-bold text-text">Wholesale Application Received!</h3>
                <p className="text-xs sm:text-sm text-text-light mt-1.5 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-text">{formData.contactName}</span>. Your wholesale specialist is preparing your customized catalog and margin sheet.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`${contact.whatsappUrl}?text=Hi%20Gomzi%20Team%2C%20I%20just%20submitted%20a%20B2B%20Wholesale%20application%20for%20${encodeURIComponent(formData.businessName)}.%20Please%20share%20the%20catalog.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-xs cursor-pointer"
                  >
                    <FaWhatsapp size={15} />
                    <span>Connect on WhatsApp Priority Desk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setFormSuccess(false);
                      setFormData({
                        businessName: "",
                        contactName: "",
                        mobile: "",
                        email: "",
                        city: "",
                        state: "",
                        businessType: "Gym / Fitness Studio",
                        estimatedVolume: "₹50,000 - ₹1,50,000",
                        message: "",
                      });
                    }}
                    className="text-xs text-text-light hover:text-primary underline px-4 py-2"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} aria-busy={formSubmitting} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wholesale-businessName" className="block text-xs font-bold text-text mb-1.5">
                      Gym / Business Name <span className="text-red-500">*</span>
                    </label>
                    <input id="wholesale-businessName"
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g. Iron Clad Fitness Gym"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="wholesale-contactName" className="block text-xs font-bold text-text mb-1.5">
                      Owner / Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input id="wholesale-contactName"
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wholesale-mobile" className="block text-xs font-bold text-text mb-1.5">
                      Mobile / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                        +91
                      </span>
                      <input id="wholesale-mobile"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        autoComplete="tel-national"
                        name="mobile"
                        required
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="wholesale-email" className="block text-xs font-bold text-text mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input id="wholesale-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="rahul@gym.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <CustomSelect
                      label="Business Type"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      options={BUSINESS_TYPE_OPTIONS}
                    />
                  </div>

                  <div>
                    <CustomSelect
                      label="Estimated Monthly Volume"
                      name="estimatedVolume"
                      value={formData.estimatedVolume}
                      onChange={handleInputChange}
                      options={ESTIMATED_VOLUME_OPTIONS}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wholesale-city" className="block text-xs font-bold text-text mb-1.5">
                      City
                    </label>
                    <input id="wholesale-city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Surat, Mumbai, Delhi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="wholesale-state" className="block text-xs font-bold text-text mb-1.5">
                      State
                    </label>
                    <input id="wholesale-state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Gujarat, Maharashtra"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="wholesale-message" className="block text-xs font-bold text-text mb-1.5">
                    Specific Requirements or Preferred Products
                  </label>
                  <textarea id="wholesale-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us what formulations your members request most (e.g., Whey Isolate, Creatine, Mass Gainer)..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border text-xs sm:text-sm text-text placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs resize-none"
                  />
                </div>

                {formError && <p role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">{formError}</p>}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-hover active:scale-[0.99] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {formSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Wholesale Application</span>
                      <FiSend className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. WHOLESALE FAQS ── */}
      <section className="py-10 sm:py-16 bg-light border-b border-border">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5ede6] border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Wholesale FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text tracking-tight">
              Frequently Asked Wholesale Questions
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {WHOLESALE_FAQS.map((faq, idx) => {
              const open = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl sm:rounded-2xl border transition-all duration-300 bg-white ${
                    open
                      ? "border-primary/40 shadow-sm ring-1 ring-primary/20"
                      : "border-border shadow-2xs hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(open ? null : idx)}
                    aria-expanded={open}
                    className="w-full flex justify-between items-center px-4 sm:px-6 py-4 text-left cursor-pointer gap-3"
                  >
                    <span className="font-semibold text-xs sm:text-base text-text leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        open ? "bg-primary text-white rotate-180" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {open ? <FiX size={14} /> : <FiPlus size={14} />}
                    </div>
                  </button>

                  {open && (
                    <div className="px-4 pb-4 pt-1 sm:px-6 sm:pb-5 text-xs sm:text-sm text-text-light leading-relaxed border-t border-gray-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CORPORATE DESK CTA ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="site-container">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-[#f5ede6]/60 via-white to-[#f5ede6]/40 p-6 sm:p-10 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left max-w-xl">
              <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-2.5 py-0.5 rounded-full border border-border shadow-2xs mb-2">
                Need Immediate Bulk Dispatch?
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text tracking-tight">
                Talk to our Senior Wholesale Director
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-1.5 leading-relaxed">
                Connect directly on our priority WhatsApp corporate line or call during business hours for instantaneous pricing quotations.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href={`${contact.whatsappUrl}?text=Hi%20Gomzi%20Team%2C%20I%20need%20urgent%20wholesale%20supply%20for%20my%20gym.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <FaWhatsapp size={16} />
                <span>Priority WhatsApp</span>
              </a>

              <a
                href={contact.telephoneUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary bg-white text-text hover:text-primary font-bold text-xs uppercase tracking-wider transition-all shadow-2xs cursor-pointer"
              >
                <FiPhoneCall size={14} />
                <span>{contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
