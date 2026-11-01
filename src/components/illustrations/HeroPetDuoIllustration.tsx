import React from "react";

interface HeroPetDuoProps {
  className?: string;
}

export const HeroPetDuoIllustration: React.FC<HeroPetDuoProps> = ({
  className = "w-full max-w-lg h-auto",
}) => {
  return (
    <svg
      viewBox="0 0 560 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none`}
    >
      {/* Background Arch and Soft Aura */}
      <defs>
        <linearGradient id="heroBgGlow" x1="280" y1="40" x2="280" y2="440" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A0E0EF" stopOpacity="0.45" />
          <stop stopColor="#60C1E5" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="sunGlow" x1="280" y1="50" x2="280" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFEAA7" stopOpacity="0.7" />
          <stop stopColor="#FFEAA7" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Elegant Arch Backdrop */}
      <path
        d="M90 430V240C90 135 175 50 280 50C385 50 470 135 470 240V430H90Z"
        fill="url(#heroBgGlow)"
      />

      {/* Soft Sun Circle */}
      <circle cx="280" cy="180" r="100" fill="url(#sunGlow)" />

      {/* Floating Gentle Clouds / Pastel Pods */}
      <rect x="110" y="100" width="90" height="28" rx="14" fill="#FFFFFF" fillOpacity="0.75" />
      <rect x="360" y="80" width="100" height="32" rx="16" fill="#FFFFFF" fillOpacity="0.75" />

      {/* Decorative Botanical Vines & Leaves */}
      {/* Left branch */}
      <path
        d="M75 380C65 300 85 220 115 170"
        stroke="#60C1E5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M72 320C60 315 56 300 68 296C80 292 84 310 72 320Z" fill="#A0E0EF" />
      <path d="M84 260C74 250 72 235 84 233C96 231 98 248 84 260Z" fill="#A0E0EF" />
      <path d="M102 205C94 195 96 182 107 183C118 184 116 200 102 205Z" fill="#60C1E5" />

      {/* Right branch */}
      <path
        d="M485 380C495 300 475 220 445 170"
        stroke="#60C1E5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M488 320C500 315 504 300 492 296C480 292 476 310 488 320Z" fill="#A0E0EF" />
      <path d="M476 260C486 250 488 235 476 233C464 231 462 248 476 260Z" fill="#A0E0EF" />
      <path d="M458 205C466 195 464 182 453 183C442 184 444 200 458 205Z" fill="#60C1E5" />

      {/* Soft Ground Pedestal */}
      <ellipse cx="280" cy="430" rx="200" ry="24" fill="#1B365D" fillOpacity="0.08" />

      {/* ================= CAT (LEFT CHARACTER) ================= */}
      {/* Cat Tail curled comfortably */}
      <path
        d="M170 410C130 410 115 375 125 345C130 330 145 330 145 345C145 375 160 395 180 395"
        stroke="#64748B"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Cat Body */}
      <path
        d="M170 425C150 425 145 330 180 270C205 230 240 250 245 300C250 350 250 425 170 425Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="2.5"
      />

      {/* Cat Left Ear */}
      <path
        d="M185 195L205 135L228 180Z"
        fill="#F1F5F9"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon points="194,188 205,148 220,180" fill="#FECDD3" />

      {/* Cat Right Ear */}
      <path
        d="M232 182L255 142L268 195Z"
        fill="#F1F5F9"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon points="238,183 253,152 260,190" fill="#FECDD3" />

      {/* Cat Head */}
      <ellipse
        cx="225"
        cy="210"
        rx="38"
        ry="34"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="2.5"
      />

      {/* Cat Gentle Eyes (Contented curved lines) */}
      <path
        d="M205 210C210 216 218 216 223 210"
        stroke="#1B365D"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M235 210C240 216 248 216 253 210"
        stroke="#1B365D"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cat Nose & Muzzle */}
      <polygon points="230,220 226,216 234,216" fill="#F472B6" />
      <path
        d="M226 222C228 225 230 225 230 222C230 225 232 225 234 222"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Cat Whiskers */}
      <line x1="180" y1="216" x2="208" y2="218" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="180" y1="222" x2="208" y2="221" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="252" y1="218" x2="278" y2="216" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="252" y1="221" x2="278" y2="222" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Cat Collar with Tiny Bell */}
      <rect x="210" y="240" width="30" height="7" rx="3.5" fill="#60C1E5" />
      <circle cx="225" cy="251" r="4" fill="#005A9C" />

      {/* ================= DOG (RIGHT CHARACTER) ================= */}
      {/* Dog Tail wagging upright */}
      <path
        d="M390 410C420 395 440 360 435 320C432 300 415 305 418 325C422 355 405 385 385 400"
        stroke="#D97706"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Dog Body */}
      <path
        d="M305 425C295 360 305 280 340 240C380 200 410 240 405 320C400 380 395 425 305 425Z"
        fill="#F59E0B"
        stroke="#D97706"
        strokeWidth="2.5"
      />

      {/* Dog Floppy Left Ear */}
      <path
        d="M295 190C280 205 275 235 285 245C295 255 305 230 308 200Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="2"
      />

      {/* Dog Floppy Right Ear */}
      <path
        d="M375 190C390 205 395 235 385 245C375 255 365 230 362 200Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="2"
      />

      {/* Dog Head */}
      <ellipse
        cx="335"
        cy="195"
        rx="38"
        ry="36"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="2.5"
      />

      {/* Dog Snout Muzzle */}
      <ellipse cx="335" cy="208" rx="20" ry="16" fill="#FDE68A" />
      <ellipse cx="335" cy="198" rx="7" ry="5" fill="#1E293B" />

      {/* Dog Happy Friendly Eyes */}
      <circle cx="318" cy="186" r="4.5" fill="#1E293B" />
      <circle cx="352" cy="186" r="4.5" fill="#1E293B" />
      <circle cx="320" cy="184" r="1.5" fill="#FFFFFF" />
      <circle cx="354" cy="184" r="1.5" fill="#FFFFFF" />

      {/* Dog Smile & Tongue */}
      <path
        d="M328 210C332 216 338 216 342 210"
        stroke="#1E293B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M331 213C331 222 339 222 339 213Z"
        fill="#F43F5E"
      />

      {/* Dog Bandana Collar */}
      <polygon points="315,228 355,228 335,248" fill="#1B365D" />
      <circle cx="335" cy="235" r="2.5" fill="#A0E0EF" />

      {/* ================= CONNECTING SYMBOLISM ================= */}
      {/* Floating Central Heart of Connection */}
      <g className="animate-bounce" style={{ animationDuration: "3s" }}>
        <path
          d="M280 135C272 120 252 124 260 144C268 160 280 172 280 172C280 172 292 160 300 144C308 124 288 120 280 135Z"
          fill="#005A9C"
        />
        <circle cx="274" cy="132" r="2" fill="#A0E0EF" />
      </g>

      {/* Romantic / Friendly Floating Sparkles */}
      <path
        d="M245 105L248 113L256 116L248 119L245 127L242 119L234 116L242 113Z"
        fill="#60C1E5"
      />
      <path
        d="M325 100L327 106L333 108L327 110L325 116L323 110L317 108L323 106Z"
        fill="#FFEAA7"
      />

      {/* Gentle Floating Paws */}
      <g opacity="0.65" transform="translate(140, 270)">
        <ellipse cx="10" cy="14" rx="4" ry="5" fill="#A0E0EF" />
        <circle cx="4" cy="5" r="2" fill="#A0E0EF" />
        <circle cx="10" cy="3" r="2" fill="#A0E0EF" />
        <circle cx="16" cy="5" r="2" fill="#A0E0EF" />
      </g>
      <g opacity="0.65" transform="translate(400, 260)">
        <ellipse cx="10" cy="14" rx="4" ry="5" fill="#60C1E5" />
        <circle cx="4" cy="5" r="2" fill="#60C1E5" />
        <circle cx="10" cy="3" r="2" fill="#60C1E5" />
        <circle cx="16" cy="5" r="2" fill="#60C1E5" />
      </g>
    </svg>
  );
};

