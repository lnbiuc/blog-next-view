<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByShortLink } from '~/server/api/article'
import type { ArticleWithContent } from '~/server/types/article'

import { formatTime } from '~/composables/formatTime'
import { usePreloadCacheStore } from '~/store'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const article = ref<ArticleWithContent>()

const shortLink = route.params.shortLink

const { cacheArticle, getArticleCache } = usePreloadCacheStore()

function getArticle() {
  const res: ArticleWithContent | undefined = getArticleCache(shortLink)
  if (res) {
    article.value = res
    return
  }

  getArticleByShortLink(shortLink).then((res) => {
    article.value = res.data.value?.data as ArticleWithContent
    cacheArticle(article.value)
  },
  )
}

getArticle()

onMounted(() => {
  // hidden header
  const header: HTMLElement | null = document.getElementById('header')
  if (header)
    header.style.display = 'none'
})
</script>

<template>
  <img
    v-if="article?.cover[0]" :src="article?.cover[0]" alt="cover"
    class="absolute left-0 top-[-60px] z-0 aspect-[16/9] h-[100vh] w-[100vw] object-cover"
    style="backdrop-filter: blur(10px);"
  >
  <div class="absolute z-10 h-full flex flex-col justify-between px-15">
    <div class="text-[5rem] font-700 shadow">
      {{ `&nbsp;&nbsp;${article?.title}&nbsp;&nbsp;` }}
    </div>
    <div class="mt-50 text-5xl font-500 shadow">
      {{ `&nbsp;&nbsp;${article?.description}&nbsp;&nbsp;` }}
    </div>
    <div class="mt-10 flex flex-row items-center justify-start text-4xl text-violet">
      <div class="i-carbon-view mr-2" />
      <div>{{ article?.views }} views</div>
      <div class="i-carbon-alarm mx-2 scale-110" />
      <div>{{ formatTime(article?.updatedAt) }}</div>
    </div>
  </div>
</template>

<style scoped>
.shadow {
    backdrop-filter: blur(8px);
    text-shadow: 3px 4px 28px rgba(0,0,0,0.6);
    border-radius: 10px;
}
</style>
