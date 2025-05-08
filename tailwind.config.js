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
        primary: "#4F46E5",
        accent: "#84CC16",
        secondary: "#8B5CF6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
