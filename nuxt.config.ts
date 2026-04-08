// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls: {
          img: [],
          source: [],
          image: [],
          use: [],
        },
      },
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Cormorant Garamond': [400, 700],
      Inter: [400, 500],
    },
    display: 'swap',
    preload: true,
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    locales: [
      { code: 'ru', name: 'RU', file: 'ru.json' },
      { code: 'uz', name: 'UZ', file: 'uz.json' },
      { code: 'en', name: 'EN', file: 'en.json' },
    ],
    langDir: '../i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'epo_lang',
      redirectOn: 'root',
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'EPO Atelier — Кастомная мебель из дерева и эпоксидной смолы',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Кастомная мебель ручной работы в Ташкенте. Столы из эпоксидной смолы, системы хранения.' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
