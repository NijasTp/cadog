import React from "react";

export interface PetAvatarProps {
  avatarId?: string;
  species?: "cat" | "dog";
  className?: string;
  size?: number | string;
}

export const PetAvatar: React.FC<PetAvatarProps> = ({
  avatarId = "cat-persian-white",
  species = "cat",
  className = "w-16 h-16",
}) => {
  // SVG 2D Flat Vector Illustration Engine
  switch (avatarId) {
    case "cat-persian-white":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          <path d="M28 26L38 42L22 40L28 26Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" strokeLinejoin="round" />
          <path d="M72 26L78 40L62 42L72 26Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" strokeLinejoin="round" />
          <path d="M27 30L34 38L24 37L27 30Z" fill="#FECDD3" />
          <path d="M73 30L76 37L66 38L73 30Z" fill="#FECDD3" />
          <ellipse cx="50" cy="58" rx="34" ry="28" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="37" cy="54" r="4.5" fill="#1B365D" />
          <circle cx="63" cy="54" r="4.5" fill="#1B365D" />
          <circle cx="38.5" cy="52.5" r="1.5" fill="#FFFFFF" />
          <circle cx="64.5" cy="52.5" r="1.5" fill="#FFFFFF" />
          <polygon points="50,62 46,58 54,58" fill="#F472B6" />
          <path d="M46 62C48 65 50 65 50 62C50 65 52 65 54 62" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="58" x2="32" y2="59" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="63" x2="32" y2="62" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="58" x2="68" y2="59" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="63" x2="68" y2="62" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="42" y="80" width="16" height="5" rx="2.5" fill="#60C1E5" />
          <circle cx="50" cy="86" r="3" fill="#005A9C" />
        </svg>
      );

    case "cat-siamese":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
          <polygon points="22,18 36,38 18,34" fill="#3E2723" stroke="#2B1A17" strokeWidth="1.5" />
          <polygon points="78,18 82,34 64,38" fill="#3E2723" stroke="#2B1A17" strokeWidth="1.5" />
          <ellipse cx="50" cy="56" rx="30" ry="28" fill="#FDFBF7" stroke="#D7CCC8" strokeWidth="1.5" />
          <ellipse cx="50" cy="62" rx="19" ry="16" fill="#4E342E" />
          <ellipse cx="37" cy="52" rx="4.5" ry="3.5" fill="#0284C7" />
          <ellipse cx="63" cy="52" rx="4.5" ry="3.5" fill="#0284C7" />
          <circle cx="36" cy="51" r="1.2" fill="#FFFFFF" />
          <circle cx="62" cy="51" r="1.2" fill="#FFFFFF" />
          <polygon points="50,62 47,59 53,59" fill="#2E1C14" />
          <path d="M47 64C48.5 66 50 66 50 64C50 66 51.5 66 53 64" stroke="#D7CCC8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="60" x2="34" y2="61" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="65" x2="34" y2="64" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="60" x2="66" y2="61" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="78" y1="65" x2="66" y2="64" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="40" y="78" width="20" height="4" rx="2" fill="#1B365D" />
          <circle cx="50" cy="83" r="3" fill="#A0E0EF" />
        </svg>
      );

    case "cat-ginger-tabby":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="2" />
          <polygon points="24,20 38,38 20,36" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
          <polygon points="76,20 80,36 62,38" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
          <polygon points="25,24 33,34 22,33" fill="#FECDD3" />
          <polygon points="75,24 78,33 67,34" fill="#FECDD3" />
          <ellipse cx="50" cy="57" rx="32" ry="28" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
          {/* Tabby stripes */}
          <path d="M50 32L50 42" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <path d="M44 34L46 41" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <path d="M56 34L54 41" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          {/* Cheeks / Muzzle */}
          <ellipse cx="50" cy="67" rx="16" ry="12" fill="#FFEDD5" />
          <circle cx="36" cy="53" r="4.5" fill="#15803D" />
          <circle cx="64" cy="53" r="4.5" fill="#15803D" />
          <circle cx="37.5" cy="51.5" r="1.5" fill="#FFFFFF" />
          <circle cx="65.5" cy="51.5" r="1.5" fill="#FFFFFF" />
          <polygon points="50,63 47,60 53,60" fill="#F43F5E" />
          <path d="M47 64C48.5 67 50 67 50 64C50 67 51.5 67 53 64" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="62" x2="33" y2="63" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="67" x2="33" y2="66" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="62" x2="67" y2="63" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="67" x2="67" y2="66" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="41" y="80" width="18" height="4" rx="2" fill="#005A9C" />
          <circle cx="50" cy="85" r="2.5" fill="#FDE047" />
        </svg>
      );

    case "cat-british-shorthair":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M26 24L38 38L22 38Z" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
          <path d="M74 24L78 38L62 38Z" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
          <ellipse cx="50" cy="58" rx="34" ry="30" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5" />
          {/* Round chubby cheeks */}
          <circle cx="34" cy="64" r="14" fill="#94A3B8" />
          <circle cx="66" cy="64" r="14" fill="#94A3B8" />
          <circle cx="36" cy="53" r="5" fill="#D97706" />
          <circle cx="64" cy="53" r="5" fill="#D97706" />
          <circle cx="36" cy="53" r="2.5" fill="#1E293B" />
          <circle cx="64" cy="53" r="2.5" fill="#1E293B" />
          <circle cx="37" cy="51.5" r="1.2" fill="#FFFFFF" />
          <circle cx="65" cy="51.5" r="1.2" fill="#FFFFFF" />
          <polygon points="50,62 47,59 53,59" fill="#475569" />
          <path d="M47 63C48.5 66 50 66 50 63C50 66 51.5 66 53 63" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="62" x2="31" y2="63" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="67" x2="31" y2="66" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="62" x2="69" y2="63" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="67" x2="69" y2="66" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="42" y="82" width="16" height="4" rx="2" fill="#1B365D" />
          <circle cx="50" cy="87" r="3" fill="#60C1E5" />
        </svg>
      );

    case "cat-calico":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
          <polygon points="24,20 38,36 20,34" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          <polygon points="76,20 80,34 62,36" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
          <ellipse cx="50" cy="57" rx="32" ry="28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Calico patches */}
          <path d="M22 45C26 38 42 36 40 50C38 60 22 58 22 45Z" fill="#334155" />
          <path d="M78 45C74 38 60 40 64 52C66 60 80 56 78 45Z" fill="#F97316" />
          <circle cx="36" cy="53" r="4.5" fill="#15803D" />
          <circle cx="64" cy="53" r="4.5" fill="#15803D" />
          <circle cx="37.5" cy="51.5" r="1.5" fill="#FFFFFF" />
          <circle cx="65.5" cy="51.5" r="1.5" fill="#FFFFFF" />
          <polygon points="50,62 47,59 53,59" fill="#FB7185" />
          <path d="M47 63C48.5 66 50 66 50 63C50 66 51.5 66 53 63" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="41" y="80" width="18" height="4" rx="2" fill="#60C1E5" />
          <circle cx="50" cy="85" r="2.5" fill="#005A9C" />
        </svg>
      );

    case "cat-black-tuxedo":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <polygon points="24,20 38,36 20,34" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
          <polygon points="76,20 80,34 62,36" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
          <ellipse cx="50" cy="57" rx="32" ry="28" fill="#1E293B" />
          {/* White chest bib */}
          <polygon points="50,62 38,84 62,84" fill="#FFFFFF" />
          <circle cx="36" cy="52" r="4.5" fill="#EAB308" />
          <circle cx="64" cy="52" r="4.5" fill="#EAB308" />
          <circle cx="36" cy="52" r="2" fill="#0F172A" />
          <circle cx="64" cy="52" r="2" fill="#0F172A" />
          <circle cx="37" cy="51" r="1" fill="#FFFFFF" />
          <circle cx="65" cy="51" r="1" fill="#FFFFFF" />
          <polygon points="50,62 47,59 53,59" fill="#FDA4AF" />
          <path d="M47 63C48.5 66 50 66 50 63C50 66 51.5 66 53 63" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="20" y1="60" x2="33" y2="61" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="65" x2="33" y2="64" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="60" x2="67" y2="61" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="80" y1="65" x2="67" y2="64" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          {/* Red bowtie */}
          <polygon points="50,78 44,74 44,82" fill="#EF4444" />
          <polygon points="50,78 56,74 56,82" fill="#EF4444" />
          <circle cx="50" cy="78" r="2" fill="#B91C1C" />
        </svg>
      );

    case "cat-maine-coon":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          {/* Big tufted ears */}
          <path d="M22 14L38 36L18 36Z" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <path d="M78 14L82 36L62 36Z" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          {/* Lynx ear tufts */}
          <line x1="22" y1="14" x2="20" y2="6" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          <line x1="78" y1="14" x2="80" y2="6" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          {/* Fluffy mane */}
          <ellipse cx="50" cy="64" rx="36" ry="24" fill="#B45309" />
          <ellipse cx="50" cy="56" rx="30" ry="26" fill="#D97706" />
          <circle cx="36" cy="52" r="4.5" fill="#EAB308" />
          <circle cx="64" cy="52" r="4.5" fill="#EAB308" />
          <circle cx="37.5" cy="51" r="1.5" fill="#FFFFFF" />
          <circle cx="65.5" cy="51" r="1.5" fill="#FFFFFF" />
          <polygon points="50,62 47,59 53,59" fill="#991B1B" />
          <path d="M47 63C48.5 66 50 66 50 63C50 66 51.5 66 53 63" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="40" y="82" width="20" height="4" rx="2" fill="#005A9C" />
          <circle cx="50" cy="87" r="3" fill="#A0E0EF" />
        </svg>
      );

    case "cat-russian-blue":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="2" />
          <polygon points="26,18 40,36 22,34" fill="#475569" stroke="#334155" strokeWidth="1.5" />
          <polygon points="74,18 78,34 60,36" fill="#475569" stroke="#334155" strokeWidth="1.5" />
          <polygon points="28,22 36,32 25,31" fill="#FDA4AF" />
          <polygon points="72,22 75,31 64,32" fill="#FDA4AF" />
          <ellipse cx="50" cy="57" rx="30" ry="27" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
          <circle cx="37" cy="52" r="4.5" fill="#10B981" />
          <circle cx="63" cy="52" r="4.5" fill="#10B981" />
          <circle cx="38.5" cy="51" r="1.5" fill="#FFFFFF" />
          <circle cx="64.5" cy="51" r="1.5" fill="#FFFFFF" />
          <polygon points="50,61 47,58 53,58" fill="#334155" />
          {/* Smiling mouth */}
          <path d="M46 62C48 65 50 65 50 62C50 65 52 65 54 62" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="42" y="80" width="16" height="4" rx="2" fill="#1B365D" />
          <circle cx="50" cy="85" r="2.5" fill="#60C1E5" />
        </svg>
      );

    // DOG AVATARS
    case "dog-golden-retriever":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
          {/* Floppy golden ears */}
          <path d="M18 36C14 48 18 64 26 62C30 60 28 42 26 36Z" fill="#D97706" />
          <path d="M82 36C86 48 82 64 74 62C70 60 72 42 74 36Z" fill="#D97706" />
          <ellipse cx="50" cy="55" rx="30" ry="28" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          {/* Snout */}
          <ellipse cx="50" cy="65" rx="16" ry="14" fill="#FDE68A" />
          <ellipse cx="50" cy="58" rx="6" ry="4" fill="#1E293B" />
          <circle cx="36" cy="48" r="4" fill="#1E293B" />
          <circle cx="64" cy="48" r="4" fill="#1E293B" />
          <circle cx="37.5" cy="46.5" r="1.5" fill="#FFFFFF" />
          <circle cx="65.5" cy="46.5" r="1.5" fill="#FFFFFF" />
          {/* Happy tongue */}
          <path d="M47 65C48 71 52 71 53 65" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M48 68C48 74 52 74 52 68Z" fill="#F43F5E" />
          <rect x="40" y="80" width="20" height="5" rx="2.5" fill="#005A9C" />
          <circle cx="50" cy="86" r="3" fill="#60C1E5" />
        </svg>
      );

    case "dog-french-bulldog":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          {/* Tall Bat Ears */}
          <ellipse cx="28" cy="25" rx="9" ry="18" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
          <ellipse cx="72" cy="25" rx="9" ry="18" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
          <ellipse cx="28" cy="26" rx="5" ry="12" fill="#FECDD3" />
          <ellipse cx="72" cy="26" rx="5" ry="12" fill="#FECDD3" />
          {/* Square cute face */}
          <rect x="22" y="38" width="56" height="42" rx="18" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="37" cy="54" r="5" fill="#1E293B" />
          <circle cx="63" cy="54" r="5" fill="#1E293B" />
          <circle cx="38" cy="52.5" r="1.5" fill="#FFFFFF" />
          <circle cx="64" cy="52.5" r="1.5" fill="#FFFFFF" />
          {/* Wrinkle & Snout */}
          <path d="M44 48C47 46 53 46 56 48" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="50" cy="65" rx="14" ry="10" fill="#CBD5E1" />
          <ellipse cx="50" cy="62" rx="6" ry="4" fill="#0F172A" />
          <path d="M47 67C48.5 70 51.5 70 53 67" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="38" y="80" width="24" height="4" rx="2" fill="#1B365D" />
          <circle cx="50" cy="85" r="3" fill="#A0E0EF" />
        </svg>
      );

    case "dog-corgi":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="2" />
          {/* Big upright ears */}
          <polygon points="20,10 38,34 14,32" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
          <polygon points="80,10 86,32 62,34" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
          <polygon points="22,16 33,30 18,29" fill="#FECDD3" />
          <polygon points="78,16 82,29 67,30" fill="#FECDD3" />
          <ellipse cx="50" cy="56" rx="32" ry="28" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" />
          {/* White blaze between eyes */}
          <polygon points="50,42 46,70 54,70" fill="#FFFFFF" />
          <ellipse cx="50" cy="68" rx="16" ry="12" fill="#FFFFFF" />
          <circle cx="35" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="65" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="36.5" cy="48.5" r="1.5" fill="#FFFFFF" />
          <circle cx="66.5" cy="48.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="64" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M46 68C48 72 52 72 54 68" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M48 70C48 75 52 75 52 70Z" fill="#F43F5E" />
          <rect x="40" y="80" width="20" height="4" rx="2" fill="#005A9C" />
          <circle cx="50" cy="85" r="2.5" fill="#60C1E5" />
        </svg>
      );

    case "dog-husky":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
          <polygon points="26,14 40,34 20,32" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          <polygon points="74,14 80,32 60,34" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
          <ellipse cx="50" cy="56" rx="30" ry="28" fill="#475569" stroke="#334155" strokeWidth="1.5" />
          {/* Husky white facial mask */}
          <path d="M50 36C45 42 32 46 32 58C32 72 68 72 68 58C68 46 55 42 50 36Z" fill="#FFFFFF" />
          {/* Striking blue eyes */}
          <circle cx="38" cy="52" r="4.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
          <circle cx="62" cy="52" r="4.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
          <circle cx="38" cy="52" r="2" fill="#0F172A" />
          <circle cx="62" cy="52" r="2" fill="#0F172A" />
          <circle cx="39" cy="50.5" r="1" fill="#FFFFFF" />
          <circle cx="63" cy="50.5" r="1" fill="#FFFFFF" />
          <ellipse cx="50" cy="63" rx="5" ry="3.5" fill="#0F172A" />
          <path d="M47 67C48.5 70 51.5 70 53 67" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="40" y="80" width="20" height="4" rx="2" fill="#1B365D" />
          <circle cx="50" cy="85" r="2.5" fill="#A0E0EF" />
        </svg>
      );

    case "dog-shiba-inu":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
          <polygon points="26,18 40,34 20,32" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <polygon points="74,18 80,32 60,34" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <ellipse cx="50" cy="56" rx="32" ry="28" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          {/* Urajiro white cheeks */}
          <ellipse cx="36" cy="64" rx="14" ry="12" fill="#FFFBEB" />
          <ellipse cx="64" cy="64" rx="14" ry="12" fill="#FFFBEB" />
          {/* White eyebrow dots */}
          <circle cx="36" cy="44" r="2.5" fill="#FFFBEB" />
          <circle cx="64" cy="44" r="2.5" fill="#FFFBEB" />
          <circle cx="38" cy="52" r="4" fill="#1E293B" />
          <circle cx="62" cy="52" r="4" fill="#1E293B" />
          <circle cx="39" cy="50.5" r="1.5" fill="#FFFFFF" />
          <circle cx="63" cy="50.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="61" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M47 65C48.5 68 51.5 68 53 65" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="40" y="80" width="20" height="4" rx="2" fill="#005A9C" />
          <circle cx="50" cy="85" r="2.5" fill="#60C1E5" />
        </svg>
      );

    case "dog-beagle":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          {/* Beagle long brown drooping ears */}
          <path d="M16 32C12 48 16 68 24 68C28 68 28 44 26 32Z" fill="#92400E" />
          <path d="M84 32C88 48 84 68 76 68C72 68 72 44 74 32Z" fill="#92400E" />
          <ellipse cx="50" cy="54" rx="28" ry="26" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          {/* White muzzle blaze */}
          <polygon points="50,38 46,68 54,68" fill="#FFFFFF" />
          <ellipse cx="50" cy="65" rx="14" ry="12" fill="#FFFFFF" />
          <circle cx="36" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="64" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="37.5" cy="48.5" r="1.5" fill="#FFFFFF" />
          <circle cx="65.5" cy="48.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="61" rx="5.5" ry="4" fill="#0F172A" />
          <path d="M47 66C48.5 69 51.5 69 53 66" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="40" y="80" width="20" height="4" rx="2" fill="#1B365D" />
          <circle cx="50" cy="85" r="2.5" fill="#A0E0EF" />
        </svg>
      );

    case "dog-poodle":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFF7ED" stroke="#FFEDD5" strokeWidth="2" />
          {/* Poodle curly puffy ears */}
          <circle cx="22" cy="44" r="12" fill="#FDE68A" />
          <circle cx="24" cy="54" r="10" fill="#FDE68A" />
          <circle cx="78" cy="44" r="12" fill="#FDE68A" />
          <circle cx="76" cy="54" r="10" fill="#FDE68A" />
          {/* Poodle head puff */}
          <circle cx="42" cy="30" r="10" fill="#FEF08A" />
          <circle cx="58" cy="30" r="10" fill="#FEF08A" />
          <circle cx="50" cy="24" r="12" fill="#FEF08A" />
          <ellipse cx="50" cy="54" rx="26" ry="24" fill="#FEF9C3" stroke="#FDE68A" strokeWidth="1.5" />
          <circle cx="38" cy="50" r="4" fill="#1E293B" />
          <circle cx="62" cy="50" r="4" fill="#1E293B" />
          <circle cx="39" cy="48.5" r="1.2" fill="#FFFFFF" />
          <circle cx="63" cy="48.5" r="1.2" fill="#FFFFFF" />
          <ellipse cx="50" cy="60" rx="4.5" ry="3.5" fill="#0F172A" />
          <path d="M47 64C48.5 67 51.5 67 53 64" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="42" y="80" width="16" height="4" rx="2" fill="#F472B6" />
          <circle cx="50" cy="85" r="2.5" fill="#BE185D" />
        </svg>
      );

    case "dog-samoyed":
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="2" />
          {/* Fluffy white ears */}
          <polygon points="26,18 38,36 20,34" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <polygon points="74,18 80,34 62,36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <polygon points="28,22 34,32 24,31" fill="#FECDD3" />
          <polygon points="72,22 76,31 66,32" fill="#FECDD3" />
          {/* Cloud like fluffy head ruff */}
          <circle cx="32" cy="62" r="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="68" cy="62" r="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="50" cy="56" rx="30" ry="26" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="37" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="63" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="38.5" cy="48.5" r="1.5" fill="#FFFFFF" />
          <circle cx="64.5" cy="48.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="50" cy="60" rx="5.5" ry="4" fill="#0F172A" />
          {/* Iconic sammy smile */}
          <path d="M44 65C46 70 54 70 56 65" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 67C47 73 53 73 53 67Z" fill="#FB7185" />
          <rect x="40" y="80" width="20" height="4" rx="2" fill="#005A9C" />
          <circle cx="50" cy="85" r="2.5" fill="#60C1E5" />
        </svg>
      );

    default:
      // Fallback clean pet avatar based on species
      if (species === "cat") {
        return (
          <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            <polygon points="26,22 38,38 20,36" fill="#94A3B8" />
            <polygon points="74,22 80,36 62,38" fill="#94A3B8" />
            <ellipse cx="50" cy="58" rx="30" ry="26" fill="#CBD5E1" />
            <circle cx="38" cy="54" r="4.5" fill="#1B365D" />
            <circle cx="62" cy="54" r="4.5" fill="#1B365D" />
            <polygon points="50,62 47,59 53,59" fill="#F472B6" />
            <path d="M47 63C48.5 66 50 66 50 63C50 66 51.5 66 53 63" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      }
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
          <path d="M18 36C14 48 18 64 26 62C30 60 28 42 26 36Z" fill="#D97706" />
          <path d="M82 36C86 48 82 64 74 62C70 60 72 42 74 36Z" fill="#D97706" />
          <ellipse cx="50" cy="56" rx="30" ry="26" fill="#F59E0B" />
          <circle cx="36" cy="50" r="4.5" fill="#1E293B" />
          <circle cx="64" cy="50" r="4.5" fill="#1E293B" />
          <ellipse cx="50" cy="62" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M47 66C48.5 69 51.5 69 53 66" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
};

export const AVAILABLE_AVATARS = [
  { id: "cat-persian-white", name: "Persian White", species: "cat" as const },
  { id: "cat-siamese", name: "Siamese Royal", species: "cat" as const },
  { id: "cat-ginger-tabby", name: "Ginger Tabby", species: "cat" as const },
  { id: "cat-british-shorthair", name: "British Shorthair", species: "cat" as const },
  { id: "cat-calico", name: "Sweet Calico", species: "cat" as const },
  { id: "cat-black-tuxedo", name: "Black Tuxedo", species: "cat" as const },
  { id: "cat-maine-coon", name: "Maine Coon", species: "cat" as const },
  { id: "cat-russian-blue", name: "Russian Blue", species: "cat" as const },
  { id: "dog-golden-retriever", name: "Golden Retriever", species: "dog" as const },
  { id: "dog-french-bulldog", name: "French Bulldog", species: "dog" as const },
  { id: "dog-corgi", name: "Welsh Corgi", species: "dog" as const },
  { id: "dog-husky", name: "Siberian Husky", species: "dog" as const },
  { id: "dog-shiba-inu", name: "Shiba Inu", species: "dog" as const },
  { id: "dog-beagle", name: "Beagle Hound", species: "dog" as const },
  { id: "dog-poodle", name: "Royal Poodle", species: "dog" as const },
  { id: "dog-samoyed", name: "Smiling Samoyed", species: "dog" as const },
];

