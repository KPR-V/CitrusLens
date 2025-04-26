/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 0px 40px 0px rgba(0, 0, 0, 0.3)",
        normal: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orange: {
          50: "#fff8f1",
          100: "#ffe9d4",
          200: "#ffd4a8",
          300: "#ffb77d",
          400: "#ff9952",
          500: "#ff7b27",
          600: "#ff5f00",
          700: "#cc4c00",
          800: "#9b3900",
          900: "#6b2800",
        },
        primary: {
          DEFAULT: "#ff7b27",
          light: "#ff9952",
          dark: "#cc4c00",
        },
      },
      fontFamily: {
        cinzel: ["Cinzel"],
        bonaNova: ["BonaNova"],
        grotesk: ["Clash Grotesk"],
      },
    },
    animation: {
      "background-shine": "background-shine 2s linear infinite",
    },
    keyframes: {
      "background-shine": {
        from: {
          backgroundPosition: "0 0",
        },
        to: {
          backgroundPosition: "-200% 0",
        },
      },
      shimmer: {
        "0%": { transform: "translateX(-200%)" },
        "100%": { transform: "translateX(200%)" },
      },
      pulse: {
        "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "1" },
        "100%": { transform: "translate(-50%, -50%) scale(2)", opacity: "0" },
      },
    },
  },
  plugins: [],
};
