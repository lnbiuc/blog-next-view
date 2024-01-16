<script setup lang="ts">
import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import type { Article, ArticleWithContent } from '~/server/types/article'
import { formatTime } from '~/composables/formatTime'
import { usePreloadCacheStore } from '~/store'
import { getArticleByShortLink } from '~/server/api/article'

const props = defineProps({
  article: {
    type: Object as PropType<Article>,
    required: true,
  },
})

const article = ref<ArticleWithContent>()

const { cacheArticle, getArticleCache } = usePreloadCacheStore()

const preloadArticle = useThrottleFn(() => {
  const res: ArticleWithContent | undefined = getArticleCache(props.article.shortLink)
  if (res)
    return

  getArticleByShortLink(props.article.shortLink).then((res) => {
    article.value = res.data.value?.data as ArticleWithContent
    cacheArticle(article.value)
  },
  )
}, 1000)
</script>

<template>
  <div
    class="card-bg-filter card-border"
    @click="$router.push(`/article/${props.article.shortLink}`)"
    @mouseover="preloadArticle()"
  >
    <div class="p-4 text-left">
      <div class="text-lg font-bold">
        {{ props.article.title }}
      </div>
      <div class="mt-2">
        <UBadge
          v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="my-1 mr-1 opacity-90"
          :tag="t"
        >
          {{ t }}
        </UBadge>
      </div>
      <div class="mt-3 text-sm">
        {{ formatTime(props.article.createdAt) }}
      </div>
    </div>
  </div>
</template>
