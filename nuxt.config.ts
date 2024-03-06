import process from 'node:process';
import { appDescription } from './constants/index';

export default defineNuxtConfig({
	modules: [
		'@vueuse/nuxt',
		'@unocss/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/ui',
		'@formkit/auto-animate/nuxt',
		'nuxt-mongoose',
		'nuxt-markdown-render',
		'nuxt-og-image',
		'nuxt-simple-robots',
		'@nuxtjs/sitemap',
		'nuxt-schema-org',
		'nuxt-seo-experiments',
		'@nuxtjs/mdc'
	],

	ogImage: {
		googleFontMirror: true,
		fonts: ['Noto+Sans+SC:400'],
	},

	nuxtMarkdownRender: {
		as: 'article',
		vueRuntimeCompiler: true,
		global: true,
		options: {
			html: true,
			linkify: true,
			xhtmlOut: true,
		},
	},

	mdc: {
    headings: {
      anchorLinks: {
        h1: true,
				h2: true
      }
    },
		highlight: {
			theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight',
      },
			preload: ['json', 'yaml', 'toml', 'bash', 'sh', 'shell', 'console', 'plaintext', 'java'],
		}
  },

	mongoose: {
		uri: process.env.MONGODB_URI,
		devtools: true,
		options: {
			dbName: 'blog_v2',
		},
	},

	site: {
		url: process.env.NODE_ENV === 'production' ? 'https://vio.vin' : 'http://localhost:3000',
		// url: 'http://localhost:3000',
		title: '薇尔薇',
		name: '薇尔薇',
		description:
			'A Web Developer. Code for Fun. AKA ZZSLL, Violet, Vio, VioVin, Lnbiuc, kunkida, hi@lnbiuc.com',
		defaultLocale: 'zh_CN',
		identity: {
			type: 'Person',
		},
		github: 'lnbiuc',
		email: 'hi@lnbiuc.com',
		trailingSlash: true,
		twitterCard: 'summary_large_image',
		twitterSite: '@ZZSLL_53387',
		twitterCreator: '@ZZSLL_53387',
	},

	experimental: {
		// when using generate, payload js assets included in sw precache manifest
		// but missing on offline, disabling extraction it until fixed
		payloadExtraction: false,
		// inlineSSRStyles: false,
		renderJsonPayloads: true,
		typedPages: true,
	},

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
			// routes: ['/',],
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
			script:
				process.env.NODE_ENV === 'production'
					? [
						{
							async: true,
							src: 'https://umami.vio.vin/script.js',
							'data-website-id': 'eef5fee4-26c0-4ac4-90eb-21e588de9635',
						},
					]
					: [],
		},
	},

	devtools: {
		enabled: true,
	},
});
