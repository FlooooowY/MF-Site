import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ink: {
          50: "#f5f5f5",
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#666666",
          600: "#4d4d4d",
          700: "#333333",
          800: "#1a1a1a",
          900: "#000000"
        }
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.1)",
        glow: "0 10px 35px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        "diagonal-gradient": "linear-gradient(135deg, #000000, #333333)",
        "border-gradient":
          "linear-gradient(120deg, rgba(0,0,0,0.85), rgba(51,51,51,0.85))"
      }
    }
  },
  plugins: []
};

export default config;


