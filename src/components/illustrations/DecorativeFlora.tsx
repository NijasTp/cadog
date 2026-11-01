import React from "react";

interface FloraProps {
  className?: string;
  variant?: "branch" | "sparkles" | "organic-blob";
}

export const DecorativeFlora: React.FC<FloraProps> = ({
  className = "w-16 h-16",
  variant = "branch",
}) => {
  if (variant === "sparkles") {
    return (
      <svg viewBox="0 0 80 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M40 10L43 25L58 28L43 31L40 46L37 31L22 28L37 25Z" fill="#60C1E5" fillOpacity="0.8" />
        <path d="M60 48L62 55L69 57L62 59L60 66L58 59L51 57L58 55Z" fill="#A0E0EF" fillOpacity="0.8" />
        <circle cx="24" cy="58" r="3" fill="#FFEAA7" />
        <circle cx="56" cy="18" r="2" fill="#60C1E5" />
      </svg>
    );
  }

  if (variant === "organic-blob") {
    return (
      <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M45 130C25 80 60 30 115 35C170 40 185 95 165 145C145 195 65 180 45 130Z"
          fill="#A0E0EF"
          fillOpacity="0.25"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 85C30 55 50 35 85 20"
        stroke="#60C1E5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M35 62C26 58 24 48 33 46C42 44 44 56 35 62Z" fill="#A0E0EF" />
      <path d="M52 46C44 40 43 30 52 30C61 30 61 40 52 46Z" fill="#A0E0EF" />
      <path d="M70 32C64 24 68 16 76 18C84 20 80 28 70 32Z" fill="#60C1E5" />
      <circle cx="28" cy="74" r="3" fill="#FFEAA7" />
    </svg>
  );
};

