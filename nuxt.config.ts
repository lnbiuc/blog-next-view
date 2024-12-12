import process from 'node:process'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
    'nuxt-mongoose',
    'nuxt-og-image',
    'nuxt-simple-robots',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    'nuxt-seo-experiments',
    '@nuxt/image',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],

  ogImage: {
    googleFontMirror: true,
    fonts: ['Noto+Sans+SC:400'],
  },

  mdc: {
    remarkPlugins: {
      'behead': {
        src: 'remark-behead',
        options: {
          minDepth: 2,
        },
      },
      'remark-mdc': {
        options: {
          experimental: {
            autoUnwrap: true,
          },
        },
      },
    },
    components: {
      map: {
        a: 'LinkRender',
        pre: 'PreRender',
        h2: 'H2Render',
        h3: 'H3Render',
        h4: 'H4Render',
        img: 'ImageRender',
      },
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: ['abap', 'actionscript-3', 'ada', 'adoc', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bash', 'bat', 'batch', 'be', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'c', 'c#', 'c++', 'cadence', 'cdc', 'clarity', 'clj', 'clojure', 'closure-templates', 'cmake', 'cmd', 'cobol', 'codeowners', 'codeql', 'coffee', 'coffeescript', 'common-lisp', 'console', 'coq', 'cpp', 'cql', 'crystal', 'cs', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dockerfile', 'dotenv', 'dream-maker', 'edge', 'elisp', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erl', 'erlang', 'f', 'f#', 'f03', 'f08', 'f18', 'f77', 'f90', 'f95', 'fennel', 'fish', 'fluent', 'for', 'fortran-fixed-form', 'fortran-free-form', 'fs', 'fsharp', 'fsl', 'ftl', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gjs', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'gql', 'graphql', 'groovy', 'gts', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hbs', 'hcl', 'hjson', 'hlsl', 'hs', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'jade', 'java', 'javascript', 'jinja', 'jison', 'jl', 'js', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kql', 'kt', 'kts', 'kusto', 'latex', 'lean', 'lean4', 'less', 'liquid', 'lisp', 'lit', 'log', 'logo', 'lua', 'luau', 'make', 'makefile', 'markdown', 'marko', 'matlab', 'md', 'mdc', 'mdx', 'mediawiki', 'mermaid', 'mojo', 'move', 'nar', 'narrat', 'nextflow', 'nf', 'nginx', 'nim', 'nix', 'nu', 'nushell', 'objc', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'perl6', 'php', 'plsql', 'po', 'postcss', 'pot', 'potx', 'powerquery', 'powershell', 'prisma', 'prolog', 'properties', 'proto', 'protobuf', 'ps', 'ps1', 'pug', 'puppet', 'purescript', 'py', 'python', 'ql', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'rb', 'reg', 'regex', 'regexp', 'rel', 'riscv', 'rs', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sh', 'shader', 'shaderlab', 'shell', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'spl', 'splunk', 'sql', 'ssh-config', 'stata', 'styl', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'tf', 'tfvars', 'toml', 'ts', 'ts-tags', 'tsp', 'tsv', 'tsx', 'turtle', 'twig', 'typ', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'vim', 'viml', 'vimscript', 'vue', 'vue-html', 'vy', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wiki', 'wikitext', 'wl', 'wolfram', 'xml', 'xsl', 'yaml', 'yml', 'zenscript', 'zig', 'zsh', '文言'],
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
    // compressPublicAssets: {
    //   gzip: true,
    // },

    routeRules: {
      '/blog-image/**': {
        proxy: {
          to: 'https://minio.vio.vin/blog-image/**',
        },
      },
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
          process.env.NODE_ENV === 'production'
          && process.env.UMAMI_ADDRESS
          && process.env.UMAMI_WEBSITE_ID
            ? [
                {
                  'async': true,
                  'src': `${process.env.UMAMI_ADDRESS}/script.js`,
                  'data-website-id': process.env.UMAMI_WEBSITE_ID,
                },
              ]
            : [],
    },
  },

  devtools: {
    enabled: true,
  },

  tailwindcss: {
    cssPath: ['~/styles/tailwind.css', { injectPosition: 'first' }],
    config: {
      theme: {
        extend: {
          colors: {
            violet: {
              50: '#F5F4FD',
              100: '#EBE9FC',
              200: '#D7D2FA',
              300: '#C0B8F8',
              400: '#A89EF5',
              500: '#A78BFA',
              600: '#9370F7',
              700: '#7F54F4',
              800: '#6A39F1',
              900: '#5318EE',
              950: '#3d00e9',
            },
            green: {
              50: '#EFFDF5',
              100: '#D9FBE8',
              200: '#B3F5D1',
              300: '#75EDAE',
              400: '#00DC82',
              500: '#00C16A',
              600: '#00A155',
              700: '#007F45',
              800: '#016538',
              900: '#0A5331',
              950: '#052e16',
            },
          },
        },
      },
    },
  },

  compatibilityDate: '2024-10-08',
})
