import React from "react";
import Link from "next/link";

interface CagodLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export const CagodLogo: React.FC<CagodLogoProps> = ({
  className = "",
  showTagline = true,
  size = "md",
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky rounded-lg ${className}`}
      aria-label="Cagod Matrimony Home"
    >
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        {/* Custom SVG Logo: Intertwined Cat and Dog silhouette with heart shape */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform group-hover:scale-105 duration-300"
        >
          {/* Background circular badge */}
          <rect
            width="48"
            height="48"
            rx="14"
            fill="#1B365D"
            className="transition-colors group-hover:fill-[#005A9C]"
          />
          {/* Subtle soft gradient glow */}
          <circle cx="24" cy="24" r="18" fill="#60C1E5" fillOpacity="0.2" />

          {/* Stylized Cat (Left) */}
          <path
            d="M13 32V25C13 22 15 20 18 20C20 20 21.5 21 22.5 22.5"
            stroke="#A0E0EF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Cat Ear */}
          <path
            d="M14 21L17 14L20 20"
            stroke="#A0E0EF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cat Eye dot */}
          <circle cx="18" cy="23" r="1" fill="#FFFFFF" />

          {/* Stylized Dog (Right) */}
          <path
            d="M35 32V24C35 20.5 32.5 18 29 18C26.5 18 24.8 19.5 24 21.5"
            stroke="#60C1E5"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Floppy Dog Ear */}
          <path
            d="M34 19C35.5 21 36 24 34 26"
            stroke="#60C1E5"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Dog Eye dot */}
          <circle cx="29" cy="22" r="1" fill="#FFFFFF" />

          {/* Central Heart Sparkle */}
          <path
            d="M24 16C23 14 20.5 14.5 21.5 17C22.5 19 24 20.5 24 20.5C24 20.5 25.5 19 26.5 17C27.5 14.5 25 14 24 16Z"
            fill="#A0E0EF"
          />

          {/* Connecting Paw Bridge */}
          <circle cx="24" cy="30" r="2.5" fill="#FFFFFF" />
          <circle cx="21" cy="27" r="1.2" fill="#FFFFFF" />
          <circle cx="27" cy="27" r="1.2" fill="#FFFFFF" />
          <circle cx="24" cy="25" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <span
          className={`font-heading font-extrabold tracking-tight text-brand-navy dark:text-white ${textSizes[size]}`}
        >
          CAGOD
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase font-semibold tracking-widest text-brand-deep dark:text-brand-sky">
            Pet Matrimony
          </span>
        )}
      </div>
    </Link>
  );
};

