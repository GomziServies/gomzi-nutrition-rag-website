// src/component/healthkart/HkWhyGomzi.jsx
import React from "react";
import { ShieldCheck, FlaskConical, Truck, Headphones, CheckCircle2 } from "lucide-react";
import { WHY_GOMZI_FEATURES } from "../../data/homeProducts";

export default function HkWhyGomzi() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck size={28} className="text-primary" />;
      case "FlaskConical":
        return <FlaskConical size={28} className="text-primary" />;
      case "Truck":
        return <Truck size={28} className="text-primary" />;
      case "Headphones":
        return <Headphones size={28} className="text-primary" />;
      default:
        return <CheckCircle2 size={28} className="text-primary" />;
    }
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header (HealthKart why-hk style) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-[#fcf4f0] px-3 py-1 rounded-full border border-border">
            Authenticity Guarantee
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-text mt-3 tracking-tight font-toma">
            Why Gomzi Nutrition?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Built on pharmaceutical precision, zero shortcuts, and complete batch transparency.
          </p>
        </div>

        {/* 4 Feature Items (HealthKart layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_GOMZI_FEATURES.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-light border border-border hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f5ede6] border border-border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  {getIcon(item.icon)}
                </div>

                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  {item.badge}
                </span>

                <h3 className="text-base font-bold text-text mt-1 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center text-[11px] font-bold text-primary">
                <CheckCircle2 size={13} className="mr-1 text-emerald-600" />
                Verified Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
