// src/component/healthkart/HkTopBar.jsx
import React from "react";
import { Sparkles, ShieldCheck, Truck, Award, Zap, Tag, FileText, Check } from "lucide-react";
import { successToast } from "../../utils/toast";

export default function HkTopBar() {
  const [copied, setCopied] = React.useState(false);

  const copyCoupon = (e) => {
    e.stopPropagation();
    try {
      navigator.clipboard?.writeText("GOMZI20");
      setCopied(true);
      successToast("Coupon GOMZI20 copied! 20% OFF applied at checkout");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const items = [
    {
      icon: ShieldCheck,
      content: <span>100% Authentic Direct From Lab</span>,
      accent: false,
    },
    {
      icon: Truck,
      content: <span>Free Express Shipping on Orders &gt; ₹999</span>,
      accent: false,
    },
    {
      icon: Sparkles,
      content: (
        <span className="inline-flex items-center gap-1.5">
          <span>Use Code</span>
          <button
            type="button"
            onClick={copyCoupon}
            title="Click to copy coupon code"
            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 hover:text-amber-200 border border-amber-400/40 font-black tracking-wider text-[11px] sm:text-xs transition-all cursor-pointer"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : null}
            <span>{copied ? "COPIED!" : "GOMZI20"}</span>
          </button>
          <span>for Extra 20% OFF</span>
        </span>
      ),
      accent: true,
    },
    {
      icon: FileText,
      content: (
        <a
          href="/pdf/product-report.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-[#e78b70] hover:text-white underline underline-offset-2 font-bold transition-colors cursor-pointer"
        >
          Verify Batch Lab Reports
        </a>
      ),
      accent: false,
    },
    {
      icon: Award,
      content: <span>NABL Certified Lab Tested Purity</span>,
      accent: false,
    },
    {
      icon: Zap,
      content: <span>Clean Sports Nutrition • Zero Banned Substances</span>,
      accent: false,
    },
    {
      icon: Tag,
      content: <span>Direct Manufacturer Pricing &amp; Stack Discounts</span>,
      accent: false,
    },
  ];

  return (
    <div
      className="w-full bg-[#1c1917] text-stone-100 text-[11px] sm:text-xs py-1.5 border-b border-[#3e2723]/30 overflow-hidden select-none"
      role="region"
      aria-label="Announcements and Offers"
    >
      <div className="topbar-track">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`ann-1-${idx}`} className="flex items-center px-5 sm:px-7 whitespace-nowrap">
                <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                  <Icon
                    size={13}
                    className={item.accent ? "text-amber-400 animate-pulse shrink-0" : "text-[#c86546] shrink-0"}
                  />
                  <span>{item.content}</span>
                </span>
                <span className="text-stone-600 ml-5 sm:ml-7 font-light" aria-hidden="true">
                  •
                </span>
              </div>
            );
          })}
        </div>

        {/* Set 2 (Duplicated for seamless loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={`ann-2-${idx}`} className="flex items-center px-5 sm:px-7 whitespace-nowrap">
                <span className="flex items-center gap-1.5 font-semibold text-stone-200">
                  <Icon
                    size={13}
                    className={item.accent ? "text-amber-400 animate-pulse shrink-0" : "text-[#c86546] shrink-0"}
                  />
                  <span>{item.content}</span>
                </span>
                <span className="text-stone-600 ml-5 sm:ml-7 font-light" aria-hidden="true">
                  •
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
