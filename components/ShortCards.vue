<script setup lang="ts">
import type { Article } from '~/server/types/article'

const props = defineProps({
  articles: {
    type: Object as PropType<Article[]>,
    required: true,
  },
})
</script>

<template>
  <div class="grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
    <TransitionGroup name="fade">
      <ShortCard v-for="article in props.articles" :key="article.id" :article="article" />
    </TransitionGroup>
  </div>
</template>
