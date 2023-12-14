/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "defaultPurple" : "rgb(179, 20, 166)",
        "defaultPink": "rgb(237, 34, 98)"
      }
    },
  },
  plugins: [],
}