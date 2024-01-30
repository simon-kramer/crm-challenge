// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  /* Automatic prepending for the API URL */
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/ui']
})
