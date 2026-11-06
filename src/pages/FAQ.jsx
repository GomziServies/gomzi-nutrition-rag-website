import React, { useState, useRef } from "react";
import PageHeading from "../HOC/Header/PageHeading";
import SEO from "../component/SEO";

// FAQ Item Component
function FAQItem({ id, question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={Boolean(isOpen)}
        aria-controls={`${id}-answer`}
        id={`${id}-question`}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left hover:bg-bg-light transition-colors duration-200 px-2 sm:px-0"
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

        <div hidden={!isOpen} id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} className="pb-5 px-2 sm:px-0">
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-modelica leading-relaxed">
            {answer}
          </p>
        </div>
    </div>
  );
}

// Main FAQ Component
export default function FAQ() {
  const [activeTab, setActiveTab] = useState("FAQs");
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
      <SEO title="FAQs | Protein, Supplements & Orders | Gomzi Supplement" description="Find answers about products, shipping, returns and orders at Gomzi Supplement." />
      <PageHeading head="Frequently Asked Questions" description="Find help with products, orders and delivery. Our team is here if you need anything else.">
        <nav aria-label="FAQ sections" className="mt-5 flex flex-wrap gap-2">
          {tabs.map(tab => <button key={tab} onClick={() => handleTabClick(tab)} aria-pressed={activeTab === tab} className={`site-button ${activeTab === tab ? "" : "site-button-outline"}`}>{tab}</button>)}
        </nav>
      </PageHeading>
      <div className="site-container py-8 md:py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          {[
            { key: "FAQs", title: "About Gomzi", ref: aboutRef },
            { key: "Products", title: "Our products", ref: productsRef },
            { key: "Ordering", title: "Shipping & returns", ref: orderingRef },
          ].map(section => (
            <section key={section.key} ref={section.ref} className="site-surface p-4 sm:p-6 scroll-mt-48" aria-labelledby={`faq-${section.key}`}>
              <h2 id={`faq-${section.key}`} className="font-toma text-xl sm:text-2xl mb-3">{section.title}</h2>
              {allFAQData[section.key].map(item => <FAQItem key={item.id} {...item} isOpen={openItems[item.id]} onToggle={() => toggleItem(item.id)} />)}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
