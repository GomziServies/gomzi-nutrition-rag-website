// src/component/healthkart/HkComboStackBuilder.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Plus,
  Equal,
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Check,
  Zap,
} from "lucide-react";
import { addGuestCartItem } from "../../services/cartStorage.service";
import { successToast } from "../../utils/toast";

const COMBO_STACKS = [
  {
    id: "stack-muscle",
    name: "Lean Muscle Growth Trio",
    tagline: "#1 Highest Selling Combo of the Hour",
    ordersLastHour: 47,
    extraDiscountPercent: 18,
    items: [
      {
        id: "prod-whey-1",
        name: "Gomzi 100% Pure Whey Protein Concentrate",
        shortName: "Pure Whey Protein (1kg)",
        flavour: "Rich Chocolate Fudge",
        price: 2699,
        discountPrice: 1999,
        image: "/images/product-category/whey-protein.webp",
        link: "/gomzi-supplement/whey-protein",
        role: "Primary Muscle Fuel",
      },
      {
        id: "prod-creatine-1",
        name: "Gomzi Micronized Creapure Creatine",
        shortName: "Micronized Creatine (250g)",
        flavour: "Unflavoured Pure",
        price: 999,
        discountPrice: 699,
        image: "/images/product-category/creatine.webp",
        link: "/gomzi-supplement/creatine",
        role: "ATP Strength Surge",
      },
      {
        id: "prod-peanut-1",
        name: "Gomzi High Protein Natural Peanut Butter",
        shortName: "Peanut Butter (1kg)",
        flavour: "Crunchy Dark Chocolate",
        price: 699,
        discountPrice: 499,
        image: "/images/product-category/peanut-butter.webp",
        link: "/gomzi-supplement/protein-bars-snacks",
        role: "Clean Calorie Anchor",
      },
    ],
  },
  {
    id: "stack-strength",
    name: "Explosive Energy & Powerhouse",
    tagline: "High Stim Pre + Creapure + Intra BCAA",
    ordersLastHour: 32,
    extraDiscountPercent: 16,
    items: [
      {
        id: "prod-pre-1",
        name: "Gomzi Ignition Explosive Pre-Workout",
        shortName: "Ignition Pre-Workout (300g)",
        flavour: "Tangy Orange Blast",
        price: 1899,
        discountPrice: 1299,
        image: "/images/product-category/pre-workout.webp",
        link: "/gomzi-supplement/pre-workout",
        role: "Vascular Muscle Pumps",
      },
      {
        id: "prod-creatine-1",
        name: "Gomzi Micronized Creapure Creatine",
        shortName: "Micronized Creatine (250g)",
        flavour: "Unflavoured Pure",
        price: 999,
        discountPrice: 699,
        image: "/images/product-category/creatine.webp",
        link: "/gomzi-supplement/creatine",
        role: "Explosive Strength Reload",
      },
      {
        id: "prod-bcaa-1",
        name: "Gomzi Pro BCAA 2:1:1 Amino Recovery",
        shortName: "Pro BCAA 2:1:1 (300g)",
        flavour: "Watermelon Splash",
        price: 1699,
        discountPrice: 1199,
        image: "/images/product-category/Bcaa-tangy-orange.webp",
        link: "/gomzi-supplement/bcaa",
        role: "Intra-Workout Anti-Catabolic",
      },
    ],
  },
  {
    id: "stack-bulk",
    name: "Heavyweight Mass Bulking Matrix",
    tagline: "Clean Bulking Formula with 1,250 Cals",
    ordersLastHour: 28,
    extraDiscountPercent: 20,
    items: [
      {
        id: "prod-gainer-1",
        name: "Gomzi Anabolic Mass Gainer Heavyweight",
        shortName: "Anabolic Mass Gainer (3kg)",
        flavour: "Double Rich Chocolate",
        price: 3199,
        discountPrice: 2299,
        image: "/images/product-category/mass-gainer.webp",
        link: "/gomzi-supplement/mass-gainer",
        role: "1,250 Clean Calories",
      },
      {
        id: "prod-peanut-1",
        name: "Gomzi High Protein Natural Peanut Butter",
        shortName: "Natural Peanut Butter (1kg)",
        flavour: "Crunchy Dark Chocolate",
        price: 699,
        discountPrice: 499,
        image: "/images/product-category/peanut-butter.webp",
        link: "/gomzi-supplement/protein-bars-snacks",
        role: "32g Protein per 100g",
      },
      {
        id: "prod-creatine-1",
        name: "Gomzi Micronized Creapure Creatine",
        shortName: "Micronized Creatine (250g)",
        flavour: "Unflavoured Pure",
        price: 999,
        discountPrice: 699,
        image: "/images/product-category/creatine.webp",
        link: "/gomzi-supplement/creatine",
        role: "Muscle Cellular Volume",
      },
    ],
  },
];

export default function HkComboStackBuilder() {
  const [activeStackId, setActiveStackId] = useState("stack-muscle");
  const [selectedItemIds, setSelectedItemIds] = useState({
    "prod-whey-1": true,
    "prod-creatine-1": true,
    "prod-peanut-1": true,
    "prod-pre-1": true,
    "prod-bcaa-1": true,
    "prod-gainer-1": true,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const activeStack = useMemo(
    () => COMBO_STACKS.find((s) => s.id === activeStackId) || COMBO_STACKS[0],
    [activeStackId]
  );

  const toggleItem = (itemId) => {
    setSelectedItemIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const selectedItems = useMemo(
    () => activeStack.items.filter((item) => selectedItemIds[item.id]),
    [activeStack, selectedItemIds]
  );

  const totalMrp = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.price, 0),
    [selectedItems]
  );

  const regularPrice = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.discountPrice, 0),
    [selectedItems]
  );

  // When all 3 items in stack are selected, provide extra bundle discount
  const isFullCombo = selectedItems.length === activeStack.items.length;
  const bundleDiscount = isFullCombo ? Math.round(regularPrice * 0.12) : 0;
  const finalComboPrice = regularPrice - bundleDiscount;
  const totalSavings = totalMrp - finalComboPrice;

  const handleAddComboToCart = () => {
    if (selectedItems.length === 0) return;
    setIsAdding(true);

    selectedItems.forEach((item) => {
      addGuestCartItem({
        product: {
          _id: item.id,
          name: item.name,
          price: item.price,
          discountPrice: isFullCombo
            ? Math.round(item.discountPrice * 0.88)
            : item.discountPrice,
          flavour: item.flavour,
          displayImages: [item.image],
        },
        quantity: 1,
      });
    });

    window.dispatchEvent(new Event("cartUpdated"));
    setAddedSuccess(true);
    successToast(`🎉 Added ${selectedItems.length} items to your cart! Saved ₹${totalSavings}!`);

    setTimeout(() => {
      setIsAdding(false);
      setAddedSuccess(false);
    }, 1800);
  };

  return (
    <section className="w-full bg-[#fbf9f6] py-10 sm:py-14 border-b border-[#ebdcd2]/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* ── 1. Live Order Velocity Pulse Ticker (Light Clean Design) ── */}
        <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50/60 to-rose-50 text-[#1c1917] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs border border-amber-200/80">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600"></span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#95442c] flex items-center gap-1">
                <Flame size={14} className="fill-[#95442c] text-[#95442c]" />
                Live Order Velocity
              </span>
              <span className="text-stone-400 text-xs hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm font-bold text-[#1c1917]">
                <strong className="text-emerald-700 font-extrabold">{activeStack.ordersLastHour} orders</strong> placed in the last hour for this stack!
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#95442c] bg-white px-3 py-1 rounded-full border border-amber-200 shadow-xs flex-shrink-0">
            <Zap size={13} className="text-amber-500 fill-amber-500" />
            <span>92% Stock Claimed Today</span>
          </div>
        </div>

        {/* ── 2. Section Header & Stack Tabs ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#95442c] rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1c1917] tracking-tight font-toma flex items-center gap-2.5">
                <span>Frequently Bought Together: 2 + 1 Best Combos</span>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#af5438] text-white hidden sm:inline-block">
                  Save Up to 20%
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 pl-4.5">
              Select your athlete goal below. Buy 2 primary supplements and unlock extra combo savings on the 3rd!
            </p>
          </div>

          {/* Stack Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl overflow-x-auto max-w-full">
            {COMBO_STACKS.map((stack) => {
              const isActive = stack.id === activeStackId;
              return (
                <button
                  key={stack.id}
                  onClick={() => setActiveStackId(stack.id)}
                  className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#95442c] text-white shadow-sm"
                      : "text-stone-700 hover:text-[#95442c] hover:bg-white/60"
                  }`}
                >
                  {stack.name.split(" ")[0]} Stack
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Visual 2 + 1 Equation Layout: [Item 1] + [Item 2] + [Item 3] = [Combo Summary] ── */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-[#ebdcd2]/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* The 3 Stack Items (cols 1 to 8) */}
            <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-3 sm:gap-4">
              {activeStack.items.map((item, index) => {
                const isChecked = !!selectedItemIds[item.id];
                return (
                  <React.Fragment key={item.id}>
                    {/* Item Card */}
                    <div
                      onClick={() => toggleItem(item.id)}
                      className={`relative flex-1 w-full rounded-2xl p-4 transition-all duration-300 border cursor-pointer select-none ${
                        isChecked
                          ? "border-[#95442c] bg-[#faf6f2] shadow-sm ring-1 ring-[#95442c]/20"
                          : "border-stone-200 bg-stone-50 opacity-60 hover:opacity-85"
                      }`}
                    >
                      {/* Checkbox badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-stone-200/80 text-stone-700">
                          {item.role}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked
                              ? "bg-[#95442c] text-white"
                              : "border border-stone-300 bg-white"
                          }`}
                        >
                          {isChecked && <Check size={13} className="stroke-[3]" />}
                        </div>
                      </div>

                      {/* Product Image */}
                      <div className="w-full aspect-square max-h-[140px] flex items-center justify-center mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      {/* Info */}
                      <h4 className="text-xs sm:text-sm font-bold text-[#1c1917] line-clamp-1 leading-tight">
                        {item.shortName}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {item.flavour}
                      </p>

                      {/* Pricing */}
                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-baseline gap-2">
                        <span className="text-sm sm:text-base font-black text-[#1c1917]">
                          ₹{item.discountPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Plus Icon between items */}
                    {index < activeStack.items.length - 1 && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-[#95442c] flex items-center justify-center shadow-xs font-bold border border-stone-200">
                        <Plus size={16} className="stroke-[3]" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Equal Divider on Desktop */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="w-10 h-10 rounded-full bg-[#95442c]/10 text-[#95442c] flex items-center justify-center font-bold">
                <Equal size={20} className="stroke-[2.5]" />
              </div>
            </div>

            {/* ── 4. Combo Summary & One-Click Add All Action Card (Light, Clean, High-End) ── */}
            <div className="lg:col-span-3 w-full bg-gradient-to-b from-[#fdfbf9] to-[#f8f3ee] text-[#1c1917] rounded-2xl p-5 shadow-md border-2 border-[#ebdcd2] flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-[#95442c] text-[10px] font-bold uppercase tracking-wider mb-2 border border-amber-300/40">
                  <Sparkles size={11} className="text-[#95442c]" />
                  <span>Combo Stack Deal</span>
                </div>

                <h3 className="text-base sm:text-lg font-black font-toma leading-tight text-[#1c1917]">
                  {selectedItems.length} Products Selected
                </h3>

                {isFullCombo && (
                  <p className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                    <span>⚡ Extra 12% Trio Bundle Bonus Applied!</span>
                  </p>
                )}

                {/* Pricing Summary */}
                <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-500 font-medium">
                    <span>Combined MRP:</span>
                    <span className="line-through">₹{totalMrp.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-stone-600 font-medium">
                    <span>Regular Total:</span>
                    <span>₹{regularPrice.toLocaleString("en-IN")}</span>
                  </div>

                  {isFullCombo && (
                    <div className="flex justify-between text-emerald-700 font-extrabold">
                      <span>Combo Stack Bonus:</span>
                      <span>-₹{bundleDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-baseline pt-2.5 border-t border-stone-200">
                    <span className="text-sm font-bold text-[#1c1917]">Bundle Price:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#95442c]">
                      ₹{finalComboPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300/60 text-emerald-800 text-[11px] font-bold text-center mt-2.5">
                    Total Savings: ₹{totalSavings.toLocaleString("en-IN")} ({(
                      (totalSavings / (totalMrp || 1)) *
                      100
                    ).toFixed(0)}% Off)
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddComboToCart}
                disabled={selectedItems.length === 0 || isAdding}
                className="mt-5 w-full py-3 bg-[#95442c] hover:bg-[#7a3522] active:bg-[#682c1b] disabled:bg-stone-300 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-[#af5438]/30"
              >
                {addedSuccess ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-300" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span>
                      {selectedItems.length === 0
                        ? "Select an Item"
                        : `Add All ${selectedItems.length} to Cart`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
