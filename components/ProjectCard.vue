<script setup lang="ts">
import type { IArticle } from '~/server/types'

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    required: true,
  },
})

function openNewTab(url: string | undefined) {
  if (!url)
    return
  window.open(url, '_blank')
}
</script>

<template>
  <div
    class="card-bg-filter backdrop-blur-sm my-open-tab flex flex-col overflow-hidden justify-between card-border"
    @click="openNewTab(props.article.link)"
  >
    <div class="p-4 text-left">
      <div class="text-lg font-bold">
        {{ props.article.title }}
      </div>
      <div class="mt-2">
        {{ props.article.description }}
      </div>
      <div>
        <UBadge v-for="s in article.tags" :key="s" color="gray" variant="solid" class="my-2 mr-2">
          {{ s }}
        </UBadge>
      </div>
    </div>
    <div class="px-4 pb-4 relative">
      <img :src="`${props.article.cover}/comporess1600x900`" alt="cover" class="object-cover rounded-md h-48 w-full">
    </div>
  </div>
</template>

<style scoped>
.card-bg-filter img {
  transition: transform 500ms;
}

.card-bg-filter:hover img {
  transform: scale(1.05);
}
</style>
