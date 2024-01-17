<script lang="ts" setup>
import type { Article } from '~/server/types/article'

const props = defineProps({
  articles: {
    type: Object as PropType<Article[]>,
    required: true,
  },
})

// @ts-expect-error right
function updateCursor({ x, y }) {
  document.documentElement.style.setProperty('--x', x)
  document.documentElement.style.setProperty('--y', y)
}

onMounted(() => {
  document.body.addEventListener('pointermove', updateCursor)
})
</script>

<template>
  <div v-auto-animate class="my-card grid grid-cols-1 mt-2 w-full gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-3">
    <!-- <TransitionGroup name="fade"> -->
    <BlogCard v-for="article in props.articles" :key="article.id" :article="article" class="card" />
    <!-- </TransitionGroup> -->
  </div>
</template>

<style>
.card {
  position: relative;
  transition: all 0.1s;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.05);
}

.dark .card {
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.05);
}

.card:hover {
  --active: 1;
  box-shadow: inset 0 0 0 2px rgb(167, 139, 250, 0.85);
  z-index: 100;
}

.card:after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at calc(var(--x) * 1px) calc(var(--y) * 1px), hsl(0 0% 100% / 0.15), transparent 15vmin);
  background-attachment: fixed;
  opacity: var(--active, 0);
  transition: opacity 0.2s;
  pointer-events: none;
  border-radius: 0.25rem;
}

.card:before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at calc(var(--x) * 1px) calc(var(--y) * 1px), rgb(167, 139, 250, 1), transparent 15vmin),
    transparent;
  background-attachment: fixed;
  pointer-events: none;
  mask:
    linear-gradient(white, white) 50% 0 / 100% 2px no-repeat,
    linear-gradient(white, white) 50% 100% / 100% 2px no-repeat,
    linear-gradient(white, white) 0 50% / 2px 100% no-repeat,
    linear-gradient(white, white) 100% 50% / 2px 100% no-repeat;
  z-index: 100;
  border-radius: 0.25rem;
}
</style>
