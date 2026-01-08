import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f6",
          100: "#ffe4ee",
          200: "#fecddf",
          300: "#fda4c6",
          400: "#fb7185",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843"
        },
        indigoBrand: {
          500: "#4f46e5",
          600: "#4338ca"
        }
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)",
        glow: "0 10px 40px rgba(236,72,153,0.25)"
      }
    }
  },
  plugins: []
} satisfies Config;


