import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

const reviews = [
  {
    name: "Lakdawala Vraj",
    location: "Surat, IN",
    product: "Whey Protein",
    rating: 5,
    review:
      "It is undoubtedly an amazing product and has some good flavour than usual whey proteins. It blends well and leaves no lumps behind. Digestion is also quite good. I am myself a whey protein user for past 4 years and have tested out more than 5 brands till date and found Gomzi to be the best. The quality is perfect. Totally recommendable!",
  },
  {
    name: "Darshana Icecreamwala",
    location: "Navsari, IN",
    product: "Whey Protein",
    rating: 5,
    review:
      "This protein powder offers great quality, good taste, and excellent value for money. It provides high protein content, is easy to digest, boosts energy levels, mixes well without clumps, and effectively supports muscle recovery and growth. Highly recommended!",
  },
  {
    name: "Pritam Rathod",
    location: "Mumbai, IN",
    product: "Whey Protein",
    rating: 5,
    review:
      "I've been using Gomzi for weeks. The coffee flavor is excellent—not too sweet and has zero artificial aftertaste. It mixes perfectly in a standard shaker bottle with water, with zero chalky texture. The 24g of protein per scoop offers great value. Best of all, it is incredibly easy on my stomach and causes no bloating. Highly recommend it for post-workout recovery!",
  },
  {
    name: "Jaydeep Maniyar",
    location: "Ahmedabad, IN",
    product: "Whey & Ignite",
    rating: 5,
    review:
      "Protein powder and Ignite pre-workout have completely transformed my training sessions. After high-intensity workouts, my energy used to drop, but Gomzi keeps my stamina peaked. Zero crash, great digestion, and authentic lab-certified quality. Highly impressed!",
  },
  {
    name: "Jatinder Dua",
    location: "Chandigarh, IN",
    product: "Whey Protein",
    rating: 5,
    review:
      "I regularly use this protein powder. It offers top-notch quality, delicious taste, and high protein content with zero filler gums. Easy to digest and boosts muscle recovery noticeably. Mawa Kulfi and Rich Chocolate are my absolute favorites. Truly a five-star supplement!",
  },
  {
    name: "Hitesh Surati",
    location: "Surat, IN",
    product: "Supplements",
    rating: 5,
    review:
      "Hands down the best protein and supplement brand in India. Premium formulas at genuine honest pricing. Lab-tested quality, easy to digest with zero bloating, and authentic seals on every tub. Truly a brand you can trust completely.",
  },
  {
    name: "Mansi Lakdawala",
    location: "Vadodara, IN",
    product: "Whey Protein",
    rating: 5,
    review:
      "Training 6 days a week means clean nutrition is non-negotiable. I have a huge sweet tooth and missed traditional sweets like Mawa Kulfi. Gomzi's Mawa Kulfi Whey satisfies cravings completely without sugar or guilt. Outstanding flavor and mixability!",
  },
];

const getInitials = (name) => {
  if (!name) return "GZ";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function CustomerReviews() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReadMore = (name) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <section className="bg-[#faf8f6] py-12 sm:py-16 md:py-20 w-full overflow-hidden border-t border-[#ebdcd7]/60">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C3124]/10 border border-[#5C3124]/20 mb-3.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-[#5C3124]">
                Customer Stories
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              What People Are Saying{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C3124] to-amber-700">
                About Gomzi
              </span>
            </h2>

            <div className="mt-2.5 flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-medium flex-wrap">
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="font-extrabold text-gray-900">4.9 / 5.0</span>
              <span className="text-gray-300">•</span>
              <span>2,400+ Verified Customer Reviews Pan-India</span>
            </div>
          </div>

          {/* Pagination & Nav Buttons */}
          <div className="flex items-center gap-5 sm:gap-6 self-start lg:self-end">
            <div className="flex items-center gap-3">
              <span className="font-black text-base sm:text-lg text-gray-900 tabular-nums">
                {String(activeIndex).padStart(2, "0")}
              </span>

              <div className="w-24 sm:w-28 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5C3124] to-amber-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${(activeIndex / reviews.length) * 100}%`,
                  }}
                />
              </div>

              <span className="text-xs sm:text-sm font-bold text-gray-400 tabular-nums">
                {String(reviews.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                aria-label="Previous review"
                className="review-prev h-11 w-11 rounded-full border border-gray-200 bg-white hover:bg-[#5C3124] hover:border-[#5C3124] hover:text-white flex items-center justify-center text-gray-700 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                aria-label="Next review"
                className="review-next h-11 w-11 rounded-full border border-gray-200 bg-white hover:bg-[#5C3124] hover:border-[#5C3124] hover:text-white flex items-center justify-center text-gray-700 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          spaceBetween={24}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".review-prev",
            nextEl: ".review-next",
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex + 1);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => {
            const isExpanded = expandedReviews[review.name];

            return (
              <SwiperSlide key={review.name} className="h-auto">
                <div className="h-full min-h-[380px] rounded-3xl border border-[#ebdcd7]/90 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(92,49,36,0.12)] hover:border-amber-400/40 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group">
                  {/* Subtle moving card sheen sweep on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#5C3124]/[0.03] to-transparent pointer-events-none" />
                  {/* Decorative Quotation Mark Watermark */}
                  <div className="absolute top-3 right-5 text-6xl font-serif font-black text-[#5C3124]/5 group-hover:text-[#5C3124]/12 transition-colors select-none pointer-events-none leading-none">
                    “
                  </div>

                  <div>
                    {/* Top Bar: Stars + Rating + Verified Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={15}
                              fill="#F59E0B"
                              color="#F59E0B"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-black text-gray-900 ml-1">
                          5.0
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Verified Buyer
                      </span>
                    </div>

                    {/* Review Body */}
                    <div className="relative z-10">
                      <p
                        className={`text-sm sm:text-[15px] leading-relaxed text-gray-700 transition-all duration-300 font-normal ${
                          isExpanded ? "" : "line-clamp-4"
                        }`}
                      >
                        "{review.review}"
                      </p>

                      {/* Read More Toggle */}
                      {review.review.length > 170 && (
                        <button
                          type="button"
                          onClick={() => toggleReadMore(review.name)}
                          className="mt-2.5 text-[#5C3124] hover:text-[#3a1d15] font-bold text-xs inline-flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 group/btn"
                        >
                          <span>{isExpanded ? "Read Less" : "Read More"}</span>
                          <span className="text-[10px] group-hover/btn:translate-x-0.5 transition-transform">
                            {isExpanded ? "↑" : "→"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bottom Bar: Customer Avatar, Name, Location & Purchased Product Pill */}
                  <div className="pt-5 mt-6 border-t border-gray-100 flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Initials Avatar */}
                      <div className="group/avatar relative overflow-hidden w-10 h-10 rounded-full bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] border border-amber-400/30 text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-md shadow-[#5C3124]/25 group-hover:scale-105 group-hover:border-amber-400/60 transition-all duration-300">
                        <span className="relative z-10 text-amber-100">{getInitials(review.name)}</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <h4 className="font-extrabold text-sm text-gray-950 truncate leading-snug">
                          {review.name}
                        </h4>
                        <span className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                          {review.location}
                        </span>
                      </div>
                    </div>

                    {/* Product Tag */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fdf6f4] border border-[#ebdcd7] text-[#5C3124] text-[11px] font-bold flex-shrink-0 max-w-[120px] shadow-2xs">
                      <span className="truncate">{review.product}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
