/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  content: [
    "./packages/renderer/index.html",
    "./packages/renderer/src/**/*.{vue,js,ts}",
  ],
};
