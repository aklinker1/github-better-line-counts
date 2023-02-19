/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/*.html", "./src/**/*.{ts,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    theme: ["emerald"],
  },
};
