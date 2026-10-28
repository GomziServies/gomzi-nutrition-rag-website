import React from "react";
import PageHeading from "../../HOC/Header/PageHeading";
import ContactSection from "../../component/ui/Contectus";
import SocialProofSlider from "../../component/ui/SocialProofSlider";
import SEO from "../../component/SEO";

const ContactUs = () => {
  return (
    <>
      <SEO
        title="Contact Gomzi Supplement | Customer Support & Business Enquiries"
        description="Find answers about whey protein, peanut butter, multivitamins, shipping, returns, ingredients, usage and orders at Gomzi Supplement."
      />
      <PageHeading head="Contact Us" description="Questions about an order, a product or working with Gomzi? Get in touch with our team." />
      <ContactSection />
    </>
  );
};

export default ContactUs;
