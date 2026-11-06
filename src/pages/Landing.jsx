// src/pages/Landing.jsx
import React from "react";
import SEO from "../component/SEO";
import { useWebsiteContent } from "../content/WebsiteContent";
import HkHeroBanner from "../component/healthkart/HkHeroBanner";
import HkCategoryCircles from "../component/healthkart/HkCategoryCircles";
import HkStealDeals from "../component/healthkart/HkStealDeals";
import HkFlashDeals from "../component/healthkart/HkFlashDeals";
import { HkManagedBannerAd } from "../component/healthkart/HkBannerAds";
import HkBestSellersTabbed from "../component/healthkart/HkBestSellersTabbed";
import HkComboStackBuilder from "../component/healthkart/HkComboStackBuilder";
import HkCategoryShowcase from "../component/healthkart/HkCategoryShowcase";
import HkWhyGomzi from "../component/healthkart/HkWhyGomzi";
import HkCustomerReviews from "../component/healthkart/HkCustomerReviews";
import HkSeoAccordion from "../component/healthkart/HkSeoAccordion";

const DEFAULT_SECTIONS = ['hero', 'categories', 'deals', 'flash', 'static-banner', 'bestsellers', 'combos', 'promo-banner', 'whey', 'stacks', 'nutrition-banner', 'creatine', 'why', 'reviews', 'seo'].map(id => ({ id, enabled: true }));
const CATEGORY_SHOWCASES = [
  { id: 'whey', title: 'Whey Protein & Isolate Range', category: 'Whey Protein', categorySlug: 'whey-protein', subtitle: 'Explore whey proteins and isolates for your everyday training routine.' },
  { id: 'stacks', title: 'Combos & Value Stacks', category: 'Combos & Stacks', categorySlug: 'combos-stacks', subtitle: 'Explore supplement bundles for your goals and routine.' },
  { id: 'creatine', title: 'Creatine & Pre-Workout Powerhouse', category: 'Creatine', categorySlug: 'creatine', subtitle: 'Discover creatine formulas to support your training.' },
];

const Landing = () => {
  const { get } = useWebsiteContent();
  const sections = get('homepage.sections', DEFAULT_SECTIONS);
  const showcase = id => {
    const settings = CATEGORY_SHOWCASES.find(item => item.id === id);
    return settings ? <HkCategoryShowcase key={id} {...settings} /> : null;
  };
  const components = {
    hero: <HkHeroBanner />, categories: <HkCategoryCircles />, deals: <HkStealDeals />,
    flash: <HkFlashDeals />, 'static-banner': <HkManagedBannerAd />,
    bestsellers: <HkBestSellersTabbed />, combos: <HkComboStackBuilder />,
    'promo-banner': <HkManagedBannerAd source="promo" />,
    whey: showcase('whey'), stacks: showcase('stacks'),
    'nutrition-banner': <HkManagedBannerAd source="nutrition" />,
    creatine: showcase('creatine'), why: <HkWhyGomzi />, reviews: <HkCustomerReviews />, seo: <HkSeoAccordion />,
  };
  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#f4f4f4] min-h-screen text-text selection:bg-primary selection:text-white">
      <h1 className="sr-only">Gomzi Nutrition — sports supplements and daily essentials</h1>
      {/* ── SEO Meta ── */}
      <SEO
        title="Gomzi Nutrition - India's Authentic Sports Nutrition & Supplement Store"
        description="Shop authentic whey proteins, mass gainers, creatine, pre-workouts, and clean supplements direct from Gomzi Nutrition. Explore genuine products with verifiable batch reports."
      />

      {sections.filter(section => section.enabled && components[section.id]).map(section => <React.Fragment key={section.id}>{components[section.id]}</React.Fragment>)}
    </div>
  );
};

export default Landing;
