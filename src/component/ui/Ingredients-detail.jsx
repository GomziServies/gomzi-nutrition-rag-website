const ingredients = [
  {
    id: 1,
    title: "Complete Plant Protein",
    description:
      "Pea protein, hemp protein, and rice protein in one! It delivers a more complete amino acid profile and a better texture than a single protein source. Lactose-free, a sustainable way to enrich your everyday diet with protein.",
    bullets: [
      "High amino acid concentration",
      "Easily digestible and free of allergens, unlike dairy proteins",
      "An excellent protein source for those avoiding animal-based products",
    ],
    image: "/images/Ingredients/Ingredients1.webp",
    imageAlt: "Green peas with wooden scoop",
    imageLeft: false,
  },
  {
    id: 2,
    title: "Flaxseed",
    description:
      "One of the richest sources of omega-3 in the world! Flaxseeds are often used to enrich the diet with various vitamins and minerals.",
    bullets: [
      "Source of magnesium and copper",
      "Source of vitamin B1",
      "Natural source of dietary fiber",
    ],
    image: "/images/Ingredients/Ingredients2.webp",
    imageAlt: "Flaxseeds in a wooden bowl",
    imageLeft: true,
  },
  {
    id: 3,
    title: "Oat flour",
    description:
      "Oat flour, often referred to as a “supergrain” for its many benefits, is prized for its high fiber content.",
    bullets: [
      "Complex carbohydrates",
      "Naturally high in fiber",
      "Provides a long-lasting feeling of fullness",
    ],
    image: "/images/Ingredients/Ingredients3.webp",
    imageAlt: "Oat flour in a wooden bowl",
    imageLeft: false,
  },
  {
    id: 4,
    title: "Toasted corn",
    description:
      "This lesser-known superfood is an excellent source of carbohydrates, adding a unique aftertaste to the Gomzi Supplement by RAG product!",
    bullets: [
      "A natural source of energy",
      "A pleasant and unique flavor",
      "A natural source of dietary fiber",
    ],
    image: "/images/Ingredients/Ingredients4.webp",
    imageAlt: "Toasted corn in a wooden bowl",
    imageLeft: true,
  },
  {
    id: 5,
    title: "Virgin olive oil",
    description:
      "One of the richest sources of omega-3 in the world! Flaxseeds are often used to enrich the diet with various vitamins and minerals.",
    bullets: [
      "Source of magnesium and copper",
      "Source of vitamin B1",
      "Natural source of dietary fiber",
    ],
    image: "/images/Ingredients/Ingredients5.png",
    imageAlt: "Flaxseeds in a wooden bowl",
    imageLeft: false,
  },
  {
    id: 6,
    title: "Vitamins & minerals",
    description:
      "One of the richest sources of omega-3 in the world! Flaxseeds are often used to enrich the diet with various vitamins and minerals.",
    bullets: [
      "Source of magnesium and copper",
      "Source of vitamin B1",
      "Natural source of dietary fiber",
    ],
    image: "/images/Ingredients/Ingredients6.webp",
    imageAlt: "Flaxseeds in a wooden bowl",
    imageLeft: true,
  },
];

function IngredientRow({ item }) {
  return (
    /*
      Mobile: flex-col - image on top, text below (always)
      md+:
        imageLeft=false → flex-row       → Text on Left  | Image on Right
        imageLeft=true  → flex-row-reverse → Image on Left | Text on Right
    */
    <div
      className={`flex flex-col gap-8 md:gap-12 lg:gap-16 items-center
        ${item.imageLeft ? "md:flex-row-reverse" : "md:flex-row"}
      `}
    >
      {/* Text Block - on mobile always comes AFTER image (order-2), on md it follows flex direction */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 order-2 md:order-none">
        <h2 className="font-toma text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text)] leading-tight">
          {item.title}
        </h2>
        <p className="font-modelica text-[var(--color-text-light)] text-base sm:text-lg leading-relaxed">
          {item.description}
        </p>
        <ul className="flex flex-col gap-0 list-none p-0 m-0">
          {item.bullets.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3  border-b border-[var(--color-border)] py-3 first:border-t first:border-[var(--color-border)]"
            >
              {/* <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-text)] flex-shrink-0" /> */}
              <span className="font-modelica text-base sm:text-xl font-medium text-[var(--color-text)] leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Block - on mobile always comes FIRST (order-1), on md it follows flex direction */}
      <div className="w-full md:w-[60%] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] order-1 md:order-none">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="w-full h-auto object-cover"
          style={{ aspectRatio: "4/4" }}
        />
      </div>
    </div>
  );
}

export default function IngredientsSection() {
  return (
    <section className="bg-[var(--color-bg)] py-12 sm:py-16 lg:py-20">
      <div className="site-container sm:px-6 lg:px-16">
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {ingredients.map((item) => (
            <IngredientRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
