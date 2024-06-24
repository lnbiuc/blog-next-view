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
        <div class="relative overflow-hidden">
          <img
            :src="`${props.article.cover}`" alt="cover"
            class="object-cover rounded-tl-md rounded-tr-md shadow w-full aspect-[16/9] z-0 transform"
          >
        </div>

        <div class="p-4 text-left">
          <div class="text-xl">
            {{ props.article.title }}
          </div>
          <div class="mt-2 text-sm text-gray-800 dark:text-gray-400">
            {{ props.article.description }}
          </div>
        </div>
      </div>

      <!-- <div class="p-4 flex flex-row items-center">
        <div class="text-violet">
          {{ props.article.views }} views
        </div>
        <div class="mx-2">/</div>
        <div class="font-bold text-violet">
          {{ formatTime(props.article.createdAt) }}
        </div>
        <div class="mt-4 flex flex-row justify-start items-center">
          <div class="text-violet">
            {{ props.article?.views }} views
          </div>
          <div class="mx-2">
            |
          </div>
          <div class="text-violet">
            {{ formatTime(props.article?.updatedAt) }}
          </div>
        </div>
      </div> -->
    </div>
  </NuxtLink>
</template>
