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
  <div class="border border-gray-600 rounded-md transition-transform duration-150 hover:scale-102 hover:cursor-default">
    <div class="relative">
      <img :src="props.article.cover" alt="cover" class="h-48 w-full rounded-tl-md rounded-tr-md object-cover">
      <div class="absolute bottom-0 right-0 p-1 text-right">
        <UButton v-for="t in props.article.tags" :key="t" square label="Button" color="gray" size="2xs" class="m-1" :tag="t">
          {{ t }}
        </UButton>
      </div>
    </div>

    <div class="p-4 text-left">
      <div class="text-md font-bold">
        {{ props.article.title }}
      </div>
      <div class="my-2 flex flex-row items-center">
        <div class="i-carbon-view" />
        <div class="ml-2 text-violet">
          {{ props.article.views }} views
        </div>
      </div>
      <div class="mt-1 font-bold">
        {{ props.article.createdAt.substring(0, 10) }}
      </div>
      <div class="mt-2">
        {{ props.article.description }}
      </div>
    </div>
  </div>
</template>
