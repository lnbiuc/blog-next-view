<script lang="ts" setup>
import type { Article } from '~/server/types/article'

const props = defineProps({
  articles: {
    type: Object as PropType<Article[]>,
    required: true,
  },
})

// function updateCursor({ x, y }) {
//   document.documentElement.style.setProperty('--x', x)
//   document.documentElement.style.setProperty('--y', y)
// }

// onMounted(() => {
//   document.body.addEventListener('pointermove', updateCursor)
// })
</script>

<template>
  <div v-auto-animate class="my-card mt-2 grid grid-cols-1 gap-4 w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
    <!-- <TransitionGroup name="fade"> -->
    <BlogCard v-for="article in props.articles" :key="article.id" :article="article" class="card" />
    <!-- </TransitionGroup> -->
  </div>
</template>
