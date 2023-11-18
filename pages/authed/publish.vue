<script setup lang="ts">
import 'md-editor-v3/lib/style.css'
import { MdEditor } from 'md-editor-v3'
import type { ArticlePublishDto } from '../../server/types/article'

definePageMeta({
  layout: false,
})

const items = [{
  label: 'Article',
}, {
  label: 'Short',
}, {
  label: 'Project',
}]
const currTab = ref<number>(0)

function handleChange(index: number) {
  currTab.value = index
}

const color = useColorMode()
const theme = ref<'dark' | 'light'>(color.preference === 'dark' ? 'dark' : 'light')

watch(toRef(color).value, () => {
  theme.value = color.preference === 'dark' ? 'dark' : 'light'
})

const isOpen = ref(false)

const article = ref<ArticlePublishDto>({
  shortLink: '',
  description: '',
  title: '',
  cover: [],
  stack: [],
  category: '',
  content: '',
  status: '',
})
</script>

<template>
  <div class="p-4">
    <div class="flex flex-row items-center">
      <UTabs class="w-full" :items="items" :default-index="0" @change="handleChange" />
    </div>
    <div v-if="currTab === 0" class="h-full w-full">
      <MdEditor v-model="article.content" :theme="theme" :auto-focus="true" :auto-detect-code="true" />
      <div class="flex flex-row items-center justify-around">
        <div>
          <UInput v-model="article.title" placeholder="Title" />
        </div>
        <div>
          <DarkToggle />
        </div>
        <UButton color="gray" class="mt-2" @click="isOpen = !isOpen">
          Publish
        </UButton>
      </div>
      <UModal v-model="isOpen">
        <div class="p-4">
          <Placeholder class="h-48" />
        </div>
      </UModal>
    </div>
    <div v-if="currTab === 1">
      2
    </div>
    <div v-if="currTab === 2">
      3
    </div>
  </div>
</template>

<style scoped>
.md-editor-dark {
  --md-bk-color: #0E1111 !important;
}

.md-editor {
    height: calc(100vh - 160px) !important;
}
</style>
