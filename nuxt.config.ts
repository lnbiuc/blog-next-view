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
		'@nuxt/image'
	],

	image: {
		unsplash: {
			baseUrl: 'https://source.unsplash.com',
		}
	},

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
		icon: '/site-favicon.ico',
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
		// pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			viewport: 'width=device-width,initial-scale=1',
			link: [
				{ rel: 'icon', href: '/site-favicon.ico', sizes: 'any' },
				{ rel: 'apple-touch-icon', href: '/site-favicon.ico' },
			],
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: appDescription },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
			],
			// umami analytics
			script:
				process.env.NODE_ENV === 'production' &&
				process.env.UMAMI_ADDRESS &&
				process.env.UMAMI_WEBSITE_ID
					? [
							{
								async: true,
								src: `${process.env.UMAMI_ADDRESS}/script.js`,
								'data-website-id': process.env.UMAMI_WEBSITE_ID,
							},
					  ]
					: [],
		},
	},

	devtools: {
		enabled: true,
	},
});
