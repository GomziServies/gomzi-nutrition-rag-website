import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/**
 * Single-line horizontal marquee.
 * Strictly maintains a single row using flex-nowrap and w-max.
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
          className="marquee-track flex w-max flex-nowrap items-center"
          style={{
            display: "flex",
            width: "max-content",
            flexWrap: "nowrap",
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <div className="flex shrink-0 items-center">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default Marquee;
