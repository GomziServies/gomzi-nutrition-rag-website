import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getBankOffersApi } from "../../api/bank-offer.api";
import { BannerSliderSkeleton } from "../common/SkeletonLoaders";

// Clean Vector HSBC Bank Logo
function HSBCLogo() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 100 100" fill="none">
        <polygon points="50,15 85,50 50,85 15,50" fill="#dc2626" />
        <polygon points="50,15 85,50 50,50" fill="#b91c1c" />
        <polygon points="15,50 50,50 50,85" fill="#ef4444" />
        <polygon points="32.5,32.5 67.5,32.5 67.5,67.5 32.5,67.5" fill="#ffffff" />
        <polygon points="32.5,32.5 50,50 32.5,67.5" fill="#fca5a5" />
        <polygon points="67.5,32.5 50,50 67.5,67.5" fill="#dc2626" />
      </svg>
      <span className="font-black text-gray-900 text-base sm:text-xl tracking-tight">
        HSBC
      </span>
    </div>
  );
}

// Clean HDFC Bank Logo
function HDFCLogo() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#004c8f] rounded flex items-center justify-center p-1 text-white font-black text-[9px] sm:text-[10px] leading-tight text-center">
        HDFC BANK
      </div>
      <span className="font-black text-gray-900 text-base sm:text-xl tracking-tight">
        HDFC
      </span>
    </div>
  );
}

// Clean ICICI Bank Logo
function ICICILogo() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f37021] rounded-full flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-xs">
        i
      </div>
      <span className="font-black text-[#f37021] text-base sm:text-xl tracking-tight">
        ICICI Bank
      </span>
    </div>
  );
}

// Clean UPI / Instant Checkout Logo
function UPILogo() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-xs">
        UPI
      </div>
      <span className="font-black text-gray-900 text-base sm:text-xl tracking-tight">
        UPI Pay
      </span>
    </div>
  );
}

const resolveImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/")) {
    return img;
  }
  return `https://files.fggroup.in/${img}`;
};

export default function BankOffersBannerSlider() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchOffers = async () => {
      try {
        const res = await getBankOffersApi();
        if (isMounted && res?.data?.data?.offers?.length > 0) {
          setOffers(res.data.data.offers);
        }
      } catch (err) {
        console.warn("Could not fetch bank offers:", err?.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOffers();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && offers.length === 0) {
    return <BannerSliderSkeleton aspect="aspect-[16/5] sm:aspect-[21/5]" />;
  }

  if (!offers || offers.length === 0) {
    return null;
  }

  const renderBankLogo = (offer) => {
    if (offer.logo) {
      return (
        <img
          src={resolveImageUrl(offer.logo)}
          alt={offer.bankName}
          className="h-8 sm:h-10 max-w-[100px] object-contain"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      );
    }

    const preset = (offer.bankPreset || "").toLowerCase();
    const nameLower = (offer.bankName || "").toLowerCase();

    if (preset === "icici" || nameLower.includes("icici")) {
      return <ICICILogo />;
    }
    if (preset === "hdfc" || nameLower.includes("hdfc")) {
      return <HDFCLogo />;
    }
    if (preset === "hsbc" || nameLower.includes("hsbc")) {
      return <HSBCLogo />;
    }
    if (preset === "upi" || nameLower.includes("upi")) {
      return <UPILogo />;
    }

    return (
      <div className="px-2.5 py-1 bg-gray-100 rounded-lg text-gray-900 font-black text-sm tracking-tight border border-gray-200">
        {offer.bankName}
      </div>
    );
  };
  const handleBannerClick = (rawUrl) => {
    const url = (rawUrl || "/gomzi-supplement").trim();
    if (!url) return;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (url.startsWith("www.")) {
      window.open(`https://${url}`, "_blank", "noopener,noreferrer");
    } else {
      navigate(url.startsWith("/") ? url : `/${url}`);
    }
  };


  return (
    <section className="w-full py-6 sm:py-8 bg-[#faf8f6] overflow-hidden" aria-label="Bank Partner Offers Carousel">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-12">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            loop={offers.length > 1}
            className="w-full"
          >
            {offers.map((offer, idx) => {
              const offerId = offer._id || offer.id || `offer-${idx}`;
              const gradient =
                offer.bgGradient ||
                "linear-gradient(180deg, #5b1d7d 0%, #681f8f 65%, #c83d09 95%, #ea580c 100%)";

              return (
                <SwiperSlide key={offerId}>
                  <div
                    onClick={() => handleBannerClick(offer.url)}
                    className="group/slide relative w-full min-h-[160px] sm:min-h-[180px] md:min-h-[200px] cursor-pointer flex flex-col justify-between overflow-hidden select-none"
                    style={{ background: gradient }}
                  >
                    {/* Subtle moving card sheen sweep on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover/slide:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-20" />

                    {/* Decorative Festive Streamers & Background Texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                      {/* Concentric rings pattern */}
                      <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-96 h-96 rounded-full border border-white/20" />
                      <div className="absolute left-1/2 -top-20 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full border border-white/10" />

                      {/* Festive golden confetti ribbons */}
                      <span className="absolute top-3 left-8 text-yellow-300 text-lg rotate-12">✦</span>
                      <span className="absolute top-6 left-24 text-yellow-200 text-sm -rotate-45">★</span>
                      <span className="absolute top-4 right-12 text-yellow-300 text-lg -rotate-12">✦</span>
                      <span className="absolute top-8 right-28 text-yellow-200 text-sm rotate-45">★</span>
                      <span className="absolute bottom-6 left-16 text-white text-xs">◆</span>
                      <span className="absolute bottom-8 right-20 text-white text-xs">◆</span>
                    </div>

                    {/* ── Main Center Bank Offer Box ── */}
                    <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-12 py-5 sm:py-6">
                      <div className="bg-white rounded-xl shadow-lg border border-white/40 py-3 sm:py-4 px-5 sm:px-10 flex items-center justify-center gap-4 sm:gap-6 max-w-xl w-full transform hover:scale-[1.02] transition-transform duration-200">
                        {/* Bank Logo */}
                        <div className="flex-shrink-0">{renderBankLogo(offer)}</div>

                        {/* Divider */}
                        <div className="w-[1.5px] h-9 sm:h-11 bg-gray-200 flex-shrink-0" />

                        {/* Offer Text */}
                        <div className="flex flex-col items-start">
                          <span className="text-base sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
                            {offer.heading}
                          </span>
                          {offer.subheading && (
                            <span className="text-xs sm:text-sm font-semibold text-gray-600 mt-0.5">
                              {offer.subheading}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ── Bottom Terms Bar ── */}
                    <div className="relative z-10 w-full py-1.5 flex items-center justify-center text-center">
                      <span className="text-[10px] text-white/90 font-medium tracking-wide">
                        {offer.terms}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Controls: Left & Right circular dark buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-md backdrop-blur-xs"
            aria-label="Previous Offer"
          >
            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer shadow-md backdrop-blur-xs"
            aria-label="Next Offer"
          >
            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
            {offers.map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-6 h-1.5 bg-white shadow-xs"
                    : "w-1.5 h-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
