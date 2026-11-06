import useContactDetails from "../../content/useContactDetails";
import React, { useState } from "react";
import { sendContactInquiryApi } from "../../api/contact.api";
import { errorToast, successToast } from "../../utils/toast";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const allFAQData = {
  contact: [
    {
      id: "about-1",
      question: "Where is Gomzi Supplement by RAG located?",
      answer:
        "Our manufacturing facility is in Surat, Gujarat, India. We're an online-only brand - orders ship across India via our website.",
    },
    {
      id: "about-2",
      question: "How do I track my order?",
      answer:
        "You'll receive a tracking link via SMS and email after dispatch. For updates, WhatsApp us your order number.",
    },
    {
      id: "about-3",
      question: "How do I get the lab report for my product?",
      answer:
        "Every batch CoA is downloadable on the product page. Can't find it? Email us your batch number.",
    },
    {
      id: "about-4",
      question: "Do you offer bulk or wholesale pricing?",
      answer:
        "Yes - for gyms, fitness centres and retailers. Select 'Bulk enquiry' in the contact form above.",
    },
    {
      id: "about-5",
      question: "What is your return policy?",
      answer:
        "7-day return on unopened products. If a product is genuinely defective, we replace it - no questions asked.",
    },
    // {
    //   id: "about-6",
    //   question: "Is Gomzi Supplement by RAG FSSAI licensed?",
    //   answer:
    //     "Yes - Central FSSAI License No. XXXXXXXXXXXXXXXX. Verifiable on foscos.fssai.gov.in.",
    // },
  ],
};
const ContactSection = () => {
  const contact = useContactDetails();
  const [openItems, setOpenItems] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interest: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        message: formData.interest,
        subject: "RAG Website Contact Inquiry",
        source: window.location.href,
      };

      await sendContactInquiryApi(payload);

      successToast("Inquiry Send successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        interest: "",
      });
    } catch (err) {
      console.log(err);
      errorToast("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-light py-8 md:py-12 w-full overflow-hidden">
      <div className="site-container">
        {/* ================= CONTACT INFO ================= */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <span
              style={{ background: "var(--color-primary)" }}
              className="inline-block px-4 py-1 text-white rounded-full text-lightblue-700 text-xs font-bold uppercase tracking-widest"
            >
              Reach Us
            </span>

            <h2 className="mt-5 text-2xl sm:text-3xl font-toma font-bold text-text">
              We'd Love to Hear From You
            </h2>

            <p className="mt-4 text-text-light max-w-2xl mx-auto font-modelica">
              Questions about products, orders or wholesale? Our nutrition
              experts are here to help.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {/* WhatsApp */}
            <a
              href={contact.whatsappUrl}
              className="group bg-white border border-border rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="text-3xl text-white" />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    WhatsApp
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold break-all text-text mt-1">
                    {contact.phone}
                  </h4>

                  <p className="text-sm text-text-light mt-2">
                    Fastest support • Usually replies within 30 minutes.
                  </p>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href={contact.emailUrl}
              className="group bg-white border border-border rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-2xl text-white" />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    Email
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold break-all text-text mt-1">
                    {contact.email}
                  </h4>

                  <p className="text-sm text-text-light mt-2">
                    Orders, Returns, Product Queries & Bulk Enquiries.
                  </p>
                </div>
              </div>
            </a>

            {/* Phone */}
            <a
              href={contact.telephoneUrl}
              className="group bg-white border border-border rounded-2xl p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt className="text-2xl text-white" />
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    Phone
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold break-all text-text mt-1">
                    {contact.phone}
                  </h4>

                  <p className="text-sm text-text-light mt-2">
                    Monday – Saturday • 10 AM – 6 PM IST
                  </p>
                </div>
              </div>
            </a>

            {/* Address */}
            <div className="bg-white border border-border hover:border-primary rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-2xl text-white" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    Our Retail Shop
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold break-all text-text mt-1">
                    {contact.address}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-10">
            {/* Support Hours */}
            <div className="site-surface p-6">
              <h3 className="font-bold text-lg mb-5">Support Hours</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <strong>10 AM - 6 PM</strong>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-500">Closed</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="site-surface p-6">
              <h3 className="font-bold text-lg mb-5">Follow Us</h3>

              <div className="flex gap-3 mb-4">
                <a
                  href={contact.instagramUrl}
                  className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-pink-500 hover:text-white transition"
                >
                  <FaInstagram size={20} />
                </a>

                <a
                  href={contact.facebookUrl}
                  className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-blue-600 hover:text-white transition"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </div>

              <p className="text-sm text-text-light">
                Daily fitness tips, product launches and nutrition education.
              </p>
            </div>

            {/* FSSAI */}
            {/* <div className="bg-[#bcffff] rounded-2xl border border-primary p-6">
              <div className="text-xs uppercase font-semibold tracking-wider text-[#0b8383]">
                FSSAI Licensed
              </div>

              <div className="text-2xl font-bold mt-3">XXXXXXXXXXXXX</div>

              <p className="mt-3 text-sm text-text-light">
                Manufactured in an FSSAI approved and GMP certified facility
                with strict quality standards.
              </p>
            </div> */}
          </div>
        </section>
        <div className="">
          <div className="site-surface w-full max-w-3xl mx-auto p-5 sm:p-8">
            {/* Heading */}
            <h2 className="font-toma text-3xl md:text-2xl lg:text-3xl font-bold text-text mb-3">
              Send a message
            </h2>

            {/* Subtext */}
            <p className="font-modelica text-text-light text-base mb-8 max-w-lg">
              Fill in the form below - we'll get back to you within 4 business
              hours. For urgent orders, WhatsApp is faster.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="site-form space-y-5">
              {/* Name + Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Your Name */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-modelica text-sm text-text">
                    Your name <span className="text-text-light">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name" name="name"
                    placeholder="Enter your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-border rounded-[var(--radius-md)] px-4 py-3 font-modelica text-text text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                {/* Email */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-modelica text-sm text-text">
                    Email address <span className="text-text-light">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Valid Email"
                    id="contact-email" name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-border rounded-[var(--radius-md)] px-4 py-3 font-modelica text-text text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <label htmlFor="contact-mobile" className="font-modelica text-sm text-text">
                  Mobile Number <span className="text-text-light">*</span>
                </label>
                <input
                  type="tel" inputMode="tel"
                  id="contact-mobile" name="mobile"
                  placeholder="Enter Your Valid Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full border border-border rounded-[var(--radius-md)] px-4 py-3 font-modelica text-text text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>

              {/* What interests you */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-interest" className="font-modelica text-sm text-text">
                  What interests you? <span className="text-text-light">*</span>
                </label>
                <textarea
                  id="contact-interest" name="interest"
                  placeholder="Enter Your query or interest here."
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-border rounded-[var(--radius-md)] px-4 py-3 font-modelica text-text text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                />
              </div>
              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-primary hover:bg-hover text-white font-toma font-bold py-3 sm:py-4 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? "Contacting..." : "Contact Support "}
                </button>
                <a
                  href="/gomzi-supplement"
                  className="w-full sm:flex-1 text-center bg-primary hover:bg-hover text-white font-toma font-bold py-3 sm:py-4 rounded-lg transition"
                >
                  Shop Products
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12">
          <div className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text font-modelica mb-2">
              Need Help?
            </h2>
            <div className="bg-white rounded-lg">
              {allFAQData.contact.map((item) => (
                <FAQItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems[item.id]}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// FAQ Item Component
function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left hover:bg-gray-50 transition-colors duration-200 px-2 sm:px-0"
      >
        <span className="text-sm sm:text-base md:text-lg font-medium text-text font-modelica pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-text transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4 sm:pb-5 px-2 sm:px-0 animate-fadeIn">
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-modelica leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
