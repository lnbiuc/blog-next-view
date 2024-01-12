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
    class="card-bg-filter overflow-hidden card-border"
    @click="$router.push(`/article/${props.article.shortLink}`)"
  >
    <div class="relative overflow-hidden p-[3px]">
      <img :src="props.article.cover[0]" alt="cover" class="z-0 h-48 w-full transform rounded-tl-sm rounded-tr-sm object-cover">
      <div class="absolute bottom-0 right-0 p-1 text-right">
        <UBadge v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="m-1 opacity-90" :tag="t">
          {{ t }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 text-left">
      <div class="text-xl font-bold">
        {{ props.article.title }}
      </div>
      <div class="my-2 flex flex-row items-center">
        <div class="i-carbon-view text-violet" />
        <div class="ml-2 text-violet">
          {{ props.article.views }} views
        </div>
      </div>
      <div class="mt-1 font-bold">
        {{ formatTime(props.article.createdAt) }}
      </div>
      <div class="mt-2">
        {{ props.article.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-bg-filter img {
  transition: transform 500ms;
}

.card-bg-filter:hover img {
  /* transform: scale(1.1); */
}
</style>
