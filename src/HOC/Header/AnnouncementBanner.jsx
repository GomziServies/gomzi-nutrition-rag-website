import { Link } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, Zap } from "lucide-react";

/**
 * HealthKart sale strip.
 * Sits directly below the header, dark grey bar with rotating offers.
 */
const OFFERS = [
  { icon: Zap, text: "Upto 60% Off on top brands", href: "/gomzi-supplement?search=deal" },
  { icon: Truck, text: "Free shipping on orders above ₹999", href: "/gomzi-supplement" },
  { icon: ShieldCheck, text: "100% genuine products, direct from brands", href: "/about" },
  { icon: RotateCcw, text: "Easy 14-day returns", href: "/refund-policy" },
];

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#45484e] overflow-hidden select-none">
      {/* ── MOBILE: Smooth Infinite Running Ticker (< md) ── */}
      <div className="md:hidden flex overflow-hidden py-1.5 relative">
        <div
          className="marquee-track flex items-center gap-6 active:[animation-play-state:paused]"
          style={{ animationDuration: "20s" }}
        >
          {/* First track */}
          <div className="flex shrink-0 items-center gap-6">
            {OFFERS.map((offer, i) => {
              const Icon = offer.icon;
              return (
                <Link
                  key={`m1-${i}`}
                  to={offer.href}
                  className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-white/95 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{offer.text}</span>
                  <span className="text-white/30 ml-2 select-none">•</span>
                </Link>
              );
            })}
          </div>

          {/* Duplicated track for seamless infinite marquee loop */}
          <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
            {OFFERS.map((offer, i) => {
              const Icon = offer.icon;
              return (
                <Link
                  key={`m2-${i}`}
                  to={offer.href}
                  tabIndex={-1}
                  className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-white/95 hover:text-white transition-colors whitespace-nowrap"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{offer.text}</span>
                  <span className="text-white/30 ml-2 select-none">•</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: Centered Static Bar (>= md) ── */}
      <div className="hidden md:flex max-w-[1170px] mx-auto px-4 py-2 items-center justify-center gap-8">
        {OFFERS.map((offer) => {
          const Icon = offer.icon;
          return (
            <Link
              key={offer.text}
              to={offer.href}
              className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{offer.text}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
