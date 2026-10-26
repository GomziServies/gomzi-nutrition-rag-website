import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Clock,
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Building,
  ChevronRight,
  FlaskConical,
  Package,
  FileCheck,
  Store,
  Check,
} from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { sendContactInquiryApi } from "../../api/contact.api";
import { errorToast, successToast } from "../../utils/toast";

const contactFaqs = [
  {
    id: "loc",
    question: "Where is Gomzi Supplement by RAG manufactured and based?",
    answer:
      "Our state-of-the-art cGMP manufacturing laboratory and headquarters are located in Surat, Gujarat, India. We operate an in-house facility ensuring 100% batch control and ship nationwide across India directly to your doorstep.",
  },
  {
    id: "track",
    question: "How do I track my order once dispatched?",
    answer:
      "Once your order is processed and dispatched from our Surat hub, you will receive an automated SMS and WhatsApp update with your courier tracking link (BlueDart / Delhivery / DTDC). You can also ping our WhatsApp support line with your order ID for instantaneous real-time dispatch status.",
  },
  {
    id: "coa",
    question: "How do I request a third-party NABL Lab CoA report for my batch?",
    answer:
      "Every single production batch undergoes HPLC potency assay and microbiological screening. Certificates of Analysis (CoA) can be downloaded on each product page or requested by sharing your batch number (printed on the bottom of the tub) via our contact form or WhatsApp.",
  },
  {
    id: "bulk",
    question: "Do you offer wholesale bulk pricing for gyms and fitness centers?",
    answer:
      "Yes. We partner directly with verified gym owners, personal trainers, and fitness nutrition retailers across India with competitive direct-from-manufacturer wholesale tiers. Select 'Gym / Bulk Wholesale' in the form below to receive our catalog and wholesale pricing matrix.",
  },
  {
    id: "return",
    question: "What is your return and replacement policy?",
    answer:
      "We offer a 7-day hassle-free return policy for unopened products with their security tamper seal intact. If an item arrives damaged, leaking, or defective during transit, we provide a 100% free expedited replacement—no interrogations asked.",
  },
];

const inquiryCategories = [
  {
    id: "formulation",
    label: "Product Formulation & Dosing",
    desc: "Active ingredients, scoop sizing & usage guidance",
    icon: FlaskConical,
    tag: "Technical",
  },
  {
    id: "order",
    label: "Order & Tracking Status",
    desc: "Shipment dispatch, courier AWB & live delivery",
    icon: Package,
    tag: "Priority",
  },
  {
    id: "coa",
    label: "Lab CoA Assay Request",
    desc: "Third-party purity assay & batch test sheets",
    icon: FileCheck,
    tag: "Quality",
  },
  {
    id: "wholesale",
    label: "Gym / Bulk Wholesale",
    desc: "Commercial supply, gym orders & B2B distribution",
    icon: Store,
    tag: "B2B",
  },
  {
    id: "consultation",
    label: "Dietitian Consultation",
    desc: "Certified sports nutritionist meal & stack guidance",
    icon: Sparkles,
    tag: "Expert",
  },
];

export default function ContactSection() {
  const [openFaq, setOpenFaq] = useState("loc");
  const [selectedTopic, setSelectedTopic] = useState("Product Formulation & Dosing");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic mobile validation (at least 10 digits)
    const cleanMobile = formData.mobile.replace(/\D/g, "");
    if (cleanMobile.length < 10) {
      errorToast("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: cleanMobile,
        message: `[Topic: ${selectedTopic}] ${formData.message.trim()}`,
        subject: `RAG Website Contact Inquiry - ${selectedTopic}`,
        source: window.location.href,
      };

      await sendContactInquiryApi(payload);

      successToast("Inquiry sent successfully! Our team will contact you shortly.");
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to send inquiry:", err);
      errorToast("Failed to send message. Please WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-cream text-text">
      {/* ── 1. HERO BANNER ── */}
      <section className="w-full border-b border-border bg-white">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-8 text-center">


          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-[40px] leading-tight">
            We Are Here To Help. Speak Direct With Our Team.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-light">
            Questions on whey bio-availability, batch CoA lab verification, order delivery, or wholesale partnerships? We respond with direct technical answers, not generic bot scripts.
          </p>

          {/* 3 Metric Highlights */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-xs text-text-light">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>WhatsApp Reply: Under 30 mins</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Building size={13} className="text-primary" />
              <span>Surat, Gujarat Direct Facility</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <ShieldCheck size={13} className="text-primary" />
              <span>100% In-House Nutrition Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FOUR DIRECT ACCESS CARDS ── */}
      <section className="py-12 sm:py-16 bg-bg-cream">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {/* WhatsApp Priority */}
            <a
              href="https://wa.me/919875270200?text=Hi%20Gomzi%20Nutrition%20Team%2C%20I%20have%20an%20inquiry%20regarding%20supplements"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center justify-center text-2xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:text-white group-hover:border-amber-400/40 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs">
                    <FaWhatsapp />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light text-primary text-[10px] font-bold uppercase tracking-wider border border-primary-border group-hover:border-amber-400/50 group-hover:bg-[#faeee9] transition-all duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914] animate-pulse" />
                    Live Support
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Instant Messaging
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5 group-hover:text-primary transition-colors">
                  +91 98752 70200
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light mt-2">
                  Fastest response for order dispatch, shipping status, and product recommendations.
                </p>
              </div>

              <div className="relative z-10 mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary">
                <span>Chat on WhatsApp</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              {/* High-contrast luxury travelling sheen sweep */}
            </a>

            {/* Email Support */}
            <a
              href="mailto:info@ragnutrition.in"
              className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center justify-center text-xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:text-white group-hover:border-amber-400/40 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs">
                    <Mail size={22} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-light px-2.5 py-1 rounded-full border border-primary-border group-hover:border-amber-400/50 group-hover:bg-[#faeee9] transition-all duration-300">
                    Official Desk
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Written Queries
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5 group-hover:text-primary transition-colors break-all">
                  info@ragnutrition.in
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light mt-2">
                  Official desk for bulk gym procurement, lab CoA verification, and media inquiries.
                </p>
              </div>

              <div className="relative z-10 mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary">
                <span>Send Email</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              {/* High-contrast luxury travelling sheen sweep */}
            </a>

            {/* Phone Calling */}
            <a
              href="tel:+919875270200"
              className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center justify-center text-xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:text-white group-hover:border-amber-400/40 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs">
                    <Phone size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full group-hover:bg-[#faeee9] group-hover:text-primary transition-all duration-300">
                    10 AM – 6 PM
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Voice Calling
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5 group-hover:text-primary transition-colors">
                  +91 98752 70200
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light mt-2">
                  Mon to Sat • Speak directly with our dedicated customer support advisors.
                </p>
              </div>

              <div className="relative z-10 mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary">
                <span>Call Directly</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              {/* High-contrast luxury travelling sheen sweep */}
            </a>

            {/* Retail Store & Facility */}
            <a
              href="https://maps.google.com/?q=G-23+TIME+SQUARE+Gaurav+Path+Road+Surat+Gujarat+394510"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary-border shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center justify-center text-xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-hover group-hover:text-white group-hover:border-amber-400/40 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 shadow-xs">
                    <MapPin size={22} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8914] bg-primary-light px-2.5 py-1 rounded-full border border-primary-border group-hover:border-amber-400/50 group-hover:bg-[#faeee9] transition-all duration-300">
                    Surat Store
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Store & Facility
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                  G-23 Time Square, Surat
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light mt-2 line-clamp-2">
                  Gaurav Path Rd, TP 10 Main Rd, Surat, Gujarat 394510.
                </p>
              </div>

              <div className="relative z-10 mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary">
                <span className="inline-flex items-center gap-1">
                  Open in Maps <ExternalLink size={12} />
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              {/* High-contrast luxury travelling sheen sweep */}
            </a>
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE INQUIRY FORM & FACILITY SCHEDULE ── */}
      <section className="py-12 sm:py-16 bg-white border-y border-primary-border">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="group/form relative p-7 sm:p-10 rounded-3xl bg-bg-cream border border-primary-border shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(92,49,36,0.08)] hover:border-amber-400/40 transition-all duration-300">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Send a Direct Message
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text mt-1 tracking-tight">
                  How Can We Assist You?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 mb-6 font-light leading-relaxed">
                  Fill in your details below and our nutrition or logistics desk will get back to you within 4 business hours.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-white border border-primary-border text-center shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-primary-light text-primary border border-primary-border flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={30} className="text-[#ff8914]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light mb-6">
                      Thank you for contacting Gomzi Nutrition. A specialist from our Surat laboratory will reach out via WhatsApp or email shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="group relative overflow-hidden px-6 py-2.5 rounded-xl btn-gradient border border-amber-400/30 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer"
                    >
                      <span className="relative z-10">Send Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name + Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-primary-border text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="rahul@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-primary-border text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        WhatsApp / Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="mobile"
                          required
                          maxLength={10}
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-primary-border text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 font-light mt-1 block">
                        We send order updates and rapid resolution over WhatsApp.
                      </span>
                    </div>

                    {/* Inquiry Category Custom Themed Dropdown (After Mobile No.) */}
                    {(() => {
                      const currentCategory =
                        inquiryCategories.find((c) => c.label === selectedTopic) ||
                        inquiryCategories[0];
                      const ActiveIcon = currentCategory.icon;

                      return (
                        <div
                          className={`relative ${isDropdownOpen ? "z-30" : "z-10"}`}
                          ref={dropdownRef}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                              Select Inquiry Category <span className="text-red-500">*</span>
                            </label>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8914]" />
                              {currentCategory.tag}
                            </span>
                          </div>

                          {/* Custom Dropdown Trigger Button */}
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") setIsDropdownOpen(false);
                            }}
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                            className={`w-full px-4 py-3 rounded-xl bg-white border text-left transition-all duration-200 flex items-center justify-between shadow-2xs cursor-pointer ${
                              isDropdownOpen
                                ? "border-primary ring-2 ring-primary/15 bg-white"
                                : "border-primary-border hover:border-primary/50 hover:bg-[#fffcf9]"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/15">
                                <ActiveIcon size={17} />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-gray-900 truncate">
                                  {currentCategory.label}
                                </span>
                                <span className="text-[11px] text-gray-500 font-light truncate hidden sm:block">
                                  {currentCategory.desc}
                                </span>
                              </div>
                            </div>

                            <ChevronDown
                              size={17}
                              className={`text-gray-400 shrink-0 ml-2 transition-transform duration-200 ${
                                isDropdownOpen ? "rotate-180 text-primary" : ""
                              }`}
                            />
                          </button>

                          {/* Custom Dropdown Popup Menu */}
                          {isDropdownOpen && (
                            <div
                              role="listbox"
                              className="absolute left-0 right-0 top-full mt-2 z-50 bg-white border border-[#e8ded7] rounded-2xl shadow-[0_20px_48px_-10px_rgba(92,49,36,0.18),0_4px_16px_rgba(0,0,0,0.06)] p-2 animate-in fade-in zoom-in-95 duration-150"
                            >
                              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100 mb-1.5 flex items-center justify-between">
                                <span>Inquiry Topic • Select Category</span>
                                <span className="text-[9px] font-normal lowercase tracking-normal text-gray-400">5 departments</span>
                              </div>

                              <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-0.5">
                                {inquiryCategories.map((item) => {
                                  const isSelected = selectedTopic === item.label;
                                  const IconComponent = item.icon;

                                  return (
                                    <div
                                      key={item.id}
                                      role="option"
                                      aria-selected={isSelected}
                                      onClick={() => {
                                        setSelectedTopic(item.label);
                                        setIsDropdownOpen(false);
                                      }}
                                      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                                        isSelected
                                          ? "bg-primary/8 border border-primary/25 shadow-xs"
                                          : "hover:bg-[#faf6f3] border border-transparent"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div
                                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                            isSelected
                                              ? "bg-[#ff8914]/20 text-[#ff8914] border border-[#ff8914]/40"
                                              : "bg-bg-cream text-primary group-hover:bg-white group-hover:text-[#ff8914] border border-primary-border/60"
                                          }`}
                                        >
                                          <IconComponent size={16} />
                                        </div>

                                        <div className="flex flex-col min-w-0">
                                          <span
                                            className={`text-xs font-bold leading-tight ${
                                              isSelected ? "text-primary" : "text-gray-900 group-hover:text-primary"
                                            }`}
                                          >
                                            {item.label}
                                          </span>
                                          <span className="text-[11px] text-gray-500 font-light leading-tight mt-0.5">
                                            {item.desc}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2 shrink-0 ml-3">
                                        <span
                                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block ${
                                            isSelected
                                              ? "bg-primary text-white"
                                              : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                                          }`}
                                        >
                                          {item.tag}
                                        </span>

                                        {isSelected && (
                                          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                                            <Check size={12} strokeWidth={3} />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Query or Requirement <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your question, specific batch number, or wholesale quantity..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-primary-border text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative overflow-hidden flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <span className="relative z-10">Sending Inquiry...</span>
                        ) : (
                          <>
                            <span className="relative z-10">Send Message</span>
                            <Send size={14} className="relative z-10 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      <a
                        href="https://wa.me/919875270200?text=Hi%20Gomzi%20Nutrition%20Team%2C%20I%20have%20an%20urgent%20inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-gradient border border-amber-400/30 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 cursor-pointer"
                      >
                        <FaWhatsapp size={15} className="relative z-10 text-amber-200" />
                        <span className="relative z-10">Chat WhatsApp</span>
                      </a>
                    </div>
                  </form>
                )}
                {/* High-contrast luxury travelling sheen sweep */}
              </div>
            </div>

            {/* Right: Operational Schedule & Surat Hub Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Working Hours Card */}
              <div className="group/hours relative overflow-hidden p-7 rounded-3xl bg-bg-cream border border-primary-border shadow-sm hover:shadow-[0_12px_32px_rgba(92,49,36,0.08)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center justify-center group-hover/hours:bg-gradient-to-r group-hover/hours:from-primary group-hover/hours:to-primary-hover group-hover/hours:text-[#ff8914] group-hover/hours:border-amber-400/30 group-hover/hours:scale-105 transition-all duration-300">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover/hours:text-primary transition-colors">
                        Operational Timings
                      </h3>
                      <span className="text-[11px] text-gray-500">
                        Indian Standard Time (IST)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-center justify-between pb-2.5 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Monday – Saturday</span>
                      <span className="font-bold text-gray-900">10:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between pb-2.5 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Sunday</span>
                      <span className="font-bold text-primary">Plant Sanitization & Dispatches</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 font-medium">Online Web Orders</span>
                      <span className="font-bold text-primary">Active 24 / 7 / 365</span>
                    </div>
                  </div>
                </div>
                {/* High-contrast luxury travelling sheen sweep */}
              </div>

              {/* Retail Location & Directions */}
              <div className="group/store relative overflow-hidden p-7 rounded-3xl bg-bg-cream border border-primary-border shadow-sm hover:shadow-[0_12px_32px_rgba(92,49,36,0.08)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary border border-primary-border flex items-center justify-center group-hover/store:bg-gradient-to-r group-hover/store:from-primary group-hover/store:to-primary-hover group-hover/store:text-[#ff8914] group-hover/store:border-amber-400/30 group-hover/store:scale-105 transition-all duration-300">
                      <Building size={18} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover/store:text-primary transition-colors">
                        Surat Experience Store
                      </h3>
                      <span className="text-[11px] text-gray-500">
                        Direct Manufacturing Outlet
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
                    G-23 Time Square, Gaurav Path Road, TP 10 Main Rd, opp. Shree Bharti Residency, Surat, Gujarat 394510.
                  </p>

                  <a
                    href="https://maps.google.com/?q=G-23+TIME+SQUARE+Gaurav+Path+Road+Surat+Gujarat+394510"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-primary-border hover:border-amber-400/40 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <MapPin size={13} />
                    <span>Get Driving Directions</span>
                    <ExternalLink size={12} className="ml-auto" />
                  </a>
                </div>
                {/* High-contrast luxury travelling sheen sweep */}
              </div>

              {/* Verified Social Media Channels */}
              <div className="group/social relative overflow-hidden p-7 rounded-3xl bg-bg-cream border border-primary-border shadow-sm hover:shadow-[0_12px_32px_rgba(92,49,36,0.08)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300">
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-gray-900 group-hover/social:text-primary transition-colors mb-1">
                    Connect on Social Media
                  </h3>
                  <p className="text-xs text-gray-500 font-light mb-4">
                    Daily formulation insights, clinical dietetics advice, and behind-the-scenes facility footage.
                  </p>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/gomzi.supplement__rag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white border border-primary-border flex items-center justify-center text-gray-700 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 hover:border-transparent hover:scale-110 active:scale-95 transition-all shadow-sm"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={17} />
                    </a>

                    <a
                      href="https://www.facebook.com/people/Gomzi-Supplement/61590460356446/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white border border-primary-border flex items-center justify-center text-gray-700 hover:text-white hover:bg-blue-600 hover:border-transparent hover:scale-110 active:scale-95 transition-all shadow-sm"
                      aria-label="Facebook"
                    >
                      <FaFacebookF size={15} />
                    </a>

                    <a
                      href="https://wa.me/919875270200"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white border border-primary-border flex items-center justify-center text-gray-700 hover:text-white hover:bg-[#25D366] hover:border-transparent hover:scale-110 active:scale-95 transition-all shadow-sm"
                      aria-label="WhatsApp Community"
                    >
                      <FaWhatsapp size={17} />
                    </a>
                  </div>
                </div>
                {/* High-contrast luxury travelling sheen sweep */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FREQUENTLY ASKED QUESTIONS ACCORDION ── */}
      <section className="py-14 sm:py-20 bg-bg-cream">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary inline-flex items-center gap-1.5">
              <HelpCircle size={14} className="text-primary" />
              Quick Resolution
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text mt-1 tracking-tight uppercase">
              Common Support Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 font-light">
              Find immediate answers regarding orders, lab certificates, returns, and wholesale distribution.
            </p>
          </div>

          <div className="space-y-3.5">
            {contactFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-amber-400/50 bg-[#fffdfa] shadow-md shadow-primary/5"
                      : "border-primary-border bg-white hover:border-amber-400/40 hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-primary transition-colors tracking-tight">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-gradient-to-r from-primary to-primary-hover text-white border border-amber-400/30 shadow-xs"
                          : "bg-primary-light text-primary border border-primary-border group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  )}
                  {/* High-contrast luxury travelling sheen sweep */}
                </div>
              );
            })}
          </div>

          {/* Need More Help Prompt */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500">
              Have a clinical dietetics question?{" "}
              <Link to="/faq" className="font-bold text-primary hover:underline">
                Explore our full 25+ FAQ Knowledge Base →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. BOTTOM CATALOG CTA ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-border">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-border bg-gradient-to-r from-primary-light/60 via-white to-primary-light/40 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-white px-3 py-1 rounded-full border border-primary-border shadow-xs mb-3">
                Direct From Laboratory To Athlete
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text tracking-tight leading-tight">
                Ready to Experience Verified Purity?
              </h2>
              <p className="text-xs sm:text-sm text-text-light mt-2 leading-relaxed font-normal">
                Explore our 100% Whey Isolate, Creatine Monohydrate, and plant protein formulas with free delivery across India.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/gomzi-supplement"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <span>Shop Certified Catalog</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}