/** @type {import('tailwindcss').Config}  */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#6366F1",
        accent: "#84CC16",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
