// src/component/healthkart/HkCustomerReviews.jsx
import React from "react";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Rohit Deshmukh",
    role: "National Powerlifter",
    location: "Pune",
    rating: 5,
    title: "Genuine 24g Protein per scoop — zero bloating!",
    text: "I tested Gomzi Whey with water for 3 months. Mixability is effortless, taste is not artificially sweet, and my recovery between heavy squat days has improved drastically. Best part: you can verify the batch lab report before buying.",
    product: "Gomzi 100% Whey Protein (Chocolate)",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Ananya Sen",
    role: "Clinical Dietitian & Crossfit Coach",
    location: "Bangalore",
    rating: 5,
    title: "Cleanest Creapure Creatine in India",
    text: "I recommend Gomzi Micronized Creatine to all my competitive athletes. Pure Creapure grade with zero gritty residue or stomach cramps. Real strength jumps in 2 weeks.",
    product: "Gomzi Micronized Creatine Monohydrate",
    verified: true,
  },
  {
    id: 3,
    name: "Vikram Chauhan",
    role: "Marathon Runner & Fitness Enthusiast",
    location: "Delhi NCR",
    rating: 5,
    title: "All-Natural Peanut Butter is a staple",
    text: "No palm oil, no added sugar, just slow-roasted peanuts with 32g protein. The texture is thick and crunchy, exactly what genuine peanut butter should feel like.",
    product: "Gomzi High Protein Peanut Butter",
    verified: true,
  },
];

export default function HkCustomerReviews() {
  return (
    <section className="w-full bg-white py-10 sm:py-14 border-b border-border/50 font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
            <Star size={13} className="fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 Average Rating (12,000+ Verified Buyers)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-text tracking-tight font-toma">
            Loved By Serious Athletes Across India
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Real feedback from verified purchasers, trainers, and fitness coaches.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-light border border-border hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars + Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current text-amber-500" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck size={12} /> Verified Buyer
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-text leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {review.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-text">{review.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      {review.role} • {review.location}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-primary mt-2 truncate">
                  Purchased: {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
