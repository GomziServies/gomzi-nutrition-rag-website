import React from "react";

/**
 * High-Resolution Official Brand Certification Badges
 * Sourced directly from verified Gomzi Nutrition manufacturing assets:
 * 1. FSSAI (Govt. of India Food Safety & Standards Authority)
 * 2. ISO 22000:2018 Certified Company
 * 3. GMP (Good Manufacturing Practice Quality Product)
 * 4. Kosher Certified
 * 5. HACCP (Hazard Analysis Critical Control Point)
 * 6. Halal Certified
 * 7. FDA Approved (Food and Drug Administration)
 */

export const FssaiBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/fssai-cert.webp"
    alt="FSSAI Certified - Food Safety and Standards Authority of India"
    title="FSSAI Certified"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const IsoBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/iso-cert.webp"
    alt="ISO 22000:2018 Certified Company"
    title="ISO 22000:2018 Certified Company"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const GmpBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/gmp-cert.webp"
    alt="GMP - Good Manufacturing Practice Quality Product"
    title="Good Manufacturing Practice (GMP) Quality Product"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const KosherBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/kosher-cert.webp"
    alt="Kosher Certified"
    title="Kosher Certified"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const HaccpBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/haccp-cert.webp"
    alt="HACCP - Hazard Analysis Critical Control Point"
    title="HACCP Certified"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const HalalBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/halal-cert.webp"
    alt="Halal Certified"
    title="Halal Certified"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const FdaBadge = ({ className = "h-9 w-auto" }) => (
  <img
    src="/images/certifications/fda-cert.webp"
    alt="FDA Approved - Food and Drug Administration"
    title="FDA Approved"
    className={`${className} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm select-none`}
    loading="lazy"
    draggable={false}
  />
);

export const ALL_CERTIFICATIONS = [
  { id: "fssai", component: FssaiBadge, name: "FSSAI" },
  { id: "iso", component: IsoBadge, name: "ISO 22000:2018" },
  { id: "gmp", component: GmpBadge, name: "GMP" },
  { id: "kosher", component: KosherBadge, name: "Kosher" },
  { id: "haccp", component: HaccpBadge, name: "HACCP" },
  { id: "halal", component: HalalBadge, name: "Halal" },
  { id: "fda", component: FdaBadge, name: "FDA" },
];

export default function CertificationBadges({
  className = "flex flex-row items-center gap-2 sm:gap-2.5 xl:gap-3",
  badgeSize = "h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11",
}) {
  return (
    <div className={className} aria-label="Brand Quality Certifications">
      <FssaiBadge className={`${badgeSize} w-auto`} />
      <IsoBadge className={`${badgeSize} w-auto`} />
      <GmpBadge className={`${badgeSize} w-auto`} />
      <KosherBadge className={`${badgeSize} w-auto`} />
      <HaccpBadge className={`${badgeSize} w-auto`} />
      <HalalBadge className={`${badgeSize} w-auto`} />
      <FdaBadge className={`${badgeSize} w-auto`} />
    </div>
  );
}
