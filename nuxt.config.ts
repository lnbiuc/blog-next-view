import process from 'node:process';
import { appDescription } from './constants/index';

export default defineNuxtConfig({
	modules: [
		'@vueuse/nuxt',
		'@unocss/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/ui',
		'@nuxtseo/module',
		'@formkit/auto-animate/nuxt',
		'nuxt-mongoose',
		'nuxt-scheduler',
		'nuxt-markdown-render',
	],

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

	linkChecker: {
		enabled: false,
		showLiveInspections: false,
		runOnBuild: false,
	},

	mongoose: {
		uri: process.env.MONGODB_URI,
		devtools: true,
		options: {
			dbName: 'blog_v2',
		},
	},

	site: {
		url: 'https://vio.vin',
		name: '薇尔薇',
		description:
			'A Web Developer. Code for Fun. AKA ZZSLL, Violet, Vio, VioVin, Lnbiuc, kunkida, hi@lnbiuc.com',
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
			script:
				process.env.NODE_ENV === 'production'
					? [
							{
								async: true,
								src: 'https://umami.vio.vin/script.js',
								'data-website-id': '08d7bbdd-d900-4947-8959-50b8941e4f55',
							},
					  ]
					: [],
		},
	},

	devtools: {
		enabled: true,
	},
});
