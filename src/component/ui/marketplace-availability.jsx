import { useRef, useEffect, useState, useCallback } from "react";
import Wavyheading from "../common/Wavyheading";

const BRAND = "#003873";
const BRAND_LIGHT = "#e8eef7";

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill="#fff"
    />
  </svg>
);
const SpeedIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2.05V5.08C16.39 5.57 19 8.47 19 12C19 15.53 16.39 18.43 13 18.92V21.95C18.05 21.45 22 17.19 22 12C22 6.81 18.05 2.55 13 2.05ZM11 2.05C5.95 2.55 2 6.81 2 12C2 17.19 5.95 21.45 11 21.95V18.92C7.61 18.43 5 15.53 5 12C5 8.47 7.61 5.57 11 5.08V2.05ZM12 8L8 12H11V16H13V12H16L12 8Z"
      fill="#fff"
    />
  </svg>
);
const StarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"
      fill="#fff"
    />
  </svg>
);
const CalendarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
      fill="#fff"
    />
  </svg>
);
const TruckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={BRAND}
    />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const platforms = [
  {
    id: 1,
    icon: <LocationIcon />,
    logo: "/images/logo/swiggy-logo.webp",
    title: "Order via Swiggy",
    content:
      "Discover your favorite supplements directly on Swiggy with seamless ordering and reliable delivery.",
    benefits: [
      "Easy ordering experience",
      "Trusted delivery network",
      "Available in major cities",
    ],
    cta: "Order on Swiggy",
  },
  {
    id: 2,
    icon: <SpeedIcon />,
    logo: "/images/logo/instamart-logo.webp",
    title: "Get it on Instamart",
    content:
      "Need your protein quickly? Instamart delivers essentials within minutes - stay consistent with your nutrition.",
    benefits: [
      "Quick delivery (minutes-based)",
      "Ideal for urgent needs",
      "Available in select locations",
    ],
    cta: "Shop on Instamart",
  },
  {
    id: 3,
    icon: <StarIcon />,
    logo: "/images/logo/blinkit-logo.webp",
    title: "Order instantly on Blinkit",
    content:
      "Access your supplements with ultra-fast delivery through Blinkit, designed for convenience and speed.",
    benefits: [
      "Ultra-fast delivery",
      "Reliable service",
      "Perfect for daily use",
    ],
    cta: "Buy on Blinkit",
  },
  {
    id: 4,
    icon: <CalendarIcon />,
    logo: "/images/logo/zomato-logo.webp",
    title: "Available on Zomato",
    content:
      "Find your supplements on Zomato and enjoy a simple ordering experience with quick doorstep delivery.",
    benefits: [
      "Simple interface",
      "Trusted platform",
      "Expanding availability",
    ],
    cta: "Order on Zomato",
  },
];

function CheckIcon() {
  return (
    <span
      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
      style={{ backgroundColor: BRAND_LIGHT }}
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path
          d="M1.5 4L3 5.5L6.5 2"
          stroke={BRAND}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function PlatformCard({ platform }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-5 gap-3 h-full">
      <div className="flex items-center gap-3">
        <img
          src={platform.logo}
          alt={platform.title}
          className="w-12 h-12 object-contain flex-shrink-0"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <h3 className="text-[20px] mb-2 font-extrabold text-gray-900 leading-snug">
          {platform.title}
        </h3>
      </div>
      <p className="text-[15px]  text-gray-500 leading-relaxed">
        {platform.content}
      </p>
      <ul className="flex flex-col gap-1.5 mt-1">
        {platform.benefits.map((b, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-[13px] text-gray-700"
          >
            <CheckIcon />
            {b}
          </li>
        ))}
      </ul>
      <div className="flex-1" />
      <div className=" w-full">
        <button className="deliver-btn">
          <span className="deliver-icon">
            <TruckIcon />
          </span>
          <span className="deliver-text1">{platform.cta}</span>
          <span className="deliver-text2">{platform.cta}</span>
        </button>
      </div>
    </div>
  );
}

// ─── Infinite Slider Hook (Desktop) ─────────────────────────────────────────
function useInfiniteSlider({ itemWidth, gap, totalItems, autoSpeed = 0.5 }) {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const isHovered = useRef(false);
  const singleWidth = (itemWidth + gap) * totalItems;

  const animate = useCallback(() => {
    if (!isDragging.current && !isHovered.current) {
      offsetRef.current += autoSpeed;
    }
    if (offsetRef.current >= singleWidth) offsetRef.current -= singleWidth;
    if (offsetRef.current < 0) offsetRef.current += singleWidth;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [singleWidth, autoSpeed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startOffset.current = offsetRef.current;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    offsetRef.current = startOffset.current + (startX.current - e.clientX);
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };
  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startOffset.current = offsetRef.current;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    offsetRef.current =
      startOffset.current + (startX.current - e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    isDragging.current = false;
  };
  const onMouseEnter = () => {
    isHovered.current = true;
  };
  const onMouseLeave = () => {
    isHovered.current = false;
    isDragging.current = false;
  };

  return {
    trackRef,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}

// ─── Mobile Slider with Auto-play + Arrows + Dots ───────────────────────────
function MobileSlider() {
  const [current, setCurrent] = useState(0);
  const total = platforms.length;
  const autoRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const isPaused = useRef(false);

  const goTo = useCallback(
    (index) => {
      // Circular loop
      const next = (index + total) % total;
      setCurrent(next);
    },
    [total],
  );

  // Auto-play - advances every 3s, pauses on user interaction
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((prev) => (prev + 1) % total);
      }
    }, 3000);
  }, [total]);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  const handlePrev = () => {
    isPaused.current = true;
    goTo(current - 1);
    resetAuto();
    setTimeout(() => {
      isPaused.current = false;
    }, 5000);
  };

  const handleNext = () => {
    isPaused.current = true;
    goTo(current + 1);
    resetAuto();
    setTimeout(() => {
      isPaused.current = false;
    }, 5000);
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    isPaused.current = true;
  };
  const onTouchEnd = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    isDragging.current = false;
    resetAuto();
    setTimeout(() => {
      isPaused.current = false;
    }, 5000);
  };

  return (
    <div className="relative w-full px-4">
      {/* Slider track */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-400 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {platforms.map((platform) => (
            <div key={platform.id} className="flex-shrink-0 w-full">
              <PlatformCard platform={platform} />
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -left-1 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
        style={{
          backgroundColor: "#fff",
          border: `1.5px solid ${BRAND}`,
          color: BRAND,
        }}
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-1 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
        style={{
          backgroundColor: BRAND,
          border: `1.5px solid ${BRAND}`,
          color: "#fff",
        }}
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {platforms.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              isPaused.current = true;
              goTo(i);
              resetAuto();
              setTimeout(() => {
                isPaused.current = false;
              }, 5000);
            }}
            style={{
              width: i === current ? "20px" : "8px",
              height: "8px",
              borderRadius: "999px",
              backgroundColor: i === current ? BRAND : "#d1d5db",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function MarketplaceAvailabilitySection() {
  const CARD_WIDTH = 340;
  const GAP = 24;
  const infiniteCards = [...platforms, ...platforms, ...platforms];

  const { trackRef, handlers } = useInfiniteSlider({
    itemWidth: CARD_WIDTH,
    gap: GAP,
    totalItems: platforms.length,
    autoSpeed: 0.6,
  });

  return (
    <section className="w-full bg-white py-8 md:py-8 lg:py-10 overflow-hidden">
      <style>{`
        .deliver-btn {
  position: relative;
  width: 100%;
  height: 42px;
  border-radius: 30px;
  background-color: white;
  border: 1.5px solid ${BRAND};
  overflow: hidden;          /* ← aa j line fix kare chhe extra blue strip */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: inherit;
  isolation: isolate;        /* ← stacking context fix */
}
.deliver-text1 {
  font-size: 12px; font-weight: 700; color: ${BRAND};
  margin-left: 0%; transition: opacity 0.3s, transform 0.3s;
  letter-spacing: 0.05em; text-transform: uppercase;
  z-index: 1; white-space: nowrap; position: relative;
}
.deliver-text2 {
  position: absolute; top: 50%;
  transform: translateY(-50%) translateX(-120px);  /* ← -80 thi -120 karyuu */
  left: 8px; font-weight: 700; font-size: 11px; color: white;
  transition: transform 0.4s; letter-spacing: 0.05em;
  text-transform: uppercase; z-index: 3; white-space: nowrap;
}
.deliver-icon {
  position: absolute; top: 0; left: 0;
  width: 42px; height: 42px; display: flex;
  align-items: center; justify-content: center;
  transition: transform 0.5s cubic-bezier(.4,0,.2,1); z-index: 2;
}
.deliver-icon::before {
  position: absolute;
  left: 0; top: -1px;           /* ← left: -200px thi 0 karyuu */
  z-index: -1; content: '';
  width: 100vw; height: 44px;   /* ← fixed width thi 100vw karyuu */
  transform: translateX(-100%); /* ← pehla hidden, hover e aave */
  border-radius: 30px;
  background-color: ${BRAND};
  transition: transform 0.5s cubic-bezier(.4,0,.2,1);
}
.deliver-icon::after {
  position: absolute; left: 1px; top: 1px;
  z-index: -1; content: ''; width: 38px; height: 38px;
  border-radius: 100%; background-color: white;
}
/* Hover states */
.deliver-btn:hover .deliver-icon { transform: translateX(calc(100% + 260px)); }
.deliver-btn:hover .deliver-icon::before { transform: translateX(-100%); }
.deliver-btn:hover .deliver-text2 { transform: translateY(-50%) translateX(70%); transition: transform 0.4s 0.05s; }
.deliver-btn:hover .deliver-text1 { opacity: 0; transform: translateX(20px); }
.deliver-btn:active { transform: scale(1.03); }
        .inf-track { display: flex; gap: ${GAP}px; will-change: transform; cursor: grab; user-select: none; }
        .inf-track:active { cursor: grabbing; }
        .inf-slide { flex-shrink: 0; width: ${CARD_WIDTH}px; }
        .inf-wrapper { position: relative; }
        .inf-wrapper::before, .inf-wrapper::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 80px; z-index: 2; pointer-events: none;
        }
        .inf-wrapper::before { left: 0; background: linear-gradient(to right, white, transparent); }
        .inf-wrapper::after { right: 0; background: linear-gradient(to left, white, transparent); }
      `}</style>

      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-18">
        <Wavyheading
          text1="Available Across India with "
          text2="Fast & Convenient"
          text3="Delivery"
        />
        <p className="text-center text-[20px] text-gray-500 mb-4 max-w-5xl mx-auto leading-relaxed">
          Get your supplements delivered quickly through trusted platforms or
          shop directly from our website - clean nutrition, now closer than
          ever.
        </p>
      </div>

      {/* ── Mobile Slider (≤768px) - auto + arrows + dots ── */}
      <div className="block md:hidden mt-6 px-2">
        <MobileSlider />
      </div>

      {/* ── Desktop Infinite Slider (>768px) ── */}
      <div className="hidden md:block inf-wrapper px-4 sm:px-8">
        <div ref={trackRef} className="inf-track py-2" {...handlers}>
          {infiniteCards.map((platform, i) => (
            <div key={`${platform.id}-${i}`} className="inf-slide">
              <PlatformCard platform={platform} />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-18">
        <p className="text-center text-[13px] text-gray-400 mt-6">
          Multiple platforms. One trusted formulation.
        </p>
      </div> */}
    </section>
  );
}
