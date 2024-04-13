<script setup lang="ts">
import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'
// import { formatTime } from '~/composables/formatTime'

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    required: true,
  },
})

const article = ref<IArticle>()

const { one } = useArticleStore()

const preloadArticle = useThrottleFn(() => {
  one(props.article.shortLink).then((data) => {
    article.value = data
  })
}, 1000)
</script>

<template>
  <NuxtLink :to="`/article/${props.article.shortLink}`" :prefetch="true" @mouseover="preloadArticle()"
    class="anim-fade-in">
    <div class="backdrop-blur-sm overflow-hidden card-border h-full card blog-card-cover flex flex-col justify-between">
      <div>
        <div class="relative overflow-hidden">
          <img :src="`${props.article.cover}/compress1600x900`" alt="cover"
            class="object-cover rounded-tl-md rounded-tr-md shadow aspect-[19/9] w-full z-0 transform">
        </div>

        <div class="p-4 text-left">
          <div class="text-2xl">
            {{ props.article.title }}
          </div>
          <div class="mt-2 text-sm dark:text-gray-400 text-gray-800">
            {{ props.article.description }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
