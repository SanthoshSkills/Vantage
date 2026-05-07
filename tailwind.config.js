/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#09090b", // Richer dark background
        obsidianLight: "#18181b", // Lighter surface color
        emeraldGlow: "#10B981",
        emeraldBright: "#34d399",
        roseGlow: "#F43F5E",
        roseBright: "#fb7185",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
