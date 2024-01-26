import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['card-hover', 'transition duration-200 ease-in-out dark:hover:border-violet hover:border-violet border'],
    ['title-font', 'text-left text-violet font-bold text-3xl my-4 text-shadow'],
    ['title-btn', 'my-4 mb-[150px] flex flex-row justify-start'],
    ['common-border', 'inline-flex mr-4 rounded px-4 py-2 font-bold focus:outline-none focus-visible:ring hover:cursor-default active:scale-[0.97] transition duration-100 animate-shadow text-gray-800 dark:text-gray-100'],
    ['card-border', 'rounded z-50 hover:cursor-default active:scale-[0.97]'],
    ['header-link', 'px-3 mx-1 py-2 transition-all duration-150 hover:cursor-default hover:text-violet font-bold'],
    ['phone-header-link', 'px-3 py-2 m-4 transition-all duration-150 hover:cursor-default hover:text-violet font-bold'],
    ['card', 'rounded-md shadow-sm border border-gray-300 dark:border-gray-700 transition-all ease-in-out  hover:border-violet  hover:dark:border-violet ring-inset hover:border-violet hover:ring-1 hover:ring-violet'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
