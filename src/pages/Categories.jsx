import { Link } from "react-router-dom";
import { ArrowRight, Plus, X } from "lucide-react";
import PageHeading from "../HOC/Header/PageHeading";
import SEO from "../component/SEO";
import { useState } from "react";
import useCategories from "../hooks/useCategories";
import { FlaskConical, BadgeCheck, Truck, Crown } from "lucide-react";

const standards = [
  {
    number: "01",
    title: "100% Label Accuracy",
    description:
      "Every scoop delivers exactly what is promised on the label. Zero amino-spiking, zero hidden sugars, and certified authentic ingredients.",
  },
  {
    number: "02",
    title: "NABL Batch Certified",
    description:
      "Every single production batch undergoes thorough NABL laboratory testing for protein purity, heavy metals, and zero adulteration.",
  },
  {
    number: "03",
    title: "GMP & FSSAI Standards",
    description:
      "Formulated and manufactured in state-of-the-art GMP certified facilities following strict international safety and hygiene protocols.",
  },
  {
    number: "04",
    title: "Direct From Lab",
    description:
      "Eliminating distributor middle-layers guarantees 100% genuine products, direct batch tracking, and authentic sports nutrition.",
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

export function CategoryCard({ category }) {
  const content = <article className="site-surface group h-full overflow-hidden transition hover:border-primary hover:shadow-md">
    <div className="aspect-[4/3] bg-bg-light p-5 sm:p-8">
      <img src={category.image} alt={category.title} loading="lazy" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" onError={event => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "true"; event.currentTarget.src = "/images/product-placeholder.webp"; } }} />
    </div>
    <div className="p-4 sm:p-5">
      <h2 className="font-bold text-base sm:text-lg text-text">{category.title}</h2>
      {category.productCount != null && <p className="mt-1 text-xs sm:text-sm text-text-light">{category.productCount.toLocaleString("en-IN")} {category.productCount === 1 ? "Product" : "Products"}</p>}
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">Shop now <ArrowRight size={16} /></span>
    </div>
  </article>;
  return category.url?.startsWith("/") ? <Link to={category.url}>{content}</Link> : <a href={category.url || "#"}>{content}</a>;
}

export default function CategoriesSection() {
  const [active, setActive] = useState(0);
  const { categories, loading, error, retry } = useCategories();
  return <>
    <SEO title="Shop by Category | Gomzi Supplement" description="Explore whey protein, sports supplements and daily wellness essentials for your goals." />
    <PageHeading head="Shop by Category" description="Explore supplements for your fitness and everyday nutrition goals." />
    <div className="site-container py-8 md:py-12 space-y-10 md:space-y-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {highlights.map(item => <div key={item.text} className="site-surface flex items-center gap-3 p-3 sm:p-4 text-xs font-semibold"><item.icon size={20} className="shrink-0 text-primary" />{item.text}</div>)}
      </div>
      <section aria-label="Product categories">
        {loading ? <div role="status" aria-label="Loading categories" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">{[0,1,2,3,4,5].map(i => <div key={i} className="h-64 rounded-2xl bg-border/50 animate-pulse" />)}</div>
          : error ? <div role="alert" className="site-surface p-8 text-center"><p className="text-text-light">We couldn't load the categories.</p><button onClick={retry} className="site-button mt-4">Try again</button></div>
          : categories.length ? <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">{categories.map(category => <CategoryCard key={category.id} category={category} />)}</div>
          : <p className="site-surface p-8 text-center text-text-light">There are no active categories right now.</p>}
      </section>
      <section>
        <span className="site-eyebrow">The Gomzi standard</span>
        <h2 className="mt-2 font-toma text-2xl sm:text-3xl">Why choose Gomzi Supplement?</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {standards.map(item => <article key={item.number} className="site-surface p-5"><span className="text-sm font-bold text-primary">{item.number}</span><h3 className="font-bold mt-3">{item.title}</h3><p className="mt-2 text-sm leading-6 text-text-light">{item.description}</p></article>)}
        </div>
      </section>
      <section className="site-surface p-4 sm:p-6 max-w-4xl mx-auto">
        <h2 className="font-toma text-2xl mb-4">Common questions</h2>
        {faqs.map((faq, index) => <div key={faq.question} className="border-b border-border last:border-0">
          <h3><button id={`category-question-${index}`} aria-expanded={active === index} aria-controls={`category-answer-${index}`} onClick={() => setActive(active === index ? null : index)} className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm sm:text-base font-semibold">{faq.question}<span className="shrink-0 text-primary">{active === index ? <X size={18} /> : <Plus size={18} />}</span></button></h3>
          <div id={`category-answer-${index}`} role="region" aria-labelledby={`category-question-${index}`} hidden={active !== index} className="pb-5 text-sm text-text-light leading-7">{faq.answer}</div>
        </div>)}
      </section>
    </div>
  </>;
}
