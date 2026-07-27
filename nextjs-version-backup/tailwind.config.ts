import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF6EE",
          50: "#FFFDFB",
          100: "#FBF6EE",
          200: "#F4EBDB",
        },
        ink: {
          DEFAULT: "#1C1712",
          700: "#332B23",
          500: "#6B5F53",
        },
        rust: {
          DEFAULT: "#B4472E",
          400: "#C86447",
          600: "#8F3620",
          700: "#6E2A19",
        },
        honey: {
          DEFAULT: "#D9A441",
          400: "#E4BB6A",
          600: "#B8842B",
        },
        sage: {
          DEFAULT: "#7C8A6E",
          400: "#9AA88B",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "clamp-hero": "clamp(3rem, 9vw, 8.5rem)",
        "clamp-h2": "clamp(2.25rem, 5vw, 4.5rem)",
        "clamp-h3": "clamp(1.5rem, 3vw, 2.5rem)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
