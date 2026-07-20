// https://nuxt.com/docs/api/configuration/nuxt-config

const appName = 'پیندُر'
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],
  devtools: { enabled: false },
  app: {
    head: {
      titleTemplate: `%s | ${appName}`,
      title: appName,
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'بهترین محصولات را با قیمت مناسب و ارسال سریع از فروشگاه ما خریداری کنید.' 
        },
        { name: 'theme-color', content: '#e20054' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://fakestoreapi.com',
      appName,
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
