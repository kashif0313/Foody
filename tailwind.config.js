/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // must include tsx
  ],
  safelist: [
    {
      pattern:
        /(from|via|to|bg|text|ring|hover:bg|hover:text|border)-(red|blue|green|purple|pink|indigo|amber|yellow|gray|black|orange|teal)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
