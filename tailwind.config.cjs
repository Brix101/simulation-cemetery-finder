/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        max: 9999,
      },
      colors: {
        "light-blue": "#01AED6",
        "light-blue-2": "#00B1Db",
        "medium-blue": "#16223B",
        "dark-blue": "#000E21",
        "dark-blue-2": "#16223B",
        "ruby-red": "#FF0053",
        "ruby-red-2": "#92002F",
      },
    },
  },
  plugins: [],
};
