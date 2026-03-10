/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f0f1a",
        surface: "#1a1a2e",
        primary: "#7c3aed",
        secondary: "#06b6d4",
        accent: "#22c55e",
        textPrimary: "#ffffff",
        textSecondary: "#9ca3af"
      },
      boxShadow: {
        glass: "0 25px 50px -12px rgba(124, 58, 237, 0.45)",
        neumorph: "10px 10px 30px #050510, -10px -10px 30px #1a1a2e"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

