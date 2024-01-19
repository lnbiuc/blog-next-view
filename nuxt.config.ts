import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@nuxtseo/module',
    '@formkit/auto-animate/nuxt',
  ],

  site: {
    url: 'https://vio.vin',
    name: '薇尔薇',
    description: 'A Web Developer. Code for Fun. AKA ZZSLL, Violet, Vio, VioVin, Lnbiuc, kunkida, hi@lnbiuc.com',
    defaultLocale: 'en',
    identity: {
      type: 'Person',
    },
    github: 'lnbiuc',
    email: 'hi@lnbiuc.com',
    trailingSlash: true,
    twitterCard: 'summary_large_image',
    twitterSite: '@ZZSLL_53387',
    twitterCreator: '@ZZSLL_53387',
    twitterImage: 'https://vio.vin/favicon.ico',
  },

  ui: {
    primary: 'violet',
    gray: 'cool',
    icons: {
    // @ts-expect-error missing types
      dynamic: true,
    },
  },

  routeRules: {
    // '/api/**': { proxy: { to: process ? 'http://47.109.97.85:6060/api/**' : 'https://blog-api.vio.vin/api/**' } },
    // '/api/**': { proxy: { to: 'http://47.109.97.85:6060/api/**' } },
    // '/api/**': { proxy: { to: 'https://blog-api.vio.vin/api/**' } },
    '/api/**': { proxy: { to: 'http://127.0.0.1:6060/api/**' } },
  },

  devProxy: {
    '/api/**': { proxy: { to: 'http://47.109.97.85:6060/api/**' } },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      //   routes: ['/', '/blog', '/shorts', '/project', '/about'],
      ignore: ['/hi'],
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
      // umami analytics
      script: [
        // <script async src="https://analytics.eu.umami.is/script.js" data-website-id="afdca035-1988-40f8-89a0-e9ed73267348"></script>
        { 'async': true, 'src': 'https://analytics.eu.umami.is/script.js', 'data-website-id': 'afdca035-1988-40f8-89a0-e9ed73267348' },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
