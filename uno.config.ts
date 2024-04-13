import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetMini,
	presetTypography,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import { presetExtra } from 'unocss-preset-extra';

export default defineConfig({
	rules: [
		[
			'ring-1',
			{
				'box-shadow':
					'var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)',
			},
		],
		// ['ring-2', { 'box-shadow': 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);' }],
	],
	shortcuts: [
		[
			'btn',
			'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
		],
		[
			'icon-btn',
			'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
		],
		[
			'card-hover',
			'transition duration-200 ease-in-out dark:hover:border-violet hover:border-violet border',
		],
		['title-font', 'text-left text-violet font-bold text-3xl my-4 text-shadow'],
		['title-btn', 'my-4 mb-[150px] flex flex-row justify-start'],
		[
			'common-border',
			'inline-flex mr-4 rounded px-4 py-2 font-bold focus:outline-none focus-visible:ring hover:cursor-default transition duration-100 animate-shadow text-gray-800 dark:text-gray-100',
		],
		['card-border', 'rounded-md z-50 hover:cursor-default'],
		[
			'header-link',
			'px-3 mx-1 py-2 transition-all duration-150 hover:cursor-default hover:text-violet font-500 text-md',
		],
		[
			'card',
			'rounded-md shadow-sm border border-[#ddd] dark:border-[#333] transition-all ease-in-out  hover:border-violet  hover:dark:border-violet ring-inset hover:border-violet hover:ring-2 hover:ring-violet',
		],
		['mobile-head-link', 'header-link text-2xl my-1 mt-1 mr-2'],
		['anim-fade-in', 'animated animated-fade-in-up animated-fast'],
		['anim-fade', 'animated animated-fade-in animated-fast'],
	],
	presets: [
		presetMini(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
		}),
		presetTypography(),
		presetWebFonts({
			provider: 'google', // default provider
			fonts: {
				// these will extend the default theme
				serif: ['serif', 'Noto Serif SC'],
				mono: ['Fira Code', 'Fira Mono:400,700'],
			},
		}),
		presetExtra(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
