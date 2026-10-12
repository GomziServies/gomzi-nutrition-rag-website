import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Wavyheading from "../common/Wavyheading";

const swiperStyles = `
.product-swiper{
    overflow:hidden;
}

.product-swiper .swiper-wrapper{
    align-items:stretch;
}

.product-swiper .swiper-slide{
    height:auto;
}

/* Hide Default Navigation */

.product-swiper .swiper-button-prev,
.product-swiper .swiper-button-next{
    display:none;
}

/* Custom Navigation */

.slider-btn{
    width:48px;
    height:48px;
    border-radius:999px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fff;
    border:1px solid #E7D9C8;
    color:#95442c;
    transition:.3s;
    box-shadow:0 6px 18px rgba(0,0,0,.08);
}

.slider-btn:hover{
    background:#95442c;
    color:#fff;
    transform:translateY(-2px);
    border-color:#95442c;
}

/* Pagination */

.product-swiper .swiper-pagination{
    position:relative;
    margin-top:24px;
}

.product-swiper .swiper-pagination-bullet{
    width:10px;
    height:10px;
    border-radius:20px;
    background:#D8C7B4;
    opacity:1;
    transition:.3s;
    margin:0 5px !important;
}

.product-swiper .swiper-pagination-bullet-active{
    width:34px;
    background:#95442c;
}

/* Mobile */

@media(max-width:1024px){

    .slider-btn{
        display:none;
    }

}
`;

const categories = [
  {
    id: 1,
    title: "Whey Protein",
    subtitle:
      "Premium protein blends, isolates, and concentrates designed to support muscle growth, recovery, and daily protein needs.",
    image: "/images/product-category/whey-protein.webp",
    url: "/gomzi-supplement/whey-protein",
    cta: "Whey Protein",
  },
  {
    id: 2,
    title: "Mass Gainer",
    subtitle:
      "High-calorie formulas to help you build quality size, strength, and lean muscle mass.",
    image: "/images/product-category/mass-gainer.webp",
    url: "/gomzi-supplement/mass-gainer",
    cta: "Explore More",
  },
  {
    id: 8,
    title: "Plant Protein",
    subtitle:
      "A premium 100% vegan protein blend made from pea, peanut, soya, and brown rice protein to support muscle recovery, growth, and daily protein needs.",
    image: "/images/product-category/plant-protein.webp",
    url: "/gomzi-supplement/plant-protein",
    cta: "Explore More",
  },
  {
    id: 6,
    title: "Meal Replacement",
    subtitle:
      "Convenient, nutrient-rich meal solutions for busy lifestyles, weight management, and balanced nutrition.",
    image: "/images/product-category/whey-protein.webp",
    url: "/gomzi-supplement/meal-replacement",
    cta: "Explore More",
  },
  {
    id: 3,
    title: "Pre Workout",
    subtitle:
      "Advanced performance formulas to boost energy, focus, endurance, and training intensity.",
    image: "/images/product-category/pre-workout.webp",
    url: "/gomzi-supplement/pre-workout",
    cta: "Explore More",
  },
  {
    id: 4,
    title: "BCAA & Amino Acids",
    subtitle:
      "Essential amino acids to support muscle recovery, reduce fatigue, and enhance performance.",
    image: "/images/product-category/Bcaa-tangy-orange.webp",
    url: "/gomzi-supplement/meal-replacement",
    cta: "Explore More",
  },
  {
    id: 5,
    title: "Creatine",
    subtitle:
      "Scientifically formulated creatine supplements to improve strength, power, and muscle performance.",
    image: "/images/product-category/creatine.webp",
    url: "/gomzi-supplement/creatine",
    cta: "Explore More",
  },

  {
    id: 7,
    title: "Wellness & Health",
    subtitle:
      "Everyday wellness supplements designed to support immunity, recovery, and a healthier lifestyle.",
    image: "/images/product-category/Multivitamins.webp",
    url: "/gomzi-supplement/wellness-health",
    cta: "Explore More",
  },
];

/* ── Inline Product Card ── */
function CategoryCard({ category }) {
  const [expanded, setExpanded] = useState(false);

  const words = category.subtitle.split(" ");
  const isLong = words.length > 13;
  const displayText =
    expanded || !isLong
      ? category.subtitle
      : words.slice(0, 13).join(" ") + "...";

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
      {/* Image Area */}
      <div className="relative overflow-hidden aspect-[4/4.2] bg-[#f5f5f5]">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
          {category.title}
        </h3>

        <p className="text-[13px] text-gray-500 leading-relaxed">
          {displayText}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 font-semibold hover:underline cursor-pointer"
              style={{ color: "#003873" }}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="flex-1" />

        <a
          href={category.url}
          className="mt-3 w-full py-2.5 text-center px-4 rounded-xl text-white text-[13px] font-semibold tracking-wide uppercase active:scale-[0.98] transition-all duration-200"
          style={{ backgroundColor: "#95442c" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#95442c")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#95442c")
          }
        >
          {category.cta}
        </a>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function SeasonFavoritesSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className="w-full bg-white py-8 md:py-8 lg:py-10">
      <style>{swiperStyles}</style>
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-18">
        <div className="flex items-end justify-between mb-10">
          <Wavyheading text1="Science Based Sport Supplements" />

          <div className="hidden lg:flex items-center gap-3">
            <button ref={prevRef} className="slider-btn">
              <ChevronLeft size={20} />
            </button>

            <button ref={nextRef} className="slider-btn">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop
            speed={700}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="product-swiper pb-14"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className="h-auto mb-5">
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
