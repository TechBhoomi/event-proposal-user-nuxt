export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "vue3-carousel-nuxt",'nuxt-pdfeasy'],
  css: ["~/assets/css/tailwind.css"],
});
