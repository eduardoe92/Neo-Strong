/** @type {import('tailwind-config').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neos: "#ff5f00", 
        strong: "#1e293b",
        fondo: "#0f172a",
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}