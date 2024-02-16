<script setup lang="ts">
import type { IArticle } from '~/server/types'

const props = defineProps({
  articles: {
    type: Object as PropType<IArticle[]>,
    required: true,
  },
})
</script>

<template>
  <div class="mt-2 grid grid-cols-1 gap-4 w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
    <!-- <TransitionGroup name="fade"> -->
    <ProjectCard v-for="article in props.articles" :key="article._id" :article="article" class="card" />
    <!-- </TransitionGroup> -->
  </div>
</template>
