<script setup lang="ts">
import type { Article } from '~/server/types/article'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col justify-between border border-gray-600 rounded-md transition-transform duration-150 hover:scale-102 hover:cursor-default">
    <div class="p-4 text-left">
      <div class="text-md font-bold">
        <ULink
          :to="props.article.content"
          active-class="text-primary"
          inactive-class="text-white hover:text-violet transition-colors duration-150"
        >
          {{ props.article.title }}
        </ULink>
      </div>
      <div class="mt-2">
        {{ props.article.description }}
      </div>
      <div>
        <UBadge v-for="s in article.stack" :key="s" color="gray" variant="solid" class="my-1 mr-2">
          {{ s }}
        </UBadge>
      </div>
    </div>
    <div class="relative px-4 pb-4">
      <img :src="props.article.cover[0]" alt="cover" class="h-48 w-full rounded-md object-cover">
    </div>
  </div>
</template>
