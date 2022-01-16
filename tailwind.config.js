module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "custom-breakpoint": "1440px",
        "custom-breakpoint1": "1600px",
        "custom-breakpoint2": "1680px",
        "custom-breakpoint3": "1900px",
      },
    },
  },
  plugins: [],
};
