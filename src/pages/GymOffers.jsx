// src/pages/GymOffers.jsx
// Dedicated Gym Transformation Packs & Coupon System Page

import React from "react";
import SEO from "../component/SEO";
import HkGymPacksOffer from "../component/healthkart/HkGymPacksOffer";
import { Link } from "react-router-dom";
import { Dumbbell, ShieldCheck, Award, HeartPulse, CheckCircle2, ArrowRight } from "lucide-react";
import useContactDetails from "../content/useContactDetails";

export default function GymOffers() {
  const { whatsappUrl } = useContactDetails();

  return (
    <div className="w-full bg-[#f8f7f5] min-h-screen py-6 sm:py-12">
      <SEO
        title="Exclusive Gym Offers & Transformation Packs | Gomzi Nutrition by RAG"
        description="Get 1-month unlimited gym access, certified dietitian and doctor consultation, and a free weight scale machine with Gomzi Nutrition's Rapid Weight Loss and Insane Performance Packs."
      />

      {/* Main Interactive Offers Section */}
      <HkGymPacksOffer />

      {/* Trust & Guarantee Grid */}
      <section className="site-container my-12" aria-label="Gym Offer Benefits">
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-text font-toma">
              Why Choose Our Gym Transformation Program?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-500">
              Unlike generic gym memberships, every Gomzi pack combines scientifically dosed sports supplements with supervised medical coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-[#faf7f4] border border-stone-200">
              <Dumbbell className="text-primary mb-3" size={26} />
              <h4 className="font-bold text-sm text-text mb-1">Unlimited Gym Access</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Workout whenever you want with flexible hours across partner gyms for the entire 30 days.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf7f4] border border-stone-200">
              <HeartPulse className="text-emerald-600 mb-3" size={26} />
              <h4 className="font-bold text-sm text-text mb-1">Doctor &amp; Dietitian Support</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Get full dietary plans, macronutrient breakdowns, and weekly follow-ups tailored to your goals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf7f4] border border-stone-200">
              <ShieldCheck className="text-amber-600 mb-3" size={26} />
              <h4 className="font-bold text-sm text-text mb-1">100% Lab Tested</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every supplement tub has individual NABL batch certificates verifying zero spiked nitrogen.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf7f4] border border-stone-200">
              <Award className="text-primary mb-3" size={26} />
              <h4 className="font-bold text-sm text-text mb-1">Guaranteed Results</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Follow our RTP structured program and achieve measurable, verifiable body transformation.
              </p>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#1c4d12] to-[#2e6d1e] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-black text-lg sm:text-xl">Have custom questions about our gym tie-ups?</h4>
              <p className="text-xs sm:text-sm text-stone-200 mt-1">Chat directly with our senior fitness consultants on WhatsApp.</p>
            </div>
            <a
              href={`${whatsappUrl}?text=${encodeURIComponent("Hi Gomzi Nutrition! I want more details regarding your Gym Membership & Transformation Packs.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white text-[#1c4d12] font-black text-xs sm:text-sm whitespace-nowrap hover:bg-[#e7f9d5] transition-colors shadow-xs"
            >
              Talk to a Coach &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

