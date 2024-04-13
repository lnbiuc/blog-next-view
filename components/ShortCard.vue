<script setup lang="ts">
import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { IArticle } from '~/server/types'
import { useArticleStore } from '~/store/ArticleStore'
import { formatTime } from '~/composables/formatTime'

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
    <div class="card-bg-filter backdrop-blur-sm card-border h-full card">
      <div class="p-4 text-left">
        <div class="text-xl">
          {{ props.article.title }}
        </div>
        <div class="mt-2">
          <UBadge v-for="t in props.article.tags" :key="t" color="gray" size="md" variant="solid"
            class="my-1 mr-2 opacity-90" :tag="t">
            {{ t }}
          </UBadge>
        </div>
        <div class="mt-3 text-sm dark:text-gray-400 text-gray-800">
          {{ formatTime(props.article.createdAt) }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
