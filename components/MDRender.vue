<script setup lang="ts">
import markdownit from 'markdown-it'
import shikiji from 'markdown-it-shikiji'
import { transformerMetaHighlight, transformerNotationDiff, transformerNotationFocus, transformerNotationHighlight, transformerNotationWordHighlight } from 'shikiji-transformers'
import anchor from 'markdown-it-anchor'

// @ts-expect-error miss type
import video from '@vrcd-community/markdown-it-video'
import container from 'markdown-it-container'

// @ts-expect-error miss type
import { full as emoji } from 'markdown-it-emoji'

// @ts-expect-error miss type
import lazy_loading from 'markdown-it-image-lazy-loading'

// @ts-expect-error miss type
import todo from 'markdown-it-task-lists'

// @ts-expect-error miss type
import copy from 'markdown-it-code-copy'
import '~/styles/markdown.css'
import '~/styles/prose.css'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const md = markdownit()

md.use(await shikiji({
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerNotationFocus(),
    transformerMetaHighlight(),
  ],
}))

md.use(anchor)

md.use(container)

md.use(video)

md.use(emoji)

md.use(lazy_loading)

md.use(todo)

md.use(copy, {
  iconClass: 'i-carbon:copy w-30px h-30px text-violet opacity-50 hover:opacity-100 transition-all',
  iconStyle: 'font-size: 1.5em;width: 20px;height: 20px;background- image: url(\'your-svg-icon.svg\');background-size: cover;display: inline-block;',
})
const result = md.render(props.source)
</script>

<template>
  <div id="violetMD" class="violet-prose mb-20 mt-5 text-left">
    <!-- <NuxtMarkdown /> -->
    <article v-html="result" />
  </div>
</template>
