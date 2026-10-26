import React from "react";
import PageHeading from "../HOC/Header/PageHeading";
import BlackFeatureBar from "../component/common/Black-Feature-Bar";
import Ingredientsdetail from "../component/ui/Ingredients-detail";
import IngredientsHealthBenefits from "../component/ui/Ingredients-Health-Benefits";
import NaraHealthSection from "../component/ui/NaraHealthSection";

const Ingredients = () => {
  return (
    <div>
      <PageHeading head="Ingredients" />
      <BlackFeatureBar />
      <Ingredientsdetail />
      <IngredientsHealthBenefits />
      <NaraHealthSection />
    </div>
  );
};

export default Ingredients;
