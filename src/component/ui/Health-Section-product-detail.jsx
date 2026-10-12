import React, { useState } from "react";

const accordionData = [
  {
    title: "Breakfast",
    icon: "/images/accegg.png",
    content:
      "Start your day with balanced nutrition that fuels your energy and focus.",
  },
  {
    title: "Lunch",
    icon: "/images/accvegetables.png",
    content:
      "Perfect midday nutrition to keep your productivity and energy high.",
  },
  {
    title: "Weight Management",
    icon: "/images/accfigur.png",
    content: "Supports metabolism and helps maintain a healthy body weight.",
  },
  {
    title: "Gaming Sessions",
    icon: "/images/accvideogame.png",
    content: "Long gaming sessions require sustained energy and mental focus.",
  },
  {
    title: "Intense Work Periods",
    icon: "/images/accbulb.png",
    content: "Stay focused and productive during long work sessions.",
  },
  {
    title: "Pre/Post Workout",
    icon: "/images/accfitnes.png",
    content: "Fuel your workouts and support muscle recovery.",
  },
];

const ingredientsData = [
  {
    title: "30g of plant-based protein",
    content:
      "Our premium plant-based protein blend delivers all essential amino acids to support muscle growth, recovery, and sustained energy throughout your day.",
  },
  {
    title: "26 essential vitamins and minerals",
    content:
      "A complete micronutrient profile covering your daily needs - from Vitamin D and B12 to Iron and Zinc - for immune support, bone health, and overall vitality.",
  },
  {
    title: "Omega 3-6-9",
    content:
      "Sourced from flaxseed and extra virgin olive oil, our balanced omega blend supports heart health, brain function, and reduces inflammation naturally.",
  },
  {
    title: "Source of fiber",
    content:
      "With oats and plant-based ingredients, Gomzi Supplement by RAG provides dietary fiber that supports gut health, keeps you full longer, and stabilizes blood sugar levels.",
  },
  {
    title: "No sugar added",
    content:
      "Absolutely zero added sugars. We rely on the natural goodness of whole ingredients to deliver a satisfying taste without the sugar crash.",
  },
  {
    title: "400 calories",
    content:
      "A perfectly portioned 400-calorie meal that provides complete nutrition without overloading your system - ideal as a meal replacement or a powerful supplement.",
  },
];

const HelthSectionproductdetail = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [openIngredientIndex, setOpenIngredientIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleIngredient = (index) => {
    setOpenIngredientIndex(openIngredientIndex === index ? null : index);
  };

  return (
    <>
      {/* ===== SECTION 1: Gomzi Supplement by RAG is perfect for ===== */}
      <section className="bg-section py-12 md:py-20 w-full overflow-hidden">
        <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-toma text-3xl md:text-4xl lg:text-4xl mb-5 font-bold text-wider">
                Gomzi Supplement by RAG is perfect for:
              </h2>

              <p className="font-modelica text-text-blck text-lg mb-8 max-w-xl">
                From peak performance to everyday wellness, Gomzi Supplement by
                Rag brings balanced nutrition into every moment of your life.
              </p>

              {/* ACCORDION */}
              <div className="space-y-1">
                {accordionData.map((item, index) => (
                  <div key={index} className="border-b border-border">
                    {/* HEADER */}
                    <div
                      onClick={() => toggleAccordion(index)}
                      className="flex items-center justify-between py-3 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.icon}
                          alt=""
                          className="w-9 h-9 flex-shrink-0"
                        />
                        <h3 className="font-modelica text-xl md:text-2xl text-black font-medium text-wide">
                          {item.title}
                        </h3>
                      </div>

                      {/* ARROW */}
                      <div
                        className={`transition duration-300 flex-shrink-0 ml-2 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openIndex === index
                          ? "max-h-40 opacity-100 pb-5"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="font-modelica text-text-light">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                <img
                  src="/images/Gomzi_Protein_Product_HD.webp"
                  alt="Gomzi Supplement by RAG"
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: What's inside? ===== */}
      <section className="bg-white py-12 md:py-20 w-full overflow-hidden">
        <div className="max-w-[var(--container-width)] mx-auto px-4 md:px-8 lg:px-18">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* LEFT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-lg">
                <img
                  src="/images/Backed-by-Science.webp"
                  alt="Gomzi Supplement by RAG Ingredients"
                  className="rounded-2xl w-full"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <h2 className="font-toma text-3xl md:text-4xl lg:text-4xl mb-5 font-bold text-wider">
                What's inside?
              </h2>

              <p className="font-modelica text-text-blck text-lg mb-8 max-w-xl">
                Packed with all the essentials for balanced nutrition, RAG
                Nutrition products are crafted to elevate your health and
                wellness with every ingredient.
              </p>

              {/* ACCORDION */}
              <div className="space-y-1">
                {ingredientsData.map((item, index) => (
                  <div key={index} className="border-b border-border">
                    {/* HEADER */}
                    <div
                      onClick={() => toggleIngredient(index)}
                      className="flex items-center justify-between py-3 cursor-pointer"
                    >
                      <h3 className="font-modelica text-xl md:text-2xl text-black font-medium text-wide">
                        {item.title}
                      </h3>

                      {/* ARROW */}
                      <div
                        className={`transition duration-300 flex-shrink-0 ml-2 ${
                          openIngredientIndex === index ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openIngredientIndex === index
                          ? "max-h-40 opacity-100 pb-5"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="font-modelica text-text-light">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelthSectionproductdetail;
