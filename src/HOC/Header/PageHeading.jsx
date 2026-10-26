import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * Inner page header — HealthKart style.
 * Flat white page with a breadcrumb strip, no hero imagery.
 */
const PageHeading = ({ head, title: propTitle, subtitle, breadcrumb = true }) => {
  const title = head || propTitle || "Gomzi Supplement";

  return (
    <div className="w-full border-b border-border bg-white">
      <div className="max-w-[1170px] mx-auto px-4 md:px-0 py-6">
        {breadcrumb && (
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex items-center gap-1.5 text-xs text-text-light"
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
            <span className="truncate text-text">{title}</span>
          </nav>
        )}

        <h1 className="text-2xl font-semibold tracking-tight text-text md:text-[28px]">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
