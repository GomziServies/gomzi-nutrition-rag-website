// src/component/healthkart/HkGymPacksOffer.jsx
// Interactive Gym Transformation Packs & Coupon System section connected to Admin settings

import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Gift,
  Share2,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { successToast } from "../../utils/toast";
import useCart from "../../hooks/useCart";
import useContactDetails from "../../content/useContactDetails";
import api from "../../api/axios";

const DEFAULT_COUPONS = {
  enabled: true,
  price: 300,
  title: "Coupon System",
  subtitle: "Pre + Post Workout (One Time)",
  reward_count: 90,
  reward_text: "Get 1 kg Protein (Free)",
  supplement_policy:
    "Take any 1 supplement from our packs and also get gym membership for 1 month.",
  share_prompt: "Share this with your contacts.",
};

const DEFAULT_PACKS = [
  {
    id: "gym_pack_rapid_weight_loss_8100",
    name: "Rapid Weight Loss Pack",
    price: 8100,
    rtp: "RTP: 1",
    supplements: "2 kg Whey Protein + Fat Burner",
    perks: [
      "Unlimited Number of Gym Hours Access / Month",
      "Doctors, Trainers & Dietitian Unlimited Access",
      "Weight Loss Transformation Guaranteed",
    ],
    free_gift: "Weight Scale Machine",
  },
  {
    id: "gym_pack_insane_performance_12000",
    name: "Insane Performance Pack",
    price: 12000,
    rtp: "RTP: 5",
    supplements: "2 kg Whey Protein + Pre-Workout + Creatine + One Compound",
    perks: [
      "Prep Coach Access",
      "Free Blood Report Checkup (Pre & Post Cycle)",
      "Anabolic Steroid Coach Access",
      "Trainer & Dietitian Unlimited Access",
      "Unlimited Number of Gym Hours Access / Month",
    ],
    free_gift: "Weight Scale Machine",
  },
];

export default function HkGymPacksOffer() {
  const { whatsappUrl } = useContactDetails();
  const { addToCart, setIsCartOpen } = useCart();
  const [copied, setCopied] = useState(false);
  const [addingId, setAddingId] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/public/v1/gym-access-offer")
      .then((res) => {
        if (isMounted && res?.data?.data) {
          setSettings(res.data.data);
        }
      })
      .catch((err) => {
        console.warn("Using default gym offers data:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const coupon = settings?.coupon_system || DEFAULT_COUPONS;
  const rawPacks = settings?.packs?.length ? settings.packs : DEFAULT_PACKS;
  const packs = rawPacks.filter((p) => p.status !== false);

  const shareOffer = async () => {
    const shareData = {
      title: "Gomzi Nutrition - Exclusive Gym & Transformation Packs Offer",
      text: "Get 1 Month Unlimited Gym Access, Certified Trainers & Doctors, plus Free Weight Scale Machine with Gomzi Nutrition Transformation Packs!",
      url: window.location.origin + "/gym-offers",
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fall back to copy below
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      successToast("Offer link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          shareData.text + " " + shareData.url
        )}`,
        "_blank"
      );
    }
  };

  const handleAddPackToCart = async (pack) => {
    try {
      setAddingId(pack.id);
      const productPayload = {
        _id: pack.id,
        name: pack.name,
        price: pack.price,
        discountPrice: pack.price,
        displayImages: ["/images/combos-transparent.png"],
        flavour: pack.supplements || "Transformation Pack",
        company: "Gomzi Nutrition",
      };

      await addToCart(productPayload, 1);
      successToast(`${pack.name} added to cart!`);
      if (setIsCartOpen) setIsCartOpen(true);
    } catch (err) {
      console.error("Failed to add pack to cart:", err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <section className="site-container my-8 sm:my-14" aria-label="Gym Transformation Packs and Coupon System">
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebf8de] border border-[#a4da74] text-[11px] font-black uppercase tracking-wider text-[#2d681b] shadow-2xs mb-3">
          <Dumbbell size={14} className="text-[#3b8522]" />
          <span>Exclusive Gym Membership &amp; Supplement Offers</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-text font-toma tracking-tight leading-tight">
          Transform Your Physique with Our Official Gym Packs
        </h2>
        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-stone-600 leading-relaxed">
          Buy premium Gomzi Nutrition supplement packs and get 1-month unlimited gym access, certified medical &amp; dietetics consultation, and a free digital weight scale machine.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* ══════════════════════════════════════════════════════════════
            TOP CARD: Other Points (Coupon System)
        ══════════════════════════════════════════════════════════════ */}
        {coupon.enabled !== false && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#8fc857] p-4 sm:p-7 shadow-[0_8px_30px_rgba(102,175,43,0.12)] relative overflow-hidden">
            <div className="text-center mb-5">
              <span className="inline-block bg-[#caefa7] text-[#1e5414] font-black text-sm sm:text-base px-6 py-1.5 rounded-2xl shadow-xs">
                Other Points ({coupon.title || "Coupon System"})
              </span>
            </div>

            <div className="space-y-4 sm:space-y-5 text-stone-800">
              {/* Point 1: Coupon System - ₹300 */}
              <div className="flex items-start gap-3 sm:gap-4 pb-4 border-b border-stone-100">
                <span className="w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center font-black text-base shrink-0 bg-[#e7f9d5]">
                  1
                </span>
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-base sm:text-lg text-stone-900">
                        {coupon.title || "Coupon System"} &ndash;
                      </span>
                      <span className="bg-[#bceb8f] text-[#1c4e12] font-black px-2.5 py-0.5 rounded-lg text-base sm:text-lg shadow-2xs">
                        &#8377;{coupon.price}
                      </span>
                    </div>
                    {coupon.subtitle && (
                      <p className="text-xs sm:text-sm text-stone-600 font-medium mt-0.5">
                        {coupon.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Divider & Arrow bullets */}
                  <div className="flex items-center gap-4 border-l-0 md:border-l-2 md:border-stone-300 md:pl-5">
                    <div className="space-y-1 text-xs sm:text-sm font-bold text-stone-800">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black text-base leading-none">&rarr;</span>
                        <span>Take {coupon.reward_count} coupons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-black text-base leading-none">&rarr;</span>
                        <span className="text-[#205713] font-black">
                          {coupon.reward_text}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Point 2: Supplement pack gym membership */}
              {coupon.supplement_policy && (
                <div className="flex items-start gap-3 sm:gap-4 pb-4 border-b border-stone-100">
                  <span className="w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center font-black text-base shrink-0 bg-[#e7f9d5]">
                    2
                  </span>
                  <p className="flex-1 min-w-0 text-xs sm:text-base font-bold text-stone-800 leading-snug pt-1">
                    {coupon.supplement_policy}
                  </p>
                </div>
              )}

              {/* Point 3: Share with contacts */}
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center font-black text-base shrink-0 bg-[#e7f9d5]">
                  3
                </span>
                <div className="flex-1 min-w-0 flex flex-wrap items-center justify-between gap-3 pt-1">
                  <p className="text-xs sm:text-base font-bold text-stone-800">
                    {coupon.share_prompt || "Share this with your contacts."}
                  </p>
                  <button
                    type="button"
                    onClick={shareOffer}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2e6d1e] text-white text-xs sm:text-sm font-bold hover:bg-[#235316] transition-colors cursor-pointer shadow-xs"
                  >
                    <Share2 size={16} />
                    <span>{copied ? "Link Copied!" : "Share Offer"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TRANSFORMATION PACK CARDS
        ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {packs.map((pack, idx) => {
            const whatsappMsg = `Hi Gomzi Nutrition team! I want to claim the ${pack.name} (₹${Number(pack.price).toLocaleString("en-IN")}) with Gym Access, ${pack.supplements || "supplements"}, and ${pack.free_gift || "free gifts"}. Please guide me with enrollment.`;

            return (
              <div
                key={pack.id || idx}
                className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#8fc857] p-5 sm:p-7 flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(102,175,43,0.18)] transition-all"
              >
                <div>
                  {/* Header: Circle Number + Title Pill + Price Box */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="w-8 h-8 rounded-full border-2 border-stone-900 flex items-center justify-center font-black text-base shrink-0 bg-[#e7f9d5]">
                        {idx + 1}
                      </span>
                      <span className="bg-[#caefa7] text-[#1c4d12] font-black text-sm sm:text-base px-3 py-1 rounded-xl truncate shadow-2xs">
                        {pack.name}
                      </span>
                    </div>

                    {/* Price Tag in Bordered Box */}
                    <div className="border-2 border-stone-900 rounded-xl px-2.5 py-1 bg-white shrink-0">
                      <span className="text-base sm:text-lg font-black text-stone-900">
                        &#8377; {Number(pack.price).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / Contents Bar */}
                  <div className="flex flex-wrap items-center gap-2 mb-5 pl-1">
                    {pack.rtp && (
                      <span className="border-2 border-[#377922] text-[#245815] font-black text-xs px-2.5 py-0.5 rounded-full bg-[#f4fced]">
                        {pack.rtp}
                      </span>
                    )}
                    {pack.supplements && (
                      <span className="text-xs sm:text-sm font-bold text-stone-800">
                        {pack.supplements}
                      </span>
                    )}
                  </div>

                  {/* Feature Bullet Points */}
                  <div className="space-y-2.5 mb-6 pl-2">
                    {(pack.perks || []).map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-stone-800">
                        <span className="text-emerald-600 font-black text-base leading-none shrink-0 mt-0.5">&rarr;</span>
                        <span className={feature.toLowerCase().includes("guaranteed") ? "text-[#1d4d12] font-black" : ""}>
                          {feature}
                        </span>
                      </div>
                    ))}

                    {/* Special Free Gift Banner */}
                    {pack.free_gift && (
                      <div className="mt-4 flex items-center gap-2.5 p-2.5 rounded-xl bg-[#e5f7d6] border border-[#a6dd7a] text-xs sm:text-sm font-black text-[#1e5214]">
                        <span className="text-emerald-600 font-black text-base leading-none shrink-0">&rarr;</span>
                        <Gift size={18} className="text-[#2b661d] shrink-0" />
                        <span>{pack.free_gift} (Free Gift)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-100 space-y-2.5">
                  <button
                    type="button"
                    disabled={addingId === (pack.id || idx)}
                    onClick={() => handleAddPackToCart(pack)}
                    className="w-full h-11 sm:h-12 rounded-xl bg-primary hover:bg-hover text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <ShoppingBag size={16} />
                    <span>
                      {addingId === (pack.id || idx) ? "Adding to Cart..." : `Buy ${pack.name}`}
                    </span>
                  </button>

                  <a
                    href={`${whatsappUrl}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 rounded-xl border border-[#2b661d] bg-[#f5faef] hover:bg-[#eaf5e1] text-[#235817] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink size={14} />
                    <span>Inquire / Claim via WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
