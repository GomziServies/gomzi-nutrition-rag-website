// src/component/common/ScallopedCrestFrame.jsx
import { useId } from "react";

/**
 * Custom Cusped Ornamental Frame matching the reference design in Gomzi brand colors.
 * Features an authentic ambient Halo drop-shadow and luminous inner radial glow.
 */
export default function ScallopedCrestFrame({ className = "", halo = true }) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 160 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full transition-[filter,transform] duration-300 ${
        halo
          ? "drop-shadow-[0_4px_10px_rgba(42,23,17,0.16)] drop-shadow-[0_1px_3px_rgba(42,23,17,0.10)] group-hover:drop-shadow-[0_8px_22px_rgba(149,68,44,0.26)]"
          : "drop-shadow-sm"
      } ${className}`.trim()}
    >
      <defs>
        {/* Luminous Gomzi central halo radial gradient matching reference image */}
        <radialGradient id={gradientId} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#fdf5ef" />
          <stop offset="100%" stopColor="#f5ddd1" />
        </radialGradient>
      </defs>

      {/* Outer Contoured Stepped Arch (Mughal / Moroccan Cusped Arch) */}
      <path
        d="M 80,6
           C 88,12 98,16 108,16
           C 116,16 120,20 120,28
           C 120,34 124,38 132,38
           C 144,38 152,48 152,60
           L 152,116
           C 152,128 144,138 132,138
           C 124,138 120,142 120,148
           C 120,156 116,160 108,160
           C 98,160 88,164 80,170
           C 72,164 62,160 52,160
           C 44,160 40,156 40,148
           C 40,142 36,138 28,138
           C 16,138 8,128 8,116
           L 8,60
           C 8,48 16,38 28,38
           C 36,38 40,34 40,28
           C 40,20 44,16 52,16
           C 62,16 72,12 80,6 Z"
        fill={`url(#${gradientId})`}
        stroke="var(--color-primary)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Inner Accent Line Contour (Adds high-end depth matching reference) */}
      <path
        d="M 80,12
           C 87,17 96,20 106,20
           C 112,20 115,23 115,29
           C 115,34 119,38 126,38
           C 138,38 145,47 145,58
           L 145,118
           C 145,129 138,138 126,138
           C 119,138 115,142 115,147
           C 115,153 112,156 106,156
           C 96,156 87,159 80,164
           C 73,159 64,156 54,156
           C 48,156 45,153 45,147
           C 45,142 41,138 34,138
           C 22,138 15,129 15,118
           L 15,58
           C 15,47 22,38 34,38
           C 41,38 45,34 45,29
           C 45,23 48,20 54,20
           C 64,20 73,17 80,12 Z"
        fill="none"
        stroke="#dfb5a6"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.85"
      />
    </svg>
  );
}
