import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Category range card.
 *
 * image -> badge -> title + count -> description -> divider -> Explore Range
 *
 * Fixed 280px width so every card in a row is identical. The body is a
 * flex column with the CTA pinned to the bottom via `mt-auto`, so the
 * "Explore Range" row lines up across all cards regardless of how many
 * lines the title or description take.
 *
 * Works as a router Link when `to` is given, otherwise as a plain button
 * driven by `onClick`.
 */
export default function CategoryRangeCard({
  title,
  subtitle,
  image,
  badge,
  count,
  to,
  onClick,
  className = "",
}) {
  const shell = `group flex h-full ${
    className.includes("w-") ? "" : "w-full"
  } flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-white text-left transition-all duration-300 hover:border-primary hover:shadow-md`;

  const body = (
    <>
      {/* Image plate — responsive height with smooth multiply blend */}
      <div className="relative flex h-[145px] xs:h-[165px] sm:h-[200px] md:h-[220px] w-full shrink-0 items-center justify-center bg-bg-light p-2.5 sm:p-4">
        <img
          src={image || "/images/product-placeholder.webp"}
          alt={title}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ mixBlendMode: "multiply" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/product-placeholder.webp";
          }}
        />
        {badge && (
          <span className="absolute left-2 top-2 sm:left-3 sm:top-3 inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-2 py-0.5 sm:px-3 sm:py-1.5 text-[9px] sm:text-[11px] font-bold uppercase tracking-wide text-text shadow-xs border border-border/40">
            <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-primary" />
            {badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Title + count: flexible stack on mobile, horizontal on tablet/desktop */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-2 min-h-[38px] sm:min-h-[56px]">
          <h3 className="line-clamp-2 min-w-0 text-xs sm:text-base md:text-lg font-bold leading-tight sm:leading-snug text-text group-hover:text-primary transition-colors">
            {title}
          </h3>
          {count > 0 && (
            <span className="shrink-0 text-[10px] sm:text-xs md:text-sm font-medium text-text-light">
              {count} {count === 1 ? "Product" : "Products"}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1 line-clamp-2 text-[11px] sm:text-xs md:text-sm leading-relaxed text-text-light font-normal">
            {subtitle}
          </p>
        )}

        {/* CTA pinned to the bottom of every card */}
        <div className="mt-auto pt-2.5 sm:pt-4">
          <div className="divider mb-2.5 sm:mb-4" />
          <span className="inline-flex items-center justify-between sm:justify-start w-full gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-semibold text-primary">
            <span>Explore Range</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${shell} ${className}`}>
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${shell} cursor-pointer ${className}`}
    >
      {body}
    </button>
  );
}
