import React from "react";
import PageHeading from "../HOC/Header/PageHeading";
import BlackFeatureBar from "../component/common/Black-Feature-Bar";
import Ingredientsdetail from "../component/ui/Ingredients-detail";
import IngredientsHealthBenefits from "../component/ui/Ingredients-Health-Benefits";
import NaraHealthSection from "../component/ui/NaraHealthSection";
import ComparisonTable from "../component/ui/ComparisonTable";
import ProductsGrid from "../component/ui/ProductsGrid";
import Hookheading from "../component/common/Hookheading";

const Ingredients = () => {
  return (
    <div>
      <PageHeading head="Ingredients" />
      <BlackFeatureBar />
      <Ingredientsdetail />
      <IngredientsHealthBenefits />
      <NaraHealthSection />
      {/* <ComparisonTable /> */}
      {/* <Hookheading text1="Don't forget to " text2="refill your energy" /> */}
      {/* <ProductsGrid/> */}
    </div>
  );
};

export default Ingredients;
