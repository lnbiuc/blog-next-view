<script setup lang="ts">
import type { Article } from '~/server/types/article'
import { formatTime } from '~/composables/formatTime'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})
</script>

<template>
  <div
    class="border border-gray-300 rounded-md transition-transform duration-150 hover:scale-102 active:scale-98 hover:cursor-default dark:border-gray-600"
    @click="$router.push(`/article/${props.article.shortLink}`)">
    <div class="p-4 text-left">
      <div class="text-lg font-bold">
        {{ props.article.title }}
      </div>
      <div class="mt-2">
        <UBadge v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="my-1 mr-1 opacity-90"
          :tag="t">
          {{ t }}
        </UBadge>
      </div>
      <div class="mt-3 text-sm">
        {{ formatTime(props.article.createdAt) }}
      </div>
    </div>
  </div></template>
