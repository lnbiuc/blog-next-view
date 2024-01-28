<script setup>
import MarkdownItShikiji from 'markdown-it-shikiji'

import '~/styles/markdown.css'
import '~/styles/prose.css'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const configuredShiki = await MarkdownItShikiji({
  themes: {
    dark: 'github-dark',
    light: 'github-light',

  },
})
</script>

<template>
  <NuxtMarkdown class="violet-prose" :source="props.source" :options="{ html: true }" :plugins="[configuredShiki]" />
</template>
