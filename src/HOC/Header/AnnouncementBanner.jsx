import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade"; // 👈 aa pan import kar

const announcements = [
  { id: 1, icon: "🔥", text: "FREE Shipping" },
  // { id: 2, icon: "🎁", text: "Buy 2 Get 1 FREE - Limited Time Offer!" },
  // { id: 3, icon: "⚡", text: "Flash Sale: Up to 50% OFF Today Only!" },
  // { id: 4, icon: "🚚", text: "Express Delivery Available - Order by 3PM" },
];

export default function AnnouncementBar() {
  return (
    <div className="w-full py-2 px-4 select-none bg-primary">
      <div className="max-w-[var(--container-width)] mx-auto relative flex items-center px-10">
        {/* Custom Prev Button */}
        <button
          className="swiper-announcement-prev flex-shrink-0 transition-colors duration-200 px-2 text-lg z-10 text-text-light hover:text-btn-light"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Swiper */}
        <div className="flex-1 overflow-hidden">
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]} // EffectFade add kar
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            effect="fade" // 👈 fade effect
            fadeEffect={{ crossFade: true }} // 👈 smooth fade
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".swiper-announcement-prev",
              nextEl: ".swiper-announcement-next",
            }}
            speed={500}
            className="announcement-swiper"
          >
            {announcements.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex items-center justify-center gap-2 text-center w-full ">
                  {/* Icon */}
                  <span className="text-base sm:text-sm text-secondary">
                    {item.icon}
                  </span>

                  {/* Text */}
                  <p className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap truncate max-w-xs sm:max-w-none font-modelica uppercase text-btn-light">
                    {item.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Next Button */}
        <button
          className="swiper-announcement-next flex-shrink-0 transition-colors duration-200 px-2 text-lg z-10 text-text-light hover:text-btn-light"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
