function StarRating({ rating, total }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <svg
              key={star}
              className="w-4.5 h-4.5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`half-${star}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                fill={
                  filled ? "#FACC15" : half ? `url(#half-${star})` : "#D1D5DB"
                }
              />
            </svg>
          );
        })}
      </div>
      {total && (
        <span className="font-modelica text-sm text-[var(--color-text-light)]">
          {total} reviews
        </span>
      )}
    </div>
  );
}

// ─── Data Array ───────────────────────────────────────────────────────────────
const ambassadors = [
  {
    id: 1,
    name: "Benedict Jonuska",
    title: "Benedict Jonuska and his Gomzi Supplement by RAG choice",
    role: "Doctor",
    quote:
      '"Gomzi Supplement by RAG the perfect nutrient boost for busy professionals, ensuring sustained energy and peak productivity."',
    personImage: "/images/Expert-Guidance.webp",
    personImageAlt: "Doctor Benedict Jonuska",
    imageRight: true,
    product: {
      image: "/images/originalvanilashake.webp",
      name: "Gomzi Supplement by RAG ORIGINAL VANILLA",
      category: "Wellbeing",
      price: "€45.00",
      rating: 4.5,
      reviews: 11,
      link: "#",
    },
  },
  {
    id: 2,
    name: "Urte Andriukaityte",
    title: "Urte Andriukaityte and her Gomzi Supplement by RAG choice",
    role: "Professional volleyball player",
    quote:
      "\"Fuelling my body with NARA has been a game-changer. It's my go-to for clean, balanced nutrition, whether I'm training or just need an energy boost for the day.\"",
    personImage: "/images/Professionalvolleyballplayer.webp",
    personImageAlt: "Urte Andriukaityte volleyball player",
    imageRight: false,
    product: {
      image: "/images/p3.webp",
      name: "NEXTGEN PLANT PROTEIN",
      category: "Protein",
      price: "€39.90",
      rating: 4,
      reviews: 34,
      link: "#",
    },
  },
  {
    id: 3,
    name: "Karolis Daktaras",
    title: "Karolis Daktaras and his Gomzi Supplement by RAG choice",
    role: "Doctor surgeon",
    quote:
      '"I recommend Nara Complete Food to my patients after operations because it is perfectly balanced. It ensures that my patients get all their body needs during the recovery period."',
    personImage: "/images/Doctorsurgeon.webp",
    personImageAlt: "Doctor Karolis Daktaras",
    imageRight: true,
    product: {
      image: "/images/pdetail1.webp",
      name: "Gomzi Supplement by RAG MATCHA Coconut",
      category: "Energy",
      price: "€55.00",
      rating: 5,
      reviews: 22,
      link: "#",
    },
  },
  {
    id: 4,
    name: "Deimante Rapalyte",
    title: "Deimante Rapalyte and her Gomzi Supplement by RAG choice",
    role: "Nutritionist",
    quote:
      "Years of studies highlight the benefits of a plant-rich diet for longer life and improved well-being. As we seek to lower our carbon footprint, Gomzi Supplement by RAG's 100% vegan recipe offers a solution that supports both the environment and your health.",
    personImage: "/images/Nutritionist.webp",
    personImageAlt: "Deimante Rapalyte volleyball player",
    imageRight: false,
    product: {
      image: "/images/p1off.webp",
      name: "NEXTGEN PLANT PROTEIN",
      category: "Protein",
      price: "€39.90",
      rating: 4,
      reviews: 34,
      link: "#",
    },
  },
];

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  return (
    <div className="flex flex-row items-stretch gap-2 overflow-hidden mt-5">
      {/* Product image */}
      <div
        className="flex-shrink-0 bg-[#F5F5F5] flex items-center justify-center rounded-[var(--radius-md)] overflow-hidden"
        style={{ width: "200px", minHeight: "160px" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full  object-contain"
          style={{ minHeight: "160px", height: "200px" }}
        />
      </div>

      {/* Product details + CTA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Details */}
        <div className="flex-1 px-3 pt-3 pb-2 flex flex-col gap-1">
          <StarRating rating={product.rating} total={product.reviews} />
          <p className="font-toma font-light text-lg leading-snug line-clamp-2">
            {product.name}
          </p>
          <p className="font-modelica text-sm text-[var(--color-text-light)]">
            {product.category}
          </p>
          <p className="font-modelica font-medium text-lg text-[var(--color-text)] pb-2">
            {product.price}
          </p>
        </div>

        {/* Shop Now */}
        <a
          href={product.link}
          className="block text-center font-modelica font-extrabold text-md text-[var(--color-text)] rounded-[var(--radius-md)] py-3 px-4 transition-opacity duration-200 hover:opacity-80 "
          style={{ background: "#8cd7e1" }}
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

// ─── Ambassador Row ───────────────────────────────────────────────────────────
function AmbassadorRow({ item }) {
  return (
    <div
      className={`flex flex-col gap-8 md:gap-10 lg:gap-14 items-center
        ${item.imageRight ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* ── Text Block ── */}
      <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-none">
        <h2 className="font-toma text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text)] font-black leading-tight">
          {item.title}
        </h2>
        <p className="font-modelica text-[var(--color-text-light)] text-lg sm:text-base leading-relaxed mt-3 italic">
          {item.quote}
        </p>
        <p className="font-modelica text-[var(--color-text-light)] text-md mt-2 italic">
          {item.role}
        </p>

        {/* Product Card */}
        <ProductCard product={item.product} />
      </div>

      {/* ── Person Image ── */}
      <div className="w-full md:w-1/2 flex-shrink-0 order-1 md:order-none">
        <div className="w-full rounded-[var(--radius-lg)] overflow-hidden">
          <img
            src={item.personImage}
            alt={item.personImageAlt}
            className="w-full h-full object-cover object-top"
            style={{ aspectRatio: "4/4" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function AmbassadorDetail() {
  return (
    <section className="bg-[var(--color-bg)] py-12 sm:py-16 lg:py-20">
      <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {ambassadors.map((item) => (
            <AmbassadorRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
