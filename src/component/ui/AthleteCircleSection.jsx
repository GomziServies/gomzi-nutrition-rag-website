import React, { useState } from "react";
import { Sparkles, Mail, Send, CheckCircle2 } from "lucide-react";
import { errorToast, successToast } from "../../utils/toast";

export default function AthleteCircleSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      errorToast("Please enter a valid email address");
      return;
    }

    successToast("Welcome to Gomzi Athlete Circle! Check your inbox for your 10% coupon code.");
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="w-full py-6 sm:py-8 bg-[#faf8f6] overflow-hidden" aria-label="Gomzi Athlete Circle VIP Club">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 lg:p-12 border border-[#5C3124]/30 bg-gradient-to-r from-[#1c120e] via-[#261712] to-[#1c120e] shadow-2xl">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#5C3124]/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Column: Heading and Value Proposition */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#5C3124]/30 border border-[#ebdcd7]/30 text-amber-200 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>GOMZI ATHLETE CIRCLE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Get 10% Off Your First Order
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mt-2 leading-relaxed">
                Join 50,000+ athletes. Receive science-backed training protocols, secret restock alerts, and member-only pricing.
              </p>
            </div>

            {/* Right Column: Interactive Subscription Form */}
            <div className="w-full lg:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-md mx-auto lg:mx-0 w-full"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff8914] focus:ring-2 focus:ring-[#ff8914]/30 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-7 rounded-xl bg-gradient-to-r from-[#5C3124] via-[#733d2d] to-[#5C3124] hover:from-[#733d2d] hover:to-[#5C3124] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#5C3124]/30 hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <span>Claim 10% Off</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Trust & Guarantee Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mt-3 text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Instant Coupon Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No Spam Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
