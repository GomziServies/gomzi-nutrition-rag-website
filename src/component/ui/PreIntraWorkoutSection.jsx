import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star, ChevronRight, Gift } from "lucide-react";
import { successToast } from "../../utils/toast";
import { addProductToCart } from "../../services/cartStorage.service";

const TABS = [
  "Creatine",
  "Pre Workouts",
  "BCAA/EAA",
  "Electrolyte",
  "Carbs Blend",
  "L-Arginine",
];

const PRE_INTRA_PRODUCTS = {
  Creatine: [
    {
      id: "mb-creamp-creatine",
      name: "MuscleBlaze Creatine Monohydrate CreAMP, Watermelon Kool Aid and...",
      rating: 4.5,
      price: 1799,
      originalPrice: 2698,
      premiumPrice: 1745,
      freeGift: "Free Shaker [Worth ₹699]",
      image: "/images/products/pre-workout/mb-creamp-creatine.png",
      url: "/gomzi-supplement?search=creatine",
    },
    {
      id: "rc-creatine-xs",
      name: "Ronnie Coleman Creatine XS, Unflavoured 0.66 lb",
      rating: 4.7,
      price: 1199,
      originalPrice: 1849,
      premiumPrice: 1163,
      image: "/images/products/pre-workout/rc-creatine-xs.png",
      url: "/gomzi-supplement?search=creatine",
    },
    {
      id: "blackbeast-alien-blood",
      name: "BLACK BEAST Creatine, Alien Blood 175 g",
      rating: 4.7,
      price: 749,
      originalPrice: 1199,
      offerTag: "Extra 5% Off | Code : BBTS",
      image: "/images/products/pre-workout/blackbeast-alien-blood.png",
      url: "/gomzi-supplement?search=creatine",
    },
    {
      id: "fuelone-creatine",
      name: "Fuel One Creatine Monohydrate, Unflavoured 0.22 lb",
      rating: 4.6,
      price: 499,
      originalPrice: 649,
      premiumPrice: 484,
      image: "/images/products/pre-workout/fuelone-creatine.png",
      url: "/gomzi-supplement?search=creatine",
    },
  ],
  "Pre Workouts": [
    {
      id: "mb-pre-wrathx",
      name: "MuscleBlaze Pre Workout WrathX, Fruit Fury 300 g",
      rating: 4.8,
      price: 1599,
      originalPrice: 2299,
      premiumPrice: 1550,
      freeGift: "Free Shaker [Worth ₹499]",
      image: "/images/pre-workout.jpeg",
      url: "/gomzi-supplement?search=pre-workout",
    },
    {
      id: "cellucor-c4-orig",
      name: "Cellucor C4 Original Pre-Workout 30 Servings Icy Blue Razz",
      rating: 4.7,
      price: 2199,
      originalPrice: 2999,
      premiumPrice: 2130,
      image: "/images/deals/pumpd-deal.jpg",
      url: "/gomzi-supplement?search=pre-workout",
    },
    {
      id: "gomzi-ignite-pre",
      name: "Gomzi Nutrition Ignite Explosive Pre-Workout Punch 250 g",
      rating: 4.9,
      price: 999,
      originalPrice: 1599,
      premiumPrice: 949,
      offerTag: "Extra 10% Off | Code : GOMZI10",
      image: "/images/product-category/pre-workout.webp",
      url: "/gomzi-supplement?search=pre-workout",
    },
    {
      id: "gat-nitraflex",
      name: "GAT Sport Nitraflex Hyperemia Pre-Workout 300 g",
      rating: 4.6,
      price: 2699,
      originalPrice: 3499,
      premiumPrice: 2618,
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=pre-workout",
    },
  ],
  "BCAA/EAA": [
    {
      id: "scivation-xtend-bcaa",
      name: "Scivation Xtend 7G BCAA 30 Servings Blue Raspberry",
      rating: 4.8,
      price: 1999,
      originalPrice: 2799,
      premiumPrice: 1939,
      freeGift: "Free Shaker [Worth ₹399]",
      image: "/images/product-category/bcaa.webp",
      url: "/gomzi-supplement?search=bcaa",
    },
    {
      id: "mb-bcaa-pro",
      name: "MuscleBlaze BCAA Pro with Electrolytes Watermelon 400 g",
      rating: 4.7,
      price: 1299,
      originalPrice: 1799,
      premiumPrice: 1260,
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=bcaa",
    },
    {
      id: "gomzi-amino-eaa",
      name: "Gomzi Amino Fuel Complete EAA & BCAA Matrix 300 g",
      rating: 4.9,
      price: 899,
      originalPrice: 1399,
      premiumPrice: 854,
      offerTag: "Extra 5% Off | Code : AMINO5",
      image: "/images/product-category/bcaa.webp",
      url: "/gomzi-supplement?search=bcaa",
    },
    {
      id: "on-instant-bcaa",
      name: "Optimum Nutrition Instantized BCAA 5000 Powder 345 g",
      rating: 4.6,
      price: 1849,
      originalPrice: 2499,
      premiumPrice: 1793,
      image: "/images/deals/whey-range-deal.jpg",
      url: "/gomzi-supplement?search=bcaa",
    },
  ],
  Electrolyte: [
    {
      id: "fastup-reload",
      name: "Fast&Up Reload Effervescent Electrolytes 20 Tabs Citrus",
      rating: 4.6,
      price: 275,
      originalPrice: 350,
      premiumPrice: 260,
      offerTag: "Pack of 3 Special Offer",
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=electrolyte",
    },
    {
      id: "mb-hydration-plus",
      name: "MuscleBlaze Hydration Plus Electrolyte Drink 500 g",
      rating: 4.5,
      price: 449,
      originalPrice: 599,
      premiumPrice: 425,
      image: "/images/pre-workout.jpeg",
      url: "/gomzi-supplement?search=electrolyte",
    },
    {
      id: "gomzi-hydromax",
      name: "Gomzi HydroMax Pro Energy & Electrolytes 400 g",
      rating: 4.8,
      price: 399,
      originalPrice: 599,
      premiumPrice: 379,
      offerTag: "Extra 10% Off | Code : HYDRO10",
      image: "/images/product-category/pre-workout.webp",
      url: "/gomzi-supplement?search=electrolyte",
    },
    {
      id: "wellcore-hydration",
      name: "Wellcore Instant Hydration Electrolyte Salts 30 Servings",
      rating: 4.7,
      price: 699,
      originalPrice: 999,
      premiumPrice: 664,
      image: "/images/deals/creatine-dual-deal.jpg",
      url: "/gomzi-supplement?search=electrolyte",
    },
  ],
  "Carbs Blend": [
    {
      id: "mb-carbo-blend",
      name: "MuscleBlaze Carbo Blend Fast Energy Release 1 kg",
      rating: 4.6,
      price: 499,
      originalPrice: 699,
      premiumPrice: 474,
      image: "/images/product-category/mass-gainer.webp",
      url: "/gomzi-supplement?search=carbs",
    },
    {
      id: "labrada-quick-carb",
      name: "Labrada Quick Carb Clean Energy Complex 1.5 kg",
      rating: 4.7,
      price: 899,
      originalPrice: 1299,
      premiumPrice: 854,
      image: "/images/deals/picks/labrada-deal.png",
      url: "/gomzi-supplement?search=carbs",
    },
    {
      id: "gomzi-pro-carb",
      name: "Gomzi Pro Carb Pure Complex Carbohydrate Powder 1 kg",
      rating: 4.8,
      price: 449,
      originalPrice: 649,
      premiumPrice: 420,
      image: "/images/product-category/mass-gainer.webp",
      url: "/gomzi-supplement?search=carbs",
    },
    {
      id: "universal-carbo-plus",
      name: "Universal Nutrition Carbo Plus Complex Carbohydrates 1 kg",
      rating: 4.5,
      price: 799,
      originalPrice: 1099,
      premiumPrice: 759,
      image: "/images/deals/creatine-dual-deal.jpg",
      url: "/gomzi-supplement?search=carbs",
    },
  ],
  "L-Arginine": [
    {
      id: "mb-arginine-caps",
      name: "MuscleBlaze L-Arginine Maximum Nitric Oxide 60 Capsules",
      rating: 4.6,
      price: 549,
      originalPrice: 799,
      premiumPrice: 520,
      offerTag: "Nitric Oxide Booster",
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=arginine",
    },
    {
      id: "gnc-arginine-1000",
      name: "GNC L-Arginine 1000mg Maximum Muscle Pump 90 Tablets",
      rating: 4.7,
      price: 1199,
      originalPrice: 1699,
      premiumPrice: 1139,
      image: "/images/deals/collagen-deal.jpg",
      url: "/gomzi-supplement?search=arginine",
    },
    {
      id: "gomzi-pure-arginine",
      name: "Gomzi Pure Micronized L-Arginine Powder 100 g",
      rating: 4.8,
      price: 499,
      originalPrice: 799,
      premiumPrice: 474,
      image: "/images/deals/carnitine-deal.jpg",
      url: "/gomzi-supplement?search=arginine",
    },
    {
      id: "nutrabay-arginine",
      name: "Nutrabay Pure L-Arginine Pre-Workout Pump 250 g",
      rating: 4.6,
      price: 649,
      originalPrice: 899,
      premiumPrice: 616,
      image: "/images/pre-workout.jpeg",
      url: "/gomzi-supplement?search=arginine",
    },
  ],
};

/**
 * HealthKart-Identical "Best in Pre/Intra Workout" Section
 * Interactive multi-category pill tab filter with authentic supplement cards
 */
export default function PreIntraWorkoutSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Creatine");
  const [wishlist, setWishlist] = useState({});
  const [isAdding, setIsAdding] = useState({});

  const products = PRE_INTRA_PRODUCTS[activeTab] || PRE_INTRA_PRODUCTS["Creatine"];

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const isFav = !prev[id];
      if (isFav) {
        successToast("Added to wishlist!");
      }
      return { ...prev, [id]: isFav };
    });
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    setIsAdding((prev) => ({ ...prev, [product.id]: true }));
    addProductToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.originalPrice,
      images: [product.image],
      image: product.image,
      slug: product.id,
    });
    successToast(`${product.name.slice(0, 32)}... added to cart!`);
    setTimeout(() => {
      setIsAdding((prev) => ({ ...prev, [product.id]: false }));
    }, 600);
  };

  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    addProductToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.originalPrice,
      images: [product.image],
      image: product.image,
      slug: product.id,
    });
    navigate("/checkouts");
  };

  const handleCardClick = (product) => {
    navigate(product.url || "/gomzi-supplement");
  };

  const handleNextTab = () => {
    const currentIndex = TABS.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % TABS.length;
    setActiveTab(TABS[nextIndex]);
  };

  return (
    <section
      className="w-full py-8 sm:py-10 bg-[#faf8f6] font-modelica"
      aria-label="Best in Pre and Intra Workout"
    >
      <div className="max-w-[1250px] mx-auto px-3 sm:px-6 relative">
        {/* Section Heading */}
        <div className="mb-3 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold text-[#1c1c28] tracking-tight">
            Best in Pre/Intra Workout
          </h2>
        </div>

        {/* Category Pill Tabs - Horizontal touch scrolling on mobile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar pb-2 sm:pb-3 mb-4 sm:mb-6 -mx-1 px-1">
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1a1a24] text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Product Cards Container with Floating Next Arrow */}
        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
            {products.map((product) => {
              const addingThis = isAdding[product.id];
              const isFav = wishlist[product.id];

              return (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(product)}
                  className="rounded-xl sm:rounded-2xl border border-gray-200/80 bg-white p-2.5 sm:p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group cursor-pointer"
                >
                  {/* Top Wishlist Heart */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors shadow-xs"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                        isFav
                          ? "fill-red-500 text-red-500 scale-110"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Product Image Area */}
                  <div className="w-full h-32 sm:h-44 flex items-center justify-center pt-1 pb-2 sm:pt-2 sm:pb-3 px-1 sm:px-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain block transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Rating Badge (Gomzi Signature Theme #5C3124 + Gold Star) & Veg Symbol */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1 mb-1">
                    <div className="inline-flex items-center gap-0.5 sm:gap-1 bg-[#5C3124] text-white text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      <span>{product.rating}</span>
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
                    </div>

                    {/* Veg Square Icon */}
                    <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border border-emerald-600 flex items-center justify-center rounded-[2px] p-[1px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-[11px] sm:text-[13px] font-bold text-[#1c1c28] group-hover:text-[#5C3124] transition-colors leading-snug line-clamp-2 min-h-[30px] sm:min-h-[34px] mb-1.5">
                    {product.name}
                  </h3>

                  {/* Pricing Row */}
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-sm sm:text-lg font-black text-[#1c1c28]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Promotional Offer / Free Gift Tag (Gomzi Theme) */}
                  <div className="min-h-[20px] sm:min-h-[22px] mb-1.5">
                    {product.freeGift ? (
                      <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#5C3124] bg-[#fdf6f4] px-1.5 sm:px-2 py-0.5 rounded border border-[#ebdcd7] max-w-full truncate">
                        <Gift className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#5C3124] flex-shrink-0" />
                        <span className="truncate">{product.freeGift}</span>
                      </div>
                    ) : product.offerTag ? (
                      <p className="text-[10px] sm:text-[11px] font-bold text-[#5C3124] truncate">
                        {product.offerTag}
                      </p>
                    ) : (
                      <div className="h-[20px] sm:h-[22px]" />
                    )}
                  </div>

                  {/* Premium Member Badge */}
                  <div className="min-h-[22px] sm:min-h-[26px] mb-2 sm:mb-3">
                    {product.premiumPrice ? (
                      <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#8c5208] bg-[#fff8eb] px-1.5 sm:px-2 py-0.5 rounded-md border border-[#fedf89]/60 w-full truncate">
                        <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#f79009] text-white flex items-center justify-center text-[8px] sm:text-[9px] font-black flex-shrink-0">
                          ₹
                        </span>
                        <span className="truncate">
                          ₹{product.premiumPrice.toLocaleString("en-IN")} for VIP
                        </span>
                      </div>
                    ) : (
                      <div className="h-[22px] sm:h-[26px]" />
                    )}
                  </div>

                  {/* Dual Action CTAs */}
                  <div className="space-y-1.5 sm:space-y-2 mt-auto">
                    {/* Outline Add to Cart */}
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={addingThis}
                      className="w-full py-1.5 sm:py-2 px-1 border-2 border-[#5C3124] bg-white hover:bg-[#fdf6f4] text-[#5C3124] text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>{addingThis ? "Adding..." : "Add to Cart"}</span>
                    </button>

                    {/* Solid Buy Now */}
                    <button
                      type="button"
                      onClick={(e) => handleBuyNow(product, e)}
                      className="w-full py-2 sm:py-2.5 px-1 bg-gradient-to-r from-[#5C3124] via-[#6d3a2b] to-[#48261c] hover:from-[#48261c] hover:to-[#381c14] text-white text-[11px] sm:text-xs font-bold rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer border border-amber-400/25 shadow-sm shadow-[#5C3124]/20 hover:shadow-md hover:shadow-[#5C3124]/35 active:scale-[0.98]"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Navigation Next Arrow (Desktop Only) */}
          <button
            type="button"
            onClick={handleNextTab}
            aria-label="Next Products Tab"
            className="w-9 h-9 rounded-full bg-[#5C3124] hover:bg-[#48261c] text-white items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 absolute -right-3 top-[170px] -translate-y-1/2 z-20 cursor-pointer hidden lg:flex border border-white/40"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/gomzi-supplement?search=${encodeURIComponent(activeTab.toLowerCase())}`
              )
            }
            className="border-2 border-[#5C3124] text-[#5C3124] hover:bg-[#5C3124] hover:text-white bg-white px-7 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
