/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.html", "./src/**/*.{ts,vue}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"],
    logs: false,
  },
};
