// components/product/ProductCarouselSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "../common/ProductCard";
import { ProductCardSkeleton } from "../common/SkeletonLoaders";

export default function ProductCarouselSection({
  title,
  subtitle,
  products = [],
  id,
  loading = false,
  onAddToCart,
}) {
  if (!loading && products.length === 0) return null;

  const navPrev = `${id}-prev`;
  const navNext = `${id}-next`;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-toma text-xl sm:text-2xl font-bold text-text">
            {title}
          </h2>
          {subtitle && (
            <p className="font-modelica text-sm text-text-light mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            className={`${navPrev} cursor-pointer w-9 h-9 bg-white border border-gray-200 hover:border-gray-400 rounded-full shadow-sm flex items-center justify-center text-text transition`}
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            className={`${navNext} cursor-pointer w-9 h-9 bg-white border border-gray-200 hover:border-gray-400 rounded-full shadow-sm flex items-center justify-center text-text transition`}
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: `.${navNext}`, prevEl: `.${navPrev}` }}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
