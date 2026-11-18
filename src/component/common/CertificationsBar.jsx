import React from "react";

const PDF_CERTIFICATE_URL = "/certifications/supplied-profile-certifications.pdf";

const ROW_1_CERTIFICATIONS = [
  {
    name: "WHO",
    image: "/certifications/who.webp",
    alt: "World Health Organization (WHO) Certified",
  },
  {
    name: "HACCP",
    image: "/certifications/haccp.webp",
    alt: "Hazard Analysis Critical Control Point (HACCP) Certified",
  },
  {
    name: "ISO 22000:2018",
    image: "/certifications/iso-22000.webp",
    alt: "ISO 22000:2018 Food Safety Management System",
  },
  {
    name: "GMP",
    image: "/certifications/gmp.webp",
    alt: "Good Manufacturing Practice (GMP) Certified",
  },
  {
    name: "FDA",
    image: "/certifications/fda.webp",
    alt: "US FDA Food Facility Registered",
  },
  {
    name: "HALAL",
    image: "/certifications/halal.webp",
    alt: "100% Halal Food Certified",
  },
  {
    name: "FIEO",
    image: "/certifications/fieo.webp",
    alt: "Federation of Indian Export Organisations (FIEO)",
  },
];

const ROW_2_CERTIFICATIONS = [
  {
    name: "FSSAI",
    image: "/certifications/fssai.webp",
    alt: "Food Safety and Standards Authority of India (FSSAI) Licensed",
  },
  {
    name: "Pharmexcil",
    image: "/certifications/pharmexcil.webp",
    alt: "Pharmaceuticals Export Promotion Council (Pharmexcil)",
  },
  {
    name: "SHEFEXIL",
    image: "/certifications/shefexil.webp",
    alt: "Shellac and Forest Products Export Promotion Council (SHEFEXIL)",
  },
  {
    name: "KOSHER",
    image: "/certifications/kosher.webp",
    alt: "Kosher Certified",
  },
  {
    name: "SGCCI",
    image: "/certifications/sgcci.webp",
    alt: "The Southern Gujarat Chamber of Commerce and Industry (SGCCI)",
  },
  {
    name: "GPSR",
    image: "/certifications/gpsr.webp",
    alt: "General Product Safety Regulation (GPSR) Compliant",
  },
];

const ALL_CERTIFICATIONS = [...ROW_1_CERTIFICATIONS, ...ROW_2_CERTIFICATIONS];

function CertItem({ cert }) {
  return (
    <a
      href={PDF_CERTIFICATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={`View ${cert.name} Certification document (PDF)`}
      aria-label={`View ${cert.name} Certification`}
      className="group flex flex-col items-center justify-end text-center transition-transform duration-200 hover:-translate-y-1 focus:outline-none w-full max-w-[130px]"
    >
      <div className="h-12 sm:h-14 md:h-16 w-full flex items-center justify-center px-1">
        <img
          src={cert.image}
          alt={cert.alt || cert.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain filter transition-all duration-200 group-hover:scale-105 mix-blend-multiply"
        />
      </div>
      <span className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs md:text-[13px] font-medium text-stone-600 tracking-wide text-center leading-snug group-hover:text-primary transition-colors whitespace-nowrap">
        {cert.name}
      </span>
    </a>
  );
}

/**
 * Certifications Bar
 * Styled with soft, subtle warm almond/peach tint (#fef4eb, a gentle slight tint of provided #fdebdb)
 * with mix-blend-multiply so badges seamlessly sit on the background.
 *
 * Layout matches Attachment 2:
 * - Row 1 (7 items): WHO, HACCP, ISO 22000:2018, GMP, FDA, HALAL, FIEO
 * - Row 2 (6 items): FSSAI, Pharmexcil, SHEFEXIL, KOSHER, SGCCI, GPSR
 */
export default function CertificationsBar() {
  return (
    <section className="w-full bg-[#fef4eb] border-t border-b border-[#f0ded0] py-8 sm:py-10 md:py-12 select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Desktop View: Exact 2-row layout matching Attachment 2 */}
        <div className="hidden lg:block">
          {/* Row 1: 7 certifications evenly distributed */}
          <div className="grid grid-cols-7 gap-4 lg:gap-6 items-end justify-items-center">
            {ROW_1_CERTIFICATIONS.map((cert) => (
              <CertItem key={cert.name} cert={cert} />
            ))}
          </div>

          {/* Row 2: 6 certifications centered underneath */}
          <div className="grid grid-cols-6 gap-4 lg:gap-6 items-end justify-items-center max-w-[1060px] mx-auto mt-8 lg:mt-10">
            {ROW_2_CERTIFICATIONS.map((cert) => (
              <CertItem key={cert.name} cert={cert} />
            ))}
          </div>
        </div>

        {/* Mobile & Tablet View: Balanced responsive grid */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-7 gap-x-4 items-start justify-items-center">
            {ALL_CERTIFICATIONS.map((cert) => (
              <CertItem key={`m-${cert.name}`} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
