import process from 'node:process'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@nuxtseo/module',
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
  },

  ui: {
    // @ts-expect-error missing types
    primary: 'violet',
    gray: 'cool',
  },

  routeRules: {
    '/api/**': { proxy: { to: process.server ? 'http://blog-next-api:6060/api/**' : 'https://blog-api.vio.vin/api/**' } },
    // '/api/**': { proxy: { to: 'https://blog-api.vio.vin/api/**' } },
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
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
