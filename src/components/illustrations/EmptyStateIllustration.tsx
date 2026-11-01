import React from "react";

interface EmptyStateProps {
  className?: string;
  type?: "search" | "favorites" | "interests";
}

export const EmptyStateIllustration: React.FC<EmptyStateProps> = ({
  className = "w-44 h-44",
  type = "search",
}) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Background Soft Circle */}
      <circle cx="100" cy="100" r="90" fill="#EAF8FA" />

      {/* Ground Shadow */}
      <ellipse cx="100" cy="160" rx="65" ry="12" fill="#1B365D" fillOpacity="0.08" />

      {/* Cozy Box */}
      <path d="M45 125L60 162H140L155 125H45Z" fill="#F1E3D3" stroke="#D5BCAF" strokeWidth="2.5" />
      {/* Box flaps open */}
      <polygon points="45,125 35,95 65,115" fill="#E6D2BF" stroke="#D5BCAF" strokeWidth="2" />
      <polygon points="155,125 165,95 135,115" fill="#E6D2BF" stroke="#D5BCAF" strokeWidth="2" />

      {/* Cute Cat Peeking Out of Box */}
      {/* Cat Left Ear */}
      <polygon points="76,82 86,52 98,76" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="80,78 86,60 94,76" fill="#FECDD3" />

      {/* Cat Right Ear */}
      <polygon points="104,76 116,52 126,82" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="108,76 116,60 122,78" fill="#FECDD3" />

      {/* Cat Head */}
      <ellipse cx="101" cy="94" rx="28" ry="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />

      {/* Curious Eyes */}
      <circle cx="91" cy="92" r="5" fill="#1B365D" />
      <circle cx="111" cy="92" r="5" fill="#1B365D" />
      <circle cx="93" cy="90" r="1.5" fill="#FFFFFF" />
      <circle cx="113" cy="90" r="1.5" fill="#FFFFFF" />

      {/* Tiny Pink Nose & Mouth */}
      <polygon points="101,100 98,97 104,97" fill="#F472B6" />
      <path d="M98 101C99.5 103 101 103 101 101C101 103 102.5 103 104 101" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />

      {/* Paws Resting on Box Rim */}
      <ellipse cx="78" cy="126" rx="8" ry="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
      <ellipse cx="124" cy="126" rx="8" ry="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

      {/* Conditional Accent: Magnifying glass for search, Heart for favorites, Envelope for interests */}
      {type === "search" && (
        <g transform="translate(115, 30)">
          <circle cx="24" cy="24" r="18" fill="#FFFFFF" stroke="#005A9C" strokeWidth="3" />
          <line x1="37" y1="37" x2="52" y2="52" stroke="#005A9C" strokeWidth="4" strokeLinecap="round" />
          <path d="M21 21C21 19 23 17 25 17C27 17 28 18 28 20C28 22 25 22 25 25" stroke="#60C1E5" strokeWidth="2" strokeLinecap="round" />
          <circle cx="25" cy="28" r="1" fill="#60C1E5" />
        </g>
      )}

      {type === "favorites" && (
        <g transform="translate(120, 30)">
          <circle cx="24" cy="24" r="18" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
          <path d="M24 18C21 13 14 15 17 21C20 27 24 31 24 31C24 31 28 27 31 21C34 15 27 13 24 18Z" fill="#F43F5E" />
        </g>
      )}

      {type === "interests" && (
        <g transform="translate(118, 32)">
          <rect x="6" y="10" width="34" height="24" rx="4" fill="#005A9C" stroke="#1B365D" strokeWidth="2" />
          <path d="M6 12L23 23L40 12" stroke="#60C1E5" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="23" cy="22" r="3.5" fill="#FFFFFF" />
        </g>
      )}

      {/* Floating Sparkles */}
      <path d="M42 62L44 66L48 68L44 70L42 74L40 70L36 68L40 66Z" fill="#60C1E5" />
      <path d="M152 75L154 78L158 80L154 82L152 86L150 82L146 80L150 78Z" fill="#FBBF24" />
    </svg>
  );
};

