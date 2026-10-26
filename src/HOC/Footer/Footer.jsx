import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Mail, MapPin, Phone, Lock, CheckCircle2 } from "lucide-react";
import { successToast, errorToast } from "../../utils/toast";

const QUICK_LINKS = [
  {
    title: "Sports Nutrition",
    links: [
      "Whey protein",
      "Whey protein isolate",
      "Creatine supplement",
      "Pre workout supplements",
      "BCAA supplements",
      "Mass gainer",
      "Plant protein",
    ],
  },
  {
    title: "Vitamins & Wellness",
    links: [
      "Multivitamin tablets",
      "Omega 3",
      "Biotin tablets",
      "Vitamin C tablets",
      "Vitamin D3 & calcium",
      "Collagen supplements",
    ],
  },
  {
    title: "Ayurveda & Herbs",
    links: [
      "Ashwagandha tablets",
      "Ayurvedic Shilajit",
      "Giloy Tulsi juice",
      "Brahmi capsules",
      "Amla juice",
      "Milk thistle",
    ],
  },
  {
    title: "Personal Care",
    links: ["Personal hygiene", "Hair nourish oil", "Hair mask", "Face serum"],
  },
  {
    title: "Quick Links",
    links: [
      "FAQs & Help",
      "Contact Us",
      "B2B Wholesale & Gym Supply",
      "My Account",
      "Delivery Policies",
      "Returns Policy",
      "Privacy Policy",
      "Track Your Order",
      "Terms & Conditions",
    ],
  },
  {
    title: "About Gomzi",
    links: [
      "About Us",
      "Refer & Earn",
      "Loyalty Rewards",
      "Authenticity Guaranteed",
      "Locate Your Nearest Store",
    ],
  },
];

const SOCIALS = [
  { href: "https://www.instagram.com/gomzi.supplement__rag", Icon: FaInstagram, label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61590460356446", Icon: FaFacebookF, label: "Facebook" },
  { href: "https://wa.me/919875270200", Icon: FaWhatsapp, label: "WhatsApp" },
  { href: "https://www.youtube.com", Icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      errorToast("Please enter a valid email address");
      return;
    }
    successToast("You're on the list. Your 10% code is on its way.");
    setEmail("");
  };


  return (
    <footer className="w-full bg-white mt-10">
      {/* ── TOP: BRAND + SUBSCRIBE ── */}
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 pt-16">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-8 max-w-[700px]">
            <button
              onClick={() => navigate("/")}
              className="w-[160px] cursor-pointer"
              aria-label="Gomzi Nutrition home"
            >
              <img
                src="/images/gomzi-supplements-dark.webp"
                alt="Gomzi Supplement by RAG"
                className="h-auto w-full object-contain"
              />
            </button>
            <p className="text-sm leading-5 text-[#2b2b2b]">
              Our products are curated by our team of highly experienced experts
              ensuring high quality, transparency, and efficacy. We test our
              products at every step of the development process.
            </p>
          </div>

          <div className="max-w-[430px]">
            <p className="text-lg font-medium leading-6 text-text">
              Be the first to know about new products, exclusive offers, and much
              more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                maxLength={50}
                className="h-11 flex-1 rounded-md border border-text bg-white px-3 text-sm text-text outline-none placeholder:text-text-muted focus:border-primary"
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── QUICK LINKS ── */}
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="pb-5 text-base font-semibold text-text">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((label) => (
                  <li key={label}>
                    <button
                      onClick={() => {
                        if (label === "B2B Wholesale & Gym Supply") navigate("/wholesale");
                        else if (label === "Contact Us") navigate("/contact-us");
                        else if (label === "FAQs & Help") navigate("/faq");
                        else if (label === "About Us") navigate("/about");
                        else if (label === "Privacy Policy") navigate("/privacy-policy");
                        else if (label === "Terms & Conditions") navigate("/terms-and-conditions");
                        else if (label === "Returns Policy") navigate("/refund-policy");
                        else if (label === "Delivery Policies") navigate("/shipping-policy");
                        else navigate("/gomzi-supplement");
                      }}
                      className="text-left text-sm leading-5 text-text-light transition-colors hover:text-primary cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOCIAL + CONTACT ── */}
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 pb-16 flex flex-col lg:flex-row gap-6">
        <div>
          <h4 className="mb-4 text-base font-semibold text-[#2b2b2b]">
            Stay updated with us
          </h4>
          <div className="flex flex-wrap gap-4">
            {SOCIALS.map((social) => {
              const Icon = social.Icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-2 text-text-light transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          {/* Accepted payment methods */}
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-text-light">
              <Lock className="h-3.5 w-3.5 text-success" />
              100% Secure Payments
            </div>
            <img
              src="/images/Payment_icons.avif"
              alt="Accepted payment methods: UPI, Visa, Mastercard, NetBanking"
              className="h-auto w-full max-w-[220px] object-contain"
            />
          </div>
        </div>

        <div className="lg:ml-auto max-w-sm">
          <h4 className="mb-4 text-base font-semibold text-[#2b2b2b]">
            Get in touch
          </h4>
          <div className="space-y-2.5 text-sm text-text-light">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+919875270200" className="hover:text-primary">
                +91 98752 70200
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a
                href="mailto:info@ragnutrition.com"
                className="hover:text-primary"
              >
                info@ragnutrition.com
              </a>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                G-23 Time Square, Gaurav Path Road, Surat, Gujarat 394510
              </span>
            </p>
            <p className="flex flex-wrap gap-2 pt-2">
              {["FSSAI Certified", "ISO 22000:2018", "100% Dope-Free"].map(
                (label) => (
                  <span key={label} className="badge">
                    <CheckCircle2 className="h-3 w-3 text-success" />
                    {label}
                  </span>
                )
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-bg-footer-bar">
        <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-3 text-center">
          <p className="text-sm text-[#212121]">
            Copyright © 2026, gomzi-supplement.com
          </p>
        </div>
      </div>
    </footer>
  );
}
