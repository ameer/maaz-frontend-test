// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://fakestoreapi.com',
      appName: 'پیندُر',
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2026-07-16',
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
  },
})
