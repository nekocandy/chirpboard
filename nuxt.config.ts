// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  runtimeConfig: {
    public: {
      realmId: process.env.REALM_ID,
    },
  },
  experimental: {
    watcher: 'chokidar',
  },
})
