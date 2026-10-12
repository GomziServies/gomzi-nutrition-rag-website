import { useState, useRef } from "react";

export default function ZoomImage({
  src,
  alt = "",
  zoomScale = 2.5,
  className = "",
}) {
  const [isZooming, setIsZooming] = useState(false);
  const [bgPos, setBgPos] = useState("center");
  const [showFullscreen, setShowFullscreen] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBgPos(`${x}% ${y}%`);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative overflow-hidden cursor-zoom-in ${className}`}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setShowFullscreen(true)} // tap-to-zoom on mobile
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain transition-opacity duration-150 select-none ${
            isZooming ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />
        {isZooming && (
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoomScale * 100}%`,
              backgroundPosition: bgPos,
            }}
          />
        )}
      </div>

      {showFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl w-9 h-9 flex items-center justify-center bg-white/10 rounded-full"
            onClick={() => setShowFullscreen(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
