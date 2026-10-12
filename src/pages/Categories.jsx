import { ArrowRight, Plus, X } from "lucide-react";
import BlackFeatureBar from "../component/common/Black-Feature-Bar";
import PageHeading from "../HOC/Header/PageHeading";
import SEO from "../component/SEO";
import { useState } from "react";
import { FlaskConical, BadgeCheck, Truck, Crown } from "lucide-react";

const categories = [
  {
    id: 1,
    tag: "MOST POPULAR",
    title: "Whey Protein",
    subtitle:
      "Isolate, concentrate and blend formulas with 24–27g protein per scoop. Built for muscle growth and recovery.",
    image: "/images/product-category/whey-protein.webp",
    bg: "#1b1308",
    accent: "#D4AF37",
    url: "/gomzi-supplement/whey-protein",
  },

  {
    id: 2,
    tag: "BULK SEASON",
    title: "Mass Gainer",
    subtitle:
      "High-calorie weight gainer with quality carbs and protein for lean muscle mass gains.",
    image: "/images/product-category/mass-gainer.webp",
    bg: "#071c12",
    accent: "#2f8f5b",
    url: "/gomzi-supplement/mass-gainer",
  },

  // NEW PLANT PROTEIN
  {
    id: 3,
    tag: "100% VEGAN",
    title: "Plant Protein",
    subtitle:
      "A premium 100% vegan protein blend made from pea, peanut, soya and brown rice protein to support muscle recovery, growth and daily protein needs.",
    image: "/images/product-category/plant-protein.webp",
    bg: "#172016",
    accent: "#6f9b5b",
    url: "/gomzi-supplement/plant-protein",
  },

  {
    id: 4,
    tag: "ENERGY BOOST",
    title: "Pre Workout",
    subtitle:
      "Explosive energy, focus and endurance for every workout session.",
    image: "/images/product-category/pre-workout.webp",
    bg: "#1b0d10",
    accent: "#d94a64",
    url: "/gomzi-supplement/pre-workout",
  },

  {
    id: 5,
    tag: "RECOVERY",
    title: "BCAA & Amino Acids",
    subtitle:
      "Essential amino acids for faster recovery and reduced muscle fatigue.",
    image: "/images/product-category/Bcaa-tangy-orange.webp",
    bg: "#111625",
    accent: "#6387ff",
    url: "/gomzi-supplement/bcaa",
  },

  {
    id: 6,
    tag: "STRENGTH",
    title: "Creatine",
    subtitle: "Increase strength, power output and muscle performance.",
    image: "/images/product-category/creatine.webp",
    bg: "#151515",
    accent: "#8f8f8f",
    url: "/gomzi-supplement/creatine",
  },

  {
    id: 7,
    tag: "MEAL SOLUTIONS",
    title: "Meal Replacement",
    subtitle:
      "Balanced nutrition for busy lifestyles and healthy weight management.",
    image: "/images/product-category/whey-protein.webp",
    bg: "#0d1022",
    accent: "#5568ff",
    url: "/gomzi-supplement/meal-replacement",
  },

  {
    id: 8,
    tag: "DAILY HEALTH",
    title: "Wellness & Health",
    subtitle: "Multivitamins and wellness supplements for everyday health.",
    image: "/images/product-category/Multivitamins.webp",
    bg: "#16140d",
    accent: "#d8b65f",
    url: "/gomzi-supplement/wellness-health",
  },
];

const standards = [
  {
    number: "01",
    title: "LAB TESTED FORMULAS",
    description:
      "Every product is third-party tested for purity, potency and accuracy. What the label says is what you get - nothing hidden, nothing added.",
  },
  {
    number: "02",
    title: "ZERO FILLERS",
    description:
      "No protein spiking, no artificial bulking agents, no misleading claims. Pure ingredients, honest nutrition, real results.",
  },
  {
    number: "03",
    title: "FSSAI APPROVED",
    description:
      "Fully FSSAI certified and manufactured in GMP-compliant facilities. Every batch meets India's highest food safety standards.",
  },
  {
    number: "04",
    title: "THE RAG LEGACY",
    description:
      "Built from the legacy of Gomzi Supplement by RAG - a brand trusted by athletes. Every Gomzi formula carries that same standard forward.",
  },
];

const highlights = [
  {
    text: "LAB TESTED",
    icon: FlaskConical,
  },
  {
    text: "FSSAI CERTIFIED",
    icon: BadgeCheck,
  },
  {
    text: "FREE SHIPPING ABOVE ₹999",
    icon: Truck,
  },
  {
    text: "THE LEGACY OF RAG",
    icon: Crown,
  },
];

const faqs = [
  {
    question: "Which Gomzi product is right for me?",
    answer:
      "If your goal is muscle gain, start with Whey Protein and Creatine. For weight gain, choose Mass Gainer. For general health, Multivitamin combined with Whey Protein is the best starting stack. Use the goal finder above to get a personalised recommendation.",
  },
  {
    question: "Are Gomzi supplements FSSAI certified?",
    answer:
      "Yes. Every Gomzi Supplement product is manufactured in GMP-certified facilities and follows FSSAI guidelines to ensure quality, safety, and authenticity.",
  },
  {
    question: "Do Gomzi supplements contain banned substances?",
    answer:
      "Our products are manufactured using high-quality ingredients and are tested for purity. Always check product labels if you're a competitive athlete following specific regulations.",
  },
  {
    question:
      "What is the difference between Other Brands Supplement and Gomzi Supplement by RAG?",
    answer:
      "Gomzi Supplement continues the legacy of Gomzi Supplement by RAG with premium formulations, transparent ingredients, and athlete-focused supplements.",
  },
  {
    question: "Does Gomzi Supplement offer free shipping across India?",
    answer:
      "Yes. We offer free shipping on qualifying prepaid orders across India. Shipping offers may change during promotions.",
  },
  {
    question: "Whey Protein Isolate vs Concentrate - which should I buy?",
    answer:
      "Choose Whey Isolate if you prefer higher protein with lower carbs and fat. Whey Concentrate is ideal for everyday fitness and offers excellent value.",
  },
  {
    question:
      "Can beginners take Mass Gainer or should they start with Whey Protein?",
    answer:
      "Most beginners should start with Whey Protein. Mass Gainer is better suited for individuals who struggle to meet their daily calorie requirements.",
  },
];

function CategoryCard({ category }) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] cursor-pointer">
      <img
        src={category.image}
        alt={category.title}
        className="h-[450px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3 text-white">
        {/* <span className="text-sm uppercase tracking-[3px] opacity-80">
          {category.products}
        </span> */}

        <h3 className="font-toma text-3xl">{category.title}</h3>

        {/* <p className="font-modelica text-white/80">{category.subtitle}</p> */}

        <a
          href={category.url}
          className="mt-2 flex items-center gap-2 text-sm uppercase tracking-widest font-semibold"
        >
          Shop Now
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-2"
          />
        </a>
      </div>
    </div>
  );
}

export default function CategoriesSection() {
  const [active, setActive] = useState(0);
  return (
    <>
      <SEO
        title="Shop by Category | Whey Protein, Peanut Butter & Supplements | Gomzi Supplement"
        description="Explore Gomzi Supplement categories including whey protein, peanut butter, sports supplements, multivitamins and daily wellness essentials for every lifestyle."
      />

      <section className="relative overflow-hidden bg-[#090909] py-15 py-md-28">
        <div className="max-w-[1500px] mx-auto px-6 relative">
          {/* Background Word */}

          <h2 className="absolute inset-0 flex justify-center items-center pointer-events-none select-none">
            <span className="font-toma text-[220px] md:text-[340px] font-black uppercase leading-none text-white/[0.04]">
              LEGACY
            </span>
          </h2>

          {/* Content */}

          <div className="relative z-10 text-center">
            <span className="uppercase tracking-[5px] text-[#9d5a48] text-sm font-semibold">
              SHOP BY CATEGORY
            </span>

            <h1 className="mt-8 font-toma text-white uppercase leading-[0.9]">
              <span className="block text-6xl md:text-8xl">FIND YOUR</span>

              <span className="block text-6xl md:text-8xl">
                <span className="text-[#9d5a48]">PERFECT</span> NUTRITION
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-10 text-xl leading-10 text-white/65">
              Buy whey protein, mass gainer, sports supplements, multivitamins
              and peanut butter online in India - whether you're building
              muscle, improving recovery, or supporting everyday wellness,
              explore products tailored to your goals.
            </p>
          </div>

          {/* Bottom Bar */}

          <div className="relative z-10 mt-10 md:mt-24 w-full">
            <div
              className="
      mx-auto
      w-full
      max-w-[1400px]
      grid
      grid-cols-2
      md:grid-cols-4
      bg-white/10
      backdrop-blur-sm
      border border-white/10
    "
            >
              {highlights.map(({ text, icon: Icon }, index) => (
                <div
                  key={text}
                  className={`
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-2
          sm:gap-2.5
          md:gap-3
          min-h-[78px]
          sm:min-h-[72px]
          md:min-h-[78px]
          px-2
          sm:px-3
          md:px-5
          lg:px-6
          text-center

          border-white/10

          ${index % 2 === 0 ? "border-r" : ""}
          ${index < 2 ? "border-b" : ""}

          md:border-b-0
          md:border-r
          ${index === highlights.length - 1 ? "md:border-r-0" : ""}
        `}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.7}
                    className="text-[#9d5a48] shrink-0"
                  />

                  <span
                    className="
            text-[10px]
            xs:text-[10px]
            sm:text-xs
            md:text-sm
            lg:text-base
            uppercase
            tracking-wide
            font-semibold
            text-white/80
            text-center
            leading-tight
          "
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[var(--color-bg)]">
        <div className="max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16">
          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090909] py-12 sm:py-16 md:py-24 md:mt-24">
        <div className="max-w-[var(--container-width)] mx-auto px-5 sm:px-6 lg:px-16">
          {/* Heading */}
          <div className="max-w-5xl">
            <span className="uppercase tracking-[3px] sm:tracking-[5px] text-[#9d5a48] text-xs sm:text-sm font-semibold">
              THE GOMZI STANDARD
            </span>

            <h2 className="font-toma text-3xl sm:text-4xl md:text-6xl leading-[1.05] text-white mt-4 sm:mt-6">
              WHY SERIOUS ATHLETES
              <br />
              CHOOSE GOMZI SUPPLEMENT
            </h2>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 sm:gap-12 xl:gap-10 mt-12 sm:mt-16 md:mt-20">
            {standards.map((item) => (
              <div
                key={item.number}
                className="group transition-all duration-500"
              >
                {/* Top Line */}
                <div className="h-[2px] bg-[#9d5a48] mb-6 sm:mb-8 w-full group-hover:w-4/5 transition-all duration-500" />

                {/* Number */}
                <div className="text-5xl sm:text-6xl md:text-[72px] leading-none font-black text-white/30 group-hover:text-white/80 transition">
                  {item.number}
                </div>

                {/* Title */}
                <h3 className="font-toma text-xl sm:text-2xl uppercase leading-tight text-white mt-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-7 sm:leading-8 text-white/60 group-hover:text-white/80 transition">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg)]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Heading */}

          <span className="uppercase tracking-[4px] text-sm text-[#9d5a48] font-semibold">
            FAQs
          </span>

          <h2 className="font-toma text-5xl md:text-6xl uppercase mt-3 text-[var(--color-text)]">
            Common Questions
          </h2>

          <div className="mt-10 border-t border-neutral-200">
            {faqs.map((faq, index) => {
              const open = active === index;
              return (
                <div key={index} className="border-b border-neutral-200">
                  <button
                    onClick={() => setActive(open ? null : index)}
                    className="w-full flex justify-between items-center py-3 text-left group"
                  >
                    <h3 className="font-semibold text-lg text-black group-hover:text-[#9d5a48] transition">
                      {faq.question}
                    </h3>

                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        open
                          ? "bg-black text-white border-black rotate-180"
                          : "border-neutral-300 text-neutral-500"
                      }`}
                    >
                      {open ? <X size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      open ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl text-base leading-7 text-neutral-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
