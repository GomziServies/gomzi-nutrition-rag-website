// ─────────────────────────────────────────────
//  WavyImageUnderline - Reusable Component
//
//  Usage:
//  <WavyImageUnderline>Season favorites you'll love</WavyImageUnderline>
//
//  Props:
//  - children      : text jo underline karvo chhe (required)
//  - image         : PNG path (default: "/images/nara-text-curve.webp")
//  - height        : line ni height in px (default: 12)
//  - bottomOffset  : niche thi gap in px (default: -4)
//  - className     : extra classes for the outer span (optional)
// ─────────────────────────────────────────────

export default function WavyImageUnderline({
  children,
  image = "/images/nara-text-curve.webp",
  height = 15,
  bottomOffset = 11,
  className = "",
}) {
  return (
    <span className={`relative inline-block pb-5 ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="absolute left-0 w-full"
        style={{
          bottom: `${bottomOffset}px`,
          height: `${height}px`,
          backgroundImage: `url('${image}')`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "28px 100%",
        }}
      />
    </span>
  );
}
