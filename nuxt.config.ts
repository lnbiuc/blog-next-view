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
			routes: [
				'/',
				'/blog',
				'/shorts',
				'/project',
				'/about',
				'/friend',
				'/article/md-test',
				'/article/use-frps',
				'/article/project-1',
				'/article/java-concurrent',
				'/article/java-common',
				'/article/java-collection',
				'/article/jvm-common',
				'/article/md-test',
				'/article/test-2',
				'/article/ubt-i-docker',
				'/article/docker-run-script',
				'/article/my-nginx-conf',
				'/article/my-springboot-conf',
				'/article/tencent-sdk-use',
				'/article/sensitive-data-anno',
				'/article/redis-cache-config',
				'/article/druid-config',
				'/article/redis-common',
				'/article/mysql-common',
				'/article/project-my-blog',
				'/article/project-live-room',
				'/article/project-music',
				'/article/project-umami',
				'/article/proxy-settings',
				'/article/bos-plugin-lifecyle',
				'/article/singleton-pattern',
				'/article/blog-bug-track',
				'/article/bos-plugin-template',
				'/article/aoplog',
				'/article/my-ip',
				'/article/2023-summary',
				'/article/use-puppeteer',
				'/article/use-graphql',
				'/article/use-data-fetch',
				'/article/test-publish-1',
				'/article/use-nuxt-scheduler',
				'/article/test-publish-2',
				'/article/test-publish-3',
				'/article/test-publish-4',
				'/article/nuxt-fullstack',
				'/article/blog-theme',
				'/article/bos-plugin-list',
				'/article/screen-cmd-note',
				'/article/project-astro-blog',
			],
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
