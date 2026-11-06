// src/component/healthkart/HkPromoBanners.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function HkPromoBanners() {
  return (
    <section className="w-full bg-white py-8 sm:py-10 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* 2-Column High Impact Split Banners (HealthKart style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Banner 1: Whey & Isolate */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#291711] to-[#45241b] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] shadow-md border border-border/30 group">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 group-hover:opacity-35 transition-opacity">
              <img
                src="/images/product-category/whey-protein.webp"
                alt="Whey Protein"
                className="w-full h-full object-contain object-right-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 max-w-xs sm:max-w-sm">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#af5438] text-amber-200 px-2.5 py-0.5 rounded-full mb-3">
                <Sparkles size={12} /> Clean Lean Muscle
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-toma leading-tight">
                Gomzi 100% Whey Protein
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                24g Ultra-Pure Protein, 5.5g BCAAs, with digestive enzymes for zero bloating.
              </p>
            </div>

            <div className="relative z-10 mt-5">
              <Link
                to="/gomzi-supplement/whey-protein"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-primary hover:bg-[#fbf4f0] text-xs font-bold rounded-lg transition-all shadow"
              >
                <span>Shop Pure Whey</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Banner 2: Pre-Workout & Creatine */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-text to-[#3a2219] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[250px] shadow-md border border-border/30 group">
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-25 group-hover:opacity-35 transition-opacity">
              <img
                src="/images/product-category/creatine.webp"
                alt="Creatine"
                className="w-full h-full object-contain object-right-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 max-w-xs sm:max-w-sm">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-amber-600/90 text-amber-100 px-2.5 py-0.5 rounded-full mb-3">
                <Zap size={12} /> Strength & Energy
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-toma leading-tight">
                Ignition Pre-Workout & Creatine
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
                100% Creapure Grade Monohydrate + Extreme Pump Pre-Workout Formula.
              </p>
            </div>

            <div className="relative z-10 mt-5">
              <Link
                to="/gomzi-supplement/creatine"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-hover text-white text-xs font-bold rounded-lg transition-all shadow"
              >
                <span>Explore Energy Stacks</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Feature Banner Strip below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 sm:mt-6">
          <div className="p-4 rounded-xl bg-[#faf6f2] border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
              ✓
            </div>
            <div>
              <h4 className="text-xs font-bold text-text">Zero Counterfeit Guarantee</h4>
              <p className="text-[11px] text-stone-500">Shipped directly from our certified lab</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf6f2] border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
              ★
            </div>
            <div>
              <h4 className="text-xs font-bold text-text">NABL Batch Lab Verified</h4>
              <p className="text-[11px] text-stone-500">View real certificates before ordering</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#faf6f2] border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
              🚚
            </div>
            <div>
              <h4 className="text-xs font-bold text-text">Pan-India Express Dispatch</h4>
              <p className="text-[11px] text-stone-500">Free shipping on orders over ₹999</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
