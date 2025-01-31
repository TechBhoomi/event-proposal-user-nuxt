// tailwind.config.js
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue", // Ensure the root `app.vue` file is included
  ],
  theme: {
    extend: {
      keyframes: {
        "fly-in": {
          "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3)",
            transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          },
          "20%": {
            transform: "scale3d(1.1, 1.1, 1.1)",
          },
          "40%": {
            transform: "scale3d(0.9, 0.9, 0.9)",
          },
          "60%": {
            opacity: "1",
            transform: "scale3d(1.03, 1.03, 1.03)",
          },
          "80%": {
            transform: "scale3d(0.97, 0.97, 0.97)",
          },
          "100%": {
            opacity: "1",
            transform: "scale3d(1, 1, 1)",
          },
        },
        "browse-in": {
          "0%": {
            transform: "scale(0.8) translateZ(0px)",
            zIndex: "-1",
          },
          "10%": {
            transform: "scale(0.8) translateZ(0px)",
            zIndex: "-1",
            opacity: "0.7",
          },
          "80%": {
            transform: "scale(1.05) translateZ(0px)",
            zIndex: "999",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1) translateZ(0px)",
            zIndex: "999",
          },
        },
      },
      animation: {
        flyin: "fly-in 0.6s ease-in-out 0.25s 1",
        browsein: "browse-in 0.4s ease-in-out 0.25s 1",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
