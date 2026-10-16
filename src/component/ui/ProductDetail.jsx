import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiClock } from "react-icons/fi";
import { FaHeart, FaBrain, FaBolt } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScientificallyProvenproductdetail from "./Scientifically-Proven-product-detail";
import HelthSectionproductdetail from "./Health-Section-product-detail";
import Hookheading from "../common/Hookheading";
import ProductsGrid from "./ProductsGrid";
import ProductCarouselSection from "./ProductCarouselSection";
import FAQSection from "./FAQItem";
import CustomerReviews from "./CustomerReviews";
import { Link, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { addToCart } from "../../services/product.service";
import { successToast, errorToast } from "../../utils/toast";
import useAuth from "../../hooks/useAuth";
import CartSidebar from "../ui/CartSidebar";
import ProductPageSkeleton from "../ProductPageSkeleton";
import { addGuestCartItem } from "../../services/cartStorage.service";
import SEO from "../SEO";
import ZoomImage from "./ZoomImage";
import { FiPackage, FiShield, FiTruck } from "react-icons/fi";
import {
  trackRecentlyViewed,
  useRecentlyViewed,
} from "../../hooks/useRecentlyViewed";

const categorySlugMap = {
  "Whey Protein": "whey-protein",
  "Plant Protein": "plant-protein",
  BCAA: "bcaa",
  Creatine: "creatine",
  "Mass Gainer": "mass-gainer",
  "Pre Workout": "pre-workout",
  "BCAA & Amino Acids": "bcaa",
  "Meal Replacement": "meal-replacement",
  "Wellness & Health": "wellness-health",
};

export default function NARAProductPage() {
  const { slug } = useParams();
  const { product, loading } = useProducts({ slug });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const currentProduct = selectedVariation || product;
  const [cartLoading, setCartLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const desktopSwiperRef = useRef(null);

  useEffect(() => {
    if (product?._id) trackRecentlyViewed(product);
  }, [product?._id]);

  const recentlyViewed = useRecentlyViewed(product?._id);
  const primaryCategory = Array.isArray(product?.categories)
    ? product.categories[0]
    : typeof product?.categories === "string"
    ? product.categories
    : "";

  const { products: relatedRaw, loading: relatedLoading } = useProducts({
    category: primaryCategory,
    limit: 10,
  });
  const recentLoading = loading || !product?._id || !recentlyViewed;
  const relatedProducts = relatedRaw
    ?.filter((p) => p._id !== product?._id)
    ?.filter((p) => !recentlyViewed.some((recent) => recent._id === p._id));

  const recentProducts = recentlyViewed.filter((p) => p._id !== product?._id);
  if (loading) {
    return (
      <>
        {loading ? <ProductPageSkeleton /> : null}

        <ProductCarouselSection loading={relatedLoading} />

        <ProductCarouselSection loading={recentLoading} />
      </>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const categoryName = Array.isArray(product.categories)
    ? product.categories[0] || "Supplement"
    : typeof product.categories === "string" && product.categories.trim()
    ? product.categories
    : "Supplement";

  const PRODUCT_PLACEHOLDER = "/images/product-placeholder.webp";

  const imageSource =
    currentProduct.displayImages?.length > 0
      ? currentProduct.displayImages
      : product.displayImages;

  const images =
    imageSource?.length > 0
      ? imageSource.map((img, index) => ({
          id: index,
          src: `https://files.fggroup.in/${img}`,
        }))
      : [
          {
            id: 0,
            src: PRODUCT_PLACEHOLDER,
          },
        ];

  const accordionData = [
    {
      title: "Health Benefits",
      content: product.description,
    },
    {
      title: "Description & Ingredients",
      content: product.ingredients?.join(", "),
    },
    {
      title: "Direction for use",
      content: product.usageInstructions
        ?.map((item) => `Step ${item.stepNumber}: ${item.description}`)
        .join("\n"),
    },
    {
      title: "Storage Instructions",
      content: product.storageInstructions,
    },
    {
      title: "Nutrition Information",
      content: `
      Energy: ${product.nutrition?.energy}
      Protein: ${product.nutrition?.protein}
      Carbohydrates: ${product.nutrition?.carbohydrates}
      Fat: ${product.nutrition?.fat}
      Fiber: ${product.nutrition?.fiber}
      Vitamin C: ${product.nutrition?.vitaminC}
      Iron: ${product.nutrition?.iron}
      Resveratrol: ${product.nutrition?.resveratrol}
      `,
    },
  ];

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      const payload = {
        item_id: product._id,
        item_type: "FG_MEAL_PRODUCT",
        quantity: 1,
        notes: selectedVariation
          ? {
              variation_id: selectedVariation._id,
            }
          : {},
      };
      // console.log("Payload for addToCart:", payload);
      // console.log("Is user authenticated?", isAuthenticated);
      if (isAuthenticated) {
        const result = await addToCart(payload);

        if (result.success) {
          successToast("Added to cart");
          setIsCartOpen(true);
        }
      } else {
        addGuestCartItem({
          product,
          quantity: 1,
          selectedVariation,
        });

        successToast("Added to cart");
        setIsCartOpen(true);
      }
    } catch (err) {
      errorToast("Something went wrong");
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  const formattedDate = deliveryDate.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const servingSizeText =
    product.nutrition?.servingSize && product.nutrition?.unit
      ? `${product.nutrition.servingSize}${product.nutrition.unit} per serving`
      : "";

  const options = [
    {
      _id: "base",
      flavour: product.flavour,
      price: product.price,
      discountPrice: product.discountPrice,
      stock: product.stock,
      weight: product.weight,
      isBase: true,

      servingText: [
        product.weight?.amount &&
          `${product.weight.amount}${product.weight.unit}`,
        servingSizeText,
      ]
        .filter(Boolean)
        .join(" • "),
    },

    ...(product.variations || []).map((v) => ({
      ...v,

      servingText: [
        v.weight?.amount && `${v.weight.amount}${v.weight.unit}`,
        servingSizeText,
      ]
        .filter(Boolean)
        .join(" • "),

      isBase: false,
    })),
  ];
  const currentServingText =
    currentProduct.servingText ||
    [
      currentProduct.weight?.amount &&
        `${currentProduct.weight.amount}${currentProduct.weight.unit}`,
      servingSizeText,
    ]
      .filter(Boolean)
      .join(" • ");
  return (
    <>
      <SEO
        title={product.name}
        description={product.shortDescription}
        keywords={product.tags}
        image={
          currentProduct.displayImages?.length
            ? `https://files.fggroup.in/${currentProduct.displayImages[0]}`
            : undefined
        }
        url={`/gomzi-supplement/${product.slug}`}
      />
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="bg-[var(--color-bg)] min-h-screen font-modelica">
        {/* Breadcrumb */}
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16 py-7">
          <nav className="text-base md:text-lg text-[var(--color-text-light)] flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-2">
              <Link to="/" className="hover:underline font-modelica">
                Home
              </Link>
              <span className="text-gray-400 text-lg">›</span>
            </span>

            <span className="flex items-center gap-2">
              <Link
                to={
                  categorySlugMap[categoryName]
                    ? `/gomzi-supplement/${categorySlugMap[categoryName]}`
                    : `/gomzi-supplement?category=${encodeURIComponent(categoryName)}`
                }
                className="hover:underline font-modelica"
              >
                {categoryName}
              </Link>
              <span className="text-gray-400 text-lg">›</span>
            </span>

            <span className="text-[var(--color-text)] font-medium font-modelica">
              {product.name}
            </span>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start">
            {/* ── LEFT COLUMN ───────────────────────────────────── */}
            <div className="w-full lg:w-[48%] xl:w-[48%] lg:sticky lg:top-4">
              {/* ══ MOBILE / TABLET (hidden on lg+) ══ */}
              <div className="flex flex-col gap-4 lg:hidden">
                {/* Natural-size mobile slider */}
                <MobileImageSlider images={images} />
              </div>

              {/* ══ DESKTOP (hidden below lg) ══ */}
              <div className="hidden lg:flex flex-col gap-4">
                {/* Slider + Side Icon Cards */}
                <div className="flex gap-3">
                  <div className="flex flex-col gap-3 w-24 flex-shrink-0">
                    {images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => desktopSwiperRef.current?.slideToLoop(i)}
                        className={`aspect-square rounded-xl overflow-hidden border bg-white cursor-pointer transition-all duration-200 hover:border-[#5C3124] hover:shadow-md p-2 ${
                          activeIndex === i
                            ? "border-[#5C3124] ring-2 ring-[#5C3124]/25 shadow-md"
                            : "border-gray-200"
                        }`}
                      >
                        <img
                          src={img.src}
                          alt="gallery"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className="relative flex-1 rounded-[var(--radius-lg)] overflow-hidden bg-white border border-gray-100 shadow-sm"
                    style={{ minHeight: 300 }}
                  >
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      navigation={{
                        nextEl: ".desk-next",
                        prevEl: ".desk-prev",
                      }}
                      pagination={{ clickable: true, el: ".desk-pagination" }}
                      autoplay={{ delay: 3500, disableOnInteraction: false }}
                      loop
                      onSwiper={(swiper) => (desktopSwiperRef.current = swiper)}
                      onSlideChange={(swiper) =>
                        setActiveIndex(swiper.realIndex)
                      }
                      className="w-full h-full"
                    >
                      {images.map((img) => (
                        <SwiperSlide key={img.id}>
                          <div className="flex items-center justify-center h-[560px]">
                            <ZoomImage
                              src={img.src}
                              alt="Gomzi Supplement by RAG"
                              className="max-h-[520px] max-w-[92%]"
                              zoomScale={2.5}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <button className="desk-prev absolute left-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white hover:bg-gray-100 rounded-full shadow-md flex items-center justify-center text-gray-700 transition">
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button className="desk-next absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white hover:bg-gray-100 rounded-full shadow-md flex items-center justify-center text-gray-700 transition">
                      <FaChevronRight className="text-sm" />
                    </button>
                    <div className="desk-pagination absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ──────────────────────────────────── */}
            <div className="w-full lg:w-[54%] xl:w-[52%] flex flex-col gap-6">
              {/* Rating + category */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <Stars
                  count={Math.round(
                    product.rating?.average ??
                      (typeof product.rating === "number"
                        ? product.rating
                        : 5)
                  )}
                />
                <span className="text-sm text-[var(--color-text)] font-semibold font-modelica">
                  {product.rating?.totalReviews ??
                    (Array.isArray(product.reviews)
                      ? product.reviews.length
                      : 0)}{" "}
                  reviews
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-sm text-[var(--color-text-light)] font-modelica uppercase tracking-wide">
                  {categoryName}
                </span>
              </div>
              {/* Title + description */}
              <div className="flex flex-col gap-2">
                <h1 className="font-toma text-3xl sm:text-[2.5rem] leading-[1.1] text-[var(--color-text)]">
                  {product.name}
                </h1>
                <p className="font-modelica text-[var(--color-text-light)] text-base leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
              {/* Flavour / weight / stock chip row */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Product Info */}
                <div className="inline-flex items-center gap-2.5 rounded-xl border border-[#dbdee9] bg-white px-3.5 py-2.5 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fdf6f4] border border-[#ebdcd7]">
                    <FiPackage
                      size={16}
                      className="text-[#5C3124]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--color-text)]">
                      {currentProduct.flavour}
                    </span>

                    {currentServingText && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-[var(--color-text-light)]">
                          {currentServingText}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold ${
                    Number(currentProduct.stock) > 10
                      ? "bg-green-50 text-green-700"
                      : Number(currentProduct.stock) > 0
                        ? "bg-orange-50 text-orange-700"
                        : "bg-red-50 text-red-600"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      Number(currentProduct.stock) > 10
                        ? "bg-green-500"
                        : Number(currentProduct.stock) > 0
                          ? "bg-orange-500"
                          : "bg-red-500"
                    }`}
                  />

                  {Number(currentProduct.stock) > 0
                    ? `${currentProduct.stock} in stock`
                    : "Out of stock"}
                </div>
              </div>
              {/* Nutrition table */}
              <NutritionTable nutrition={product.nutrition} />

              {/* Variation selector */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <p className="font-toma text-[var(--color-text)] text-sm sm:text-base whitespace-nowrap">
                    Buy more - save more
                  </p>
                  <div className="flex-1 h-px bg-[var(--color-border)]" />
                </div>

                <div className="space-y-2.5">
                  {options.map((item) => {
                    const isOutOfStock = Number(item.stock || 0) <= 0;

                    const selected = item.isBase
                      ? !selectedVariation && !isOutOfStock
                      : selectedVariation?._id === item._id;

                    const savePct =
                      item.price > 0
                        ? Math.round(
                            ((item.price - item.discountPrice) / item.price) *
                              100,
                          )
                        : 0;

                    return (
                      <div
                        key={item._id}
                        onClick={() => {
                          // Don't allow selecting an out-of-stock flavor
                          if (isOutOfStock) return;

                          if (item.isBase) {
                            setSelectedVariation(null);
                          } else {
                            setSelectedVariation(item);
                          }
                        }}
                        className={`relative rounded-2xl border-2 px-5 py-4 transition-all duration-200 ${
                          isOutOfStock
                            ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                            : selected
                              ? "border-[#5C3124] bg-[#fdf6f4] shadow-sm cursor-pointer"
                              : "border-gray-200 hover:border-gray-300 cursor-pointer"
                        }`}
                      >
                        {/* Out of stock overlay */}
                        {isOutOfStock && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-red-600 border border-red-200 shadow-sm">
                              OUT OF STOCK
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex gap-3.5 items-start">
                            {/* Radio */}
                            <div
                              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                isOutOfStock
                                  ? "border-gray-300"
                                  : selected
                                    ? "border-[#5C3124]"
                                    : "border-gray-300"
                              }`}
                            >
                              {selected && !isOutOfStock && (
                                <div className="h-2.5 w-2.5 rounded-full bg-[#5C3124]" />
                              )}
                            </div>

                            <div>
                              <h3
                                className={`text-base sm:text-lg font-bold font-modelica ${
                                  isOutOfStock
                                    ? "text-gray-400"
                                    : "text-[var(--color-text)]"
                                }`}
                              >
                                {item.flavour}
                              </h3>

                              <p className="mt-0.5 text-sm text-[var(--color-text-light)]">
                                {item.servingText}
                              </p>

                              <p
                                className={`mt-1 text-xs font-semibold ${
                                  isOutOfStock
                                    ? "text-red-500"
                                    : "text-[#5C3124]"
                                }`}
                              >
                                {isOutOfStock
                                  ? "Currently unavailable"
                                  : `${item.stock} in stock`}
                              </p>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center justify-end gap-2">
                              {savePct > 0 && !isOutOfStock && (
                                <span className="text-[11px] font-bold text-[#ff8914] bg-[#fff9ef] border border-[#ffdfb3] px-1.5 py-0.5 rounded">
                                  -{savePct}%
                                </span>
                              )}

                              <div
                                className={`text-xl sm:text-2xl font-bold ${
                                  isOutOfStock
                                    ? "text-gray-400"
                                    : "text-[var(--color-text)]"
                                }`}
                              >
                                ₹{item.discountPrice}
                              </div>
                            </div>

                            <div
                              className={`text-sm line-through ${
                                isOutOfStock ? "text-gray-300" : "text-gray-400"
                              }`}
                            >
                              ₹{item.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Delivery banner */}
              <div className="flex items-center gap-3 bg-[#fdf6f4]/70 border border-[#ebdcd7] rounded-xl px-4 py-3.5">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-[#ebdcd7]">
                  <FiTruck className="text-[#5C3124]" size={18} />
                </div>
                <p className="text-sm text-[var(--color-text)] font-modelica">
                  <span className="font-bold">Order now</span> - arrives by{" "}
                  <span className="font-bold underline decoration-2 underline-offset-2">
                    {formattedDate}
                  </span>
                </p>
              </div>
              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="w-full bg-[#5C3124] hover:bg-[#48261c] text-white font-bold py-4 sm:py-5 cursor-pointer rounded-xl transition-all duration-200 text-sm tracking-widest font-toma shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 uppercase"
              >
                {cartLoading ? "ADDING..." : "ADD TO CART"}
              </button>
              {/* Benefit chips */}
              <div className="flex flex-wrap gap-2.5">
                {product.benefits?.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text)] bg-[#fdf6f4] border border-[#ebdcd7] rounded-full pl-2 pr-3.5 py-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FaHeart className="text-[#5C3124]" size={10} />
                    </span>
                    {benefit.title}
                  </div>
                ))}
              </div>
              {/* Accordion */}
              <div className="mt-1">
                {accordionData.map((item, i) => (
                  <AccordionItem key={i} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .desk-pagination .swiper-pagination-bullet,
          .mob-pagination .swiper-pagination-bullet {
            width: 8px; height: 8px;
            background: rgba(255,255,255,0.6);
            opacity: 1; border-radius: 50%;
          }
          .desk-pagination .swiper-pagination-bullet-active,
          .mob-pagination .swiper-pagination-bullet-active {
            background: white;
          }
        `}</style>
      </div>

      {(relatedLoading || relatedProducts.length > 0) && (
        <ProductCarouselSection
          id="related"
          title="You Might Also Like"
          subtitle={`More from ${categoryName}`}
          products={relatedProducts}
          loading={relatedLoading}
        />
      )}

      {(recentLoading || recentProducts.length > 0) && (
        <ProductCarouselSection
          id="recent"
          title="Recently Viewed"
          subtitle="Continue shopping where you left off"
          products={recentProducts}
          loading={recentLoading}
        />
      )}

      <HelthSectionproductdetail />
      <CustomerReviews product={product._id} />
    </>
  );
}

function AccordionItem({ title, content, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);

  return (
    <div className="border-b border-[var(--color-border)] py-4 first:pt-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between cursor-pointer items-center text-left group"
      >
        <span className="font-bold text-[var(--color-text)] font-modelica text-base md:text-lg group-hover:text-[var(--color-btn-dark)] transition-colors">
          {title}
        </span>
        <span
          className={`ml-2 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-[var(--color-btn-dark)] text-white rotate-180"
              : "bg-[#eef4f0] text-[var(--color-text)]"
          }`}
        >
          <IoChevronDownOutline size={14} />
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight + "px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="mt-3 text-[var(--color-text-light)] font-modelica text-[15px] leading-relaxed whitespace-pre-line pb-1">
          {content}
        </div>
      </div>
    </div>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Mobile Slider with natural image dimensions ──────────────────────────────
function MobileImageSlider({ images }) {
  return (
    <div className="relative w-full rounded-[var(--radius-lg)] overflow-hidden bg-white border border-gray-100 shadow-sm">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ nextEl: ".mob-next", prevEl: ".mob-prev" }}
        pagination={{ clickable: true, el: ".mob-pagination" }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="w-full"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            {/* 
              w-full + h-auto = image renders at its natural aspect ratio.
              No fixed height is set, so the container grows/shrinks with the image.
              object-contain on a naturally-sized img is redundant but kept for safety.
            */}
            <img
              src={img.src}
              alt="Gomzi Supplement by RAG"
              className="w-full h-auto block"
              style={{ display: "block" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="mob-prev absolute left-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white hover:bg-gray-100 rounded-full shadow-md flex items-center justify-center text-gray-700 transition">
        <FaChevronLeft className="text-sm" />
      </button>
      <button className="mob-next absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white hover:bg-gray-100 rounded-full shadow-md flex items-center justify-center text-gray-700 transition">
        <FaChevronRight className="text-sm" />
      </button>
      <div className="mob-pagination absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5" />
    </div>
  );
}

function NutritionTable({ nutrition }) {
  if (!nutrition) return null;

  const rows = [
    { label: "Energy", value: nutrition.energy },
    { label: "Protein", value: nutrition.protein, highlight: true },
    { label: "Carbohydrates", value: nutrition.carbohydrates },
    { label: "Fat", value: nutrition.fat },
    { label: "Fiber", value: nutrition.fiber },
    { label: "Vitamin C", value: nutrition.vitaminC },
    { label: "Iron", value: nutrition.iron },
    { label: "Resveratrol", value: nutrition.resveratrol },
  ].filter((row) => row.value);

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
      <div className="flex items-center justify-between bg-[#eef4f0] px-5 py-3.5">
        <h3 className="font-toma text-sm text-[var(--color-text)]">
          Nutrition Facts
        </h3>
        {nutrition.servingSize && (
          <span className="text-xs font-semibold text-[var(--color-text-light)] font-modelica">
            Per {nutrition.servingSize} scoop
          </span>
        )}
      </div>
      <div>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-5 py-3 font-modelica ${
              i !== rows.length - 1
                ? "border-b border-[var(--color-border)]"
                : ""
            } ${row.highlight ? "bg-[#f5f8f6]" : "bg-white"}`}
          >
            <span
              className={`text-sm ${
                row.highlight
                  ? "font-bold text-[var(--color-text)]"
                  : "text-[var(--color-text-light)]"
              }`}
            >
              {row.label}
            </span>
            <span
              className={`text-sm ${
                row.highlight
                  ? "font-bold text-[var(--color-text)]"
                  : "font-semibold text-[var(--color-text)]"
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
