/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#81c408",
        footer: "#45595b",
      },
      maxWidth: {
        "width-page": "1240px",
      },
      boxShadow: {
        custom: "0 2px 12px rgba(0,0,0,0.19), 0 3px 6px rgba(0,0,0,0.23)",
      },
      keyframes: {
        loader: {
          "0%": {
            width: "2px",
            height: "2px",
            borderRadius: "1px",
          },
          "100%": {
            width: "20px",
            height: "20px",
            borderRadius: "10px",
          },
        },
      },
      animation: {
        dot1: "loader 1s infinite alternate 0.2s",
        dot2: "loader 1s infinite alternate 0.4s",
        dot3: "loader 1s infinite alternate 0.6s",
        dot4: "loader 1s infinite alternate 0.8s",
        dot5: "loader 1s infinite alternate 1s",
      },
      backgroundImage: {
        "gradient-backdrop": "linear-gradient(45deg, #6200ea, #d500f9)",
      },
    },
  },
  plugins: [],
};
