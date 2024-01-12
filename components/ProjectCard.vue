<script setup lang="ts">
import type { Article } from '~/server/types/article'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})

function openNewTab(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div
    class="card-bg-filter my-open-tab flex flex-col justify-between overflow-hidden card-border"
    @click="openNewTab(props.article.content)"
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
    <div class="relative px-4 pb-4">
      <img :src="props.article.cover[0]" alt="cover" class="h-48 w-full rounded-md object-cover">
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
