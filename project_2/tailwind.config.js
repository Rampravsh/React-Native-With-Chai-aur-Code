/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"#0E4D92",
        accent:"#f59e0b",
        card:"#1a1a2e",
      },
      fontFamily:{
        sans:["Rubik_400Regular", "sans-serif"],
        medium:["Rubik_500Medium", "sans-serif"],
        bold:["Rubik_700Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
