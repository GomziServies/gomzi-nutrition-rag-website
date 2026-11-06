import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/**
 * Infinite horizontal marquee.
 *
 * Renders its children twice and animates the track by -50%, so the loop is
 * seamless. Pauses on hover. Exposes `scroll(dir)` so external chevrons can
 * nudge the rail.
 */
const Marquee = forwardRef(function Marquee(
  { children, duration = 40, reverse = false, className = "" },
  ref
) {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scroll(dir) {
      const track = trackRef.current;
      if (!track) return;
      const step = (track.scrollWidth || 0) / 2 || 240;
      setOffset((v) => {
        const next = v + dir * step;
        // wrap back into a single step range so the offset never drifts
        if (next <= -step) return next + step;
        if (next >= 0) return next - step;
        return next;
      });
    },
  }));

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          transform: `translateX(${offset}px)`,
          transition: "transform .45s ease",
        }}
      >
        <div
          ref={trackRef}
          className="marquee-track"
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <div className="flex shrink-0 items-stretch">{children}</div>
          <div className="flex shrink-0 items-stretch" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Marquee;
