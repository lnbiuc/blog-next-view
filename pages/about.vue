<script setup lang="ts">
import 'md-editor-v3/lib/preview.css'
import { MdPreview } from 'md-editor-v3'

const md = '# Hi! 👋\n\n# I\'m Violet.\n\n## A Web Developer 🖥. Code for Fun.'
const color = useColorMode()

const theme = ref<'dark' | 'light'>(color.preference === 'dark' ? 'dark' : 'light')

watch(toRef(color).value, () => {
  theme.value = color.preference === 'dark' ? 'dark' : 'light'
})
</script>

<template>
  <NuxtLayout name="default">
    <NuxtLayout name="home">
      <div class="flex flex-row text-left">
        <MdPreview editor-id="about-me" :model-value="md" :theme="theme" />
      </div>
    </NuxtLayout>
  </NuxtLayout>
</template>

<style scoped>
.md-editor-dark, .md-editor {
  --md-bk-color: transparent !important;
}

.md-editor-preview-wrapper {
  padding: 0 !important;
}

.md-editor-catalog-link span:hover, .md-editor-catalog-active>span {
  color: #A78BFA !important;
}
</style>
