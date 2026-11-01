import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1B365D",
          deep: "#005A9C",
          sky: "#60C1E5",
          cyan: "#A0E0EF",
          ice: "#EAF8FA",
          cream: "#FAF8F5",
          offwhite: "#F8FAFC",
          darknavy: "#0B1726",
          darksurface: "#13253B",
          darkelevated: "#1C324E",
          darkborder: "#234267",
          darktext: "#F0F4F8",
          darkmuted: "#9FB3C8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(27, 54, 93, 0.06)",
        card: "0 10px 30px -4px rgba(27, 54, 93, 0.08)",
        floating: "0 20px 40px -6px rgba(27, 54, 93, 0.12)",
      },
      animation: {
        "float-gentle": "float 6s ease-in-out infinite",
        "pulse-gentle": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
