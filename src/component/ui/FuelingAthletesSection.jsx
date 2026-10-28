import Hookheading from "../common/Hookheading";
import ProductCard from "../common/ProductCard";

const product = {
  id: 1,
  badge: "LONGEVITY MONTH",
  discount: "-40%",
  image: "/images/p1off.webp",
  stars: 5,
  reviews: 17,
  name: "Gomzi Supplement by RAG LONGEVITY CHOCOLATE",
  category: "Longevity",
  price: 4250,
  originalPrice: 7080,
};

const handleAddToCart = (product) => {
  console.log("Add to cart:", product);
};

export default function FuelingAthletesSection() {
  return (
    <section className="w-full bg-bg py-12 md:py-16 lg:py-20 px-10">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        {/* ── Heading ── */}

        <Hookheading
          text1={"Fueling athletes all "}
          text2={"around the world"}
        />

        {/* ── Main Grid: Left (athlete card) + Right (product card) ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ── Left: Athlete Image Card ── */}
          <div className="w-full lg:flex-1 rounded-2xl overflow-hidden bg-bg-light shadow-md">
            {/* Image with quote overlay */}
            <div className="relative w-full">
              <img
                src="/images/aword2girls.webp"
                alt="Urte Andriukaityte, Gomzi Supplement by RAG Ambassador"
                className="w-full object-contain object-center"
                style={{ aspectRatio: "16/10", maxHeight: "480px" }}
                onError={(e) => {
                  e.target.style.background =
                    "linear-gradient(135deg, #b0cfe8 0%, #7ab8d4 100%)";
                  e.target.src = "";
                }}
              />

              {/* Quote overlay box */}
            </div>

            {/* Athlete name + description */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-t border-border">
              <p className="font-toma font-black text-text text-sm sm:text-base">
                Urte Andriukaityte, Gomzi Supplement by RAG Ambassador
              </p>
              <p className="font-modelica text-text-light text-xs sm:text-sm mt-0.5">
                LTU beach volleyball national team Member of @lteam_official
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
