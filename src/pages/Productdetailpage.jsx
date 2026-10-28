import React from "react";
import NARAProductPage from "../component/ui/ProductDetail";
import ScientificallyProvenproductdetail from "../component/ui/Scientifically-Proven-product-detail";
import HelthSectionproductdetail from "../component/ui/Health-Section-product-detail";
import FAQSection from "../component/ui/FAQItem";

const ProductDetailPage = () => {
  return (
    <div>
      <NARAProductPage />

      {/* <Hookheading text1="Don't forget to " text2="refill your energy" /> */}
      {/* <ProductsGrid /> */}
      <FAQSection />
    </div>
  );
};

export default ProductDetailPage;
