/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "vitalize-primary": "#7A7ED9",
        "vitalize-secondary": "#9194DD",
        "vitalize-tertiary": "#E6EAFF",
      },
      height: {
        "screen-wo-header": "calc(100vh - 4rem)", // 4rem is equivalent to 16 in Tailwind's spacing scale
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
