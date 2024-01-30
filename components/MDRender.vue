<script setup lang="ts">
import shikiji from 'markdown-it-shikiji'
import anchor from 'markdown-it-anchor'
import '~/styles/markdown.css'
import '~/styles/prose.css'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const { rendered: NuxtMarkdown } = useNuxtMarkdown(props.source, {
  plugins: [
    await shikiji({
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
    }),
    anchor,
  ],
})
</script>

<template>
  <div id="violetMD" class="violet-prose mb-20 mt-5">
    <NuxtMarkdown />
  </div>
</template>
