module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include your src directory files
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in-out", // Animation name and duration
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },

  plugins: [],
};
