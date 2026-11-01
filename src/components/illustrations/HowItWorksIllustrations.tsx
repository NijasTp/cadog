import React from "react";

interface StepSvgProps {
  className?: string;
}

// Step 1: Create Your Pet Profile (Editorial card with pet portrait, paw stamp, and pencil)
export const StepProfileIllustration: React.FC<StepSvgProps> = ({
  className = "w-28 h-28",
}) => (
  <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Soft aura base */}
    <circle cx="80" cy="80" r="72" fill="#EAF8FA" />
    
    {/* Main ID profile card */}
    <rect x="36" y="28" width="88" height="104" rx="14" fill="#FFFFFF" stroke="#CFE2EC" strokeWidth="2.5" />
    <rect x="44" y="36" width="72" height="10" rx="5" fill="#1B365D" />

    {/* Pet photo frame */}
    <rect x="46" y="54" width="38" height="38" rx="8" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" />
    {/* Minimal Cat silhouette in frame */}
    <polygon points="54,64 60,74 50,73" fill="#EA580C" />
    <polygon points="72,64 74,73 66,74" fill="#EA580C" />
    <circle cx="63" cy="74" r="10" fill="#F97316" />
    <circle cx="60" cy="73" r="1.5" fill="#FFFFFF" />
    <circle cx="66" cy="73" r="1.5" fill="#FFFFFF" />

    {/* Text lines */}
    <rect x="90" y="56" width="26" height="5" rx="2.5" fill="#60C1E5" />
    <rect x="90" y="66" width="22" height="4" rx="2" fill="#CBD5E1" />
    <rect x="90" y="74" width="24" height="4" rx="2" fill="#CBD5E1" />
    <rect x="90" y="82" width="18" height="4" rx="2" fill="#CBD5E1" />

    {/* Verification badge / stamp */}
    <circle cx="58" cy="110" r="11" fill="#A0E0EF" />
    <path d="M54 110L57 113L63 107" stroke="#005A9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Paw stamp accent */}
    <ellipse cx="102" cy="110" rx="4" ry="5" fill="#60C1E5" opacity="0.8" />
    <circle cx="97" cy="103" r="1.8" fill="#60C1E5" opacity="0.8" />
    <circle cx="102" cy="101" r="1.8" fill="#60C1E5" opacity="0.8" />
    <circle cx="107" cy="103" r="1.8" fill="#60C1E5" opacity="0.8" />

    {/* Stylized pencil */}
    <g transform="rotate(45 125 45)">
      <rect x="116" y="32" width="10" height="34" rx="2" fill="#005A9C" />
      <polygon points="116,66 126,66 121,76" fill="#FBBF24" />
      <polygon points="119,72 123,72 121,76" fill="#1E293B" />
      <rect x="116" y="28" width="10" height="6" rx="1" fill="#F472B6" />
    </g>
  </svg>
);

// Step 2: Discover Compatible Companions (Magnifying glass finding compatible match scores)
export const StepDiscoverIllustration: React.FC<StepSvgProps> = ({
  className = "w-28 h-28",
}) => (
  <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="72" fill="#EAF8FA" />

    {/* Left background pet card */}
    <rect x="25" y="45" width="55" height="70" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    <circle cx="52" cy="65" r="14" fill="#EFF6FF" />
    {/* Cat silhouette */}
    <polygon points="45,56 50,65 42,65" fill="#3B82F6" />
    <polygon points="59,56 62,65 54,65" fill="#3B82F6" />
    <circle cx="52" cy="67" r="8" fill="#60A5FA" />
    <rect x="36" y="88" width="32" height="4" rx="2" fill="#CBD5E1" />
    <rect x="42" y="96" width="20" height="4" rx="2" fill="#E2E8F0" />

    {/* Right background pet card */}
    <rect x="80" y="45" width="55" height="70" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
    <circle cx="107" cy="65" r="14" fill="#FEF3C7" />
    {/* Dog silhouette */}
    <ellipse cx="107" cy="67" rx="8" ry="7" fill="#F59E0B" />
    <path d="M99 64C97 70 99 76 102 75Z" fill="#D97706" />
    <path d="M115 64C117 70 115 76 112 75Z" fill="#D97706" />
    <rect x="91" y="88" width="32" height="4" rx="2" fill="#CBD5E1" />
    <rect x="97" y="96" width="20" height="4" rx="2" fill="#E2E8F0" />

    {/* Magnifying Glass with 98% Compatibility Badge */}
    <circle cx="80" cy="74" r="34" fill="#FFFFFF" fillOpacity="0.85" stroke="#1B365D" strokeWidth="3" />
    <line x1="104" y1="98" x2="135" y2="129" stroke="#1B365D" strokeWidth="6" strokeLinecap="round" />
    <line x1="104" y1="98" x2="114" y2="108" stroke="#60C1E5" strokeWidth="4" strokeLinecap="round" />

    {/* Heart Match inside lens */}
    <path d="M80 62C76 56 68 58 72 66C76 72 80 77 80 77C80 77 84 72 88 66C92 58 84 56 80 62Z" fill="#005A9C" />
    
    {/* 98% Match pill */}
    <rect x="62" y="82" width="36" height="14" rx="7" fill="#60C1E5" />
    <text x="80" y="92" textAnchor="middle" fill="#1B365D" fontSize="9" fontWeight="bold" fontFamily="sans-serif">98%</text>
  </svg>
);

// Step 3: Express Interest (Elegantly sealed romantic letter with heart seal and sparkles)
export const StepInterestIllustration: React.FC<StepSvgProps> = ({
  className = "w-28 h-28",
}) => (
  <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="72" fill="#EAF8FA" />

    {/* Letter paper coming out */}
    <rect x="48" y="32" width="64" height="60" rx="8" fill="#FFFFFF" stroke="#CFE2EC" strokeWidth="2" />
    <rect x="58" y="44" width="44" height="4" rx="2" fill="#A0E0EF" />
    <rect x="58" y="54" width="36" height="3" rx="1.5" fill="#CBD5E1" />
    <rect x="58" y="62" width="40" height="3" rx="1.5" fill="#CBD5E1" />

    {/* Envelope Body */}
    <rect x="34" y="60" width="92" height="62" rx="12" fill="#005A9C" />
    <path d="M34 64L80 96L126 64" stroke="#60C1E5" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M36 120L68 90" stroke="#1B365D" strokeWidth="2" strokeLinecap="round" />
    <path d="M124 120L92 90" stroke="#1B365D" strokeWidth="2" strokeLinecap="round" />

    {/* Central Heart Seal */}
    <circle cx="80" cy="94" r="16" fill="#FFFFFF" stroke="#A0E0EF" strokeWidth="2" />
    <path d="M80 88C77 83 71 85 74 91C77 96 80 100 80 100C80 100 83 96 86 91C89 85 83 83 80 88Z" fill="#F43F5E" />

    {/* Floating sparkles */}
    <path d="M30 45L32 50L37 52L32 54L30 59L28 54L23 52L28 50Z" fill="#FBBF24" />
    <path d="M128 36L130 41L135 43L130 45L128 50L126 45L121 43L126 41Z" fill="#60C1E5" />
    <circle cx="120" cy="130" r="3" fill="#A0E0EF" />
    <circle cx="38" cy="132" r="3" fill="#60C1E5" />
  </svg>
);

// Step 4: Connect with Pet Owners (Two owners happily greeting in park with pets playdate)
export const StepConnectIllustration: React.FC<StepSvgProps> = ({
  className = "w-28 h-28",
}) => (
  <svg viewBox="0 0 160 160" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="72" fill="#EAF8FA" />

    {/* Park green grass mound */}
    <ellipse cx="80" cy="136" rx="60" ry="14" fill="#BBF7D0" />

    {/* Left Owner silhouette */}
    <circle cx="50" cy="54" r="10" fill="#1B365D" />
    <path d="M38 95C38 74 42 70 50 70C58 70 62 74 62 95Z" fill="#1B365D" />
    {/* Left Owner arm holding coffee */}
    <path d="M60 76C68 76 72 82 72 86" stroke="#1B365D" strokeWidth="3" strokeLinecap="round" />
    <rect x="70" y="84" width="7" height="9" rx="2" fill="#005A9C" />

    {/* Right Owner silhouette */}
    <circle cx="110" cy="54" r="10" fill="#005A9C" />
    <path d="M98 95C98 74 102 70 110 70C118 70 122 74 122 95Z" fill="#005A9C" />
    {/* Right Owner arm */}
    <path d="M100 76C92 76 88 82 88 86" stroke="#005A9C" strokeWidth="3" strokeLinecap="round" />
    <rect x="83" y="84" width="7" height="9" rx="2" fill="#60C1E5" />

    {/* Chat bubble above owners */}
    <rect x="62" y="24" width="36" height="22" rx="11" fill="#FFFFFF" stroke="#A0E0EF" strokeWidth="2" />
    <polygon points="80,46 76,52 84,46" fill="#FFFFFF" />
    <circle cx="72" cy="35" r="2" fill="#1B365D" />
    <circle cx="80" cy="35" r="2" fill="#005A9C" />
    <circle cx="88" cy="35" r="2" fill="#60C1E5" />

    {/* Happy pets playing below */}
    {/* Little cat */}
    <polygon points="44,116 48,124 41,123" fill="#64748B" />
    <polygon points="56,116 58,123 52,124" fill="#64748B" />
    <ellipse cx="50" cy="126" rx="8" ry="7" fill="#94A3B8" />

    {/* Little dog */}
    <ellipse cx="108" cy="126" rx="9" ry="8" fill="#F59E0B" />
    <path d="M115 120C118 124 117 129 114 128Z" fill="#D97706" />
    <circle cx="105" cy="124" r="1.5" fill="#1E293B" />

    {/* Little connection heart between pets */}
    <path d="M80 122C78 119 75 120 76 123C78 126 80 128 80 128C80 128 82 126 84 123C85 120 82 119 80 122Z" fill="#F43F5E" />
  </svg>
);

