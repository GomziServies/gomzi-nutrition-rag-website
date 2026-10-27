import { Link } from "react-router-dom";
import { Truck, ShieldCheck, RotateCcw, Zap } from "lucide-react";

/**
 * Gomzi Nutrition Top Announcement & Trust Bar.
 * Styled in Brand Deep Navy (#0f1e35) with high-contrast amber/gold accents.
 */
const OFFERS = [
  {
    icon: Zap,
    highlight: "Upto 60% Off",
    suffix: " on top brands",
    href: "/gomzi-supplement?search=deal",
  },
  {
    icon: Truck,
    highlight: "Free shipping",
    suffix: " on orders above ₹999",
    href: "/gomzi-supplement",
  },
  {
    icon: ShieldCheck,
    highlight: "100% genuine",
    suffix: " products, direct from brands",
    href: "/about",
  },
  {
    icon: RotateCcw,
    highlight: "Easy 14-day",
    suffix: " returns",
    href: "/refund-policy",
  },
];

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[#0f1e35] border-b border-[#1b365d]/70 shadow-xs overflow-hidden select-none">
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
                  className="group flex shrink-0 items-center gap-1.5 text-[11px] whitespace-nowrap transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>
                    <strong className="font-bold text-amber-300">
                      {offer.highlight}
                    </strong>
                    <span className="font-medium text-white/95">
                      {offer.suffix}
                    </span>
                  </span>
                  <span className="text-white/25 ml-2 select-none">•</span>
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
                  className="group flex shrink-0 items-center gap-1.5 text-[11px] whitespace-nowrap transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>
                    <strong className="font-bold text-amber-300">
                      {offer.highlight}
                    </strong>
                    <span className="font-medium text-white/95">
                      {offer.suffix}
                    </span>
                  </span>
                  <span className="text-white/25 ml-2 select-none">•</span>
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
              key={offer.highlight}
              to={offer.href}
              className="group flex shrink-0 items-center gap-2 text-xs whitespace-nowrap transition-colors"
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>
                <strong className="font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                  {offer.highlight}
                </strong>
                <span className="font-medium text-white/90 group-hover:text-white transition-colors">
                  {offer.suffix}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
