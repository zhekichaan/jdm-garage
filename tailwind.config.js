/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000",
      secondary: "#3D3D3D",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "rc-rocket": ["RC Rocket", "sans-serif"],
        ammonite: ["Ammonite", "sans-serif"],
        excluded: ["ExcludedItalic", "sans-serif"],
      },
      backgroundImage: {
        "ca-flag": "url('/src/images/ca-flag.jpg')",
      },
      dropShadow: {
        catalogue: "0px 4px 4px rgba(0, 0, 0, 0.8)",
      },
    },
    width: {
      container: "1280px",
    },
  },
  plugins: [],
};
