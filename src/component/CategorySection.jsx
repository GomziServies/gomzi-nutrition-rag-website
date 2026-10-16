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
import { isRealProduct } from "../utils/productAdapter";
import { addProductToCart } from "../services/cartStorage.service";

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
    background:#dbdee9;
    opacity:1;
    margin:0 5px !important;
    border-radius:999px;
    transition:.3s;
}

.category-swiper .swiper-pagination-bullet-active{
    width:32px;
    background:#5C3124;
}

/* Custom Buttons */

.slider-btn{
    width:44px;
    height:44px;
    border-radius:9999px;
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid #dbdee9;
    background:#fff;
    color:#5C3124;
    transition:.3s;
    box-shadow:0 4px 12px rgba(0,0,0,.06);
}

.slider-btn:hover{
    background:#5C3124;
    color:#fff;
    border-color:#5C3124;
    transform:translateY(-2px);
}

@media(max-width:768px){
    .slider-btn{
        display:none;
    }
}
`;

const CategorySection = ({ category = "Whey Protein", title = "Top Protein Picks" }) => {
  const swiperRef = useRef(null);

  const isProteinOrSports =
    !category ||
    category.toLowerCase().includes("whey") ||
    category.toLowerCase().includes("sports") ||
    category.toLowerCase().includes("protein");

  const { products, loading } = useProducts({
    page: 1,
    limit: 12,
    search: isProteinOrSports ? "Whey" : "",
    category: isProteinOrSports ? "" : category,
  });

  const validProducts = (products || []).filter(isRealProduct);

  if (loading || validProducts.length === 0) return null;
  return (
    <>
      <style>{swiperStyles}</style>
      <section className="mb-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-toma text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>

            <p className="mt-2 text-gray-500">
              Explore our best-selling {category.toLowerCase()} products.
            </p>

            {/* <Link
              to={`/gomzi-supplement?category=${encodeURIComponent(category)}`}
              className="inline-flex items-center gap-2 mt-5 text-[#95442c] font-semibold hover:gap-3 transition-all"
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
          {validProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                product={product}
                onAddToCart={(p) => addProductToCart(p)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default CategorySection;
