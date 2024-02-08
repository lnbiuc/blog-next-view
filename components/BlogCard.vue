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
    class="card-bg-filter overflow-hidden card-border"
    @click="$router.push(`/article/${props.article.shortLink}`)"
    @mouseover="preloadArticle()"
  >
    <div class="relative overflow-hidden">
      <img :src="`${props.article.cover[0]}/thumbnail`" alt="cover" class="object-cover rounded-tl-md rounded-tr-md shadow h-48 w-full z-0 transform">
      <div class="p-1 text-right absolute bottom-0 right-0">
        <UBadge v-for="t in props.article.tags" :key="t" color="gray" variant="solid" class="ml-2 opacity-90" :tag="t">
          {{ t }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 text-left">
      <div class="text-xl font-bold">
        {{ props.article.title }}
      </div>
      <div class="my-2 flex flex-row items-center">
        <div class="i-carbon-view" />
        <div class="ml-2 text-violet">
          {{ props.article.views }} views
        </div>
      </div>
      <div class="mt-1 font-bold">
        {{ formatTime(props.article.createdAt) }}
      </div>
      <div class="mt-2 text-sm">
        {{ props.article.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-bg-filter img {
  transition: transform 100ms;
}

.card-bg-filter:hover img {
  transform: scale(0.988);
}
</style>
