import React from "react";
import PageHeading from "../../HOC/Header/PageHeading";
import StorySection from "../../component/ui/StorySection";
import AboutHealthSection from "../../component/ui/About-HealthSection";
import IngredientsHealthBenefits from "../../component/ui/Ingredients-Health-Benefits";
import SEO from "../../component/SEO";
import BrandJourneySection from "../../component/ui/BrandJourneySection";
import ManufacturingSection from "../../component/ui/ManufacturingSection";
import ManufacturingAdvantageSection from "../../component/ui/ManufacturingAdvantageSection";
import AboutFAQSection from "../../component/ui/AboutFAQSection";

const About = () => {
  return (
    <>
      <SEO
        title="About Gomzi Supplement by RAG - Indian-Flavoured, Certified Whey Protein Since 2024"
        description="Gomzi Supplement by RAG makes whey protein with Indian-inspired flavours like Mava Kulfi  zero bloating, no chalkiness, no amino-spiking. Manufactured under ISO 22000, WHO-GMP & FSSAI certified standards in Surat."
      />
      <div>
        <PageHeading head={"About Us"} />
        <StorySection />
        <BrandJourneySection />
        <ManufacturingSection />
        <ManufacturingAdvantageSection />
        {/* <AboutFAQSection /> */}
        {/* <AboutHealthSection /> */}
        {/* <IngredientsHealthBenefits /> */}
      </div>
    </>
  );
};

export default About;
