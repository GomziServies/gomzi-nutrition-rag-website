import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./common/ProductCard";
import useProducts from "../hooks/useProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Pagination } from "swiper/modules";

const swiperStyles = `
.category-swiper{
    overflow:hidden;
    padding-bottom:55px;
}

/* Hide default arrows */

.category-swiper .swiper-button-next,
.category-swiper .swiper-button-prev{
    display:none;
}

/* Pagination */

.category-swiper .swiper-pagination{
    bottom:0 !important;
}

.category-swiper .swiper-pagination-bullet{
    width:10px;
    height:10px;
    background:#D9C8B6;
    opacity:1;
    margin:0 5px !important;
    border-radius:999px;
    transition:.3s;
}

.category-swiper .swiper-pagination-bullet-active{
    width:32px;
    background:#95442c;
}

/* Custom Buttons */

.slider-btn{
    width:44px;
    height:44px;
    border-radius:9999px;
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid #E8D9C8;
    background:#fff;
    color:#95442c;
    transition:.3s;
    box-shadow:0 8px 24px rgba(0,0,0,.08);
}

.slider-btn:hover{
    background:#95442c;
    color:#fff;
    border-color:#95442c;
    transform:translateY(-2px);
}

@media(max-width:768px){
    .slider-btn{
        display:none;
    }
}
`;

const CategorySection = ({ category }) => {
  const swiperRef = useRef(null);
  const { products, loading } = useProducts({
    page: 1,
    limit: 8,
    category,
  });

  if (loading || products.length === 0) return null;
  return (
    <>
      <style>{swiperStyles}</style>
      <section className="mb-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-toma text-3xl md:text-4xl font-bold">
              Best Selling
            </h2>

            <p className="mt-2 text-gray-500">
              Explore our best-selling {category.toLowerCase()} products.
            </p>

            {/* <Link
              to={`/gomzi-supplement?category=${encodeURIComponent(category)}`}
              className="inline-flex items-center gap-2 mt-5 text-primary font-semibold hover:gap-3 transition-all"
            >
              View all products
              <ChevronRight size={18} />
            </Link> */}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="slider-btn"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="slider-btn"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="category-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default CategorySection;
