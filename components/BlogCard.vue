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
  <NuxtLink :to="`/article/${props.article.shortLink}`" :prefetch="true" @mouseover="preloadArticle()">
    <div class="backdrop-blur-sm blog-card-cover card-border flex flex-col h-full overflow-hidden justify-between card">
      <div>
        <!-- <div class="relative overflow-hidden">
          <img
            :src="`${props.article.cover}`" alt="cover"
            class="object-cover rounded-tl-md rounded-tr-md shadow w-full aspect-[16/9] z-0 transform"
          >
        </div> -->

        <div class="p-4 text-left">
          <div class="text-xl">
            {{ props.article.title }}
          </div>
          <div class="mt-2 text-sm text-gray-500">
            {{ props.article.description }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
