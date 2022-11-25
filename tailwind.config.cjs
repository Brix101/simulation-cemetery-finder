/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        max: 9999,
      },
      colors: {
        "primary-black": "1B262C",
        "primary-blue": "0F4C75",
        "secondary-blue": "3282B8",
        "light-blue": "BBE1FA",
      },
    },
  },
  plugins: [],
};
