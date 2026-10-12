import React, { useState, useRef } from "react";
import ProductsGrid from "../component/ui/ProductsGrid";
import Wavyheading from "../component/common/Wavyheading";
import SEO from "../component/SEO";

// FAQ Item Component
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors duration-200 px-2 sm:px-0"
      >
        <span className="text-sm sm:text-base md:text-lg font-medium text-text font-modelica pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-text transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4 sm:pb-5 px-2 sm:px-0 animate-fadeIn">
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-modelica leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

// Main FAQ Component
export default function FAQ() {
  const [activeTab, setActiveTab] = useState("About");
  const [openItems, setOpenItems] = useState({});

  // Refs for each section
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const orderingRef = useRef(null);

  const tabs = ["FAQs", "Products", "Ordering"];

  const allFAQData = {
    FAQs: [
      {
        id: "about-1",
        question:
          "What is nutritionally complete food Gomzi Supplement by RAG?",
        answer:
          "Gomzi Supplement by RAG is a nutritionally complete meal replacement that contains all essential nutrients your body needs in the right proportions.",
      },
      {
        id: "about-2",
        question: "How do I prepare Gomzi Supplement by RAG complete food?",
        answer:
          "Simply mix Gomzi Supplement by RAG powder with water or milk, shake well, and your complete meal is ready in seconds.",
      },
      {
        id: "about-3",
        question:
          "Is Gomzi Supplement by RAG complete food suitable after a gym?",
        answer:
          "Yes, Gomzi Supplement by RAG is perfect post-workout nutrition, providing all the essential nutrients for recovery and muscle building.",
      },
      {
        id: "about-4",
        question: "What is Gomzi Supplement by RAG Longevity?",
        answer:
          "Gomzi Supplement by RAG Longevity is our specialized formula designed to support healthy aging and long-term wellness.",
      },
      {
        id: "about-5",
        question: "When should I drink Gomzi Supplement by RAG?",
        answer:
          "You can enjoy Gomzi Supplement by RAG anytime - as a breakfast, post-workout meal, quick lunch, or convenient dinner replacement.",
      },
    ],
    Products: [
      {
        id: "prod-1",
        question:
          "What is the difference between the Gomzi Supplement by RAG Complete Meal Shake and the Heelan Fast Protein?",
        answer:
          "Gomzi Supplement by RAG Complete Meal Shake is a full meal replacement with all nutrients, while Heelan Fast Protein is a focused protein supplement.",
      },
      {
        id: "prod-2",
        question: "How should I store it?",
        answer:
          "Store in a cool, dry place away from direct sunlight. Keep the container sealed after each use.",
      },
      {
        id: "prod-3",
        question: "Do Gomzi Supplement by RAG products contain soy?",
        answer:
          "Please check the specific product label for detailed ingredient information and allergen warnings.",
      },
      {
        id: "prod-4",
        question: "Are all Gomzi Supplement by RAG products vegan?",
        answer:
          "Most of our products are vegan-friendly. Check individual product descriptions for specific dietary information.",
      },
      {
        id: "prod-5",
        question:
          "Are Gomzi Supplement by RAG meal replacement shakes suitable for people with diabetes?",
        answer:
          "While Gomzi Supplement by RAG has a balanced nutritional profile, we recommend consulting your healthcare provider before use if you have diabetes.",
      },
      {
        id: "prod-6",
        question: "Is Gomzi Supplement by RAG lactose-free?",
        answer:
          "Yes, Gomzi Supplement by RAG products are lactose-free and suitable for those with lactose intolerance.",
      },
      {
        id: "prod-7",
        question: "Do Gomzi Supplement by RAG products contain gluten?",
        answer:
          "Gomzi Supplement by RAG products are gluten-free and safe for those with gluten sensitivity or celiac disease.",
      },
      {
        id: "prod-8",
        question:
          "Can this product be used by pregnant or breastfeeding women?",
        answer:
          "Please consult with your healthcare provider before using Gomzi Supplement by RAG products during pregnancy or breastfeeding.",
      },
      {
        id: "prod-9",
        question: "Do you use any GMO ingredients/modified ingredients?",
        answer:
          "We are committed to using non-GMO ingredients whenever possible. Check specific product labels for details.",
      },
      {
        id: "prod-10",
        question: "Can Gomzi Supplement by RAG help me to lose weight?",
        answer:
          "Gomzi Supplement by RAG can support weight management as part of a balanced diet and healthy lifestyle when used appropriately.",
      },
      {
        id: "prod-11",
        question:
          "What is the difference between the Longevity, Energy, and Original products?",
        answer:
          "Each formula is optimized for specific needs - Longevity for healthy aging, Energy for sustained vitality, and Original for complete daily nutrition.",
      },
      {
        id: "prod-12",
        question: "What is resveratrol?",
        answer:
          "Resveratrol is a powerful antioxidant found in certain plants, known for its potential anti-aging and health-promoting properties.",
      },
      {
        id: "prod-13",
        question: "Is matcha better than coffee?",
        answer:
          "Matcha provides sustained energy without the crash, contains antioxidants, and offers a gentler caffeine experience compared to coffee.",
      },
      {
        id: "prod-14",
        question: "Why is Gomzi Supplement by RAG?",
        answer:
          "Gomzi Supplement by RAG is naturally sweetened to provide a pleasant taste while maintaining nutritional integrity.",
      },
      {
        id: "prod-15",
        question: "Do Gomzi Supplement by RAG shakes contain fiber?",
        answer:
          "Yes, Gomzi Supplement by RAG shakes contain dietary fiber to support digestive health and provide satiety.",
      },
      {
        id: "prod-16",
        question: "Is Gomzi Supplement by RAG a good choice after a workout?",
        answer:
          "Absolutely! Gomzi Supplement by RAG provides the perfect balance of protein, carbs, and nutrients for post-workout recovery.",
      },
    ],
    Ordering: [
      {
        id: "order-1",
        question: "Do I get a shaker for free?",
        answer:
          "Yes, we include a free premium shaker with your first order to help you prepare your Gomzi Supplement by RAG meals perfectly.",
      },
      {
        id: "order-2",
        question: "Am I responsible for any taxes or duties?",
        answer:
          "All applicable taxes are included in the price you see at checkout. No hidden fees or surprise charges.",
      },
      {
        id: "order-3",
        question: "How fast can I expect my order?",
        answer:
          "Most orders are delivered within 3-5 business days. You will receive tracking information once your order ships.",
      },
    ],
  };

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Scroll to the respective section
    let targetRef = null;
    if (tab === "FAQs") {
      targetRef = aboutRef;
    } else if (tab === "Products") {
      targetRef = productsRef;
    } else if (tab === "Ordering") {
      targetRef = orderingRef;
    }

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <SEO
        title="FAQs | Protein, Supplements & Orders | Gomzi Supplement"
        description="Find answers about whey protein, peanut butter, multivitamins, shipping, returns, ingredients, usage and orders at Gomzi Supplement."
      />
      <div className="w-full bg-white">
        {/* Header Section */}
        <div className="relative w-full overflow-hidden bg-[#5c3024f0]">
          {/* Left Side Image - Hidden on mobile */}
          <img
            src="/images/pageheadingleft.png"
            alt=""
            className="opacity-20 absolute left-0 top-0 h-full w-auto object-contain z-0 hidden md:block"
          />

          {/* Right Side Image */}
          <img
            src="/images/pageheadingright.png"
            alt=""
            className="opacity-20 absolute right-0 top-0 h-full w-auto object-contain z-0"
          />

          {/* Content Container */}
          <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-14">
            <h1 className="font-toma text-center text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-black text-white mb-6 sm:mb-8">
              Frequently Asked Questions
            </h1>

            {/* Buttons Container */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full font-modelica font-bold text-sm sm:text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    activeTab === tab
                      ? "bg-text text-white"
                      : "bg-white text-text hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Content Section */}
        <div className="container w-[90%] max-w-[var(--container-width)] mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16">
          {/* FAQ Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            {/* Left Column - ALL FAQ Lists */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {/* About Section */}
              <div ref={aboutRef} className="space-y-0 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text font-modelica mb-4 sm:mb-6">
                  FAQs
                </h2>
                <div className="bg-white rounded-lg">
                  {allFAQData.FAQs.map((item) => (
                    <FAQItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems[item.id]}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Products Section */}
              <div ref={productsRef} className="space-y-0 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text font-modelica mb-4 sm:mb-6">
                  Our products
                </h2>
                <div className="bg-white rounded-lg">
                  {allFAQData.Products.map((item) => (
                    <FAQItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems[item.id]}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Ordering Section */}
              <div ref={orderingRef} className="space-y-0 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text font-modelica mb-4 sm:mb-6">
                  Shipping & return
                </h2>
                <div className="bg-white rounded-lg">
                  {allFAQData.Ordering.map((item) => (
                    <FAQItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems[item.id]}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>

        {/* <Wavyheading text1="It's time to jump " text2="back on track" /> */}
        {/* <ProductsGrid /> */}
      </div>
    </>
  );
}
