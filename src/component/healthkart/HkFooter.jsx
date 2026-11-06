// src/component/healthkart/HkFooter.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, CheckCircle, ShieldCheck } from "lucide-react";
import { successToast } from "../../utils/toast";

export default function HkFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    successToast("Thank you for subscribing to Gomzi VIP club!");
    setEmail("");
  };

  return (
    <footer className="w-full bg-white text-stone-700 font-sans border-t border-[#ebdcd2]">
      {/* ── Top Newsletter Section (HealthKart email_desc_cntnr equivalent) ── */}
      <div className="border-b border-[#ebdcd2]/70 bg-[#faf7f3]">
        <div className="max-w-[1280px] mx-auto px-4 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand Intro */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/images/rag-icon-logo.png"
                alt="Gomzi Nutrition"
                className="h-10 w-auto object-contain"
              />
              <span className="text-lg font-black text-[#95442c] font-toma tracking-tight">
                GOMZI NUTRITION
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              India's authentic online supplement store sourcing 100% genuine sports nutrition,
              clean proteins, and clinical wellness products directly from our certified GMP lab —
              zero grey market stock, zero middlemen.
            </p>
          </div>

          {/* Newsletter Subscribe */}
          <div className="w-full lg:w-auto">
            <p className="text-xs sm:text-sm font-bold text-[#1c1917] mb-2">
              Subscribe For Exclusive Offers & VIP Batch Releases
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-white border border-[#ebdcd2] focus:border-[#95442c] rounded-lg px-4 py-2.5 text-xs text-[#1c1917] placeholder:text-stone-400 focus:outline-none shadow-inner"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#95442c] hover:bg-[#7a3522] text-white text-xs font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer uppercase tracking-wider"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
            <p className="text-[11px] text-stone-400 mt-1.5 flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" />
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick Links Directory (HealthKart QuickLinkSection style) ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          {/* Column 1: Sports Nutrition */}
          <div>
            <h4 className="font-bold text-[#1c1917] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-[#95442c]">
              Sports Nutrition
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/gomzi-supplement/whey-protein" className="hover:text-[#95442c] transition-colors">
                  Whey Protein Concentrate
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/whey-protein" className="hover:text-[#95442c] transition-colors">
                  Whey Protein Isolate
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/mass-gainer" className="hover:text-[#95442c] transition-colors">
                  High-Calorie Mass Gainers
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/plant-protein" className="hover:text-[#95442c] transition-colors">
                  100% Vegan Plant Protein
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-[#95442c] transition-colors">
                  Raw Protein Powders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Workout Essentials */}
          <div>
            <h4 className="font-bold text-[#1c1917] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-[#95442c]">
              Workout Essentials
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/gomzi-supplement/creatine" className="hover:text-[#95442c] transition-colors">
                  Micronized Creatine Monohydrate
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/pre-workout" className="hover:text-[#95442c] transition-colors">
                  Ignition Pre-Workout
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/bcaa" className="hover:text-[#95442c] transition-colors">
                  Instantized BCAA 2:1:1
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-[#95442c] transition-colors">
                  Beta-Alanine &amp; Citrulline
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-[#95442c] transition-colors">
                  Hydration &amp; Electrolytes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Healthy Foods */}
          <div>
            <h4 className="font-bold text-[#1c1917] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-[#95442c]">
              Protein Foods &amp; Health
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/gomzi-supplement/peanut-butter" className="hover:text-[#95442c] transition-colors">
                  All-Natural Peanut Butter
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/meal-replacement" className="hover:text-[#95442c] transition-colors">
                  Meal Replacement Shakes
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/wellness-health" className="hover:text-[#95442c] transition-colors">
                  Apex Daily Multivitamins
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-[#95442c] transition-colors">
                  Omega-3 &amp; Fish Oils
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-[#95442c] transition-colors">
                  Immunity Herbal Extracts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Trust */}
          <div>
            <h4 className="font-bold text-[#1c1917] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-[#95442c]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <a href="/pdf/product-report.pdf" target="_blank" rel="noreferrer" className="hover:text-[#95442c] font-bold text-emerald-700">
                  Verify Batch Lab Reports
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#95442c] transition-colors">
                  Contact Us / Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#95442c] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#95442c] transition-colors">
                  Our Story &amp; Facility
                </Link>
              </li>
              <li>
                <a href="tel:+919875270200" className="hover:text-[#95442c] font-semibold text-[#1c1917]">
                  Hotline: +91 98752 70200
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Policies & Legal */}
          <div>
            <h4 className="font-bold text-[#1c1917] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-[#95442c]">
              Policies &amp; Legal
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/shipping-policy" className="hover:text-[#95442c] transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-[#95442c] transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#95442c] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-[#95442c] transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-stone-400">
                  FSSAI Lic. No: 10721031000185
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Strip (HealthKart desktopFooter_footer-bottom equivalent) ── */}
      <div className="bg-[#eee] border-t border-[#dbdee9] py-3.5 px-4">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <p>
            &copy; {new Date().getFullYear()} Gomzi Nutrition (RAG Nutrition). All Rights Reserved. Sourced &amp; Manufactured in India.
          </p>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-500 font-medium">100% Secure Payments:</span>
            <span className="px-2 py-0.5 bg-white rounded border border-stone-300 text-[10px] font-bold text-stone-700">
              UPI / QR
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-stone-300 text-[10px] font-bold text-stone-700">
              RuPay
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-stone-300 text-[10px] font-bold text-stone-700">
              Visa
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-stone-300 text-[10px] font-bold text-stone-700">
              Mastercard
            </span>
            <span className="px-2 py-0.5 bg-white rounded border border-stone-300 text-[10px] font-bold text-stone-700">
              NetBanking
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
