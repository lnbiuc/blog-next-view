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
  <div class="border border-gray-300 rounded-md transition-transform duration-150 hover:scale-102 hover:cursor-default dark:border-gray-600" @click="$router.push(`/article/${props.article.shortLink}`)">
    <div class="relative">
      <img :src="props.article.cover[0]" alt="cover" class="h-48 w-full rounded-tl-md rounded-tr-md object-cover">
      <div class="absolute bottom-0 right-0 p-1 text-right">
        <UBadge v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="m-1 opacity-90" :tag="t">
          {{ t }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 text-left">
      <div class="text-lg font-bold">
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
