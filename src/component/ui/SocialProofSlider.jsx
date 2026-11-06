import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import WavyImageUnderline from "../common/WavyImageUnderline";
import Wavyheading from "../common/Wavyheading";

// ─── Slides Data - sirf video path ───────────
const slides = [
  { id: 1, video: "/videos/test1.mp4" },
  { id: 2, video: "/videos/test2.mp4" },
  { id: 3, video: "/videos/test3.mp4" },
  { id: 4, video: "/videos/test4.mp4" },
  { id: 5, video: "/videos/test5.mp4" },
  { id: 6, video: "/videos/test6.mp4" },
];

// ─── Single Video Card ────────────────────────
function VideoCard({ slide }) {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-section group cursor-pointer">
      <video
        src={slide.video}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────
export default function SocialProofSlider() {
  return (
    <section className="w-full bg-bg py-12 md:py-16 lg:py-20">
      <div className="site-container sm:px-6 lg:px-16">
        {/* Heading */}

        <Wavyheading text1="Thousands choose GOMZI " text2="for a reason" />

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-btn-prev",
              nextEl: ".swiper-btn-next",
            }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides={false}
            breakpoints={{
              320: { slidesPerView: 1.3, spaceBetween: 12 },
              480: { slidesPerView: 2.2, spaceBetween: 14 },
              640: { slidesPerView: 2.5, spaceBetween: 16 },
              900: { slidesPerView: 3.5, spaceBetween: 18 },
              1024: { slidesPerView: 4.2, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 22 },
            }}
            className="!overflow-hidden"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <VideoCard slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          <button
            className="swiper-btn-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
              w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-border
              flex items-center justify-center
              hover:bg-section transition-colors duration-200
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 text-text"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            className="swiper-btn-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
              w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-md border border-border
              flex items-center justify-center
              hover:bg-section transition-colors duration-200
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 text-text"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
