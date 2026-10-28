import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);
  const navigate = useNavigate();

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Navigation routes mapping
  const shopLinks = [
    { label: "All products", path: "/gomzi-supplement" },
    { label: "whey Protein", path: "/gomzi-supplement/whey-protein" },
    { label: "Pre-Workout", path: "/gomzi-supplement/pre-workout" },
    { label: "Mass Gainer", path: "/gomzi-supplement/mass-gainer" },
    { label: "Vitamins", path: "/gomzi-supplement/wellness-health" },
    {
      label: "Everyday Essentials",
      path: "/gomzi-supplement/meal-replacement",
    },
  ];

  const ourStoryLinks = [
    { label: "About Us", path: "/about" },
    // { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  const helpLinks = [
    { label: "Shipping Information", path: "/shipping-policy" },
    { label: "Returns", path: "/refund-policy" },
    { label: "FAQ", path: "/faq" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms & Conditions", path: "/terms-and-conditions" },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden rounded-t-3xl"
      style={{ background: "#0a0a0a" }}
    >
      {/* Background decorative image */}
      <img
        src="/images/footer.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16 pt-12 md:pt-16 pb-8 md:pb-10">
        {/* Links + Payment Row - Desktop & Tablet */}
        <div className="hidden sm:block mb-14 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">
            {/* Shop */}
            <div>
              <img
                src="/images/whitelogo.webp"
                alt="Gomzi Supplement by RAG"
                className="h-12 mb-5"
              />

              <p className="text-gray-400 leading-7 mb-6">
                Premium Sports Nutrition Supplements manufactured with
                international quality standards.
              </p>

              <div className="space-y-4 text-white">
                <div className="flex items-start gap-3">
                  <Phone size={18} />
                  <a
                    href="tel:+919875270200"
                    className="hover:underline"
                    style={{ color: "#ffffff" }}
                  >
                    +91 98752 70200
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} />
                  <a
                    href="mailto:info@ragnutrition.com"
                    className="hover:underline"
                    style={{ color: "#ffffff" }}
                  >
                    info@ragnutrition.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={30} />
                  <span>
                    G-23-TIME SQUARE, Gaurav Path Road, TP 10 Main Rd, opp.
                    Shree Bharti Residency, Surat, Gujarat 394510
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-toma font-black text-white text-2xl mb-4">
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map(({ label, path }) => (
                  <li key={label} onClick={() => navigate(path)}>
                    <button
                      className="font-modelica text-lg hover:text-white cursor-pointer transition-colors text-left"
                      style={{ color: "#ffffff" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gomzi Supplement by RAG */}
            <div>
              <h4 className="font-toma font-black text-white text-2xl mb-4">
                Our Story
              </h4>
              <ul className="space-y-3">
                {ourStoryLinks.map(({ label, path }) => (
                  <li key={label} onClick={() => navigate(path)}>
                    <button
                      className="font-modelica text-lg hover:text-white cursor-pointer transition-colors text-left"
                      style={{ color: "#ffffff" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-toma font-black text-white text-2xl mb-4">
                Help
              </h4>
              <ul className="space-y-3">
                {helpLinks.map(({ label, path }) => (
                  <li key={label} onClick={() => navigate(path)}>
                    <button
                      className="font-modelica text-lg hover:text-white cursor-pointer transition-colors text-left"
                      style={{ color: "#ffffff" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment - Desktop only */}
            <div className="hidden lg:block">
              <h4 className="font-toma font-black text-white text-2xl mb-4">
                Follow Us
              </h4>
              <div className="flex items-center gap-5 order-1 md:order-2">
                <a
                  href="https://www.instagram.com/gomzi.supplement__rag"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity cursor-pointer hover:opacity-70"
                  style={{ color: "#ffffff" }}
                >
                  <FaInstagram size={20} />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61590460356446"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-opacity cursor-pointer hover:opacity-70"
                  style={{ color: "#ffffff" }}
                >
                  <FaFacebookF size={20} />
                </a>
              </div>

              <h4 className="font-toma font-black text-white text-2xl mb-4 mt-10">
                We Accept
              </h4>
              <img
                src="/images/Payment_icons.avif"
                alt="Accepted payment methods"
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Payment - Tablet */}
          <div className="md:block lg:hidden mt-8 md:mt-10">
            <h4 className="font-toma font-black text-white text-2xl mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-5 order-1 md:order-2">
              <a
                href="https://www.instagram.com/gomzi.supplement__rag/"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity cursor-pointer hover:opacity-70"
                style={{ color: "#ffffff" }}
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590460356446"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity cursor-pointer hover:opacity-70"
                style={{ color: "#ffffff" }}
              >
                <FaFacebookF size={20} />
              </a>
            </div>

            <h4 className="font-toma font-black text-white text-2xl mb-4 mt-4">
              We Accept
            </h4>
            <img
              src="/images/Payment_icons.avif"
              alt="Accepted payment methods"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="sm:hidden mb-14 space-y-4">
          <div>
            <img
              src="/images/whitelogo.webp"
              alt="Gomzi Supplement by RAG"
              className="h-12 mb-5"
            />

            <p className="text-gray-400 leading-7 mb-6">
              Premium Sports Nutrition Supplements manufactured with
              international quality standards.
            </p>

            <div className="space-y-4 text-white">
              <div className="flex items-start gap-3">
                <Phone size={18} />
                <a
                  href="tel:+919875270200"
                  className="hover:underline"
                  style={{ color: "#ffffff" }}
                >
                  +91 98752 70200
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} />
                <a
                  href="mailto:info@ragnutrition.com"
                  className="hover:underline"
                  style={{ color: "#ffffff" }}
                >
                  info@ragnutrition.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={30} />
                <span>
                  G-23-TIME SQUARE, Gaurav Path Road, TP 10 Main Rd, opp. Shree
                  Bharti Residency, Surat, Gujarat 394510
                </span>
              </div>
            </div>
          </div>
          {/* Shop */}
          <div className="border-b" style={{ borderColor: "#1f1f1f" }}>
            <button
              onClick={() => toggleAccordion("shop")}
              className="w-full flex items-center justify-between cursor-pointer py-4"
            >
              <h4 className="font-toma font-black text-white text-xl">Shop</h4>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-300 ${openAccordion === "shop" ? "rotate-180" : ""}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openAccordion === "shop" ? "max-h-96 pb-4" : "max-h-0"}`}
            >
              <ul className="space-y-3 cursor-pointer">
                {shopLinks.map(({ label, path }) => (
                  <li key={label} onClick={() => navigate(path)}>
                    <button
                      onClick={() => navigate(path)}
                      className="font-modelica text-base hover:text-white cursor-pointer transition-colors text-left"
                      style={{ color: "#ffffff" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gomzi Supplement by RAG */}
          <div className="border-b" style={{ borderColor: "#1f1f1f" }}>
            <button
              onClick={() => toggleAccordion("nara")}
              className="w-full flex items-center cursor-pointer justify-between py-4"
            >
              <h4 className="font-toma font-black text-white text-xl">
                Gomzi Supplement by RAG
              </h4>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-300 ${openAccordion === "nara" ? "rotate-180" : ""}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openAccordion === "nara" ? "max-h-96 pb-4" : "max-h-0"}`}
            >
              <ul className="space-y-3 cursor-pointer">
                {ourStoryLinks.map(({ label, path }) => (
                  <li key={label} onClick={() => navigate(path)}>
                    <button
                      onClick={() => navigate(path)}
                      className="font-modelica text-base cursor-pointer hover:text-white transition-colors text-left"
                      style={{ color: "#ffffff" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Help */}
          <div className="border-b" style={{ borderColor: "#1f1f1f" }}>
            <button
              onClick={() => toggleAccordion("help")}
              className="w-full flex items-center cursor-pointer justify-between py-4"
            >
              <h4 className="font-toma font-black text-white text-xl">Help</h4>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-transform duration-300 ${openAccordion === "help" ? "rotate-180" : ""}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openAccordion === "help" ? "max-h-96 pb-4" : "max-h-0"}`}
            >
              <ul className="space-y-3 cursor-pointer">
                {helpLinks.map(({ label, path }) => (
                  <li key={label} onClick={() => navigate(path)}>
                    <button
                      onClick={() => navigate(path)}
                      className="font-modelica text-base hover:text-white cursor-pointer transition-colors text-left"
                      style={{ color: "#ffffff" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment - Mobile */}
          <div className="pt-4">
            <img
              src="/images/Payment_icons_mobile.png"
              alt="Accepted payment methods"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
        <div
          className="flex items-center border-t justify-center pt-6"
          style={{ borderColor: "#1f1f1f" }}
        >
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <p className="text-white">
              @2026 Gomzi Supplement by RAG. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
