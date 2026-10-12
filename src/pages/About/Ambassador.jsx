import React from "react";
import PageHeading from "../../HOC/Header/PageHeading";
import AmbassadorDetail from "../../component/ui/Ambassadors-Detail";
import Wavyheading from "../../component/common/Wavyheading";
import SocialProofSlider from "../../component/ui/SocialProofSlider";

const Ambassador = () => {
  return (
    <div>
      <PageHeading head={"Ambassador"} />
      <AmbassadorDetail />
      <SocialProofSlider />
      {/* <Wavyheading text1="Thousands choose Gomzi Supplement by RAG " text2="for a reason" /> */}
    </div>
  );
};

export default Ambassador;
