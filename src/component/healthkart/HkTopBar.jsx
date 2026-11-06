// src/component/healthkart/HkTopBar.jsx
import React from "react";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

export default function HkTopBar() {
  return (
    <div className="w-full bg-[#1c1917] text-[#f5ede6] text-xs py-2 px-4 border-b border-[#3e2723]/30 select-none">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Left Trust Badges */}
        <div className="hidden md:flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-stone-300">
            <ShieldCheck size={14} className="text-[#c86546]" />
            100% Authentic Direct From Lab
          </span>
          <span className="flex items-center gap-1.5 text-stone-300">
            <Truck size={14} className="text-[#c86546]" />
            Free Express Shipping on Orders &gt; ₹999
          </span>
        </div>

        {/* Center / Right Offer Callout */}
        <div className="flex items-center gap-2 mx-auto md:mx-0 font-medium">
          <Sparkles size={14} className="text-amber-400 animate-pulse" />
          <span>
            Use Code <strong className="text-amber-400 font-bold tracking-wider">GOMZI20</strong> for Extra 20% OFF
          </span>
          <span className="hidden sm:inline text-stone-400">|</span>
          <a
            href="/pdf/product-report.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline text-[#e78b70] hover:text-white underline underline-offset-2 transition-colors ml-1 font-semibold"
          >
            Verify Batch Report
          </a>
        </div>
      </div>
    </div>
  );
}
