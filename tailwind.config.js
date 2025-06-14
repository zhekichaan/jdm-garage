/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000",
      secondary: "#292929",
      accent: "#FF4C4C",
      text: "#346fc7",
      bg: "#000",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        ammonite: ["Ammonite", "sans-serif"],
        excluded: ["ExcludedItalic", "sans-serif"],
      },
      dropShadow: {
        main: "0px 4px 4px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        shake: "shake 0.2s ease-in-out infinite alternate",
        line: "line 0.8s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%": { transform: "translateY(-1%)" },
          "100%": { transform: "translateY(3%)" },
        },
        line: {
          "0%": { "stroke-dashoffset": "22" },
          "25%": { "stroke-dashoffset": "22" },
          "50%": { "stroke-dashoffset": "0" },
          "51%": { "stroke-dashoffset": "0" },
          "80%": { "stroke-dashoffset": "-22" },
          "100%": { "stroke-dashoffset": "-22" },
        },
      },
    },
    width: {
      desktop: "1280px",
      tablet: "768px",
      mobile: "300px",
    },
  },
  plugins: [],
};
