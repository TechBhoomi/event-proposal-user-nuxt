export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "vue3-carousel-nuxt",
    "nuxt-pdfeasy",
    "notivue/nuxt",
  ],
  notivue: {
    position: "top-right",
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/index.css",
    "notivue/notification.css",
    "notivue/animations.css",
  ],
});
