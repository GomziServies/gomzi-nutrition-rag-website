import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import {
  Star,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { getAllCustomerFeedbackApi } from "../../api/feedback.api";

/**
 * Curated high-converting testimonials for initial/fallback render
 */
/*
const DEFAULT_TESTIMONIALS = [
  {
    id: "fb-1",
    name: "Ravi Prajapati",
    rating: 5,
    comment:
      "Bohat achha taste he! The mixability of the Whey Isolate is top notch with zero lumps. Recovery after heavy leg day has improved noticeably.",
    productName: "Whey Protein Isolate",
    date: "Verified Athlete",
    verified: true,
  },
  {
    id: "fb-2",
    name: "Devanshu Champ",
    rating: 5,
    comment:
      "Pure Go Creatine Monohydrate gave me clean strength gains within 2 weeks. Lab tested purity at an unbeatable price point.",
    productName: "Creatine Monohydrate",
    date: "Verified Buyer",
    verified: true,
  },
  {
    id: "fb-3",
    name: "Kartik Bhalodiya",
    rating: 5,
    comment:
      "Nice very most reliable brand for bodybuilding supplements. Original authentic batch with QR verification on the seal.",
    productName: "Spark EAA Intra-Workout",
    date: "Verified Gym Member",
    verified: true,
  },
  {
    id: "fb-4",
    name: "Brijesh Prajapati",
    rating: 5,
    comment:
      "Best Product in the market. Digestion is smooth with zero bloating, and the chocolate fudge flavor tastes incredible.",
    productName: "Pure Go Whey Protein 1kg Chocolate",
    date: "Verified Buyer",
    verified: true,
  },
  {
    id: "fb-5",
    name: "Aman Sharma",
    rating: 5,
    comment:
      "Pre-Workout punch formula gives sustained energy and focus without the jitters or sudden crash. Excellent pump throughout the session.",
    productName: "Pure Go Pre Workout Fruit Punch",
    date: "Verified Athlete",
    verified: true,
  },
];
*/

/**
 * Extract initials for avatar monogram
 */
const getInitials = (name) => {
  if (!name || typeof name !== "string") return "CU";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Avatar brand theme generator based on user name
 */
const getAvatarTheme = (name) => {
  const brandThemes = [
    { bg: "btn-gradient border border-amber-400/30 shadow-md shadow-primary/25", text: "text-amber-100" },
    { bg: "bg-gradient-to-br from-[#1b365d] to-[#0f1e35] border border-amber-400/30 shadow-md shadow-primary/20", text: "text-amber-200" },
    { bg: "bg-gradient-to-tr from-[#1b365d] to-[#ff8914] border border-amber-400/40 shadow-md shadow-[#ff8914]/20", text: "text-white" },
    { bg: "bg-gradient-to-br from-[#14294a] to-[#1b365d] border border-primary-border shadow-md shadow-primary/20", text: "text-amber-100" },
  ];
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return brandThemes[Math.abs(hash) % brandThemes.length];
};

export default function CustomerFeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [swiperRef, setSwiperRef] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const toggleReadMore = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadFeedback = async () => {
      try {
        const res = await getAllCustomerFeedbackApi();
        if (!isMounted) return;

        const raw = res?.data?.data;
        if (Array.isArray(raw) && raw.length > 0) {
          // Normalize API feedbacks approved in RAG Admin
          const liveList = raw
            .filter((item) => Boolean(item && item.feedback_comment && item.feedback_comment.trim()))
            .map((item, idx) => {
              const firstName = item.user?.first_name || "Customer";
              const lastName = item.user?.last_name || "";
              const fullName = `${firstName} ${lastName}`.trim();
              const dateStr = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })
                : "Verified Buyer";

              return {
                id: item._id || item.id || `live-fb-${idx}`,
                name: fullName,
                rating: Number(item.feedback_point) || 5,
                comment: item.feedback_comment.trim(),
                productName: item.product?.name || "RAG Nutrition Verified",
                date: dateStr,
                verified: true,
              };
            });

          if (liveList.length > 0) {
            setFeedbacks(liveList);
            setTotalCount(liveList.length);
          }
        }
      } catch {
        // keep empty on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFeedback();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && feedbacks.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#f8fafc] py-10 md:py-14 border-t border-b border-border/60" aria-label="Customer Feedback">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Genuine Reviews Managed via Admin
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
              Customer Feedback & Reviews
            </h2>
            <p className="mt-1 text-sm text-text-light font-normal">
              Real results and unvarnished experiences from athletes and fitness enthusiasts across India.
            </p>
          </div>

          {/* Social Proof Pill & Desktop Arrows */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-border shadow-xs">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-text">4.9 / 5</span>
              <span className="text-xs text-text-light">({totalCount}+ reviews)</span>
            </div>

            {feedbacks.length > 3 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => swiperRef?.slidePrev()}
                  aria-label="Previous review"
                  className="w-9 h-9 rounded-full bg-white border border-border shadow-xs flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => swiperRef?.slideNext()}
                  aria-label="Next review"
                  className="w-9 h-9 rounded-full bg-white border border-border shadow-xs flex items-center justify-center text-primary transition-all hover:bg-primary hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, FreeMode]}
            onSwiper={setSwiperRef}
            grabCursor={true}
            freeMode={{ enabled: true, momentum: true }}
            loop={feedbacks.length > 3}
            speed={500}
            observer={true}
            observeParents={true}
            watchOverflow={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1.1}
            spaceBetween={16}
            breakpoints={{
              540: { slidesPerView: 1.6, spaceBetween: 18 },
              768: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="w-full select-none cursor-grab active:cursor-grabbing pb-2 feedback-swiper [&_.swiper-wrapper]:!flex [&_.swiper-wrapper]:!items-stretch [&_.swiper-slide]:!h-auto [&_.swiper-slide]:!flex [&_.swiper-slide]:!flex-col"
          >
            {feedbacks.map((fb, idx) => {
              const isExpanded = expandedIds.has(fb.id);
              const isLong = (fb.comment || "").length > 80;

              return (
                <SwiperSlide key={`${fb.id}-${idx}`} className="!h-auto !flex !flex-col">
                  <div className="flex-1 w-full flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-primary/40 relative">
                    <div className="flex-1 flex flex-col">
                      {/* Top row: Star rating + Quote Icon */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, starIdx) => {
                            const filled = starIdx < fb.rating;
                            return (
                              <Star
                                key={starIdx}
                                className={`w-4 h-4 ${
                                  filled
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <Quote className="w-6 h-6 text-primary/15" />
                      </div>

                      {/* Review Text with consistent height and Read More */}
                      <div className="flex-1 flex flex-col justify-start mb-4">
                        <p
                          className={`text-sm text-text-body font-normal leading-relaxed transition-all duration-200 ${
                            isExpanded ? "" : "line-clamp-3"
                          }`}
                        >
                          "{fb.comment}"
                        </p>

                        {isLong && (
                          <button
                            type="button"
                            onClick={() => toggleReadMore(fb.id)}
                            className="mt-2 self-start text-xs font-bold text-primary hover:text-primary-hover inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 transition-colors"
                          >
                            <span>{isExpanded ? "Read Less" : "Read More"}</span>
                            <span className="text-[10px]">{isExpanded ? "▲" : "▼"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-2">
                      {/* Product Tag */}
                      <div className="mb-3.5 min-h-[26px] flex items-center">
                        {fb.productName ? (
                          <span className="inline-block text-[11px] font-medium text-primary bg-primary-light px-2.5 py-1 rounded-md max-w-full truncate">
                            Purchased: {fb.productName}
                          </span>
                        ) : null}
                      </div>

                      {/* Reviewer Signature Card */}
                      <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                        {(() => {
                          const theme = getAvatarTheme(fb.name);
                          return (
                            <div
                              className={`group/avatar relative overflow-hidden w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 transition-transform duration-300 hover:scale-105 ${theme.bg}`}
                            >
                              <span className={`relative z-10 ${theme.text}`}>
                                {getInitials(fb.name)}
                              </span>
                            </div>
                          );
                        })()}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-bold text-text truncate">
                              {fb.name}
                            </h4>
                            {fb.verified && (
                              <span title="Verified Customer">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-text-light font-medium truncate">
                            {fb.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <style>{`
            .feedback-swiper .swiper-wrapper {
              display: flex !important;
              align-items: stretch !important;
            }
            .feedback-swiper .swiper-slide {
              height: auto !important;
              display: flex !important;
              flex-direction: column !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
