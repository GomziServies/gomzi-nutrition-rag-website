import useBranding from "../../content/useBranding";
import useContactDetails from "../../content/useContactDetails";
import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";


export default function HkFooter() {
  const branding = useBranding();
  const contact = useContactDetails();

  return (
    <footer className="w-full bg-white text-stone-700 font-sans border-t border-border">
      {/* ── Brand introduction and wholesale partnerships ── */}
      <div className="border-b border-border/70 bg-[#faf7f3]">
        <div className="max-w-[1280px] mx-auto px-4 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand Intro */}
          <div className="max-w-xl">
            <Link to="/" className="inline-block mb-3">
              <img
                src={branding.logo}
                alt="Gomzi Nutrition"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              India's authentic online supplement store sourcing 100% genuine sports nutrition,
              clean proteins, and clinical wellness products directly from our certified GMP lab —
              zero grey market stock, zero middlemen.
            </p>
          </div>

          {/* Wholesale & Gyms */}
          <div className="w-full lg:max-w-md">
            <h3 className="text-sm font-bold text-text mb-2">Wholesale &amp; Gyms</h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">Bulk nutrition for gyms, trainers and supplement stores. Explore our wholesale program and apply for a business account.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/wholesale" className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-hover text-white text-sm font-bold rounded-xl transition-colors">
                Explore Wholesale &amp; Gyms <span aria-hidden="true">→</span>
              </Link>
              <Link to="/contact-us" className="text-sm font-semibold text-primary underline underline-offset-4">Talk to sales</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Links Directory (HealthKart QuickLinkSection style) ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          {/* Column 1: Sports Nutrition */}
          <div>
            <h4 className="font-bold text-text uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-primary">
              Sports Nutrition
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/gomzi-supplement/whey-protein" className="hover:text-primary transition-colors">
                  Whey Protein Concentrate
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/whey-protein-isolate" className="hover:text-primary transition-colors">
                  Whey Protein Isolate
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/mass-gainer" className="hover:text-primary transition-colors">
                  High-Calorie Mass Gainers
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/plant-protein" className="hover:text-primary transition-colors">
                  100% Vegan Plant Protein
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-primary transition-colors">
                  Raw Protein Powders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Workout Essentials */}
          <div>
            <h4 className="font-bold text-text uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-primary">
              Workout Essentials
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/gomzi-supplement/creatine" className="hover:text-primary transition-colors">
                  Micronized Creatine Monohydrate
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/pre-workout" className="hover:text-primary transition-colors">
                  Ignition Pre-Workout
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/bcaa" className="hover:text-primary transition-colors">
                  Instantized BCAA 2:1:1
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-primary transition-colors">
                  Beta-Alanine &amp; Citrulline
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-primary transition-colors">
                  Hydration &amp; Electrolytes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Healthy Foods */}
          <div>
            <h4 className="font-bold text-text uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-primary">
              Protein Foods &amp; Health
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/gomzi-supplement/peanut-butter" className="hover:text-primary transition-colors">
                  All-Natural Peanut Butter
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/meal-replacement" className="hover:text-primary transition-colors">
                  Meal Replacement Shakes
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement/wellness-health" className="hover:text-primary transition-colors">
                  Apex Daily Multivitamins
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-primary transition-colors">
                  Omega-3 &amp; Fish Oils
                </Link>
              </li>
              <li>
                <Link to="/gomzi-supplement" className="hover:text-primary transition-colors">
                  Immunity Herbal Extracts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Trust */}
          <div>
            <h4 className="font-bold text-text uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-primary">
              Customer Service
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <a href="/pdf/product-report.pdf" target="_blank" rel="noreferrer" className="hover:text-primary font-bold text-emerald-700">
                  Verify Batch Lab Reports
                </a>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-primary transition-colors">
                  Contact Us / Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Our Story &amp; Facility
                </Link>
              </li>
              <li>
                <a href={contact.telephoneUrl} className="hover:text-primary font-semibold text-text">
                  Hotline: {contact.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Policies & Legal */}
          <div>
            <h4 className="font-bold text-text uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 text-[11px] text-primary">
              Policies &amp; Legal
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li>
                <Link to="/shipping-policy" className="hover:text-primary transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-primary transition-colors">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li><Link to="/blog" className="hover:text-primary">Nutrition journal</Link></li>
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

          {/* 100% Secure Payments Badges */}
          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700">
              <Lock size={15} className="text-emerald-600 stroke-[2.2]" />
              <span>100% Secure Payments</span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
              {/* PayPal */}
              <div className="h-7 w-12 bg-white rounded-md border border-stone-300 shadow-2xs flex flex-col items-center justify-center p-0.5" title="PayPal">
                <svg className="h-3 w-auto" viewBox="0 0 24 24" fill="none">
                  <path d="M7 2h7.5c3.5 0 5.5 1.8 5 4.8-.6 3.5-3 5.2-6.5 5.2H9.8l-1.3 7H4.5l3.5-17z" fill="#003087"/>
                  <path d="M9.5 6h6.5c2.8 0 4.4 1.4 4 3.8-.5 2.8-2.4 4.2-5.2 4.2h-2.5l-1 5H8l2.2-13h-.7z" fill="#0079C1"/>
                </svg>
                <span className="text-[7px] font-black italic tracking-tighter leading-none text-[#003087]">Pay<span className="text-[#0079C1]">Pal</span></span>
              </div>

              {/* VISA */}
              <div className="h-7 w-12 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center p-1" title="Visa">
                <span className="text-xs font-black italic tracking-wider text-[#1a1f71] font-serif">VISA</span>
              </div>

              {/* AMEX */}
              <div className="h-7 w-12 bg-[#006fcf] rounded-md border border-[#006fcf] shadow-2xs flex items-center justify-center p-1" title="American Express">
                <span className="text-[9px] font-black tracking-widest text-white font-sans">AMEX</span>
              </div>

              {/* Mastercard */}
              <div className="h-7 w-12 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center p-1" title="Mastercard">
                <div className="flex items-center -space-x-2">
                  <span className="w-4 h-4 rounded-full bg-[#eb001b] inline-block opacity-90" />
                  <span className="w-4 h-4 rounded-full bg-[#f79e1b] inline-block opacity-90" />
                </div>
              </div>

              {/* Maestro */}
              <div className="h-7 w-12 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center p-1" title="Maestro">
                <div className="flex items-center -space-x-2">
                  <span className="w-4 h-4 rounded-full bg-[#eb001b] inline-block opacity-90" />
                  <span className="w-4 h-4 rounded-full bg-[#00a2e5] inline-block opacity-90" />
                </div>
              </div>

              {/* Apple Pay */}
              <div className="h-7 w-12 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center gap-0.5 p-1" title="Apple Pay">
                <svg className="h-3 w-auto fill-black" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.83-11.64-14.36-5.77-9.35-10.29-19.82-13.56-31.41-3.27-11.59-4.9-22.31-4.9-32.16 0-14.35 3.5-26.06 10.5-35.12 7-9.06 15.8-13.68 26.4-13.88 4.8 0 10.1 1.25 15.9 3.75 5.8 2.5 9.7 3.8 11.7 3.9 1.6 0 5.4-1.3 11.4-3.9 6-2.6 11.1-3.8 15.3-3.6 11.3.6 20.3 4.5 27 11.7-9.9 6-14.8 14.4-14.7 25.2.2 8.4 3.4 15.4 9.6 21 6.2 5.6 13.5 8.7 21.9 9.3-2.1 6.5-4.8 12.9-8.1 19.2zm-28.91-105.7c0-7.3 2.7-14.1 8.1-20.4 5.4-6.3 12-10 19.8-11.1.2 1.4.3 2.6.3 3.6 0 7.3-2.8 14.1-8.4 20.4-5.6 6.3-12.4 9.9-20.4 10.8-.2-1.1-.3-2.2-.3-3.3z"/>
                </svg>
                <span className="text-[10px] font-semibold text-black leading-none">Pay</span>
              </div>

              {/* Google Pay */}
              <div className="h-7 w-12 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center gap-0.5 p-1" title="Google Pay">
                <svg className="h-3 w-auto" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.41 7.35 24 12 24Z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                </svg>
                <span className="text-[10px] font-semibold text-stone-700 leading-none">Pay</span>
              </div>

              {/* UPI */}
              <div className="h-7 px-2 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center" title="UPI">
                <span className="text-[9px] font-black tracking-tight text-emerald-700">UPI</span>
              </div>

              {/* RuPay */}
              <div className="h-7 px-2 bg-white rounded-md border border-stone-300 shadow-2xs flex items-center justify-center" title="RuPay">
                <span className="text-[9px] font-black italic text-[#0973ba]">Ru<span className="text-[#f37021]">Pay</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
