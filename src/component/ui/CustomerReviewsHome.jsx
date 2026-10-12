import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";

const reviews = [
  {
    name: "Pritam Rathod",
    product: "Whey Protein",
    review:
      "I've been using gomzi for weeks. The [cofee] flavor is excellent-not too sweet and has no artificial aftertaste. It mixes perfectly in a standard shaker bottle with water, with zero chalky texture. the 22g of protein per scoop offers great value. Best of all, the blend form is incredibly easy on my stomach and causes no bloating. Highly recommend it for post-workout recovery",
  },
  {
    name: "Jaydeep Maniyar",
    product: "Whey Protein and Ignite",
    review:
      "Protein powder and ignite I have used and result was amazed me, after workout and pre-workout energy level was detorieted which got high after taking gomzi supplements. I must say it work like a tonic. Nice and quality product.",
  },
  {
    name: "Jatinder Dua",
    product: "Whey Protein",
    review:
      "I regularly use this protein powder offers good quality, good taste, provides high protein content, is easy to digest, boosts energy levels, and effectively. supports muscle recovery and growth. Mawa kulfi and chocolate flavour is my favourite | Highly recommended!",
  },
  {
    name: "Hitesh Surati",
    product: "Premium supplements",
    review:
      "Surat's best protein shop, get premium supplements here and that too at affordable price. So I suggest you buy protein, EAA, gainer etc. from here. All products are genuine, lab tasted, protein powder are easy to digest, no bloating issue, trusted brand, Thank you.",
  },
  {
    name: "Mansi Lakdawala",
    product: "Whey Protein",
    review:
      "Last 2 years i go to the gym every day n im too much serious about fitness but i love to eat sweet n mava kulfi is my most favourite sweet but i didn't eat kulfi last 2 years but now i found Gomzi Supplement it's in mava kulfi flavour and it's tooo tasty n healthy...",
  },
  {
    name: "Lakdawala Vraj",
    product: "Whey Protein",
    review:
      "It Is undoubtedly an amazing product and has some good flavour than usual whey proteins. It blends well and leave no lumps behind. Digestion is also quite good. I am myself a whey protein user for past 4 years and have tested out more than 5 brands till date and found this one to be good as well. the quality is perfect. Totally recommendable.",
  },
  {
    name: "Darshana Icecreamwala",
    product: "Whey Protein",
    review:
      "This protein powder offers great quality, good taste, and excellent value for money. It provides high protein content, is easy to digest, boosts energy levels, mixes well without clumps, and effectively supports muscle recovery and growth. Highly recommended!",
  },
];

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
    <section className="bg-section py-6 md:py-16 w-full overflow-hidden">
      <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 mb-14">
          <div>
            <span className="uppercase tracking-[5px] text-xs font-semibold text-[#B66B1E]">
              CUSTOMER STORIES
            </span>

            <h2 className="mt-3 text-4xl lg:text-5xl font-black">
              What people are saying ?
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">
                {String(activeIndex).padStart(2, "0")}
              </span>

              <div className="w-28 h-[3px] rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#B66B1E] transition-all duration-300"
                  style={{
                    width: `${(activeIndex / reviews.length) * 100}%`,
                  }}
                />
              </div>

              <span className="text-gray-400">
                {String(reviews.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex gap-3">
              <button className="review-prev h-12 w-12 rounded-full border border-[#E5D8C8] flex items-center justify-center hover:bg-[#18120D] hover:text-white transition-all">
                <ChevronLeft size={20} />
              </button>

              <button className="review-next h-12 w-12 rounded-full border border-[#E5D8C8] flex items-center justify-center hover:bg-[#18120D] hover:text-white transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          spaceBetween={24}
          autoplay={{
            delay: 4500,
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
                <div
                  className="
                    h-full
                    min-h-[380px]
                    rounded-[30px]
                    border
                    border-[#E7D9C8]
                    bg-white
                    p-6
                    flex
                    flex-col
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-[#B66B1E]
                    hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
                  "
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={15}
                        fill="#F59E0B"
                        color="#F59E0B"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <div className="mt-6">
                    <p
                      className={`
                        italic
                        text-[22px]
                        leading-10
                        text-[#222]
                        transition-all
                        duration-300
                        ${isExpanded ? "" : "line-clamp-4"}
                      `}
                    >
                      "{review.review}"
                    </p>

                    {/* Read More */}
                    {review.review.length > 180 && (
                      <button
                        onClick={() => toggleReadMore(review.name)}
                        className="mt-3 text-[#B66B1E] font-semibold text-sm hover:text-[#18120D] transition-colors"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  {/* Customer Info */}
                  <div className="pt-6">
                    <h4 className="font-bold text-2xl">{review.name}</h4>

                    <p className="mt-1 text-sm text-gray-500">Verified Buyer</p>

                    <div className="mt-5 inline-flex rounded-full bg-[#F6F1EA] px-4 py-2 text-sm font-medium">
                      {review.product}
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
