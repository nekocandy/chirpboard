// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'ChirpBoard',
      meta: [
        {
          name: 'description',
          content: 'ChirpBoard - Chirp your mind away!',
        },
      ],
      link: [
        {
          rel: 'icon',
          href: '/favicon.png',
        },
      ],
    },
  },
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
      vapidKey: process.env.VAPID_KEY,
    },
  },
  experimental: {
    watcher: 'chokidar',
  },
})
