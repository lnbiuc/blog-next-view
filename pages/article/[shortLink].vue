<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleByShortLink } from '../../server/api/article'
import type { ArticleWithContent } from '../../server/types/article'

const route = useRoute()

const shortLink = route.params.shortLink as string

const article = ref<ArticleWithContent>()

function getArticle() {
  if (!shortLink)
    return
  getArticleByShortLink(shortLink).then((res) => {
    article.value = res.data.value?.data as ArticleWithContent
  })
}

getArticle()
</script>

<template>
  <NuxtLayout name="home">
    <div class="flex flex-col text-left">
      <img v-if="article?.cover[0]" :src="article?.cover[0]" alt="cover" class="max-h-[300px] w-full object-cover">
      <div>
        {{ article?.title }}
      </div>
    </div>
  </NuxtLayout>
</template>
