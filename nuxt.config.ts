// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
  ],
  runtimeConfig: {
    public: {
      realmId: process.env.REALM_ID,
    },
  },
  build: {
    transpile: [
      'realm-web',
    ],
  },
})
