import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * HealthKart-style carousel arrows.
 *
 * variant "inline"  - white circular button with a thin border (section headers)
 * variant "overlay" - white circular button floating over an image (hero)
 */
export default function CarouselControls({
  onPrev,
  onNext,
  showPrev = true,
  showNext = true,
  className = "",
}) {
  const buttonClass =
    "h-10 w-10 inline-flex items-center justify-center rounded-full border border-white bg-white shadow-[0_3px_6px_rgba(0,0,0,.161)] transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          disabled={!onPrev}
          aria-label="Previous"
          className={buttonClass}
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
      )}
      {showNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={!onNext}
          aria-label="Next"
          className={buttonClass}
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      )}
    </div>
  );
}
